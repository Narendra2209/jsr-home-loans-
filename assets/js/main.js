/* JSR Home Loan Services - front-end clone behaviours */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Hero slider ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var slides = hero.querySelectorAll('.hero-slide');
    var dotWrap = hero.querySelector('.hero-dots');
    var index = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { go(i); });
      dotWrap.appendChild(dot);
    });
    var dots = dotWrap.querySelectorAll('button');

    function render() {
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
    }
    function go(i) {
      index = (i + slides.length) % slides.length;
      render();
      restart();
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 6000);
    }

    hero.querySelector('.hero-prev').addEventListener('click', function () { go(index - 1); });
    hero.querySelector('.hero-next').addEventListener('click', function () { go(index + 1); });
    render();
    restart();
  }

  /* ---------- Scroll-triggered widgets (counters, bars, reveals) ---------- */
  function animateCounter(el) {
    var to = parseFloat(el.getAttribute('data-to')) || 0;
    var duration = 2000;
    var start = null;
    var decimals = (String(to).split('.')[1] || '').length;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = to * progress;
      el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function fillBar(el) {
    var value = el.getAttribute('data-value') || 0;
    el.querySelector('.prbar-fill').style.width = value + '%';
    animateCounter(el.querySelector('.prbar-counter'));
  }

  var seen = new WeakSet();
  var observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          var el = entry.target;
          if (el.classList.contains('counter-number')) animateCounter(el);
          else if (el.classList.contains('prbar')) fillBar(el);
          else el.classList.add('is-in');
          observer.unobserve(el);
        });
      }, { threshold: 0.25 })
    : null;

  var watched = document.querySelectorAll('.counter-number, .prbar, .reveal');
  watched.forEach(function (el) {
    if (observer) {
      observer.observe(el);
    } else {
      if (el.classList.contains('counter-number')) animateCounter(el);
      else if (el.classList.contains('prbar')) fillBar(el);
      else el.classList.add('is-in');
    }
  });

  /* ---------- Back to top ---------- */
  var top = document.getElementById('backToTop');
  if (top) {
    window.addEventListener('scroll', function () {
      top.classList.toggle('is-visible', window.scrollY > 350);
    });
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form (front-end only) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var note = form.querySelector('.form-note');
      note.textContent = 'Thanks! This is a front-end only clone, so no message was actually sent.';
      note.classList.add('is-visible');
      form.reset();
    });
  }
})();
