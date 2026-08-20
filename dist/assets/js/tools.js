/* JSR Home Loan Services — calculators, comparison table and lead forms.
   Loaded only on pages that need it (see `scripts:` in _src/pages/*.html).

   Everything runs client-side. Nothing is sent anywhere unless the visitor
   presses one of the WhatsApp / email buttons. */
(function () {
  'use strict';

  var WHATSAPP = '919000781967';
  var EMAIL = 'jsrhomeloans@gmail.com';
  var RUPEE = '₹';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* ==================================================================
     Number helpers
     ================================================================== */
  function toNumber(value) {
    var n = parseFloat(String(value).replace(/[^0-9.\-]/g, ''));
    return isFinite(n) ? n : 0;
  }

  function group(n) {
    return Math.round(n).toLocaleString('en-IN');
  }

  function money(n) {
    if (!isFinite(n)) return RUPEE + '0';
    return RUPEE + group(Math.max(0, n));
  }

  /** Same, but keeps the sign - for figures that can legitimately go negative. */
  function signedMoney(n) {
    if (!isFinite(n)) return '—';
    return (n < 0 ? '−' : '') + RUPEE + group(Math.abs(n));
  }

  /** Short Indian form: 12,50,000 -> "12.5 lakh"; 1,20,00,000 -> "1.2 crore". */
  function shortMoney(n) {
    if (n >= 10000000) return RUPEE + (n / 10000000).toFixed(2).replace(/\.?0+$/, '') + ' crore';
    if (n >= 100000) return RUPEE + (n / 100000).toFixed(2).replace(/\.?0+$/, '') + ' lakh';
    return money(n);
  }

  function months(m) {
    var y = Math.floor(m / 12);
    var r = Math.round(m % 12);
    if (r === 12) { y += 1; r = 0; }
    if (y && r) return y + ' yr ' + r + ' mo';
    if (y) return y + (y === 1 ? ' year' : ' years');
    return r + (r === 1 ? ' month' : ' months');
  }

  /* ==================================================================
     Loan maths
     ================================================================== */
  /** Equated monthly instalment on a reducing-balance loan. */
  function emiOf(principal, annualRate, n) {
    if (!principal || !n) return 0;
    var r = annualRate / 12 / 100;
    if (r <= 0) return principal / n;
    var f = Math.pow(1 + r, n);
    return (principal * r * f) / (f - 1);
  }

  /** The principal that a given EMI can service — the eligibility direction. */
  function principalOf(emi, annualRate, n) {
    if (!emi || !n) return 0;
    var r = annualRate / 12 / 100;
    if (r <= 0) return emi * n;
    var f = Math.pow(1 + r, n);
    return (emi * (f - 1)) / (r * f);
  }

  /** How many instalments it takes to clear `principal` at a fixed EMI. */
  function termOf(principal, annualRate, emi) {
    var r = annualRate / 12 / 100;
    if (r <= 0) return principal / emi;
    if (emi <= principal * r) return Infinity; // EMI never covers the interest
    return Math.log(emi / (emi - principal * r)) / Math.log(1 + r);
  }

  /** Year-by-year amortisation rows. */
  function schedule(principal, annualRate, n) {
    var r = annualRate / 12 / 100;
    var emi = emiOf(principal, annualRate, n);
    var balance = principal;
    var rows = [];
    var year = 0;

    while (balance > 0.5 && year < 60) {
      year += 1;
      var opening = balance;
      var paidPrincipal = 0;
      var paidInterest = 0;
      for (var m = 0; m < 12 && balance > 0.5; m++) {
        var interest = balance * r;
        var toPrincipal = Math.min(emi - interest, balance);
        balance -= toPrincipal;
        paidPrincipal += toPrincipal;
        paidInterest += interest;
      }
      rows.push({
        year: year,
        opening: opening,
        principal: paidPrincipal,
        interest: paidInterest,
        closing: Math.max(0, balance),
        cleared: ((principal - balance) / principal) * 100
      });
    }
    return rows;
  }

  /* ==================================================================
     Generic calculator plumbing
     ================================================================== */
  var summaries = {}; // last computed summary per calculator, for lead forms

  function setOut(root, key, value) {
    $$('[data-out="' + key + '"]', root).forEach(function (el) { el.textContent = value; });
  }

  function paintRange(range, field) {
    var min = parseFloat(range.min) || 0;
    var max = parseFloat(range.max) || 100;
    var val = parseFloat(range.value) || 0;
    var pct = max === min ? 0 : ((val - min) / (max - min)) * 100;
    range.style.setProperty('--pct', pct.toFixed(2) + '%');
    // Screen readers otherwise read the raw number ("5000000"); announce the
    // same formatted string with its unit that a sighted visitor sees.
    if (field) {
      var wrap = field.closest('.calc-value');
      var prefix = wrap && wrap.querySelector('.pfx') ? wrap.querySelector('.pfx').textContent.trim() : '';
      var suffix = wrap && wrap.querySelector('.sfx') ? ' ' + wrap.querySelector('.sfx').textContent.trim() : '';
      range.setAttribute('aria-valuetext', prefix + field.value + suffix);
    }
  }

  function formatFieldValue(range, value) {
    var step = parseFloat(range && range.step) || 1;
    if (step < 1) return String(Math.round(value * 100) / 100);
    return group(value);
  }

  function clamp(range, value) {
    var min = parseFloat(range.min);
    var max = parseFloat(range.max);
    if (isFinite(min) && value < min) value = min;
    if (isFinite(max) && value > max) value = max;
    return value;
  }

  function readValues(root) {
    var values = {};
    $$('[data-field]', root).forEach(function (el) {
      var key = el.getAttribute('data-field');
      values[key] = el.type === 'checkbox' ? el.checked : toNumber(el.value);
    });
    var chosen = $('[data-employment].is-selected', root);
    if (chosen) values.employment = chosen.getAttribute('data-employment');
    return values;
  }

  /**
   * Wires up every text field / slider pair inside `root` and calls
   * `render(root, values)` whenever anything changes.
   */
  function bind(root, render) {
    var ranges = {};
    $$('input[type=range][data-range]', root).forEach(function (range) {
      ranges[range.getAttribute('data-range')] = range;
      paintRange(range, $('[data-field="' + range.getAttribute('data-range') + '"]', root));
    });

    // (7b) results update silently when a slider moves; announce them politely.
    $$('.calc-headline, .calc-out', root).forEach(function (el) {
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
    });

    function update() { render(root, readValues(root)); }

    Object.keys(ranges).forEach(function (key) {
      var range = ranges[key];
      var field = $('[data-field="' + key + '"]', root);
      range.addEventListener('input', function () {
        if (field) field.value = formatFieldValue(range, parseFloat(range.value));
        paintRange(range, field);
        update();
      });
      if (!field) return;
      field.addEventListener('input', function () {
        var value = clamp(range, toNumber(field.value));
        range.value = value;
        paintRange(range, field);
        update();
      });
      field.addEventListener('blur', function () {
        var value = clamp(range, toNumber(field.value));
        field.value = formatFieldValue(range, value);
        range.value = value;
        paintRange(range, field);
        update();
      });
    });

    $$('[data-field]', root).forEach(function (el) {
      if (el.type === 'checkbox') el.addEventListener('change', update);
    });

    $$('[data-employment]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-employment]', root).forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        update();
      });
    });

    $$('[data-preset]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var parts = btn.getAttribute('data-preset').split('|');
        [['amount', parts[0]], ['rate', parts[1]], ['tenure', parts[2]]].forEach(function (pair) {
          var range = ranges[pair[0]];
          var field = $('[data-field="' + pair[0] + '"]', root);
          if (!range || pair[1] === undefined) return;
          var value = clamp(range, parseFloat(pair[1]));
          range.value = value;
          if (field) field.value = formatFieldValue(range, value);
          paintRange(range, field);
        });
        update();
      });
    });

    update();
  }

  /* ==================================================================
     EMI calculator
     ================================================================== */
  function renderEmi(root, v) {
    var n = Math.max(1, Math.round(v.tenure * 12));
    var emi = emiOf(v.amount, v.rate, n);
    var total = emi * n;
    var interest = total - v.amount;

    setOut(root, 'emi', money(emi));
    setOut(root, 'months', String(n));
    setOut(root, 'principal', money(v.amount));
    setOut(root, 'interest', money(interest));
    setOut(root, 'total', money(total));
    setOut(root, 'ratio', v.amount ? Math.round((interest / v.amount) * 100) + '%' : '—');

    var firstInterest = (v.amount * v.rate) / 12 / 100;
    setOut(root, 'firstInterest', money(firstInterest));
    setOut(root, 'firstPrincipal', money(Math.max(0, emi - firstInterest)));

    // donut: r = 80 → circumference 502.65
    var C = 2 * Math.PI * 80;
    var share = total > 0 ? v.amount / total : 0;
    $$('[data-donut]', root).forEach(function (circle) {
      circle.setAttribute('stroke-dasharray', (share * C).toFixed(2) + ' ' + C.toFixed(2));
    });

    summaries.emi =
      'Loan ' + shortMoney(v.amount) + ' at ' + v.rate + '% for ' + v.tenure + ' years → ' +
      'EMI ' + money(emi) + ', total interest ' + money(interest) + ', total payable ' + money(total) + '.';

    if (root.getAttribute('data-variant') === 'full') {
      renderSensitivity(v);
      renderAmortisation(v);
    }
    refreshShareLinks();
  }

  function renderSensitivity(v) {
    var body = $('[data-sensitivity-body]');
    if (!body) return;
    var n = Math.max(1, Math.round(v.tenure * 12));
    var base = emiOf(v.amount, v.rate, n);
    var offsets = [-0.5, -0.25, 0, 0.25, 0.5];
    body.innerHTML = '';

    offsets.forEach(function (offset) {
      var rate = Math.round((v.rate + offset) * 100) / 100;
      if (rate <= 0) return;
      var emi = emiOf(v.amount, rate, n);
      var diff = (emi - base) * n;
      var tr = document.createElement('tr');
      if (offset === 0) tr.className = 'is-current';
      tr.innerHTML =
        '<td data-label="Interest rate">' + (offset === 0 ? '<strong>' + rate.toFixed(2) + '% (yours)</strong>' : rate.toFixed(2) + '%') + '</td>' +
        '<td data-label="Monthly EMI">' + money(emi) + '</td>' +
        '<td data-label="Total interest">' + money(emi * n - v.amount) + '</td>' +
        '<td data-label="Difference">' + (offset === 0
          ? '—'
          : '<span class="' + (diff < 0 ? 'pos' : '') + '">' + (diff < 0 ? '−' : '+') + money(Math.abs(diff)) + '</span>') +
        '</td>';
      body.appendChild(tr);
    });
  }

  function renderAmortisation(v) {
    var body = $('[data-amort-body]');
    if (!body) return;
    var n = Math.max(1, Math.round(v.tenure * 12));
    var rows = schedule(v.amount, v.rate, n);
    body.innerHTML = '';
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td data-label="Year">' + row.year + '</td>' +
        '<td data-label="Opening balance">' + money(row.opening) + '</td>' +
        '<td data-label="Principal paid">' + money(row.principal) + '</td>' +
        '<td data-label="Interest paid">' + money(row.interest) + '</td>' +
        '<td data-label="Closing balance">' + money(row.closing) + '</td>' +
        '<td data-label="Loan paid off">' + Math.round(row.cleared) + '%</td>';
      body.appendChild(tr);
    });
  }

  /* ==================================================================
     Eligibility checker
     ================================================================== */
  // Fixed-obligation-to-income ratio, by monthly income band.
  function foirFor(income) {
    if (income < 30000) return 0.45;
    if (income < 60000) return 0.50;
    if (income < 100000) return 0.55;
    if (income < 200000) return 0.60;
    return 0.65;
  }

  // Loan-to-value caps follow RBI's slabs by loan size.
  function ltvFor(loan) {
    if (loan <= 3000000) return 0.90;
    if (loan <= 7500000) return 0.80;
    return 0.75;
  }

  var RETIREMENT = { salaried: 60, self: 65, nri: 60 };

  function renderEligibility(root, v) {
    var employment = v.employment || 'salaried';
    var retire = RETIREMENT[employment] || 60;
    var yearsToRetire = retire - v.age;
    // The loan has to close by the retirement age. Past it there is no tenure to
    // lend over, so report that plainly rather than inventing a one-year loan.
    var pastRetirement = yearsToRetire < 1;
    var maxTenure = Math.max(1, Math.min(30, yearsToRetire));
    var tenureUsed = Math.max(1, Math.min(v.tenure, maxTenure));
    var n = Math.round(tenureUsed * 12);

    var foir = foirFor(v.income);
    var capacity = v.income * foir;
    var maxEmi = Math.max(0, capacity - v.obligations);
    var loan = pastRetirement ? 0 : principalOf(maxEmi, v.rate, n);

    // The LTV slab depends on the loan size, so solve it once then re-check.
    var ltv = ltvFor(loan);
    var property = loan / ltv;
    var downpayment = property - loan;
    var stamp = property * 0.06;

    setOut(root, 'loan', money(loan));
    setOut(root, 'rateEcho', v.rate + '%');
    setOut(root, 'tenureUsed', months(tenureUsed * 12));
    setOut(root, 'maxEmi', money(pastRetirement ? 0 : maxEmi));
    setOut(root, 'maxEmi2', money(pastRetirement ? 0 : maxEmi));
    setOut(root, 'foir', Math.round(foir * 100) + '%');
    setOut(root, 'maxTenure', pastRetirement ? '—' : months(maxTenure * 12));
    setOut(root, 'property', money(property));
    setOut(root, 'downpayment', money(downpayment));
    setOut(root, 'stamp', money(stamp));

    var meter = $('[data-meter]', root);
    if (meter) {
      meter.style.width = Math.max(0, Math.min(100, (maxEmi / Math.max(1, v.income)) * 100)) + '%';
    }

    var hint = $('[data-hint="tenure"]', root);
    if (hint) {
      hint.textContent = v.tenure > maxTenure
        ? 'Capped at ' + maxTenure + ' years — the loan has to close by age ' + retire + ' for a ' +
          (employment === 'nri' ? 'NRI' : employment === 'self' ? 'self-employed' : 'salaried') + ' applicant.'
        : 'The loan must close by age ' + retire + ', so your ceiling is ' + maxTenure + ' years.';
    }

    var verdict = $('[data-out="verdict"]', root);
    if (verdict) {
      var message, negative = false;
      if (pastRetirement) {
        message = 'A ' + (employment === 'nri' ? 'NRI' : employment === 'self' ? 'self-employed' : 'salaried') +
          ' applicant’s loan normally has to close by age ' + retire + ', so at ' + v.age +
          ' there is no tenure left to lend over. A younger earning co-applicant — typically a son or ' +
          'daughter — is the usual route, and their age then sets the tenure.';
        negative = true;
      } else if (maxEmi <= 0) {
        message = 'Your existing EMIs already use up the repayment capacity a lender will allow. ' +
          'Closing one of them, or adding an earning co-applicant, is the fastest way to change this.';
        negative = true;
      } else if (v.obligations > 0 && v.obligations / Math.max(1, v.income) > 0.3) {
        message = 'Existing EMIs are eating ' + Math.round((v.obligations / v.income) * 100) +
          '% of your income. Clearing the smallest one first would add roughly ' +
          shortMoney(principalOf(Math.min(v.obligations, maxEmi * 0.4), v.rate, n)) + ' to this figure.';
      } else if (v.tenure > maxTenure) {
        message = 'Your age caps the tenure at ' + maxTenure + ' years, which is what limits this number. ' +
          'A younger co-applicant would let you stretch it further.';
      } else {
        message = 'Adding an earning co-applicant typically lifts this by 50–80%. Worth checking before ' +
          'you settle on a budget for the property.';
      }
      verdict.textContent = message;
      verdict.classList.toggle('is-negative', negative);
    }

    summaries.eligibility =
      'Income ' + money(v.income) + '/month, existing EMIs ' + money(v.obligations) + ', age ' + v.age +
      ', ' + employment + '. Indicative eligibility ' + money(loan) + ' at ' + v.rate + '% over ' +
      tenureUsed + ' years (max EMI ' + money(maxEmi) + ').';
    refreshShareLinks();
  }

  /* ==================================================================
     Balance transfer savings
     ================================================================== */
  function renderBt(root, v) {
    var n = Math.max(1, Math.round(v.tenure * 12));
    var oldEmi = emiOf(v.outstanding, v.oldRate, n);
    var oldInterest = oldEmi * n - v.outstanding;

    var newEmi, newMonths, newInterest;
    var neverRepays = false;
    if (v.keepEmi) {
      newEmi = oldEmi;
      newMonths = termOf(v.outstanding, v.newRate, oldEmi);
      // At a higher rate the old EMI may not even cover the monthly interest, in
      // which case the balance never falls. Flag it instead of quietly asserting
      // the loan still closes on the original schedule.
      neverRepays = !isFinite(newMonths) || newMonths > n;
      if (neverRepays) newMonths = n;
      newInterest = oldEmi * newMonths - v.outstanding;
    } else {
      newEmi = emiOf(v.outstanding, v.newRate, n);
      newMonths = n;
      newInterest = newEmi * n - v.outstanding;
    }

    var gross = oldInterest - newInterest;
    var net = gross - v.cost;
    var emiSaving = oldEmi - newEmi;

    setOut(root, 'oldEmi', money(oldEmi));
    setOut(root, 'newEmi', money(newEmi));
    setOut(root, 'oldInterest', money(oldInterest));
    setOut(root, 'newInterest', money(newInterest));
    setOut(root, 'oldRateEcho', v.oldRate.toFixed(2) + '%');
    setOut(root, 'newRateEcho', v.newRate.toFixed(2) + '%');
    setOut(root, 'emiSaving', emiSaving > 0 ? money(emiSaving) : '—');
    setOut(root, 'grossSaving', signedMoney(gross));
    setOut(root, 'cost', money(v.cost));
    setOut(root, 'netSaving', signedMoney(net));
    setOut(root, 'headlineSub', v.keepEmi
      ? 'and you finish ' + months(n - newMonths) + ' earlier'
      : 'over the remaining ' + v.tenure + ' years');
    var payback = Math.ceil(v.cost / emiSaving);
    setOut(root, 'breakeven', emiSaving > 0 && v.cost > 0
      ? (payback <= 24 ? payback + (payback === 1 ? ' month' : ' months') : months(payback))
      : v.cost === 0 ? 'Immediate' : '—');

    var tenureRow = $('[data-row="newTenure"]', root);
    if (tenureRow) {
      tenureRow.hidden = !v.keepEmi;
      setOut(root, 'newTenure', months(newMonths));
    }

    var worst = Math.max(oldInterest, newInterest, 1);
    var oldBar = $('[data-bar="old"]', root);
    var newBar = $('[data-bar="new"]', root);
    if (oldBar) oldBar.style.width = (oldInterest / worst) * 100 + '%';
    if (newBar) newBar.style.width = (newInterest / worst) * 100 + '%';

    var verdict = $('[data-out="verdict"]', root);
    if (verdict) {
      var gap = v.oldRate - v.newRate;
      var message, negative = false;
      if (neverRepays) {
        message = 'At ' + v.newRate.toFixed(2) + '% your current EMI of ' + money(oldEmi) +
          ' would not even cover the monthly interest on ' + shortMoney(v.outstanding) +
          ', so the balance would never come down. This is not a transfer worth making.';
        negative = true;
      } else if (gap <= 0) {
        message = 'The new rate is not lower than your current one, so there is nothing to gain here. ' +
          'Check your latest statement for the rate you are actually paying.';
        negative = true;
      } else if (net <= 0) {
        message = 'The switching cost swallows the saving. Ask your existing lender for a spread reset ' +
          'instead — it usually costs a fraction of this.';
        negative = true;
      } else if (gap < 0.4) {
        message = 'A gap of ' + gap.toFixed(2) + '% is on the thin side. Worth doing only if the ' +
          'switching cost is genuinely low — try a spread reset with your current lender first.';
      } else if (v.tenure < 7) {
        message = 'With ' + v.tenure + ' years left, most of your EMI is principal rather than interest, ' +
          'so a rate cut has less to work on. Check the break-even figure carefully.';
      } else {
        message = 'A ' + gap.toFixed(2) + '% gap with ' + v.tenure + ' years remaining is a clear case for ' +
          'switching. Keep the EMI the same and you save more still.';
      }
      verdict.textContent = message;
      verdict.classList.toggle('is-negative', negative);
    }

    summaries.bt =
      'Balance transfer: ' + shortMoney(v.outstanding) + ' outstanding, ' + v.tenure + ' years left, ' +
      v.oldRate + '% → ' + v.newRate + '%. EMI ' + money(oldEmi) + ' → ' + money(newEmi) +
      ', net saving after ' + money(v.cost) + ' of costs: ' + money(Math.max(0, net)) + '.';
    refreshShareLinks();
  }

  /* ==================================================================
     Bank comparison table
     ================================================================== */
  function renderCompare(root, v) {
    var body = $('[data-compare-body]');
    if (!body) return;
    var n = Math.max(1, Math.round(v.tenure * 12));
    $$('tr', body).forEach(function (row) {
      var rate = parseFloat(row.getAttribute('data-rate'));
      var cell = $('[data-emi-cell]', row);
      if (!cell || !isFinite(rate)) return;
      var emi = emiOf(v.amount, rate, n);
      cell.setAttribute('data-label', 'EMI on this loan');
      cell.setAttribute('data-value', String(Math.round(emi)));
      cell.innerHTML = '<strong>' + money(emi) + '</strong>';
    });
    summaries.compare =
      'Comparing lenders for ' + shortMoney(v.amount) + ' over ' + v.tenure + ' years.';
  }

  function initCompareFilters(root) {
    var body = $('[data-compare-body]');
    if (!body) return;
    $$('[data-filter]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-filter]', root).forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        var want = btn.getAttribute('data-filter');
        $$('tr', body).forEach(function (row) {
          row.classList.toggle('is-hidden', want !== 'all' && row.getAttribute('data-type') !== want);
        });
      });
    });
  }

  function initSortableTables() {
    $$('table[data-sortable]').forEach(function (table) {
      var body = $('tbody', table);
      if (!body) return;
      $$('thead th[data-sort]', table).forEach(function (th, index) {
        // A focusable <th> announces as a column header, not something operable.
        // Wrap the label in a real button so the control has correct semantics.
        var label = th.textContent.trim();
        var trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'th-sort';
        trigger.textContent = label;
        trigger.setAttribute('aria-label', 'Sort by ' + label);
        th.textContent = '';
        th.appendChild(trigger);

        var sort = function () {
          var kind = th.getAttribute('data-sort');
          var descending = th.getAttribute('aria-sort') === 'ascending';
          $$('thead th', table).forEach(function (other) { other.removeAttribute('aria-sort'); });
          th.setAttribute('aria-sort', descending ? 'descending' : 'ascending');

          var rows = $$('tr', body);
          rows.sort(function (a, b) {
            var x = a.children[index];
            var y = b.children[index];
            if (!x || !y) return 0;
            if (kind === 'num') {
              var nx = toNumber(x.getAttribute('data-value') || x.textContent);
              var ny = toNumber(y.getAttribute('data-value') || y.textContent);
              return descending ? ny - nx : nx - ny;
            }
            var sx = x.textContent.trim();
            var sy = y.textContent.trim();
            return descending ? sy.localeCompare(sx) : sx.localeCompare(sy);
          });
          rows.forEach(function (row) { body.appendChild(row); });
        };
        // Listen on the cell, not the button: the button only wraps its own text,
        // so a click near the cell edge would otherwise do nothing. A click on
        // the button (mouse, Enter or Space) bubbles up to here too, so this is
        // the single handler for both pointer and keyboard.
        th.addEventListener('click', sort);
      });
    });
  }

  /* ==================================================================
     Sharing the result / lead forms
     ================================================================== */
  function currentSummary(preferred) {
    if (preferred && summaries[preferred]) return summaries[preferred];
    var keys = Object.keys(summaries);
    return keys.length ? summaries[keys[keys.length - 1]] : '';
  }

  function whatsappUrl(text) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
  }

  function refreshShareLinks() {
    $$('[data-share-whatsapp]').forEach(function (link) {
      var key = link.getAttribute('data-share-whatsapp');
      var summary = currentSummary(key);
      link.href = whatsappUrl(
        'Hi JSR Home Loan Services,\n\nI worked this out on your website:\n' + summary +
        '\n\nCould you tell me what is actually available for my profile?'
      );
    });
  }

  function leadMessage(form) {
    var lines = ['Hi JSR Home Loan Services, I would like to be contacted.', ''];
    $$('[data-lead]', form).forEach(function (el) {
      var value = (el.value || '').trim();
      if (value) lines.push(el.getAttribute('data-lead') + ': ' + value);
    });
    var key = form.getAttribute('data-include-calc');
    if (key && summaries[key]) lines.push('', 'From your calculator: ' + summaries[key]);
    lines.push('', 'Sent from jsrhomeloanservices.com');
    return lines.join('\n');
  }

  function initLeadForms() {
    $$('[data-lead-form]').forEach(function (form) {
      var note = $('.form-note', form);

      function say(text, isError) {
        if (!note) return;
        note.textContent = text;
        note.classList.add('is-visible');
        note.classList.toggle('is-error', !!isError);
      }

      function send(channel) {
        if (!form.checkValidity()) {
          form.reportValidity();
          say('Please fill in the highlighted fields.', true);
          return;
        }
        var message = leadMessage(form);
        if (channel === 'email') {
          window.location.href = 'mailto:' + EMAIL +
            '?subject=' + encodeURIComponent('Loan enquiry from the website') +
            '&body=' + encodeURIComponent(message);
          say('Opening your email app. If nothing happens, write to ' + EMAIL + ' directly.');
        } else {
          window.open(whatsappUrl(message), '_blank', 'noopener');
          say('Opening WhatsApp with your details filled in — press send there and we will reply during working hours.');
        }
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        send('whatsapp');
      });
      $$('[data-lead-email]', form).forEach(function (btn) {
        btn.addEventListener('click', function () { send('email'); });
      });
    });
  }

  /* ==================================================================
     Boot
     ================================================================== */
  var RENDERERS = {
    emi: renderEmi,
    eligibility: renderEligibility,
    bt: renderBt,
    compare: renderCompare
  };

  $$('[data-calc]').forEach(function (root) {
    var render = RENDERERS[root.getAttribute('data-calc')];
    if (!render) return;
    if (root.getAttribute('data-calc') === 'compare') initCompareFilters(root);
    bind(root, render);
  });

  initSortableTables();
  initLeadForms();
  refreshShareLinks();
})();
