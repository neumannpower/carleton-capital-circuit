"""Manual static-site publisher. Requires an FTP account confined to public_html."""
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path
import re
import ssl
import subprocess
import sys
from datetime import datetime, timezone
from zipfile import ZipFile, ZIP_DEFLATED


def main():
    approved = os.environ.get('APPROVED_COMMIT', '')
    if not re.fullmatch(r'[0-9a-f]{40}', approved):
        raise SystemExit('A full approved commit SHA is required.')
    if os.environ.get('CONFIRMATION') != 'PUBLISH carletoncc.ca':
        raise SystemExit('Explicit publication confirmation is required.')
    root = Path(sys.argv[1]).resolve()
    actual = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
    if actual != approved:
        raise SystemExit('Checkout differs from the approved version.')
    names = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
    root_files = {'config.js', 'robots.txt', 'sitemap.xml'}
    extensions = {'.css', '.js', '.json', '.pdf', '.vcf', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.woff', '.woff2'}
    files = []
    for name in filter(None, names):
        p = Path(name)
        allowed = (len(p.parts) == 1 and (p.suffix == '.html' or name in root_files)) or (p.parts[0] == 'assets' and p.suffix.lower() in extensions)
        if not allowed:
            continue
        if '..' in p.parts or p.is_absolute() or any(part.startswith('.') for part in p.parts):
            raise SystemExit('Unexpected publication path.')
        local = root / p
        if local.is_symlink() or not local.is_file():
            raise SystemExit('Only regular public files may be published.')
        files.append(name)
    if 'index.html' not in files or 'Carleton Capital Circuit' not in (root / 'index.html').read_text(encoding='utf-8'):
        raise SystemExit('Expected event site was not found.')
    for name in ('WEBSITE_FTP_HOST', 'WEBSITE_FTP_USER', 'WEBSITE_FTP_PASSWORD'):
        if not os.environ.get(name):
            raise SystemExit('Hosting connection is not configured. No files published.')
    record = Path('publication-record')
    record.mkdir(exist_ok=True)
    receipt = {'approved_commit': approved, 'started_utc': datetime.now(timezone.utc).isoformat(), 'status': 'backing_up', 'new_files': [], 'published': []}
    ftp = ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=45)
    try:
        ftp.connect(os.environ['WEBSITE_FTP_HOST'], 21)
        ftp.login(os.environ['WEBSITE_FTP_USER'], os.environ['WEBSITE_FTP_PASSWORD'])
        ftp.prot_p()
        ftp.cwd('/')
        existing_home = io.BytesIO()
        ftp.retrbinary('RETR index.html', existing_home.write)
        if b'Carleton Capital Circuit' not in existing_home.getvalue():
            raise SystemExit('FTP root is not the existing Carleton event website. Stopping.')
        directory_entries = {}
        def entries(directory):
            if directory in directory_entries:
                return directory_entries[directory]
            parent, _, basename = directory.rpartition('/')
            if directory and basename not in entries(parent):
                directory_entries[directory] = set()
            else:
                directory_entries[directory] = {n.rstrip('/').rsplit('/', 1)[-1] for n in ftp.nlst(directory or '.')}
            return directory_entries[directory]
        # Complete the entire backup before the first upload. Any read failure aborts.
        with ZipFile(record / 'before-publication.zip', 'w', ZIP_DEFLATED) as backup:
            for name in sorted(files):
                directory, _, basename = name.rpartition('/')
                if basename not in entries(directory):
                    receipt['new_files'].append(name)
                    continue
                data = io.BytesIO()
                ftp.retrbinary('RETR ' + name, data.write)
                backup.writestr(name, data.getvalue())
        receipt['status'] = 'publishing'
        created = set()
        for name in sorted(files, key=lambda n: (n == 'index.html', n.endswith('.html'), n)):
            directory = str(Path(name).parent).replace('\\', '/')
            if directory != '.':
                current = ''
                for part in directory.split('/'):
                    parent = current
                    current = current + '/' + part if current else part
                    if current not in created:
                        if part not in entries(parent):
                            ftp.mkd(current)
                            directory_entries[parent].add(part)
                        created.add(current)
            data = (root / name).read_bytes()
            ftp.storbinary('STOR ' + name, io.BytesIO(data))
            verified = io.BytesIO()
            ftp.retrbinary('RETR ' + name, verified.write)
            if hashlib.sha256(data).digest() != hashlib.sha256(verified.getvalue()).digest():
                raise RuntimeError('Uploaded file verification failed: ' + name)
            receipt['published'].append(name)
        receipt['status'] = 'verified'
        print(f'Published and verified {len(files)} public files from {approved}.')
    except BaseException:
        receipt['status'] = 'failed'
        raise
    finally:
        receipt['finished_utc'] = datetime.now(timezone.utc).isoformat()
        (record / 'receipt.json').write_text(json.dumps(receipt, indent=2) + '\n')
        ftp.close()

if __name__ == '__main__':
    main()
