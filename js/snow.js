/* ================================================
   Meghtal Homestay — Crystal Snow + Animations
   ================================================ */
(function () {
  'use strict';

  /* =============================================
     1. CRYSTAL SNOWFLAKES
     — 6-arm crystalline shapes drawn on canvas
     — strictly top-to-bottom, no upward movement
     — gentle left/right sway only (sine wobble)
     — random size, speed, rotation, opacity
  ============================================= */
  function initSnow() {
    const canvas = document.createElement('canvas');
    canvas.id = 'snowCanvas';
    Object.assign(canvas.style, {
      position     : 'fixed',
      top          : '0',
      left         : '0',
      width        : '100%',
      height       : '100%',
      pointerEvents: 'none',
      zIndex       : '9999'
    });
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, flakes;

    /* ── draw a 6-arm crystal snowflake ── */
    function drawCrystal(x, y, size, angle, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#e8f4ff';
      ctx.lineWidth   = Math.max(0.6, size * 0.12);
      ctx.lineCap     = 'round';

      for (let arm = 0; arm < 6; arm++) {
        ctx.save();
        ctx.rotate((Math.PI / 3) * arm);

        /* main arm */
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.stroke();

        /* two symmetric branches at 60% of arm length */
        const branchAt  = size * 0.55;
        const branchLen = size * 0.35;
        const branchAng = Math.PI / 5;  /* ~36 deg */

        ctx.beginPath();
        ctx.moveTo(0, -branchAt);
        ctx.lineTo( Math.sin(branchAng) * branchLen, -(branchAt + Math.cos(branchAng) * branchLen));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -branchAt);
        ctx.lineTo(-Math.sin(branchAng) * branchLen, -(branchAt + Math.cos(branchAng) * branchLen));
        ctx.stroke();

        /* tiny tip branches at 85% */
        const tipAt  = size * 0.85;
        const tipLen = size * 0.18;
        const tipAng = Math.PI / 4;

        ctx.beginPath();
        ctx.moveTo(0, -tipAt);
        ctx.lineTo( Math.sin(tipAng) * tipLen, -(tipAt + Math.cos(tipAng) * tipLen));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -tipAt);
        ctx.lineTo(-Math.sin(tipAng) * tipLen, -(tipAt + Math.cos(tipAng) * tipLen));
        ctx.stroke();

        ctx.restore();
      }

      /* centre dot */
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#cce8ff';
      ctx.globalAlpha = opacity * 0.9;
      ctx.fill();

      ctx.restore();
    }

    function makeFlake() {
      const size = Math.random() * 9 + 4;       /* 4–13 px arm length */
      return {
        x      : Math.random() * W,
        y      : -(size * 2 + Math.random() * H), /* start above viewport */
        size,
        speed  : Math.random() * 0.8 + 0.3,     /* 0.3–1.1 px/frame */
        sway   : (Math.random() - 0.5) * 0.4,   /* gentle drift ±0.2 */
        wobble : Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.004,
        angle  : Math.random() * Math.PI * 2,
        spin   : (Math.random() - 0.5) * 0.008, /* slow rotation */
        opacity: Math.random() * 0.55 + 0.3     /* 0.3–0.85 */
      };
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.floor((W * H) / 10000);
      flakes = Array.from({ length: Math.min(count, 160) }, makeFlake);
      /* scatter initial y positions so screen isn't empty at load */
      flakes.forEach(f => { f.y = Math.random() * H; });
    }

    let raf;
    function tick() {
      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        /* update position — y only increases (downward) */
        f.wobble += f.wobbleSpeed;
        f.x      += f.sway + Math.sin(f.wobble) * 0.5;
        f.y      += f.speed;          /* ALWAYS positive = downward */
        f.angle  += f.spin;

        /* wrap horizontally */
        if (f.x > W + f.size * 2) f.x = -(f.size * 2);
        if (f.x < -(f.size * 2))  f.x = W + f.size * 2;

        /* reset to top when past bottom */
        if (f.y > H + f.size * 2) {
          f.x      = Math.random() * W;
          f.y      = -(f.size * 2);
          f.speed  = Math.random() * 0.8 + 0.3;
          f.sway   = (Math.random() - 0.5) * 0.4;
          f.opacity= Math.random() * 0.55 + 0.3;
        }

        drawCrystal(f.x, f.y, f.size, f.angle, f.opacity);
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', () => { resize(); });
    tick();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    });
  }

  /* =============================================
     2. SCROLL-TRIGGERED ANIMATIONS
     Automatically tags elements and reveals them
     with different effects as they enter view.
  ============================================= */

  const ANIM_CSS = `
    /* base hidden state */
    [data-anim] {
      will-change: opacity, transform;
      transition-property: opacity, transform;
      transition-timing-function: cubic-bezier(0.22, 0.68, 0, 1.18);
      transition-duration: 0.72s;
    }
    [data-anim]:not(.anim-done) { opacity: 0; }

    /* per-effect starting transforms */
    [data-anim="up"]:not(.anim-done)       { transform: translateY(48px) scale(0.97); }
    [data-anim="down"]:not(.anim-done)     { transform: translateY(-40px); }
    [data-anim="left"]:not(.anim-done)     { transform: translateX(-56px); }
    [data-anim="right"]:not(.anim-done)    { transform: translateX(56px); }
    [data-anim="zoom"]:not(.anim-done)     { transform: scale(0.80); }
    [data-anim="flip-x"]:not(.anim-done)   { transform: perspective(700px) rotateX(22deg); }
    [data-anim="flip-y"]:not(.anim-done)   { transform: perspective(700px) rotateY(22deg); }
    [data-anim="blur"]:not(.anim-done)     { transform: translateY(28px); filter: blur(6px); }

    /* revealed state */
    [data-anim].anim-done {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  `;

  /* map of CSS selectors → animation type + optional stagger */
  const AUTO_MAP = [
    /* headings */
    { sel: '.page-hero h1, .hero h1',                    anim: 'up',      stagger: 0   },
    { sel: '.page-hero p, .hero p.lede',                 anim: 'up',      stagger: 0,  delay: 120 },
    { sel: '.hero-ctas',                                 anim: 'up',      stagger: 0,  delay: 240 },
    { sel: '.hero .eyebrow',                             anim: 'up',      stagger: 0,  delay: 0   },
    { sel: 'section h2, .section-head h2',               anim: 'up',      stagger: 0   },
    { sel: 'section .eyebrow',                           anim: 'up',      stagger: 0   },
    { sel: '.section-head p',                            anim: 'up',      stagger: 0,  delay: 80  },

    /* cards & grid items */
    { sel: '.room-card',                                 anim: 'zoom',    stagger: 110 },
    { sel: '.value-card',                                anim: 'up',      stagger: 90  },
    { sel: '.ql-card',                                   anim: 'zoom',    stagger: 90  },
    { sel: '.gal-item',                                  anim: 'zoom',    stagger: 50  },
    { sel: '.inc-item',                                  anim: 'up',      stagger: 70  },
    { sel: '.rev-card',                                  anim: 'left',    stagger: 90  },
    { sel: '.tl-item',                                   anim: 'left',    stagger: 110 },
    { sel: '.contact-item',                              anim: 'right',   stagger: 90  },

    /* two-column layouts */
    { sel: '.about-grid img, .locate-map, .book-form',   anim: 'left',    stagger: 0   },
    { sel: '.about-copy, .locate-text, .book-side',      anim: 'right',   stagger: 0   },

    /* review form / summary */
    { sel: '.rev-summary',                               anim: 'up',      stagger: 0   },
    { sel: '.rev-form',                                  anim: 'flip-x',  stagger: 0   },
    { sel: '.rating-bars',                               anim: 'left',    stagger: 0   },

    /* footer */
    { sel: 'footer',                                     anim: 'up',      stagger: 0   },
  ];

  function initScrollAnims() {
    /* inject CSS */
    const style = document.createElement('style');
    style.textContent = ANIM_CSS;
    document.head.appendChild(style);

    AUTO_MAP.forEach(({ sel, anim, stagger, delay = 0 }) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (el.hasAttribute('data-anim')) return;   /* don't overwrite manual tags */
        el.setAttribute('data-anim', anim);
        const ms = delay + i * stagger;
        if (ms > 0) el.style.transitionDelay = ms + 'ms';
      });
    });

    /* observe */
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-done');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));
  }

  /* =============================================
     3. HERO ENTRANCE ANIMATION (index page only)
     Smooth letter-spacing expand on the main H1
  ============================================= */
  function initHeroEntrance() {
    if (!document.querySelector('.hero')) return;

    const kf = document.createElement('style');
    kf.textContent = `
      @keyframes mtHeroIn {
        from { opacity:0; transform:translateY(36px); letter-spacing:.12em; }
        to   { opacity:1; transform:none; letter-spacing:normal; }
      }
      @keyframes mtFadeUp {
        from { opacity:0; transform:translateY(22px); }
        to   { opacity:1; transform:none; }
      }
      /* override data-anim for hero elements so they use keyframe timing */
      .hero h1      { animation: mtHeroIn  1.1s cubic-bezier(.22,.68,0,1.15) .15s both !important; }
      .hero p.lede  { animation: mtFadeUp  .95s ease .80s both !important; }
      .hero-ctas    { animation: mtFadeUp  .95s ease 1.15s both !important; }
      .hero .eyebrow{ animation: mtFadeUp  .8s  ease .05s  both !important; }
    `;
    document.head.appendChild(kf);
  }

  /* =============================================
     4. PAGE TRANSITION FADE (dark overlay)
  ============================================= */
  function initPageTransition() {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position     : 'fixed',
      inset        : '0',
      background   : 'var(--pine-dark)',
      zIndex       : '99998',
      pointerEvents: 'none',
      opacity      : '1',
      transition   : 'opacity .45s ease',
    });
    document.body.appendChild(overlay);

    /* fade in on load */
    requestAnimationFrame(() =>
      requestAnimationFrame(() => { overlay.style.opacity = '0'; })
    );

    /* fade out before navigating */
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || href.startsWith('tel') ||
          href.startsWith('javascript')) return;
      a.addEventListener('click', e => {
        e.preventDefault();
        overlay.style.opacity = '1';
        setTimeout(() => { window.location.href = href; }, 420);
      });
    });
  }

  /* =============================================
     BOOT
  ============================================= */
  function boot() {
    initSnow();
    initPageTransition();
    initHeroEntrance();
    /* slight delay so DOM layout is complete before we measure elements */
    requestAnimationFrame(() => initScrollAnims());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
