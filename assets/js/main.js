/* ==========================================================================
   JSR Home Loan Services — site behaviour
   Plain JavaScript, no framework, no build step. Loaded with `defer` from
   every page; each block below exits quietly when its markup is not present.

   CONFIG at the top is the only part you normally need to edit.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------- CONFIG --
     These were previously in src/content/company.ts and src/content/eligibility.ts.
     They are the single source for every calculator and form on the site. */
  var CONFIG = {
    /** Country code + number, digits only. Used to build wa.me links. */
    whatsappNumber: "919000781967",
    email: "jsrhomeloans@gmail.com",

    /* Where the forms POST. While this is empty the forms hand off to WhatsApp
       or the visitor's email app instead — they never claim an enquiry was
       received when it was not. Paste a Formspree / Web3Forms URL to go live. */
    formEndpoint: "",

    /** TODO: the one number still outstanding across the whole site. */
    indicativeRate: 7,

    /* Share of take-home income the HOME PAGE widget assumes goes to EMIs.
       The full checker on eligibility-checker.html uses the FOIR bands below
       instead, which vary with income and employment type. */
    eligibilityIncomeRatio: 0.5,

    /* Share of monthly income a lender allows toward all EMIs combined (FOIR).
       Higher incomes are allowed a larger share. */
    foirBands: [
      { upTo: 30000, ratio: 0.4 },
      { upTo: 60000, ratio: 0.45 },
      { upTo: 100000, ratio: 0.5 },
      { upTo: Infinity, ratio: 0.55 }
    ],
    selfEmployedFoirPenalty: 0.05,
    retirementAge: { salaried: 60, "self-employed": 65 },
    maxTenureYears: { salaried: 30, "self-employed": 25 },

    /* Balance transfer switching costs. */
    processingFeeRate: 0.005,
    legalAndValuation: 5000
  };

  /* ------------------------------------------------------------- HELPERS -- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  var inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

  /* ---- Loan arithmetic. Mirrors the old src/lib/loan.ts exactly, so the
          calculators can never disagree with each other. ---- */

  /** Standard reducing-balance EMI. */
  function emiFor(principal, annualRate, months) {
    var monthly = annualRate / 12 / 100;
    if (monthly === 0) return principal / months;
    return (principal * monthly * Math.pow(1 + monthly, months)) /
      (Math.pow(1 + monthly, months) - 1);
  }

  /** The principal a given monthly capacity can service. */
  function principalFor(monthlyCapacity, annualRate, months) {
    var monthly = annualRate / 12 / 100;
    if (monthly === 0) return monthlyCapacity * months;
    return (monthlyCapacity * (Math.pow(1 + monthly, months) - 1)) /
      (monthly * Math.pow(1 + monthly, months));
  }

  function rupees(value) { return "₹" + inr.format(Math.round(value)); }

  /** 4500000 reads as "₹45 L"; 12000000 as "₹1.2 Cr". */
  function shortAmount(value) {
    if (value >= 10000000) {
      var cr = value / 10000000;
      return "₹" + (cr % 1 === 0 ? cr : String(cr.toFixed(2)).replace(/0$/, "")) + " Cr";
    }
    return "₹" + value / 100000 + " L";
  }

  /** "₹25 lakh" below a crore, "₹1.25 Cr" above it. Floors to the whole lakh
      on purpose: this reads as the estimate it is. */
  function asAmount(value) {
    var lakhs = value / 100000;
    if (lakhs >= 100) return "₹" + (lakhs / 100).toFixed(2) + " Cr";
    return "₹" + Math.floor(lakhs) + " lakh";
  }

  /** The same rounding as asAmount, written out in full: "₹25,00,000". */
  function asRoundedRupees(value) { return rupees(Math.floor(value / 100000) * 100000); }

  /* ---- Eligibility rules. Mirrors the old src/content/eligibility.ts. ---- */
  function foirFor(income, employment) {
    var band = null;
    for (var i = 0; i < CONFIG.foirBands.length; i++) {
      if (income <= CONFIG.foirBands[i].upTo) { band = CONFIG.foirBands[i]; break; }
    }
    if (!band) band = CONFIG.foirBands[CONFIG.foirBands.length - 1];
    var ratio = employment === "self-employed"
      ? band.ratio - CONFIG.selfEmployedFoirPenalty
      : band.ratio;
    return Math.max(0.3, ratio);
  }

  /** Tenure is capped by how many working years are left, not just the product. */
  function tenureFor(age, employment) {
    return Math.max(1, Math.min(
      CONFIG.maxTenureYears[employment],
      CONFIG.retirementAge[employment] - age
    ));
  }

  /* ---- Enquiry hand-off. Mirrors the old src/lib/enquiry.ts. ---- */
  function enquiryText(e) {
    return [
      "Name: " + e.name,
      e.phone ? "Phone: " + e.phone : null,
      e.email ? "Email: " + e.email : null,
      e.service ? "Loan type: " + e.service : null,
      e.context ? "Details: " + e.context : null,
      e.message ? "Message: " + e.message : null
    ].filter(Boolean).join("\n");
  }

  function whatsappUrl(e) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" +
      encodeURIComponent("Hello JSR Home Loan Services, I would like to enquire.\n\n" + enquiryText(e));
  }

  function mailtoUrl(e) {
    return "mailto:" + CONFIG.email +
      "?subject=" + encodeURIComponent("Loan enquiry — " + e.name) +
      "&body=" + encodeURIComponent(enquiryText(e));
  }

  /* ---- Toast. Only used to tell the visitor something that would otherwise
          fail silently. ---- */
  function toast(title, description) {
    var stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }

    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<p class="t"></p>' + (description ? '<p class="d"></p>' : "") +
      '<button class="x" type="button" aria-label="Dismiss">&times;</button>';
    $(".t", el).textContent = title;
    if (description) $(".d", el).textContent = description;

    var close = function () {
      el.setAttribute("data-show", "false");
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
    };
    $(".x", el).addEventListener("click", close);

    stack.appendChild(el);
    window.setTimeout(function () { el.setAttribute("data-show", "true"); }, 10);
    window.setTimeout(close, 9000);
  }

  /* ---- Opening mail, and knowing whether it actually opened.
          Mirrors the old src/lib/mailto.ts.

          A `mailto:` link only does something when the device has an app
          registered to handle one. On a desktop where email is read at
          gmail.com in a browser tab — which is most of them — nothing is
          registered and the click is a silent no-op. The browser fires no
          error, so we infer it from focus and offer another way through. ---- */

  var HANDOFF_GRACE_MS = 700;

  /** Navigates to a mailto: URL; resolves true if something took over. */
  function openMail(url) {
    return new Promise(function (resolve) {
      var handedOff = false;
      var note = function () { handedOff = true; };

      window.addEventListener("blur", note);
      document.addEventListener("visibilitychange", note);

      window.location.href = url;

      window.setTimeout(function () {
        window.removeEventListener("blur", note);
        document.removeEventListener("visibilitychange", note);
        resolve(handedOff || document.hidden || !document.hasFocus());
      }, HANDOFF_GRACE_MS);
    });
  }

  /** Copies text, reporting whether it actually landed. */
  function copyText(text) {
    try {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return false; }
      );
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  /** Rebuilds a mailto: URL as a Gmail compose URL, keeping subject and body. */
  function gmailCompose(mailto) {
    var m = /^mailto:([^?]*)\??([\s\S]*)$/.exec(mailto) || [];
    var to = decodeURIComponent(m[1] || "");
    var url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to);
    var qs = m[2] || "";
    var subject = /(?:^|&)subject=([^&]*)/.exec(qs);
    var body = /(?:^|&)body=([^&]*)/.exec(qs);
    if (subject) url += "&su=" + subject[1];
    if (body) url += "&body=" + body[1];
    return url;
  }

  /**
   * Hands the visitor to email one way or another: the registered mail app
   * first, then Gmail's compose window. Resolves false only when both fail,
   * which is the caller's cue to show the address instead.
   */
  function openEmail(mailtoUrl) {
    return openMail(mailtoUrl).then(function (opened) {
      if (opened) return true;
      // No "noopener" in the feature string: with it window.open is specified to
      // return null even when the tab opened fine, so every successful hand-off
      // would be read as a blocked popup. Severing opener by hand is the same
      // protection, and leaves us a handle worth testing.
      var w = window.open(gmailCompose(mailtoUrl), "_blank");
      if (w) { try { w.opener = null; } catch (e) {} }
      return Boolean(w);
    });
  }

  /* =======================================================================
     0. Email links
     A bare mailto: is a dead click wherever no mail app is registered, which
     is most desktops. Every mailto: on the site goes through the hand-off so
     it always lands somewhere — and says so plainly when it cannot.
     ======================================================================= */
  (function emailLinks() {
    var address = CONFIG.email;

    document.addEventListener("click", function (ev) {
      var link = ev.target.closest ? ev.target.closest('a[href^="mailto:"]') : null;
      if (!link) return;
      // Leave modified clicks alone — "copy link address" must still work.
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;

      ev.preventDefault();
      var href = link.getAttribute("href");

      openEmail(href).then(function (opened) {
        if (opened) return;
        return copyText(address).then(function (copied) {
          toast(
            copied ? address + " copied" : "Write to us at " + address,
            "Your browser blocked the compose window. Paste the address into your email — " +
            "or message us on WhatsApp, which always works."
          );
        });
      });
    });
  })();

  /* =======================================================================
     0b. Hero photographs
     A hero photo is decorative — the navy wash behind it carries the copy on
     its own. If the file is missing the broken-image box would show through,
     so drop the element and fall back to the plain navy band.
     ======================================================================= */
  (function heroPhotos() {
    $$(".pic-hero > .photo, .home-hero > .photo").forEach(function (img) {
      img.addEventListener("error", function () {
        if (img.parentNode) img.parentNode.removeChild(img);
      });
      // A cached failure can land before this listener is attached.
      if (img.complete && img.naturalWidth === 0 && img.parentNode) {
        img.parentNode.removeChild(img);
      }
    });
  })();

  /* =======================================================================
     1. Mobile navigation
     ======================================================================= */
  (function mobileNav() {
    var panel = $("#mobile-panel");
    var backdrop = $("#mobile-backdrop");
    var openBtn = $("#burger");
    var closeBtn = $("#mobile-close");
    if (!panel || !openBtn) return;

    var lastFocused = null;

    function setOpen(open) {
      panel.setAttribute("data-open", String(open));
      if (backdrop) backdrop.setAttribute("data-open", String(open));
      openBtn.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        lastFocused = document.activeElement;
        if (closeBtn) closeBtn.focus();
      } else if (lastFocused) {
        lastFocused.focus();
      }
    }

    openBtn.addEventListener("click", function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    $$("a", panel).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && panel.getAttribute("data-open") === "true") setOpen(false);
    });

    setOpen(false);
  })();

  /* =======================================================================
     2. Accordions (FAQs, document lists)
     ======================================================================= */
  (function accordions() {
    $$(".accordion-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panelId = trigger.getAttribute("aria-controls");
        var panel = document.getElementById(panelId);
        if (!panel) return;
        var open = trigger.getAttribute("aria-expanded") === "true";

        // Within a [data-single] accordion only one panel stays open.
        var group = trigger.closest("[data-single]");
        if (group && !open) {
          $$(".accordion-trigger", group).forEach(function (other) {
            if (other === trigger) return;
            other.setAttribute("aria-expanded", "false");
            var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
            if (otherPanel) otherPanel.hidden = true;
          });
        }

        trigger.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });
  })();

  /* =======================================================================
     3. Tabs (bank comparison, testimonial filters)
     ======================================================================= */
  (function tabs() {
    $$("[data-tabs]").forEach(function (group) {
      var tabButtons = $$(".tab", group);

      function select(tab) {
        tabButtons.forEach(function (btn) {
          var on = btn === tab;
          btn.setAttribute("aria-selected", String(on));
          btn.setAttribute("tabindex", on ? "0" : "-1");
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
      }

      tabButtons.forEach(function (btn, index) {
        btn.addEventListener("click", function () { select(btn); });
        btn.addEventListener("keydown", function (ev) {
          var next = null;
          if (ev.key === "ArrowRight") next = tabButtons[(index + 1) % tabButtons.length];
          if (ev.key === "ArrowLeft") next = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length];
          if (!next) return;
          ev.preventDefault();
          select(next);
          next.focus();
        });
      });
    });
  })();

  /* =======================================================================
     3b. Sortable tables (bank comparison)
     Values come from data- attributes on each row, so sorting never has to
     parse the rendered text. "On request" and "—" sort last either way.
     ======================================================================= */
  (function sortableTables() {
    $$("table[data-sortable]").forEach(function (table) {
      var tbody = $("tbody", table);
      var buttons = $$(".sort-btn", table);
      var activeKey = "rate";
      var ascending = true;

      function apply() {
        var rows = $$("tr", tbody);
        rows.sort(function (a, b) {
          var left = a.getAttribute("data-" + activeKey);
          var right = b.getAttribute("data-" + activeKey);
          var order;
          if (activeKey === "lender") {
            order = left.localeCompare(right);
          } else {
            order = Number(left) - Number(right);
          }
          return ascending ? order : -order;
        });
        rows.forEach(function (row) { tbody.appendChild(row); });

        buttons.forEach(function (btn) {
          var on = btn.getAttribute("data-sort") === activeKey;
          var caret = $(".caret", btn);
          if (caret) caret.textContent = on ? (ascending ? "▲" : "▼") : "";
          var th = btn.closest("th");
          if (th) th.setAttribute("aria-sort", on ? (ascending ? "ascending" : "descending") : "none");
        });
      }

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var key = btn.getAttribute("data-sort");
          if (key === activeKey) { ascending = !ascending; } else { activeKey = key; ascending = true; }
          apply();
        });
      });
    });
  })();

  /* =======================================================================
     4. Filter lists (testimonials by loan type)
     ======================================================================= */
  (function filters() {
    $$("[data-filter-group]").forEach(function (group) {
      var buttons = $$(".tab", group);
      var targetSel = group.getAttribute("data-filter-target");
      var items = $$(targetSel + " [data-filter-value]");
      var empty = $(group.getAttribute("data-filter-empty") || "#filter-empty");

      // Toggle groups use aria-pressed; tablists use aria-selected. Respect
      // whichever the markup declared rather than forcing one on it.
      var stateAttr = buttons.length && buttons[0].hasAttribute("aria-pressed")
        ? "aria-pressed"
        : "aria-selected";

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var want = btn.getAttribute("data-filter");
          buttons.forEach(function (b) { b.setAttribute(stateAttr, String(b === btn)); });
          var shown = 0;
          items.forEach(function (item) {
            var match = want === "All" || item.getAttribute("data-filter-value") === want;
            item.hidden = !match;
            if (match) shown++;
          });
          if (empty) empty.hidden = shown !== 0;
        });
      });
    });
  })();

  /* =======================================================================
     5. Radio cards — reflect the checked state for browsers without :has()
     ======================================================================= */
  (function radioCards() {
    var cards = $$(".radio-card");
    if (!cards.length) return;

    function sync() {
      cards.forEach(function (card) {
        var input = $("input", card);
        card.classList.toggle("is-selected", !!(input && input.checked));
      });
    }
    cards.forEach(function (card) {
      var input = $("input", card);
      if (input) input.addEventListener("change", sync);
    });
    sync();
  })();

  /* =======================================================================
     5b. Slider track fill
     A native range input cannot colour the portion left of the thumb in CSS
     alone, so the percentage is written to a custom property the track reads.
     This is what the Radix <Slider.Range> element did in the original.
     ======================================================================= */
  (function sliderFill() {
    var sliders = $$('input[type="range"]');
    if (!sliders.length) return;

    function fill(el) {
      var min = Number(el.min || 0);
      var max = Number(el.max || 100);
      var span = max - min;
      var pct = span > 0 ? ((Number(el.value) - min) / span) * 100 : 0;
      el.style.setProperty("--pct", pct + "%");
    }

    sliders.forEach(function (el) {
      el.addEventListener("input", function () { fill(el); });
      el.addEventListener("change", function () { fill(el); });
      fill(el);
    });
  })();

  /* =======================================================================
     6. EMI calculator
     ======================================================================= */
  (function emiCalculator() {
    var root = $("#emi-calc");
    if (!root) return;

    var amountEl = $("#emi-amount", root);
    var rateEl = $("#emi-rate", root);
    var yearsEl = $("#emi-tenure", root);
    if (!amountEl || !rateEl || !yearsEl) return;

    // Every output is optional: the home page shows a compact version of this
    // calculator, the EMI page a full one with a repayment schedule.
    function put(id, text) {
      var el = $("#" + id, root);
      if (el) el.textContent = text;
    }

    function render() {
      var amount = Number(amountEl.value);
      var rate = Number(rateEl.value);
      var years = Number(yearsEl.value);
      var months = years * 12;

      var emi = emiFor(amount, rate, months);
      var payable = emi * months;
      var interest = payable - amount;
      var principalPct = payable > 0 ? (amount / payable) * 100 : 0;

      put("emi-amount-out", shortAmount(amount));
      put("emi-rate-out", rate.toFixed(2) + "% p.a.");
      put("emi-tenure-out", years + (years === 1 ? " year" : " years"));

      put("emi-out", rupees(emi));
      put("emi-principal", rupees(amount));
      put("emi-interest", rupees(interest));
      put("emi-interest-2", rupees(interest));
      put("emi-payable", rupees(payable));
      put("emi-principal-pct", Math.round(principalPct) + "%");
      put("emi-interest-pct", Math.round(100 - principalPct) + "%");

      var bar = $("#emi-split", root);
      if (bar) {
        $(".split-principal", bar).style.width = principalPct + "%";
        $(".split-interest", bar).style.width = (100 - principalPct) + "%";
        bar.setAttribute("aria-label",
          "Of " + rupees(payable) + " repaid, " + rupees(amount) +
          " is principal and " + rupees(interest) + " is interest");
      }

      // Year-by-year schedule. Interest first, whatever is left cuts the principal.
      var tbody = $("#emi-schedule", root);
      if (tbody) {
        var monthlyRate = rate / 12 / 100;
        var balance = amount;
        var rows = "";
        for (var year = 1; year <= years; year++) {
          var principalPaid = 0;
          var interestPaid = 0;
          for (var m = 0; m < 12 && balance > 0; m++) {
            var interestPart = balance * monthlyRate;
            var principalPart = Math.min(emi - interestPart, balance);
            principalPaid += principalPart;
            interestPaid += interestPart;
            balance -= principalPart;
          }
          rows += "<tr><td>" + year + "</td><td>" + rupees(principalPaid) +
            "</td><td>" + rupees(interestPaid) + "</td><td>" +
            rupees(Math.max(0, balance)) + "</td></tr>";
        }
        tbody.innerHTML = rows;
      }

      // Carry the figures into the enquiry so nobody has to retype them.
      var summary = rupees(amount) + " at " + rate.toFixed(2) + "% over " + years +
        " years — EMI " + rupees(emi);
      var cta = $("#emi-cta", root);
      if (cta) cta.setAttribute("data-context", summary);
      $$("form[data-enquiry]").forEach(function (form) {
        form.setAttribute("data-context", summary);
      var note = form.querySelector("#context-note");
      if (note) {
        var noteText = form.querySelector("#context-note-text");
        if (noteText) noteText.textContent = summary;
        note.hidden = false;
      }
      });
    }

    [amountEl, rateEl, yearsEl].forEach(function (el) {
      el.addEventListener("input", render);
    });
    render();
  })();

  /* =======================================================================
     7. Eligibility checker
     ======================================================================= */
  (function eligibility() {
    // The live preview sits in the hero and the sliders in the section below,
    // so this widget spans two sections and is looked up document-wide.
    var incomeEl = $("#el-income");
    var ageEl = $("#el-age");
    var emiEl = $("#el-existing");
    if (!incomeEl || !ageEl || !emiEl) return;

    function employment() {
      var checked = $("input[name='el-employment']:checked");
      return checked ? checked.value : "salaried";
    }

    // The hero preview and the calculator below it are one widget, so the two
    // can never drift apart. Outputs are looked up across the whole document
    // because they sit in two different sections.
    function put(id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    function render() {
      var income = Number(incomeEl.value);
      var age = Number(ageEl.value);
      var existingEmi = Number(emiEl.value);
      var emp = employment();

      var foir = foirFor(income, emp);
      var tenure = tenureFor(age, emp);
      var capacity = Math.max(0, income * foir - existingEmi);
      var eligible = principalFor(capacity, CONFIG.indicativeRate, tenure * 12);
      var emi = capacity > 0 ? emiFor(eligible, CONFIG.indicativeRate, tenure * 12) : 0;
      var overCommitted = income * foir <= existingEmi;
      var foirPct = Math.round(foir * 100) + "%";
      var retire = CONFIG.retirementAge[emp];

      put("el-income-out", rupees(income));
      put("el-age-out", age + " years");
      put("el-existing-out", rupees(existingEmi));
      put("el-age-hint",
        "Tenure is capped at age " + retire + ", which limits how long you can borrow for.");

      put("el-preview", overCommitted ? "—" : asRoundedRupees(eligible));
      put("el-result", overCommitted ? "—" : asAmount(eligible));
      put("el-sub", overCommitted
        ? "Your existing EMIs already use the income a lender would count. Clearing one of them is the fastest way to change this."
        : "at about " + rupees(emi) + " a month over " + tenure + " years");
      put("el-capacity", rupees(capacity));
      put("el-tenure", tenure + " years");

      put("el-row-income", rupees(income));
      put("el-row-foir", foirPct);
      put("el-row-capacity", rupees(capacity));
      put("el-row-tenure", tenure + " years");
      put("el-row-rate", CONFIG.indicativeRate + "%");

      // The working, spelled out
      put("w-foir", foirPct);
      put("w-foir-2", foirPct);
      put("w-income", rupees(income));
      put("w-share", rupees(income * foir));
      put("w-emis", rupees(existingEmi));
      put("w-capacity", rupees(capacity));
      put("w-capacity-2", rupees(capacity));
      put("w-age", String(age));
      put("w-tenure", String(tenure));
      put("w-tenure-2", String(tenure));
      put("w-retire", String(retire));
      put("w-eligible", asAmount(eligible));

      var summary = "Eligibility check — " + emp + ", income " + rupees(income) +
        "/month, age " + age + ", existing EMIs " + rupees(existingEmi) +
        " → up to " + asAmount(eligible);

      var cta = document.getElementById("el-cta");
      if (cta) cta.setAttribute("data-context", summary);
      $$("form[data-enquiry]").forEach(function (form) {
        form.setAttribute("data-context", summary);
      var note = form.querySelector("#context-note");
      if (note) {
        var noteText = form.querySelector("#context-note-text");
        if (noteText) noteText.textContent = summary;
        note.hidden = false;
      }
      });
    }

    [incomeEl, ageEl, emiEl].forEach(function (el) { el.addEventListener("input", render); });
    $$("input[name='el-employment']").forEach(function (el) {
      el.addEventListener("change", render);
    });
    render();
  })();

  /* =======================================================================
     7b. Home-page eligibility widget
     Simpler than the full checker on eligibility-checker.html: a flat share of
     income, no age and no employment type. Matches the original
     components/home/EligibilityCheck.tsx.
     ======================================================================= */
  (function homeEligibility() {
    var root = $("#home-elig");
    if (!root) return;

    var incomeEl = $("#elig-income", root);
    var emiEl = $("#elig-emi", root);
    var yearsEl = $("#elig-tenure", root);
    if (!incomeEl || !emiEl || !yearsEl) return;

    function render() {
      var income = Number(incomeEl.value);
      var existingEmi = Number(emiEl.value);
      var years = Number(yearsEl.value);

      var capacity = Math.max(0, income * CONFIG.eligibilityIncomeRatio - existingEmi);
      var eligible = principalFor(capacity, CONFIG.indicativeRate, years * 12);

      $("#elig-income-out", root).textContent = rupees(income);
      $("#elig-emi-out", root).textContent = rupees(existingEmi);
      $("#elig-tenure-out", root).textContent = years + (years === 1 ? " year" : " years");

      $("#elig-out", root).textContent = asAmount(eligible);
      $("#elig-sub", root).textContent = capacity > 0
        ? "at about " + rupees(capacity) + " a month for " + years + " years"
        : "Your existing EMIs already use the income a lender would count.";
    }

    [incomeEl, emiEl, yearsEl].forEach(function (el) { el.addEventListener("input", render); });
    render();
  })();

  /* =======================================================================
     8. Balance transfer savings calculator
     ======================================================================= */
  (function savings() {
    var root = $("#savings-calc");
    if (!root) return;

    var outstandingEl = $("#bt-outstanding", root);
    var yearsEl = $("#bt-years", root);
    var oldRateEl = $("#bt-old-rate", root);
    var newRateEl = $("#bt-new-rate", root);
    if (!outstandingEl || !yearsEl || !oldRateEl || !newRateEl) return;

    function put(id, text) {
      var el = $("#" + id, root);
      if (el) el.textContent = text;
    }

    function render() {
      var outstanding = Number(outstandingEl.value);
      var years = Number(yearsEl.value);
      var oldRate = Number(oldRateEl.value);
      var newRate = Number(newRateEl.value);
      var months = years * 12;

      var oldEmi = emiFor(outstanding, oldRate, months);
      var newEmi = emiFor(outstanding, newRate, months);
      var monthly = oldEmi - newEmi;
      var fee = outstanding * CONFIG.processingFeeRate;
      var cost = fee + CONFIG.legalAndValuation;
      var net = monthly * months - cost;
      var breakEven = monthly > 0 ? Math.ceil(cost / monthly) : Infinity;

      // Verdict bands, transcribed from the original SavingsCalculator.tsx.
      var tone, lead, rest;
      if (monthly <= 0) {
        tone = "bad";
        lead = "No saving.";
        rest = "The new rate is not below your current one.";
      } else if (breakEven > months) {
        tone = "bad";
        lead = "Not worth it.";
        rest = "You would not recover the switching cost before the loan ends.";
      } else if (breakEven <= 12) {
        tone = "good";
        lead = "Worth doing.";
        rest = "You recover the switching cost in " + breakEven + " months, then it is all yours.";
      } else if (breakEven <= 24) {
        tone = "warn";
        lead = "Worth it if you are staying.";
        rest = "Break-even takes " + breakEven + " months.";
      } else {
        tone = "bad";
        lead = "Probably not.";
        rest = breakEven + " months to break even is too long to be worth the paperwork.";
      }

      put("bt-outstanding-out", shortAmount(outstanding));
      put("bt-years-out", years + (years === 1 ? " year" : " years"));
      put("bt-old-rate-out", oldRate.toFixed(2) + "% p.a.");
      put("bt-new-rate-out", newRate.toFixed(2) + "% p.a.");

      put("bt-old-emi", rupees(oldEmi));
      put("bt-new-emi", rupees(newEmi));
      put("bt-net", net > 0 ? rupees(net) : "Nothing");
      put("bt-monthly-note", monthly > 0
        ? rupees(monthly) + " a month, after switching costs are recovered"
        : "Your new rate is not lower than the one you have.");
      put("bt-fee", rupees(fee));
      put("bt-cost", rupees(cost));

      var verdict = $("#bt-verdict", root);
      if (verdict) {
        verdict.innerHTML = "<strong>" + lead + "</strong> " + rest;
        verdict.setAttribute("data-tone", tone);
        verdict.hidden = false;
      }

      var cta = $("#bt-cta", root);
      if (cta) {
        cta.setAttribute("data-context",
          "Balance transfer — " + shortAmount(outstanding) + " outstanding, " + years +
          " years left, " + oldRate.toFixed(2) + "% → " + newRate.toFixed(2) +
          "%, net saving " + rupees(net));
      }
    }

    [outstandingEl, yearsEl, oldRateEl, newRateEl].forEach(function (el) {
      el.addEventListener("input", render);
    });
    render();
  })();

  /* =======================================================================
     9. Enquiry forms
     Never tells the visitor their enquiry was received unless it actually was.
     With no endpoint configured it hands off to WhatsApp or email instead.
     ======================================================================= */
  (function forms() {
    $$("form[data-enquiry]").forEach(function (form) {
      var status = $(".form-status", form);

      function show(tone, html) {
        if (!status) return;
        status.setAttribute("data-tone", tone);
        status.innerHTML = html;
        status.hidden = false;
      }

      function validate() {
        var ok = true;
        $$("[required]", form).forEach(function (field) {
          var error = $("#" + field.id + "-error", form);
          var bad;

          if (field.type === "checkbox") {
            bad = !field.checked;
          } else {
            bad = !field.value.trim();
            // The callback form asks for an Indian mobile, so it wants ten digits.
            if (!bad && field.type === "tel") {
              bad = field.value.replace(/\D/g, "").length !== 10;
            }
            if (!bad && field.type === "email") {
              bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            }
          }

          if (error) error.hidden = !bad;
          field.setAttribute("aria-invalid", String(bad));
          if (bad && ok) field.focus();
          if (bad) ok = false;
        });
        return ok;
      }

      function collect() {
        var data = new FormData(form);
        var slot = (data.get("slot") || "").toString().trim();
        var context = form.getAttribute("data-context") || "";
        if (slot) context = (context ? context + " | " : "") + "Callback requested — " + slot;
        return {
          name: (data.get("name") || "").toString().trim(),
          phone: (data.get("phone") || "").toString().trim(),
          email: (data.get("email") || "").toString().trim(),
          service: (data.get("service") || "").toString().trim(),
          message: (data.get("message") || "").toString().trim(),
          context: context
        };
      }

      // "Send on WhatsApp" carries the same details, validated the same way.
      var waButton = $("[data-whatsapp]", form);
      if (waButton) {
        waButton.addEventListener("click", function () {
          if (!validate()) return;
          window.open(whatsappUrl(collect()), "_blank", "noopener");
        });
      }

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (!validate()) return;

        var enquiry = collect();
        var submit = $("button[type='submit']", form);
        var submitLabel = submit ? submit.innerHTML : "";

        if (!CONFIG.formEndpoint) {
          // No endpoint configured — hand off rather than pretend.
          show("handoff",
            "<strong>Almost there.</strong> Send these details to us on WhatsApp or by email " +
            "and we will come back to you.<div class=\"btn-row\">" +
            "<a class=\"btn btn-whatsapp\" target=\"_blank\" rel=\"noopener\" href=\"" +
            whatsappUrl(enquiry) + "\">Send on WhatsApp</a>" +
            "<a class=\"btn btn-outline\" href=\"" + mailtoUrl(enquiry) + "\">Send by email</a></div>");
          return;
        }

        if (submit) { submit.disabled = true; submit.textContent = "Sending…"; }


        fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(enquiry)
        }).then(function (res) {
          if (res.ok) {
            show("ok", "<strong>Thank you.</strong> We have your enquiry and will call you back shortly.");
            form.reset();
          } else {
            show("error",
              "<strong>That did not go through.</strong> Please send it on " +
              "<a target=\"_blank\" rel=\"noopener\" href=\"" + whatsappUrl(enquiry) +
              "\">WhatsApp</a> instead, or call us.");
          }
        }).catch(function () {
          show("error",
            "<strong>That did not go through.</strong> Please send it on " +
            "<a target=\"_blank\" rel=\"noopener\" href=\"" + whatsappUrl(enquiry) +
            "\">WhatsApp</a> instead, or call us.");
        }).then(function () {
          if (submit) { submit.disabled = false; submit.innerHTML = submitLabel; }
        });
      });

      // Clear an error as soon as the visitor starts fixing it.
      $$("[required]", form).forEach(function (field) {
        var clear = function () {
          var error = $("#" + field.id + "-error", form);
          var fixed = field.type === "checkbox" ? field.checked : !!field.value.trim();
          if (error && fixed) {
            error.hidden = true;
            field.setAttribute("aria-invalid", "false");
          }
        };
        field.addEventListener("input", clear);
        field.addEventListener("change", clear);
      });
    });
  })();

  /* =======================================================================
     10. Calculator CTAs — carry the figures through to the contact page
     ======================================================================= */
  (function contextLinks() {
    $$("[data-context-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        var context = link.getAttribute("data-context");
        if (!context) return;
        try { sessionStorage.setItem("jsr-context", context); } catch (e) { /* private mode */ }
      });
    });

    // On the contact page, pick up whatever the visitor last calculated.
    var form = $("form[data-enquiry]");
    if (!form) return;
    var params = new URLSearchParams(window.location.search);

    var service = params.get("service");
    if (service) {
      var select = $("select[name='service']", form);
      if (select) {
        $$("option", select).forEach(function (option) {
          if (option.value.toLowerCase() === service.toLowerCase()) select.value = option.value;
        });
      }
    }

    try {
      // Only adopt the stored value when this page has no calculator of its own —
      // on the two calculator pages the live figure has already been set, and must win.
      var stored = sessionStorage.getItem("jsr-context");
      if (stored && !form.getAttribute("data-context")) {
        form.setAttribute("data-context", stored);
        var note = $("#context-note", form);
        if (note) {
          $("#context-note-text", form).textContent = stored;
          note.hidden = false;
        }
      }
    } catch (e) { /* private mode */ }
  })();

  /* =======================================================================
     10b. Time-slot radios on the callback form
     ======================================================================= */
  (function slots() {
    var labels = $$(".slot");
    if (!labels.length) return;

    function sync() {
      labels.forEach(function (label) {
        var input = $("input", label);
        label.classList.toggle("is-selected", !!(input && input.checked));
      });
    }
    labels.forEach(function (label) {
      var input = $("input", label);
      if (input) input.addEventListener("change", sync);
    });
    sync();
  })();

  /* =======================================================================
     10c. Click-to-load map
     A Google Maps iframe pulls several hundred kilobytes and sets Google's
     cookies on every visitor whether or not they look at it. This loads it
     only when someone asks; the directions link works without it either way.
     ======================================================================= */
  (function map() {
    var stage = $("#map-stage");
    var button = $("#map-load");
    var placeholder = $("#map-placeholder");
    if (!stage || !button) return;

    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = stage.getAttribute("data-src");
      frame.title = stage.getAttribute("data-title");
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.allowFullscreen = true;
      stage.appendChild(frame);
      if (placeholder) placeholder.remove();
    });
  })();

  /* =======================================================================
     11. Back-to-top button
     ======================================================================= */
  (function backToTop() {
    var btn = $("#to-top");
    if (!btn) return;

    function sync() {
      btn.setAttribute("data-show", String(window.scrollY > 350));
    }
    window.addEventListener("scroll", sync, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    sync();
  })();

  /* =======================================================================
     12. Footer year
     ======================================================================= */
  (function year() {
    var el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
