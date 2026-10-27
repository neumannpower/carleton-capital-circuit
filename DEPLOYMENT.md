# Live publishing

The reviewed site at commit d611fdf885c2b22357d523c831ed5a1ca062117f was published on October 27, 2026. The original live files are backed up outside the document root at /home/carlvtgh/website-backup-before-d611fdf-20261027.zip. Existing hosting configuration was preserved.

## Manual GitHub publishing

The Publish website workflow has only a workflow_dispatch trigger. Commits, pushes, pull requests and scheduled jobs cannot invoke it automatically. The workflow requires a full approved commit SHA and the exact confirmation phrase PUBLISH carletoncc.ca. Always get explicit human approval of the version before running it.

The production environment requires three secrets: WEBSITE_FTP_HOST, WEBSITE_FTP_USER and WEBSITE_FTP_PASSWORD. Use a dedicated FTP account whose directory is restricted to /home/carlvtgh/public_html. The publisher requires encrypted FTPS with certificate verification and refuses a root that does not already contain the event website. Do not use the primary cPanel account.

The workflow checks out deployment tooling separately from the approved site version. It publishes only tracked public HTML, config.js, robots.txt, sitemap.xml and approved asset types. It excludes .htaccess, repository metadata, source tooling, correspondence and planning documents. Existing unrelated server files are not deleted.

Before uploading, it downloads every existing file that it would overwrite into a backup ZIP. Missing files are recorded separately. Each upload is read back and checked; index.html is uploaded last. Backups and receipts are retained as workflow artifacts for 30 days, including on failures. A failed upload may leave a partial release: use the backup and receipt to restore overwritten files before retrying. Newly created files are listed in the receipt for rollback review.

## Validation

Simulated FTPS verification confirmed all 33 public files were uploaded and checked, original files were backed up before any upload, index.html was uploaded last, and missing explicit confirmation blocked publication. The first live FTPS workflow run succeeded: https://github.com/neumannpower/carleton-capital-circuit/actions/runs/40456690956. All 33 live files were independently verified against the approved Git commit bytes after publication. The production secrets are configured with the dedicated account githubpublish@carletoncc.ca, restricted to public_html. No passwords are stored in this repository.
