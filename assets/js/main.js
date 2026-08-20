/* JSR Home Loan Services — site behaviours
   Loaded on every page. Calculators live in tools.js. */
(function () {
  'use strict';

  // The inline script in <head> arms the .js hidden state before first paint.
  // This flag tells its window.load failsafe that main.js really did run, so a
  // failed or blocked script disarms the hidden state instead of blanking the page.
  window.__jsrReady = true;

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ---------- Mobile navigation ---------- */
  var toggle = $('.nav-toggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Dropdown sub-menus (tap to open on small screens) ---------- */
  $$('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = btn.closest('.has-sub');
      var open = parent.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.has-sub')) return;
    $$('.has-sub.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      var btn = $('.sub-toggle', el);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.has-sub.is-open').forEach(function (el) { el.classList.remove('is-open'); });
    if (menu && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Scroll-triggered widgets (counters, bars, reveals) ---------- */
  function animateCounter(el) {
    var to = parseFloat(el.getAttribute('data-to')) || 0;
    var decimalsOnly = (String(to).split('.')[1] || '').length;
    if (reduceMotion.matches) {
      el.textContent = decimalsOnly ? to.toFixed(decimalsOnly) : Math.round(to).toLocaleString('en-IN');
      return;
    }
    var duration = 1600;
    var start = null;
    var decimals = decimalsOnly;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = to * (1 - Math.pow(1 - progress, 3));
      el.textContent = decimals
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function fillBar(el) {
    var value = el.getAttribute('data-value') || 0;
    var fill = $('.prbar-fill', el);
    if (fill) fill.style.width = value + '%';
    var counter = $('.prbar-counter', el);
    if (counter) animateCounter(counter);
  }

  function activate(el) {
    if (el.classList.contains('counter-number')) animateCounter(el);
    else if (el.classList.contains('prbar')) fillBar(el);
    else el.classList.add('is-in');
  }

  var watched = $$('.counter-number, .prbar, .reveal');
  if ('IntersectionObserver' in window) {
    var seen = new WeakSet();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        activate(entry.target);
        observer.unobserve(entry.target);
      });
      // threshold must stay 0: a percentage threshold can never be met by an
      // element taller than the viewport (the amortisation table is ~5000px on
      // a phone), which would leave it hidden forever. rootMargin holds the
      // reveal back until the element is a little way onto the screen.
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
    watched.forEach(function (el) { observer.observe(el); });
  } else {
    watched.forEach(activate);
  }

  /* ---------- Back to top ---------- */
  var top = document.getElementById('backToTop');
  if (top) {
    var onScroll = function () {
      top.classList.toggle('is-visible', window.scrollY > 350);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---------- Sticky header state + scroll progress ----------
     Both are read-only observers of scroll position. They live here rather
     than in motion.js because they must run on touch as well, and neither
     moves anything under the visitor's finger. */
  (function () {
    var header = $('.site-header');
    var bar = null;
    if (!reduceMotion.matches) {
      bar = document.createElement('div');
      bar.className = 'scroll-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }
    if (!header && !bar) return;

    var ticking = false;
    function read() {
      ticking = false;
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (header) header.classList.toggle('is-stuck', y > 8);
      if (bar) {
        var doc = document.documentElement;
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        bar.style.setProperty('--sp', Math.min(1, Math.max(0, y / max)).toFixed(4));
      }
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    }, { passive: true });
    read();
  })();

  /* ---------- Accordions (FAQ) ---------- */
  $$('[data-accordion]').forEach(function (acc) {
    $$('.acc-btn', acc).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.acc-item');
        var open = item.classList.contains('is-open');
        // one panel at a time
        $$('.acc-item.is-open', acc).forEach(function (other) {
          other.classList.remove('is-open');
          var b = $('.acc-btn', other);
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- Tabs ---------- */
  $$('[data-tabs]').forEach(function (group) {
    var tabs = $$('[role="tab"]', group);

    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }

    // Panels ship visible so that a no-JS visitor can still read every applicant
    // type; JS collapses them on init and marks the group ready.
    var initial = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    if (initial) select(initial);
    group.classList.add('is-ready');

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (next === null) return;
        e.preventDefault();
        var target = tabs[(next + tabs.length) % tabs.length];
        select(target);
        target.focus();
      });
    });
  });

  /* ---------- Video testimonials: embed YouTube only on click ---------- */
  $$('.video-card').forEach(function (card) {
    var id = (card.getAttribute('data-youtube') || '').trim();
    var btn = $('.video-play', card);
    if (!btn) return;
    if (!id) {
      card.classList.add('is-empty');
      btn.disabled = true;
      btn.setAttribute('aria-label', 'Video coming soon');
      return;
    }
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      frame.title = card.getAttribute('data-title') || 'Customer video testimonial';
      frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.loading = 'lazy';
      $('.video-thumb', card).appendChild(frame);
      btn.remove();
    });
  });
})();
