// shared/animations.js — scroll reveal + counter + theme toggle

// ── Theme: apply saved preference immediately ─────────────────────────────────
(function () {
  var saved = localStorage.getItem('wildai-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
})();

// ── Theme toggle ──────────────────────────────────────────────────────────────
function applyThemeUI() {
  var isLight = document.body.classList.contains('light-mode');
  document.querySelectorAll('.theme-float-icon').forEach(function (el) {
    el.textContent = isLight ? '🌙' : '☀️';
  });
  document.querySelectorAll('.theme-float-label').forEach(function (el) {
    el.textContent = isLight ? 'Dark Mode' : 'Light Mode';
  });
}

function toggleTheme() {
  var isNowLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('wildai-theme', isNowLight ? 'light' : 'dark');
  applyThemeUI();
  updateNavBg();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.theme-toggle, .theme-float').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });
  applyThemeUI();
});

// ── Scroll reveal ─────────────────────────────────────────────────────────────
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

// ── Animated counter ──────────────────────────────────────────────────────────
function animateCounter(el, target, suffix, duration) {
  suffix = suffix || '';
  duration = duration || 2000;
  var start = performance.now();
  var isDecimal = String(target).includes('.');

  function update(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    var value = target * ease;
    if (isDecimal) {
      el.textContent = value.toFixed(1) + suffix;
    } else if (target >= 1000) {
      el.textContent = Math.floor(value).toLocaleString() + suffix;
    } else {
      el.textContent = Math.floor(value) + suffix;
    }
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = (isDecimal ? target.toFixed(1) : (target >= 1000 ? target.toLocaleString() : target)) + suffix;
  }
  requestAnimationFrame(update);
}

var statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(function (el) {
        animateCounter(el, parseFloat(el.dataset.count), el.dataset.suffix || '');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar, .stats-inline').forEach(function (el) {
  statsObserver.observe(el);
});

// ── Nav scroll effect (theme-aware) ──────────────────────────────────────────
var nav = document.querySelector('nav');

function updateNavBg() {
  if (!nav) return;
  var isLight = document.body.classList.contains('light-mode');
  if (window.scrollY > 20) {
    nav.style.background = isLight ? 'rgba(244,244,250,0.95)' : 'rgba(9,9,15,0.95)';
    nav.style.boxShadow = isLight ? '0 4px 30px rgba(0,0,0,0.1)' : '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = '';
    nav.style.boxShadow = 'none';
  }
}

if (nav) window.addEventListener('scroll', updateNavBg, { passive: true });

// ── Mobile menu ───────────────────────────────────────────────────────────────
var mobileToggle = document.querySelector('.nav-mobile-toggle');
var mobileMenu = document.querySelector('.mobile-menu');
var mobileClose = document.querySelector('.mobile-menu-close');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', function () { mobileMenu.classList.add('open'); });
  if (mobileClose) mobileClose.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  });
}
