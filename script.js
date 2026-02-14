/**
 * PrimeCanvas Studio – Main script
 * Sticky header, smooth scroll, testimonial slider, scroll animations
 */

(function () {
  'use strict';

  // ----- Sticky header -----
  const header = document.getElementById('header');
  if (header) {
    let lastScroll = 0;
    function onScroll() {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      if (scroll > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      lastScroll = scroll;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Mobile nav toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Scroll-triggered fade-in -----
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.08 };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(function (el) {
    observer.observe(el);
  });

  // ----- Testimonial slider -----
  const track = document.querySelector('.reviews-track');
  const cards = document.querySelectorAll('.review-card');
  const dotsContainer = document.querySelector('.reviews-dots');

  if (track && cards.length > 0) {
    const total = cards.length;
    let current = 0;
    function getSlideOffset() {
      var first = cards[0];
      if (!first) return 0;
      var style = getComputedStyle(track);
      var gap = parseFloat(style.gap) || 32;
      return first.offsetWidth + gap;
    }

    // Build dots
    if (dotsContainer) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
        dot.addEventListener('click', function () {
          goTo(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

    function goTo(index) {
      current = (index + total) % total;
      var offset = -current * getSlideOffset();
      track.style.transform = 'translateX(' + offset + 'px)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    // Auto-advance
    setInterval(function () {
      goTo(current + 1);
    }, 5000);
  }

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Contact form (no submit to server; prevent default) -----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder: in production, send to your backend or form service
      var btn = form.querySelector('button[type="submit"]');
      var text = btn ? btn.textContent : '';
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = 'Message Sent ✓';
          setTimeout(function () {
            btn.textContent = text;
            btn.disabled = false;
            form.reset();
          }, 2000);
        }, 800);
      }
    });
  }
})();
