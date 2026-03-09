// ============================================================
// admin.js — Full portfolio admin tool
// ============================================================

// ── Keys ──
var PROJECTS_KEY  = 'portfolio_projects';
var CATS_KEY      = 'portfolio_categories';
var AUTH_KEY      = 'admin_auth';
var ADMIN_PASS    = 'admin123'; // Change this password!

var DEFAULT_CATS = [
  { id: 'digital-marketing', label: 'Digital Marketing', color: '#818cf8', gradient: 'linear-gradient(135deg, #7c3aed 0%, #0f766e 55%, #0ea5e9 100%)' }
];
var DEFAULT_PROJECTS = [
  { id: 'necho', featured: true, category: 'digital-marketing', title: 'Necho \u2014 Digital Marketing Experiment Lab', description: 'Using my own product as a live lab for SEO, content marketing, social media growth, landing page optimization, conversion tracking, and user acquisition \u2014 instead of just learning theory.', kpi: 'Real product used to validate marketing strategies with real traffic, real users, and real data.', link: '', image: '' },
  { id: 'dm-1', category: 'digital-marketing', title: 'Digital Business Landscape Analysis', description: 'Analyzed real-world companies across product, service, platform, and infrastructure models, along with major business models like B2C, B2B, D2C, and C2C to understand how digital companies create value and scale.', kpi: 'Built a strong foundation in digital economy structures and monetization strategies.', link: '', image: '' },
  { id: 'dm-2', category: 'digital-marketing', title: 'Brand Marketing Strategy Breakdown', description: 'Studied how a popular brand builds awareness, trust, and conversions, while continuously adapting to changing market behavior and digital trends.', kpi: 'Brand perception, storytelling, and consistency drive long-term customer loyalty.', link: '', image: '' },
  { id: 'dm-3', category: 'digital-marketing', title: 'Data & Customer Intelligence for E-Commerce', description: 'Mapped all data points collected during an e-commerce user journey and categorized them into structured/unstructured and quantitative/qualitative data.', kpi: 'Customer data drives personalization, targeting, and smarter marketing decisions.', link: '', image: '' },
  { id: 'dm-4', category: 'digital-marketing', title: 'Zoho Product Marketing Strategy (STP)', description: 'Analyzed the STP strategy of a Zoho product to understand how the brand identifies its audience, targets the right market segment, and positions its value proposition.', kpi: 'Clear positioning strengthens product adoption and brand differentiation.', link: '', image: '' },
  { id: 'dm-5', category: 'digital-marketing', title: 'Data-Driven Funnel Optimization', description: 'Analyzed an e-commerce conversion funnel using realistic campaign data to identify the biggest drop-off stage and propose data-driven improvements.', kpi: 'Developed strategies for improving conversion rates without changing pricing.', link: '', image: '' },
  { id: 'dm-6', category: 'digital-marketing', title: 'Customer Journey & Marketing Funnel Analysis', description: 'Mapped my own online buying journey and analyzed it using an AIDA-style marketing funnel to understand what influences clicks, decisions, and conversions.', kpi: 'Small UX and messaging changes can significantly impact purchase decisions.', link: '', image: '' },
  { id: 'dm-7', category: 'digital-marketing', title: 'SEO & Search Visibility Strategy', description: 'Created a research-backed presentation covering on-page SEO, off-page SEO, SEO vs AEO vs GEO, black hat vs white hat tactics, and parasite SEO.', kpi: 'Built a complete understanding of modern search optimization strategies.', link: '', image: '' },
  { id: 'dm-8', category: 'digital-marketing', title: 'Marketing Metrics & Campaign Analytics', description: 'Solved real-world marketing problems involving CPL, CPC, conversion rate, ROI, and CPA using realistic datasets to practice campaign performance analysis.', kpi: 'Strengthened ability to analyze and optimize campaign performance using data.', link: '', image: '' },
  { id: 'dm-9', category: 'digital-marketing', title: 'SEO Traffic Opportunity Analysis', description: 'Analyzed search data including impressions, CTR, backlinks, and rankings to determine which pages offer the highest potential for SEO improvement.', kpi: 'Learned how to prioritize SEO efforts for maximum traffic impact.', link: '', image: '' },
  { id: 'dm-10', category: 'digital-marketing', title: 'Digital Presence Audit \u2013 Zoho Healthcare', description: 'Conducted a complete digital audit of Zoho Healthcare covering website experience, SEO visibility, social media presence, and paid marketing signals.', kpi: 'Identified real growth opportunities and optimization gaps for the brand.', link: '', image: '' },
  { id: 'dm-11', category: 'digital-marketing', title: 'Conversion Optimization \u2013 TrainerCentral', description: 'Evaluated the TrainerCentral website from a first-time visitor perspective to identify friction points in the funnel and propose targeted improvements.', kpi: 'Proposed concrete improvements to boost user engagement and course sign-ups.', link: '', image: '' },
  { id: 'dm-12', category: 'digital-marketing', title: 'Social Media Content Strategy', description: 'Created a content strategy for a Zoho product targeting the Indian market, including content types, engagement tactics, and a structured posting calendar.', kpi: 'Built a scalable content calendar designed for consistent reach and engagement.', link: '', image: '' },
  { id: 'dm-13', category: 'digital-marketing', title: 'SEO Strategy Scenarios', description: 'Developed SEO strategies for two businesses \u2014 an online course platform and a D2C productivity brand \u2014 covering keyword research, landing pages, backlinks, and technical fixes.', kpi: 'Practiced solving real ranking and traffic challenges across different industries.', link: '', image: '' },
  { id: 'dm-14', category: 'digital-marketing', title: 'Google Ads Strategy \u2013 Course Promotion', description: 'Designed a Google Ads campaign to promote a digital marketing course with a \u20b95,000 budget, covering search intent classification, keyword targeting, and click waste prevention.', kpi: 'Learned how to maximize ROI from a tight paid search budget.', link: '', image: '' }
];

// ── State ──
var projects = loadProjects();
var cats = loadCats();
var editingProject = null;

// ── Helpers ──
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function uid() {
  return Math.random().toString(36).slice(2,9);
}
function loadProjects() {
  try {
    var s = localStorage.getItem(PROJECTS_KEY);
    var p = s ? JSON.parse(s) : null;
    return (Array.isArray(p) && p.length) ? p : JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_PROJECTS)); }
}
function saveProjects() {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  markSaved();
}
function loadCats() {
  try {
    var s = localStorage.getItem(CATS_KEY);
    var c = s ? JSON.parse(s) : null;
    if (!Array.isArray(c) || !c.length) c = JSON.parse(JSON.stringify(DEFAULT_CATS));
    var map = {};
    c.forEach(function(cat){ map[cat.id] = cat; });
    return map;
  } catch(e) {
    var m = {};
    DEFAULT_CATS.forEach(function(c){ m[c.id] = c; });
    return m;
  }
}
function saveCats() {
  localStorage.setItem(CATS_KEY, JSON.stringify(Object.values(cats)));
  markSaved();
}
function getField(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function setField(id, val) {
  var el = document.getElementById(id);
  if (el) el.value = val || '';
}

// ── Save indicator ──
var saveTimeout;
function markSaved() {
  var dot = document.getElementById('saveDot');
  var label = document.getElementById('saveLabel');
  if (!dot || !label) return;
  dot.className = 'save-dot saved';
  label.textContent = 'Saved';
  clearTimeout(saveTimeout);
}
// ── Toast ──
function toast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + (type || '');
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.className = 'toast'; }, 3200);
}

// ── Auth ──
function isAuthed() { return sessionStorage.getItem(AUTH_KEY) === '1'; }
function initAuth() {
  var overlay = document.getElementById('authOverlay');
  if (isAuthed()) { overlay.classList.add('hidden'); return; }
  var btn = document.getElementById('loginBtn');
  var inp = document.getElementById('passInput');
  var err = document.getElementById('loginError');
  function tryLogin() {
    if (inp.value === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, '1');
      overlay.classList.add('hidden');
      initAll();
    } else {
      err.style.display = 'block';
      inp.value = '';
      inp.focus();
    }
  }
  btn.addEventListener('click', tryLogin);
  inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') tryLogin(); });
  document.getElementById('logoutBtn').addEventListener('click', function(){
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  });
}

// ── Tabs ──
function initTabs() {
  var btns = document.querySelectorAll('.tab-btn');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      var panel = document.getElementById('tab-' + tabId);
      if (panel) panel.classList.add('active');
    });
  });
}

// ═══════════════════════════════════
// PROJECTS TAB
// ═══════════════════════════════════
function renderCatSelect() {
  var sel = document.getElementById('fieldCategory');
  if (!sel) return;
  var cur = sel.value;
  sel.innerHTML = '<option value="" disabled>Select a category...</option>';
  Object.values(cats).forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.label;
    sel.appendChild(opt);
  });
  if (cur) sel.value = cur;
}

function renderProjects() {
  var list = document.getElementById('projectsList');
  var count = document.getElementById('projectCount');
  if (!list) return;
  if (count) count.textContent = projects.length;
  if (!projects.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">📁</div><p>No projects yet. Add one using the form.</p></div>';
    return;
  }
  var fallback = { label: '', color: '#64748b', gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)' };
  list.innerHTML = projects.map(function(p, i) {
    var cat = cats[p.category] || fallback;
    var hasLink = p.link && p.link.trim() !== '';
    return '<div class="item-row' + (editingProject === p.id ? ' editing' : '') + '" data-id="' + esc(p.id) + '">'
      + '<div class="item-dot" style="background:' + esc(cat.color) + '"></div>'
      + '<div class="item-body">'
      + '<div class="item-title">' + esc(p.title) + '</div>'
      + '<div class="item-meta">'
      + '<span style="background:' + esc(cat.color) + '22;color:' + esc(cat.color) + ';padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700">' + esc(cat.label || p.category) + '</span>'
      + (hasLink ? '<span style="color:#10b981;font-size:11px;margin-left:8px">Has link</span>' : '')
      + (p.image && p.image.trim() ? '<span style="color:#818cf8;font-size:11px;margin-left:8px">Has image</span>' : '')
      + '</div>'
      + '</div>'
      + '<div class="item-actions">'
      + '<button class="icon-btn up" ' + (i===0?'disabled':'') + '>\u2191</button>'
      + '<button class="icon-btn dn" ' + (i===projects.length-1?'disabled':'') + '>\u2193</button>'
      + '<button class="icon-btn edit">\u270E</button>'
      + '<button class="icon-btn del">\u2715</button>'
      + '</div>'
      + '</div>';
  }).join('');
  list.querySelectorAll('.item-row').forEach(function(row) {
    var id = row.dataset.id;
    row.querySelector('.up').addEventListener('click', function() { moveItem(projects, id, -1); saveProjects(); renderProjects(); });
    row.querySelector('.dn').addEventListener('click', function() { moveItem(projects, id, 1); saveProjects(); renderProjects(); });
    row.querySelector('.edit').addEventListener('click', function() { editProject(id); });
    row.querySelector('.del').addEventListener('click', function() { if(confirm('Delete this project?')) { projects = projects.filter(function(p){ return p.id !== id; }); saveProjects(); renderProjects(); } });
  });
}

function editProject(id) {
  var p = projects.find(function(p){ return p.id === id; });
  if (!p) return;
  editingProject = id;
  setField('fieldTitle', p.title);
  setField('fieldCategory', p.category);
  setField('fieldDescription', p.description);
  setField('fieldKpi', p.kpi);
  setField('fieldLink', p.link || '');
  setField('fieldImage', p.image || '');
  document.getElementById('projFormHeading').textContent = 'Edit Project';
  document.getElementById('submitBtn').textContent = '\u2713 Save Changes';
  document.getElementById('cancelBtn').style.display = 'flex';
  renderProjects();
}

function initProjectsTab() {
  renderCatSelect();
  renderProjects();

  var form = document.getElementById('projectForm');
  document.getElementById('cancelBtn').addEventListener('click', function() {
    editingProject = null;
    form.reset();
    document.getElementById('projFormHeading').textContent = 'Add New Project';
    document.getElementById('submitBtn').textContent = '+ Add Project';
    this.style.display = 'none';
    renderProjects();
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var title = getField('fieldTitle');
    var cat = getField('fieldCategory');
    var desc = getField('fieldDescription');
    var kpi = getField('fieldKpi');
    if (!title || !cat || !desc || !kpi) { toast('Fill in required fields', 'error'); return; }
    var link = getField('fieldLink');
    var image = getField('fieldImage');
    if (editingProject) {
      var idx = projects.findIndex(function(p){ return p.id === editingProject; });
      var feat = idx !== -1 ? (projects[idx].featured || false) : false;
      if (idx !== -1) projects[idx] = { id: editingProject, featured: feat, category: cat, title: title, description: desc, kpi: kpi, link: link, image: image };
      editingProject = null;
      document.getElementById('projFormHeading').textContent = 'Add New Project';
      document.getElementById('submitBtn').textContent = '+ Add Project';
      document.getElementById('cancelBtn').style.display = 'none';
    } else {
      projects.push({ id: uid(), category: cat, title: title, description: desc, kpi: kpi, link: link, image: image });
    }
    saveProjects();
    form.reset();
    renderCatSelect();
    renderProjects();
    toast('\u2713 Project saved!', 'success');
  });

  // Export / Reset
  document.getElementById('projExportBtn').addEventListener('click', function() {
    var blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'portfolio-projects.json';
    a.click();
  });
  document.getElementById('resetBtn').addEventListener('click', function() {
    if (!confirm('Reset all projects to defaults? This cannot be undone.')) return;
    projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    saveProjects();
    renderProjects();
    toast('Projects reset to defaults', 'success');
  });
}

// ═══════════════════════════════════
// CATEGORIES TAB
// ═══════════════════════════════════
var CAT_COLORS = ['#818cf8','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#06b6d4'];
var CAT_GRADIENTS = [
  'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
  'linear-gradient(135deg, #10b981 0%, #0f766e 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #4f46e5 100%)'
];

function renderCategories() {
  var list = document.getElementById('categoryList');
  if (!list) return;
  var catArr = Object.values(cats);
  if (!catArr.length) {
    list.innerHTML = '<p style="color:var(--muted);font-size:13px">No categories yet.</p>';
    return;
  }
  list.innerHTML = catArr.map(function(cat) {
    var projCount = projects.filter(function(p){ return p.category === cat.id; }).length;
    return '<div class="cat-row">'
      + '<div class="cat-row-dot" style="background:' + esc(cat.color) + '"></div>'
      + '<div class="cat-row-body">'
      + '<span class="cat-row-label">' + esc(cat.label) + '</span>'
      + '<span class="cat-row-count">' + projCount + ' project' + (projCount !== 1 ? 's' : '') + '</span>'
      + '</div>'
      + '<button class="icon-btn del" data-id="' + esc(cat.id) + '" title="Delete category">\u2715</button>'
      + '</div>';
  }).join('');
  list.querySelectorAll('.icon-btn.del').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = btn.dataset.id;
      if (!confirm('Delete category "' + (cats[id] ? cats[id].label : id) + '"?')) return;
      delete cats[id];
      saveCats();
      renderCategories();
      renderCatSelect();
      toast('Category deleted', 'success');
    });
  });
}

function initCatsTab() {
  renderCategories();
  document.getElementById('addCatBtn').addEventListener('click', function() {
    var nameInput = document.getElementById('newCatName');
    var name = nameInput.value.trim();
    if (!name) { toast('Enter a category name', 'error'); return; }
    var id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    if (cats[id]) { toast('Category already exists', 'error'); return; }
    var idx = Object.keys(cats).length % CAT_COLORS.length;
    var color = CAT_COLORS[idx];
    cats[id] = { id: id, label: name, color: color, gradient: CAT_GRADIENTS[idx] };
    saveCats();
    nameInput.value = '';
    renderCategories();
    renderCatSelect();
    toast('\u2713 Category added!', 'success');
  });
  document.getElementById('newCatName').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('addCatBtn').click();
  });
}

// ═══════════════════════════════════
// UTILITY
// ═══════════════════════════════════
function moveItem(arr, id, dir) {
  var idx = arr.findIndex(function(i){ return i.id === id; });
  if (idx < 0) return;
  var newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return;
  var tmp = arr[idx];
  arr[idx] = arr[newIdx];
  arr[newIdx] = tmp;
}

// ═══════════════════════════════════
// INIT ALL
// ═══════════════════════════════════
function initAll() {
  initTabs();
  initProjectsTab();
  initCatsTab();
  markSaved();
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', function() {
  initAuth();
  if (isAuthed()) initAll();

  document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  });
});
