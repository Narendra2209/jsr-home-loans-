/* JSR Home Loan Services — cursor motion
   Flip cards, a faint cursor sheen and a small tilt. Deliberately restrained:
   this is a lender's site, so the motion is there to acknowledge the pointer,
   not to perform. Magnetic buttons, a custom cursor and mouse parallax were all
   tried here and removed for reading as toys next to the rate tables.

   Everything here is decoration. If this file never loads, the page keeps its
   glass styling and every rule that depends on the custom properties below
   simply stays at its resting value — nothing is hidden behind a class this
   script is responsible for adding. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');
  // Touch screens report a cursor position exactly once, on tap, which would
  // leave a card lit with no way to unlight it. Mice only.
  if ((reduce && reduce.matches) || !(fine && fine.matches)) return;

  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* One rAF loop for the whole page. Handlers only record intent; every write
     to the DOM happens here, so reads and writes never interleave. */
  var queue = [];
  var scheduled = false;
  function schedule(fn) {
    queue.push(fn);
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      var jobs = queue;
      queue = [];
      for (var i = 0; i < jobs.length; i++) jobs[i]();
    });
  }


  /* ---------- Direction-aware flip cards ----------
     Rewraps a card into a front and a generated back face, then spins it on
     the axis the pointer actually crossed. See _src/css-flip.css for why the
     back face is aria-hidden and why only some cards get a CTA. */
  var FLIP = '.product-card, .svc-card, .blog-card, .feature-card, .timeline-step, .doc-card';
  var flipped = [];

  function textOf(el) { return el ? (el.textContent || '').trim() : ''; }

  function firstSentence(s, cap) {
    if (!s) return '';
    var m = s.replace(/\s+/g, ' ').match(/^.*?[.?!](?=\s|$)/);
    var out = m ? m[0] : s;
    if (out.length > cap) out = out.slice(0, cap).replace(/\s+\S*$/, '') + '\u2026';
    return out;
  }

  // `src` is the front face, which by now holds the card's original children;
  // `card` is still the element that carries any href.
  function buildBack(card, src) {
    var back = document.createElement('div');
    back.className = 'flip-back';
    // The back restates the front. Hiding it from assistive tech keeps every
    // card announced exactly once.
    back.setAttribute('aria-hidden', 'true');

    var eyebrow = textOf(src.querySelector('.blog-tag, .timeline-time, .feature-num, .timeline-num'));
    var title = textOf(src.querySelector('h3'));
    var body = firstSentence(textOf(src.querySelector('.svc-box p, .blog-body > p, p')), 130);

    // A CTA only where the front already offers the same destination, so the
    // flip never becomes the only way to reach an action.
    var link = null, label = '';
    if (card.matches('[href]')) {
      link = card;
      label = textOf(src.querySelector('.product-link')) || 'Read more';
    } else {
      // A link the card already offers on its front. Only ones the copy marks
      // as a call to action with a trailing arrow count — picking up a
      // mid-sentence link would put "loan against property" on a button.
      var arrowed = null;
      $$('a', src).some(function (a) {
        if (a.textContent.indexOf('\u2192') !== -1) { arrowed = a; return true; }
        return false;
      });
      link = arrowed || src.querySelector('h3 a, .blog-thumb');
      label = arrowed ? textOf(arrowed).replace(/\s*\u2192\s*$/, '')
                      : (link ? 'Read more' : '');
    }
    // Some of those arrowed links are whole sentences ("Full eligibility,
    // documents and rates"). Fine as inline copy, far too long on a button.
    if (label.length > 28) label = 'Read more';
    var href = link ? link.getAttribute('href') : '';

    var html = '';
    if (eyebrow) html += '<p class="flip-back-eyebrow">' + eyebrow + '</p>';
    if (title) html += '<p class="flip-back-title">' + title + '</p>';
    if (body) html += '<p>' + body + '</p>';
    back.innerHTML = html;

    if (href && label) {
      var a = document.createElement('a');
      a.className = 'flip-cta';
      a.href = href;
      a.tabIndex = -1;               // reachable from the front already
      a.textContent = label;
      back.appendChild(a);
    }
    return back;
  }

  function makeFlip(card) {
    if (card.classList.contains('is-flip')) return;

    var inner = document.createElement('div');
    inner.className = 'flip-inner';
    var front = document.createElement('div');
    front.className = 'flip-front';
    while (card.firstChild) front.appendChild(card.firstChild);

    inner.appendChild(front);
    inner.appendChild(buildBack(card, front));
    card.appendChild(inner);
    card.classList.add('is-flip');
    flipped.push(card);

    function axisFrom(e) {
      // Which edge did the pointer cross? Compare the distance to each side.
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var d = [
        { k: 'left',   v: x },
        { k: 'right',  v: r.width - x },
        { k: 'top',    v: y },
        { k: 'bottom', v: r.height - y }
      ].sort(function (a, b) { return a.v - b.v; })[0].k;
      return d;
    }

    function spin(edge, on) {
      var vertical = edge === 'top' || edge === 'bottom';
      // Rotate away from the edge that was crossed, so the card appears pushed.
      var sign = (edge === 'right' || edge === 'bottom') ? -1 : 1;
      var deg = on ? 180 * sign : 0;
      if (vertical) {
        card.style.setProperty('--rx', deg + 'deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--brx', 180 * sign + 'deg');
        card.style.setProperty('--bry', '0deg');
      } else {
        card.style.setProperty('--ry', deg + 'deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--bry', 180 * sign + 'deg');
        card.style.setProperty('--brx', '0deg');
      }
    }

    card.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      var edge = axisFrom(e);
      schedule(function () { spin(edge, true); });
    });

    card.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse') return;
      // Unwind across whichever edge the pointer is leaving by, so the card
      // follows the cursor out rather than snapping back the way it came.
      var edge = axisFrom(e);
      schedule(function () { spin(edge, false); });
    });
  }

  // blog-card-featured is a wide, two-column card; flipping it reads as a
  // glitch rather than an effect, so it keeps the tilt instead.
  $$(FLIP).forEach(function (card) {
    if (card.classList.contains('blog-card-featured')) return;
    makeFlip(card);
  });

  /* ---------- Cursor sheen + tilt on cards ---------- */

  // Cards that hold a slider, a form control or a sortable header are given the
  // sheen but never the tilt: rotating the surface under a control the visitor
  // is dragging makes the control miss.
  var SHEEN_ONLY = '.calc-card, .compare-controls, .lead-form, .accordion, .data-table, .rating-summary';
  var TILT = '.product-card, .feature-card, .timeline-step, .doc-card, .testimonial,' +
             '.team-card, .mv-card, .blog-card, .quick-card, .contact-card, .svc-card,' +
             '.lender-grid li, .embed-placeholder';

  var MAX_TILT = 3;      // degrees — enough to feel, not to notice
  var LIFT = -5;         // px

  function addSheen(el) {
    // On a flip card the wash goes on the front face, or it would sit outside
    // the rotating element and hang in mid-air.
    if (el.classList.contains('is-flip')) el = el.querySelector('.flip-front') || el;
    if (el.querySelector(':scope > .sheen')) return;
    var s = document.createElement('span');
    s.className = 'sheen';
    s.setAttribute('aria-hidden', 'true');
    el.appendChild(s);
  }

  function track(el, tilt) {
    el.classList.add('has-motion');
    addSheen(el);
    if (tilt) el.classList.add('has-tilt');

    el.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      schedule(function () {
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
        if (!tilt) return;
        // -1..1 from the centre, then damped into degrees.
        var dx = (x / r.width) * 2 - 1;
        var dy = (y / r.height) * 2 - 1;
        el.style.transform =
          'perspective(800px) rotateX(' + (-dy * MAX_TILT).toFixed(2) + 'deg)' +
          ' rotateY(' + (dx * MAX_TILT).toFixed(2) + 'deg)' +
          ' translate3d(0,' + LIFT + 'px,0)';
      });
    });

    el.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse' && tilt) el.classList.add('is-tilting');
    });

    el.addEventListener('pointerleave', function () {
      schedule(function () {
        el.classList.remove('is-tilting');
        // Hand the transform back to the stylesheet so the CSS hover/rest
        // transition finishes the movement.
        if (tilt) el.style.transform = '';
      });
    });
  }

  $$(SHEEN_ONLY).forEach(function (el) { track(el, false); });
  $$(TILT).forEach(function (el) {
    // A card matched by both lists keeps the safer, sheen-only behaviour.
    if (el.matches(SHEEN_ONLY) || el.closest(SHEEN_ONLY)) return;
    // A flipping card owns its own transform; tilt would fight it.
    if (el.classList.contains('is-flip')) return;
    track(el, true);
  });

})();
