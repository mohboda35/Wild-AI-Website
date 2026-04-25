// shared/niche-template.js — renders a full niche page from window.NICHE_DATA

(function() {
  const d = window.NICHE_DATA;
  if (!d) return;

  // Build nav HTML
  document.querySelector('nav .nav-inner').innerHTML = `
    <a href="../index.html" class="nav-logo">
      <img src="../uploads/logo-1777127155802.png" alt="Wild AI" />
      <span class="nav-logo-text">Wild AI</span>
    </a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li>
        <a class="nav-dropdown-trigger active" tabindex="0">
          Industries
          <svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg>
        </a>
        <div class="nav-dropdown">
          <div class="dd-label">All Industries</div>
          <a href="../industries.html"><span class="dd-icon">&#9783;</span> Overview</a>
          <div class="dd-sep"></div>
          <a href="home-services.html"><span class="dd-icon">&#127968;</span> Home Services</a>
          <a href="dental.html"><span class="dd-icon">&#129463;</span> Dental Practices</a>
          <a href="medical.html"><span class="dd-icon">&#9877;</span> Medical Practices</a>
          <a href="salons.html"><span class="dd-icon">&#9986;</span> Salons &amp; Spas</a>
          <a href="restaurants.html"><span class="dd-icon">&#127829;</span> Restaurants</a>
          <a href="law-firms.html"><span class="dd-icon">&#9878;</span> Law Firms</a>
          <a href="ecommerce.html"><span class="dd-icon">&#128722;</span> E-Commerce</a>
          <a href="real-estate.html"><span class="dd-icon">&#127970;</span> Real Estate</a>
        </div>
      </li>
      <li><a href="../index.html#features">Features</a></li>
      <li><a href="../index.html#how">How It Works</a></li>
    </ul>
    <div class="nav-actions">
      <a href="https://calendar.app.google/ueaZa2oXfEFxtex78" target="_blank" class="btn btn-primary">Talk To Us</a>
    </div>
    <button class="nav-mobile-toggle" aria-label="Open menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/>
      </svg>
    </button>`;

  document.querySelector('.mobile-menu').innerHTML = `
    <button class="mobile-menu-close">&#x2715;</button>
    <a href="../index.html">Home</a>
    <a href="../industries.html">Industries</a>
    <a href="../index.html#features">Features</a>
    <a href="../index.html#contact" class="btn btn-primary" style="margin-top:12px">Talk To Us</a>`;

  // Build challenges HTML
  const challengesHTML = d.challenges.map((c, i) => `
    <div class="challenge-card reveal reveal-delay-${i + 1}">
      <div class="challenge-num">0${i + 1}</div>
      <div>
        <h4 style="margin-bottom:6px">${c.title}</h4>
        <p style="font-size:0.875rem">${c.desc}</p>
      </div>
    </div>`).join('');

  // Build features HTML
  const featuresHTML = d.features.map((f, i) => `
    <div class="feature-card reveal reveal-delay-${i % 3}">
      <div class="feature-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#nf${i})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <defs><linearGradient id="nf${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4f7bff"/><stop offset="100%" stop-color="#9b4dff"/></linearGradient></defs>
          ${f.icon}
        </svg>
      </div>
      <h3>${f.title}</h3>
      <p style="font-size:0.875rem">${f.desc}</p>
    </div>`).join('');

  // Build conversation HTML
  const convoHTML = d.conversation.map(m => `
    <div class="convo-msg">
      <div class="label ${m.role}">${m.role === 'agent' ? 'Wild AI' : 'Caller'}</div>
      <div class="bubble ${m.role}">${m.text}</div>
    </div>`).join('');

  // Other niches (exclude current)
  const allNiches = [
    { name: 'Home Services', slug: 'home-services', icon: '&#127968;' },
    { name: 'Dental', slug: 'dental', icon: '&#129463;' },
    { name: 'Medical', slug: 'medical', icon: '&#9877;' },
    { name: 'Salons & Spas', slug: 'salons', icon: '&#9986;' },
    { name: 'Restaurants', slug: 'restaurants', icon: '&#127829;' },
    { name: 'Law Firms', slug: 'law-firms', icon: '&#9878;' },
    { name: 'E-Commerce', slug: 'ecommerce', icon: '&#128722;' },
    { name: 'Real Estate', slug: 'real-estate', icon: '&#127970;' },
  ];
  const otherNiches = allNiches.filter(n => n.slug !== d.slug).slice(0, 4);
  const otherNichesHTML = otherNiches.map((n, i) => `
    <a href="${n.slug}.html" class="niche-card reveal reveal-delay-${i}">
      <div class="niche-icon">${n.icon}</div>
      <h3>${n.name}</h3>
      <span class="niche-arrow">Explore &rarr;</span>
    </a>`).join('');

  document.getElementById('niche-root').innerHTML = `

    <!-- HERO -->
    <section class="niche-hero">
      <div class="niche-hero-glow" style="background:${d.glowColor}"></div>
      <div class="container" style="position:relative;z-index:1">
        <a href="../industries.html" class="back-link reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          All Industries
        </a>
        <div class="niche-hero-badge reveal reveal-delay-1">
          <span style="font-size:1.2em">${d.icon}</span> ${d.name}
        </div>
        <h1 class="reveal reveal-delay-2" style="max-width:700px; margin-bottom:20px">${d.headline}<br /><span class="gradient-text">${d.headlineAccent}</span></h1>
        <p class="reveal reveal-delay-3" style="max-width:560px; font-size:1.1rem; margin-bottom:36px">${d.subheadline}</p>
        <div class="reveal reveal-delay-4" style="display:flex; gap:14px; flex-wrap:wrap;">
          <a href="../index.html#contact" class="btn btn-primary">Talk To Us</a>
          <a href="../industries.html" class="btn btn-ghost btn-lg">All Industries</a>
        </div>
      </div>
    </section>

    <!-- CHALLENGES -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="reveal" style="margin-bottom:40px">
          <div class="section-label">The Problem</div>
          <h2>What's costing you <span class="gradient-text">customers?</span></h2>
        </div>
        <div style="display:flex; flex-direction:column; gap:16px">
          ${challengesHTML}
        </div>
      </div>
    </section>

    <div style="height:1px; background:var(--border)"></div>

    <!-- FEATURES -->
    <section class="section" id="features">
      <div class="container">
        <div class="reveal" style="margin-bottom:48px">
          <div class="section-label">How Wild AI Helps</div>
          <h2>Built for <span class="gradient-text">${d.name}.</span></h2>
          <p class="section-sub">${d.featuresIntro}</p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px" class="niche-features-grid">
          ${featuresHTML}
        </div>
      </div>
    </section>

    <div style="height:1px; background:var(--border)"></div>

    <!-- SAMPLE CONVERSATION -->
    <section class="section">
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center" class="convo-grid">
          <div class="reveal">
            <div class="section-label">Hear It In Action</div>
            <h2>A real call,<br /><span class="gradient-text">handled perfectly.</span></h2>
            <p style="margin-top:16px; margin-bottom:32px">This is what your callers will experience — natural, fast, and always professional.</p>
            <a href="../index.html#contact" class="btn btn-primary">Talk To Us</a>
          </div>
          <div class="convo-demo reveal reveal-delay-2">
            <div class="convo-title">Live Call · Wild AI Active · ${d.name}</div>
            ${convoHTML}
          </div>
        </div>
      </div>
    </section>

    <!-- OTHER INDUSTRIES -->
    <div style="height:1px; background:var(--border)"></div>
    <section class="section">
      <div class="container">
        <div class="reveal" style="margin-bottom:40px; text-align:center">
          <div class="section-label">Explore More</div>
          <h2>Wild AI for <span class="gradient-text">other industries</span></h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:18px" class="other-niches-grid">
          ${otherNichesHTML}
        </div>
        <div style="text-align:center; margin-top:32px" class="reveal">
          <a href="../industries.html" class="btn btn-ghost">View All Industries</a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box reveal">
          <div class="badge" style="margin:0 auto 24px; width:fit-content"><span class="badge-dot"></span> ${d.name} Specialists</div>
          <h2>Ready to transform your<br /><span class="gradient-text">${d.name.toLowerCase()} calls?</span></h2>
          <p>${d.ctaText}</p>
          <a href="../index.html#contact" class="btn btn-primary btn-lg">Talk To Us</a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer>
      <div class="container">
        <div class="footer-inner">
          <a href="../index.html" class="nav-logo">
            <img src="../uploads/logo-1777127155802.png" alt="Wild AI" />
            <span class="nav-logo-text">Wild AI</span>
          </a>
          <div class="footer-links">
            <a href="../industries.html">Industries</a>
            <a href="../index.html#features">Features</a>
            <a href="../index.html#how">How It Works</a>
            <a href="../about.html">About</a>
          </div>
          <div class="footer-copy">&copy; 2026 Wild AI. All rights reserved.</div>
        </div>
      </div>
    </footer>`;

  // Responsive grid fix
  const style = document.createElement('style');  style.textContent = `
    @media (max-width: 900px) {
      .niche-features-grid { grid-template-columns: repeat(2,1fr) !important; }
      .convo-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .other-niches-grid { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 600px) {
      .niche-features-grid { grid-template-columns: 1fr !important; }
      .other-niches-grid { grid-template-columns: 1fr !important; }
    }`;
  document.head.appendChild(style);

  // Set light mode as default
  document.body.classList.add('light-mode');

  // Wire all niche CTA links to open calendar
  document.querySelectorAll('#niche-root a.btn-primary').forEach(function(btn) {
    btn.href = 'https://calendar.app.google/ueaZa2oXfEFxtex78';
    btn.target = '_blank';
  });

})();
