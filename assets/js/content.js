// ============================================================
// content.js — Dynamic content loader from localStorage
// Reads 'portfolio_content' and applies to DOM elements.
// ============================================================
(function () {
  // @@BEGIN_DEFAULT
  var DEFAULT = {
    nav: {
      logo: 'BA',
      name: 'Your Name',
      role: 'Business Administration'
    },
    hero: {
      name: 'Sree Ram S',
      subtitle: 'Marketing student who likes turning data into real growth.',
      photo: 'https://hmidvlypfhbjefhcwwkt.supabase.co/storage/v1/object/public/images/d1c39160-75d0-407e-ad0e-d83bebb1278d/6b064e51-4911-400b-a094-90b9c882e2d9.png?q=80&w=800&auto=format&fit=crop',
      pills: [
        { emoji: '\uD83D\uDCE3', text: 'Digital Marketing' },
        { emoji: '\uD83D\uDE80', text: 'Data Analysis' },
        { emoji: '\u2B50', text: 'Brand Strategy' },
        { emoji: '\uD83D\uDCF1', text: 'Social Media' }
      ],
    },
    about: {
      title: 'Ideas Powered by Insights',
      para1: "I am Sree Ram, a first year student at Zoho School of Learning. I am building my foundation in business with a focus on marketing and digital marketing. I like the space where creativity meets data, figuring out what the numbers behind campaigns actually mean and using those insights to make better calls. I also enjoy UI design, work with Figma, and know my way around basic coding.",
      para2: "Outside of academics, I am really into sports. I won 3rd place in Silambam at the SGFI national level competition, which taught me a lot about discipline and showing up consistently. When I am not studying marketing trends or going through analytics, I am usually hanging out with family or playing games with friends. Those moments keep things balanced for me.",
      image: 'https://hmidvlypfhbjefhcwwkt.supabase.co/storage/v1/object/public/images/d1c39160-75d0-407e-ad0e-d83bebb1278d/50b5ec8d-38f1-4ca1-94aa-f9988464148f.png?q=80&w=800&auto=format&fit=crop',
      tags: ['Strategic Thinking', 'Data-Driven', 'Team Player', 'Fast Learner', 'Marketing', 'Analytics']
    },
    skills: [
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>', title: 'Marketing & Branding', desc: 'Campaign management, brand identity, content strategy, SEO & SEM' },
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>', title: 'Business Strategy', desc: 'Growth planning, go-to-market frameworks, competitive positioning' },
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>', title: 'Data Analysis', desc: 'Excel, Tableau, Google Analytics, Power BI, insight storytelling' },
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', title: 'Coding & Development', desc: 'Python, HTML, CSS, JavaScript, MySQL, Firebase, DBMS' },
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>', title: 'Designing', desc: 'Figma, Canva, Adobe Photoshop, Illustrator, UI/UX Design' },
      { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', title: 'Video & Photo Editing', desc: 'Premiere Pro, After Effects, DaVinci Resolve, Lightroom' }
    ],
    experience: [
      { title: 'Zoho Schools of learning', period: 'June 2025', desc: '' },
      { title: 'Murugappa Polytechnic College', period: '2022\u20142025', desc: 'Diploma in Computer Engineering - Grade: 94%' },
      { title: 'Smt. Kasturba Nimchand Shah P. Muthyalu Chetty Vivekananda Vidyalaya Junior College', period: '2021\u20132022', desc: 'SSLC - Grade: 86%' }
    ],
    testimonials: [
      { text: "Very detailed pitch, intresting idea and well thoughtout. Shows empathy in choosing the problem. Good Luck. Necho - Tradeshow", author: 'Mani Vembu', role: 'ZohoCEO - Zoho Division', initials: 'MV' },
      { text: 'Nice idea. Hope you can integrate with Zoh Meeting / Zoho cliq. Necho - Tradeshow', author: 'Rodrigo Vaca', role: 'Sales - US', initials: 'RV' },
      { text: 'He remained calm and composed throughout training, quickly grasping new concepts. On calls, he took the time to fully understand the customer’s issue before providing solutions. His call-handling improved noticeably from day one. Punctual, patient, and positive, Sreeram showed strong dedication and potential.', author: 'Arivalagan Anbalagan', role: 'NIC - Support Member Leadership Staff', initials: 'AA' },
      { text: 'Good Job Sree Ram - Keep going!', author: 'Arivalagan Anbalagan', role: 'NIC - Support Member Leadership Staff', initials: 'AA' }
      
    ],
    contact: {
      email: 'sreeramsathishkumar@zohomail.in',
      linkedin_url: 'https://www.linkedin.com/in/sreeramsathishkumar/',
      linkedin_text: 'Sree Ram S',
      twitter_url: '',
      twitter_handle: ''
    },
    footer: {
      name: 'Your Name',
      linkedin: '#',
      github: '#'
    }
  };
  // @@END_DEFAULT

  var content = DEFAULT;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setText(key, val) {
    var el = document.querySelector('[data-c="' + key + '"]');
    if (el && val !== undefined && val !== null) el.textContent = val;
  }

  function setAttr(key, attr, val) {
    var el = document.querySelector('[data-c="' + key + '"]');
    if (el && val !== undefined && val !== null) el.setAttribute(attr, val);
  }

  // ── Nav ──
  setText('nav-logo', content.nav && content.nav.logo);
  setText('nav-name', content.nav && content.nav.name);
  setText('nav-role', content.nav && content.nav.role);

  // ── Hero ──
  setText('hero-name', content.hero && content.hero.name);
  setText('hero-subtitle', content.hero && content.hero.subtitle);
  setAttr('hero-photo', 'src', content.hero && content.hero.photo);

  if (content.hero) {
    var photoWrap = document.querySelector('.hero-photo-wrap');
    if (photoWrap) {
      if (content.hero.photo_width) photoWrap.style.width = content.hero.photo_width + 'px';
      if (content.hero.photo_height) photoWrap.style.height = content.hero.photo_height + 'px';
    }
  }

  if (content.hero && content.hero.pills) {
    var pillEls = document.querySelectorAll('[data-c^="hero-pill-"]');
    content.hero.pills.forEach(function (pill, i) {
      if (pillEls[i]) pillEls[i].textContent = pill.emoji + ' ' + pill.text;
    });
  }

  setText('hero-stat-value', content.hero && content.hero.stat_value);
  var statLabel = document.querySelector('[data-c="hero-stat-label"]');
  if (statLabel && content.hero && content.hero.stat_label) {
    statLabel.innerHTML = esc(content.hero.stat_label).replace(/\n/g, '<br>');
  }

  // ── About ──
  var aboutTitleEl = document.querySelector('[data-c="about-title"]');
  if (aboutTitleEl && content.about && content.about.title) {
    aboutTitleEl.innerHTML = esc(content.about.title).replace(/\n/g, '<br>');
  }
  setText('about-para1', content.about && content.about.para1);
  setText('about-para2', content.about && content.about.para2);
  setAttr('about-image', 'src', content.about && content.about.image);

  if (content.about && content.about.tags && content.about.tags.length) {
    var tagsWrap = document.querySelector('.about-tags');
    if (tagsWrap) {
      tagsWrap.innerHTML = content.about.tags.map(function (t) {
        return '<span class="tag">' + esc(t) + '</span>';
      }).join('');
    }
  }

  // ── Skills ──
  if (content.skills && content.skills.length) {
    var skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
      skillsGrid.innerHTML = content.skills.map(function (s, i) {
        var delay = i % 3 === 1 ? ' reveal-delay-1' : i % 3 === 2 ? ' reveal-delay-2' : '';
        return '<div class="skill-card reveal' + delay + '">'
          + '<div class="skill-icon">' + s.icon + '</div>'
          + '<div><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p></div>'
          + '</div>';
      }).join('');
    }
  }

  // ── Experience ──
  if (content.experience && content.experience.length) {
    var timeline = document.querySelector('.timeline');
    if (timeline) {
      timeline.innerHTML = content.experience.map(function (e) {
        return '<div class="exp-item reveal">'
          + '<div class="exp-dot"></div>'
          + '<div class="exp-card">'
          + '<div class="exp-header">'
          + '<div class="exp-title">' + esc(e.title) + '</div>'
          + '<div class="exp-period">' + esc(e.period) + '</div>'
          + '</div>'
          + '<div class="exp-role">' + esc(e.desc) + '</div>'
          + '</div>'
          + '</div>';
      }).join('');
    }
  }

  // ── Testimonials ──
  if (content.testimonials && content.testimonials.length) {
    var testimTrack = document.getElementById('testimonials-track');
    if (testimTrack) {
      testimTrack.innerHTML = content.testimonials.map(function (t) {
        return '<div class="testimonial-card">'
          + '<span class="quote-mark">&#8220;</span>'
          + '<p class="testimonial-text">' + esc(t.text) + '</p>'
          + '<div class="testimonial-author">'
          + '<div class="author-avatar">' + esc(t.initials) + '</div>'
          + '<div>'
          + '<div class="author-name">' + esc(t.author) + '</div>'
          + '<div class="author-role">' + esc(t.role) + '</div>'
          + '</div></div></div>';
      }).join('');
    }
  }

  // ── Contact ──
  if (content.contact) {
    var c = content.contact;
    setText('contact-email', c.email);
    var emailLink = document.querySelector('[data-c="contact-email-link"]');
    if (emailLink && c.email) emailLink.href = 'mailto:' + c.email;

    setText('contact-linkedin-text', c.linkedin_text);
    var linkedinLink = document.querySelector('[data-c="contact-linkedin-link"]');
    if (linkedinLink && c.linkedin_url) linkedinLink.href = c.linkedin_url;
  }

  // ── Footer ──
  if (content.footer) {
    var f = content.footer;
    setText('footer-name', f.name);
    setAttr('footer-linkedin', 'href', f.linkedin);
    setAttr('footer-github', 'href', f.github);
  }
})();