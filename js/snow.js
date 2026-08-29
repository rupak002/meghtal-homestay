/* ================================================
   Meghtal Homestay — Crystal Snow + Animations
   ================================================ */
(function () {
  'use strict';

  /* =============================================
     1. ROUND SNOWFLAKES  (maximum performance)
     — Single arc() per flake per frame
     — One shared radial gradient, reused
     — 30 fps cap, auto-reduced count on mobile
     — Strictly downward only
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

    function makeFlake() {
      const r = Math.random() * 2.8 + 0.8;   /* radius 0.8 – 3.6 px */
      return {
        x      : Math.random() * W,
        y      : Math.random() * H,            /* scatter on load */
        r,
        speed  : Math.random() * 0.6 + 0.2,   /* 0.2 – 0.8 px / frame */
        sway   : (Math.random() - 0.5) * 0.3,
        wobble : Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.01 + 0.003,
        opacity: Math.random() * 0.5 + 0.25   /* 0.25 – 0.75 */
      };
    }

    function flakeCount() {
      const area = W * H;
      const base = Math.floor(area / 14000);
      return Math.min(base, window.innerWidth < 768 ? 55 : 120);
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      flakes = Array.from({ length: flakeCount() }, makeFlake);
    }

    /* 30 fps cap — snow is indistinguishable at 30 vs 60 fps */
    let raf, lastT = 0;
    const FPS_INTERVAL = 1000 / 30;

    function tick(ts) {
      raf = requestAnimationFrame(tick);
      if (ts - lastT < FPS_INTERVAL) return;
      lastT = ts;

      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        /* move — y always increases (downward only) */
        f.wobble += f.wobbleSpeed;
        f.x      += f.sway + Math.sin(f.wobble) * 0.4;
        f.y      += f.speed;

        /* wrap */
        if (f.x >  W + 5) f.x = -5;
        if (f.x < -5)     f.x =  W + 5;
        if (f.y >  H + 5) { f.y = -5; f.x = Math.random() * W; }

        /* draw: single filled circle — cheapest possible draw call */
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,240,255,${f.opacity})`;
        ctx.fill();
      }
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { lastT = 0; raf = requestAnimationFrame(tick); }
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
