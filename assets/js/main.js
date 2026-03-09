// ============================================
// PROFESSIONAL PORTFOLIO — Enhanced Interactions
// ============================================

// ---- Theme Toggle (Dark/Light Mode) ----
(function () {
  const html = document.documentElement;
  html.setAttribute('data-theme', 'light');
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });
})();

// ---- Scroll Progress Bar ----
(function () {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ---- Navbar scroll glass effect ----
(function () {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- Mobile menu ----
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const navUl = document.querySelector('nav ul');
  if (!menuBtn || !navUl) return;
  menuBtn.addEventListener('click', () => {
    const isOpen = navUl.classList.toggle('open');
    menuBtn.textContent = isOpen ? '\u2715' : '\u2630';
  });
  navUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navUl.classList.remove('open');
      menuBtn.textContent = '\u2630';
    }
  });
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navUl.contains(e.target)) {
      navUl.classList.remove('open');
      menuBtn.textContent = '\u2630';
    }
  });
})();

// ---- Smooth scroll for nav links ----
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      // Close mobile menu if open
      var navUl = document.querySelector('nav ul');
      if (navUl) {
        navUl.classList.remove('open');
        var menuBtn = document.getElementById('menuBtn');
        if (menuBtn) menuBtn.textContent = '\u2630';
      }

      // Use a fixed 100px offset from top of viewport
      var rect = target.getBoundingClientRect();
      var scrollTarget = rect.top + window.pageYOffset - 100;
      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
    });
  });
})();

// ---- Reveal on scroll ----
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

// ---- Stagger children animation ----
(function () {
  const containers = document.querySelectorAll('.stagger-children');
  if (!containers.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  containers.forEach(el => observer.observe(el));
})();

// ---- Counter animation ----
(function () {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;
  const runCounter = (el) => {
    const target = +el.dataset.target || 0;
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const duration = 1400;
    const step = target / (duration / 16);
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur) + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        runCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

// ---- Active nav link on scroll ----
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a');
  if (!sections.length || !navLinks.length) return;

  // Check if we're on the index/home page
  var isHome = !window.location.pathname.match(/portfolio|project|admin/);

  window.addEventListener('scroll', function () {
    if (!isHome) return;
    var current = '';

    var atBottom = (window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 80);
    if (atBottom && sections.length > 0) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
      });
    }

    navLinks.forEach(function (a) {
      var href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }, { passive: true });
})();

// ---- Project category filter ----
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length || !cards.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        if (match) {
          card.style.display = '';
          card.classList.add('filter-animate');
          card.addEventListener('animationend', () => card.classList.remove('filter-animate'), { once: true });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ---- Contact form ----
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    }
    form.reset();
  });
})();

// ---- Footer year ----
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ---- Skill card mouse tracking ----
(function () {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
})();

// ---- Back to Top ----
(function () {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

// ---- Parallax on hero ----
(function () {
  const heroContent = document.querySelector('.hero-content');
  const profileCard = document.querySelector('.profile-card');
  if (!heroContent || !profileCard || window.innerWidth < 768) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight) return;
    heroContent.style.transform = 'translateY(' + (y * 0.06) + 'px)';
    profileCard.style.transform = 'translateY(' + (y * 0.03) + 'px)';
  }, { passive: true });
})();

// ---- Animated gradient on highlight ----
(function () {
  const el = document.querySelector('.hero-title .highlight');
  if (el) el.classList.add('text-shimmer');
})();

// ---- Multi-language greeting badge rotation ----
(function () {
  const badge = document.querySelector('#greetingText');
  if (!badge) return;
  const greetings = [
    'Hello!',       // English
    'Bonjour!',     // French
    'Hola!',        // Spanish
    'Ciao!',        // Italian
    'Hallo!',       // German
    'Olá!',         // Portuguese
    'Merhaba!',     // Turkish
    '你好!',         // Chinese
    'こんにちは!',   // Japanese
    '안녕하세요!',   // Korean
    'مرحبا!',       // Arabic
    'Привет!',      // Russian
    'Hei!',         // Norwegian
    'Χαίρετε!',     // Greek
  ];
  let idx = 0;
  function rotate() {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-8px)';
    setTimeout(function () {
      idx = (idx + 1) % greetings.length;
      badge.textContent = greetings[idx];
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 350);
  }
  setInterval(rotate, 2600);
})();

// ---- Auto Carousel (About section) ----
(function () {
  var carousels = document.querySelectorAll('.auto-carousel');
  carousels.forEach(function (carousel) {
    var slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length <= 1) return;
    var interval = parseInt(carousel.dataset.interval) || 4000;
    var currentIdx = 0;

    // Build dots
    var dotsContainer = carousel.parentElement.querySelector('.carousel-dots');
    if (dotsContainer) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(idx) {
      slides[currentIdx].classList.remove('active');
      currentIdx = idx;
      slides[currentIdx].classList.add('active');
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentIdx);
      });
    }

    function next() {
      goTo((currentIdx + 1) % slides.length);
    }

    setInterval(next, interval);
  });
})();

// ---- Works Carousel (Projects section) ----
(function () {
  var track = document.getElementById('works-carousel-track');
  var dotsWrap = document.getElementById('works-carousel-dots');
  var prevBtn = document.querySelector('.works-prev');
  var nextBtn = document.querySelector('.works-next');
  if (!track) return;

  var slides = track.querySelectorAll('.works-slide');
  if (slides.length === 0) return;

  var currentIdx = 0;

  // Build dots
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    currentIdx = idx;
    track.style.transform = 'translateX(-' + (currentIdx * 100) + '%)';
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    var dots = dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(currentIdx > 0 ? currentIdx - 1 : slides.length - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo((currentIdx + 1) % slides.length);
    });
  }

  // Hide arrows if only one slide
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  // Auto-advance every 5 seconds (pause on video slides)
  var autoTimer = setInterval(function () {
    goTo((currentIdx + 1) % slides.length);
  }, 3000);

  // Pause auto on hover
  var wrapper = document.getElementById('works-carousel');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    wrapper.addEventListener('mouseleave', function () {
      autoTimer = setInterval(function () {
        goTo((currentIdx + 1) % slides.length);
      }, 3000);
    });
  }
})();

// ---- Testimonials Carousel (3 cards per view) ----
(function () {
  var track = document.getElementById('testimonials-track');
  var dotsWrap = document.getElementById('tc-dots');
  if (!track || !dotsWrap) return;

  var pageIdx = 0;
  var autoTimer;

  function perView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }

  function totalPages() {
    var cards = track.children.length;
    var pv = perView();
    return Math.max(1, Math.ceil(cards / pv));
  }

  function buildDots() {
    var pages = totalPages();
    dotsWrap.innerHTML = '';
    for (var i = 0; i < pages; i++) {
      var d = document.createElement('span');
      d.className = 'tc-dot' + (i === pageIdx ? ' active' : '');
      d.setAttribute('data-i', i);
      d.addEventListener('click', function () { goTo(parseInt(this.getAttribute('data-i'))); });
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx) {
    var pages = totalPages();
    if (idx < 0) idx = pages - 1;
    if (idx >= pages) idx = 0;
    pageIdx = idx;

    var pv = perView();
    var gap = 20;
    var containerWidth = track.parentElement.offsetWidth;
    var cardWidth = (containerWidth - gap * (pv - 1)) / pv;
    var offset = pageIdx * pv * (cardWidth + gap);
    var cards = track.children;
    var maxOffset = Math.max(0, (cards.length - pv) * (cardWidth + gap));
    if (offset > maxOffset) offset = maxOffset;

    track.style.transform = 'translateX(-' + offset + 'px)';
    var dots = dotsWrap.querySelectorAll('.tc-dot');
    dots.forEach(function (d, i) { d.classList.toggle('active', i === pageIdx); });
  }

  var prevBtn = document.querySelector('.tc-prev');
  var nextBtn = document.querySelector('.tc-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(pageIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(pageIdx + 1); });

  setTimeout(function () { buildDots(); goTo(0); }, 150);

  window.addEventListener('resize', function () { buildDots(); goTo(pageIdx); });

  autoTimer = setInterval(function () { goTo(pageIdx + 1); }, 5000);
  var el = document.getElementById('testimonials-carousel');
  if (el) {
    el.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    el.addEventListener('mouseleave', function () {
      autoTimer = setInterval(function () { goTo(pageIdx + 1); }, 5000);
    });
  }

  var sx = 0, dragging = false;
  track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; dragging = true; });
  track.addEventListener('touchend', function (e) {
    if (!dragging) return; dragging = false;
    var diff = sx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(pageIdx + 1) : goTo(pageIdx - 1); }
  });
})();