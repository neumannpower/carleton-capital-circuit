
(function(){
  const c = window.EVENT || {};
  const all = (s) => document.querySelectorAll(s);
  const text = (s,v) => { if(v) all(s).forEach(e => e.textContent=v); };
  const href = (s,v) => { if(v) all(s).forEach(e => e.href=v); };
  const valid = v => typeof v === 'string' && /^https?:\/\//i.test(v.trim());
  const formEmbed = v => {
    if(!valid(v)) return '';
    const u = v.trim();
    if(u.includes('embedded=true')) return u;
    return u + (u.includes('?') ? '&' : '?') + 'embedded=true';
  };

  text('[data-event-name]', c.name);
  text('[data-event-short]', c.shortName || c.name);
  text('[data-event-status]', c.status);
  text('[data-tagline]', c.tagline);
  text('[data-date]', c.dateDisplay);
  text('[data-venue]', c.venue);
  text('[data-location]', c.location);
  text('[data-address]', c.address);
  text('[data-email-text]', c.contactEmail);
  href('[data-email-link]', c.contactEmail ? 'mailto:'+c.contactEmail : '');
  href('[data-cufirst-site]', c.cuFirstWebsite);
  href('[data-instagram]', c.instagram);
  href('[data-event-domain]', c.canonicalUrl);
  text('[data-event-domain-text]', c.canonicalUrl ? c.canonicalUrl.replace(/^https?:\/\//i,'').replace(/\/$/,'') : '');

  if(valid(c.canonicalUrl)) {
    let canonical = document.querySelector('link[rel=\"canonical\"]');
    if(!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = c.canonicalUrl.replace(/\/$/,'') + (location.pathname.endsWith('/') ? '/' : location.pathname.replace(/^.*\//,''));
  }

  const forms = {
    registration: { url: c.teamRegistrationForm, embed: c.teamRegistrationFormEmbed !== false },
    contact: { url: c.contactForm, embed: c.contactFormEmbed !== false }
  };
  Object.entries(forms).forEach(([key,form]) => {
    const url = form.url;
    all(`[data-form="${key}"]`).forEach(wrap => {
      const frame = wrap.querySelector('iframe');
      const placeholder = wrap.querySelector('.form-placeholder');
      const open = wrap.querySelector('.form-open');
      const external = wrap.querySelector('.form-external');
      if(valid(url)) {
        if(frame){
          if(form.embed){ frame.src=formEmbed(url); frame.hidden=false; }
          else { frame.removeAttribute('src'); frame.hidden=true; }
        }
        if(placeholder) placeholder.hidden=true;
        if(open){ open.href=url; open.hidden=false; }
        if(external){ external.href=url; external.hidden=false; }
      } else {
        if(frame) frame.hidden=true;
        if(placeholder) placeholder.hidden=false;
        if(open) open.hidden=true;
        if(external) external.hidden=true;
      }
    });
  });

  // Keep exactly one Team Registration item in the primary navigation: the red CTA.
  document.querySelectorAll('.site-nav a[href="registration.html"]:not(.nav-cta)').forEach(a => a.remove());

  // Keep site navigation on the website. Google Forms are embedded on their respective pages.

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Countdown
  const cd = document.querySelector('[data-countdown]');
  if(cd && c.startDate){
    const target = new Date(c.startDate).getTime();
    const render=()=>{
      let d=target-Date.now();
      if(d<=0){ cd.innerHTML='<div><strong>Now</strong><small>Event</small></div>'; return; }
      const days=Math.floor(d/86400000); d%=86400000;
      const hrs=Math.floor(d/3600000); d%=3600000;
      const mins=Math.floor(d/60000);
      cd.innerHTML=`<div><strong>${days}</strong><small>Days</small></div><div><strong>${hrs}</strong><small>Hours</small></div><div><strong>${mins}</strong><small>Min</small></div>`;
    };
    render(); setInterval(render,60000);
  }


  // Digital event card: native share, copy link, and full-screen QR presentation.
  const eventUrl = (c.canonicalUrl || 'https://carletoncc.ca').replace(/\/$/, '') + '/';
  const status = document.querySelector('[data-share-status]');
  const showStatus = (message) => {
    if(!status) return;
    status.textContent = message;
    window.clearTimeout(showStatus.timer);
    showStatus.timer = window.setTimeout(() => { status.textContent = ''; }, 2200);
  };

  document.querySelector('[data-share-event]')?.addEventListener('click', async () => {
    const shareData = {
      title: c.name || 'Carleton Capital Circuit',
      text: `${c.name || 'Carleton Capital Circuit'} — ${c.dateDisplay || 'November 27–28, 2026'} at Carleton University.`,
      url: eventUrl
    };
    try {
      if(navigator.share) {
        await navigator.share(shareData);
      } else if(navigator.clipboard) {
        await navigator.clipboard.writeText(eventUrl);
        showStatus('Link copied');
      }
    } catch(err) {
      if(err && err.name !== 'AbortError') showStatus('Share unavailable');
    }
  });

  document.querySelector('[data-copy-link]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      showStatus('Link copied');
    } catch(err) {
      showStatus('Copy unavailable');
    }
  });

  const qrModal = document.querySelector('[data-qr-modal]');
  const openQr = () => {
    if(!qrModal) return;
    qrModal.hidden = false;
    document.body.classList.add('qr-modal-open');
    qrModal.querySelector('[data-qr-close]')?.focus();
  };
  const closeQr = () => {
    if(!qrModal) return;
    qrModal.hidden = true;
    document.body.classList.remove('qr-modal-open');
  };
  document.querySelector('[data-qr-open]')?.addEventListener('click', openQr);
  document.querySelector('[data-qr-close]')?.addEventListener('click', closeQr);
  qrModal?.addEventListener('click', (e) => { if(e.target === qrModal) closeQr(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && qrModal && !qrModal.hidden) closeQr(); });

  text('[data-year]', String(new Date().getFullYear()));
})();
