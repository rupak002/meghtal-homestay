/* ================================================
   Meghtal Homestay — Shared App Logic
   ================================================ */

/* ---------- NAMESPACE ---------- */
window.MT = window.MT || {};

/* ---------- DEFAULT DATA ---------- */
MT.defaultRooms = [
  { id: 'r1', name: 'The Ridge Room', type: 'Bedroom', price: 3200,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    imgBed: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    imgBath: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    desc: 'A warm, wood-panelled bedroom with a picture window framing the range. Queen bed, reading corner, hot water bottle on cold nights.',
    amenities: ['Queen Bed', 'Valley View', 'Hot Water', 'WiFi', 'Reading Corner'] },
  { id: 'r2', name: 'Balcony Suite', type: 'Balcony', price: 4500,
    img: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=800&q=80',
    imgBed: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    imgBath: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    desc: 'Private balcony facing east — this is the room to book if you want Kanchenjunga with your morning tea.',
    amenities: ['King Bed', 'Private Balcony', 'Mountain View', 'Hot Water', 'WiFi', 'Tea Maker'] },
  { id: 'r3', name: 'Garden Bath Cottage', type: 'Bathroom', price: 5200,
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    imgBed: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    imgBath: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    desc: 'A standalone cottage with an open-air bath tub looking straight into the pine forest. Our most requested room.',
    amenities: ['Open-Air Bath', 'King Bed', 'Garden View', 'Hot Water', 'WiFi', 'Fireplace', 'Privacy'] }
];

MT.defaultGallery = [
  { id:'g1',  cat:'Balcony Views', img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80', cap:'Morning light from Balcony Suite' },
  { id:'g2',  cat:'Balcony Views', img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=700&q=80', cap:'Tea balcony at sunrise - mist over the hills' },
  { id:'g3',  cat:'Balcony Views', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80', cap:'Snow-capped peaks at dawn from balcony' },
  { id:'g4',  cat:'Balcony Views', img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80', cap:'Evening balcony - orange hues over the valley' },
  { id:'g5',  cat:'Bedrooms',      img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80', cap:'The Ridge Room - cozy wood-paneled bedroom' },
  { id:'g6',  cat:'Bedrooms',      img:'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=700&q=80', cap:'Balcony Suite - wake up to mountain views' },
  { id:'g7',  cat:'Bedrooms',      img:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=80', cap:'Ridge Room - reading corner with valley view' },
  { id:'g8',  cat:'Bedrooms',      img:'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=700&q=80', cap:'Balcony Suite - spacious room with wooden beams' },
  { id:'g9',  cat:'Bathrooms',     img:'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', cap:'Garden Bath Cottage - open-air bath with forest view' },
  { id:'g10', cat:'Bathrooms',     img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=700&q=80', cap:'Modern bathroom - solar heated hot water' },
  { id:'g11', cat:'Bathrooms',     img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', cap:'Garden cottage bath - soak with pine views' },
  { id:'g12', cat:'Nature',        img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=80', cap:'The pine trail behind the homestay' },
  { id:'g13', cat:'Nature',        img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80', cap:'Reflections on the lower lake' },
  { id:'g14', cat:'Nature',        img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=700&q=80', cap:'Forest path leading to the homestay' },
  { id:'g15', cat:'Sunrise',       img:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80', cap:'Sunrise over the ridge - gold on snow peaks' },
  { id:'g16', cat:'Sunrise',       img:'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=700&q=80', cap:'Cloud sea at dawn - view from bedroom window' },
  { id:'g17', cat:'Sunrise',       img:'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=700&q=80', cap:'First light hitting Kanchenjunga at 5am' },
  { id:'g18', cat:'Sunset',        img:'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=80', cap:'Last light from the terrace - orange sky' },
  { id:'g19', cat:'Sunset',        img:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80', cap:'Stars coming out over the range' },
  { id:'g20', cat:'Sunset',        img:'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=700&q=80', cap:'Sunset from balcony - purple dusk over hills' }
];

MT.defaultReviews = [
  { id: 'v1', name: 'Ananya R.', rating: 5, text: 'Woke up to a full view of Kanchenjunga from bed. The family cooks breakfast to order — best gundruk soup I have had.', date: '2026-03-14' },
  { id: 'v2', name: 'Tom H.',    rating: 5, text: 'Quiet, warm, and the balcony room is worth every rupee. Wifi is patchy which is honestly part of the charm.', date: '2026-02-02' },
  { id: 'v3', name: 'Priya M.', rating: 4, text: 'Loved the garden bath cottage. Road up is a little bumpy in a small car, worth checking ahead.', date: '2025-12-20' }
];

/* ---------- SHARED STATE ---------- */
MT.state = {
  rooms: [], gallery: [], reviews: [],
  isAdmin: false, user: null,
  galFilter: 'All', starPickVal: 0
};

/* ==============================================
   STORAGE — uses localStorage directly.
   window.storage (Kiro IDE API) is not available
   in a normal browser, so we always use localStorage.
   ============================================== */
MT.loadKey = function (key, fallback) {
  try {
    const raw = localStorage.getItem('mt_' + key);
    if (raw) return Promise.resolve(JSON.parse(raw));
    localStorage.setItem('mt_' + key, JSON.stringify(fallback));
    return Promise.resolve(fallback);
  } catch (e) {
    return Promise.resolve(fallback);
  }
};

MT.saveKey = function (key, val) {
  try {
    localStorage.setItem('mt_' + key, JSON.stringify(val));
  } catch (e) {
    console.error('localStorage save failed', key, e);
  }
  return Promise.resolve();
};

/* ---------- SESSION PERSISTENCE ----------
   Survives page navigation within the tab.
   Uses sessionStorage so it clears on tab close.
   ----------------------------------------- */
MT._saveSession = function () {
  try {
    sessionStorage.setItem('mt_admin', MT.state.isAdmin ? '1' : '0');
    sessionStorage.setItem('mt_user',  MT.state.user ? JSON.stringify(MT.state.user) : '');
  } catch (e) { /* ignore */ }
};

MT._restoreSession = function () {
  try {
    MT.state.isAdmin = sessionStorage.getItem('mt_admin') === '1';
    const u = sessionStorage.getItem('mt_user');
    MT.state.user = (u && u !== '') ? JSON.parse(u) : null;
  } catch (e) { /* ignore */ }
};

/* ---------- TOAST ---------- */
let _toastTimer;
MT.toast = function (msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
};

/* ---------- MODALS ---------- */
MT.openModal  = id => document.getElementById(id)?.classList.add('open');
MT.closeModal = id => document.getElementById(id)?.classList.remove('open');

function initModals() {
  document.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', () => MT.closeModal(b.getAttribute('data-close')));
  });
  document.querySelectorAll('.overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });
}

/* ---------- AUTH UI ---------- */
MT.updateAuthUI = function () {
  const statusEl = document.getElementById('authStatus');
  const adminBtn = document.getElementById('btnAdminLogin');
  const userBtn  = document.getElementById('btnUserLogin');
  const nav      = document.getElementById('siteNav');
  const isSolid  = nav && (nav.classList.contains('solid') || nav.classList.contains('page-nav'));

  if (statusEl) {
    statusEl.style.color = isSolid ? 'var(--amber)' : 'var(--amber-light)';
    statusEl.textContent = MT.state.isAdmin
      ? 'ADMIN MODE'
      : MT.state.user ? 'Hi, ' + MT.state.user.name.split(' ')[0] : '';
  }

  if (adminBtn) adminBtn.innerHTML = MT.state.isAdmin ? 'Exit Admin' : 'Admin';

  if (userBtn) {
    userBtn.innerHTML = MT.state.user
      ? 'Sign Out'
      : '<span class="txt">Guest</span> Sign In';
  }

  if (typeof MT.onAuthChange === 'function') MT.onAuthChange();
};

function initAuth() {
  const adminBtn = document.getElementById('btnAdminLogin');
  const userBtn  = document.getElementById('btnUserLogin');

  adminBtn?.addEventListener('click', () => {
    if (MT.state.isAdmin) {
      MT.state.isAdmin = false;
      MT._saveSession();
      MT.toast('Exited admin mode');
      MT.updateAuthUI();
    } else {
      MT.openModal('adminOverlay');
    }
  });

  document.getElementById('adminSubmit')?.addEventListener('click', () => {
    const u = document.getElementById('adminUser').value.trim();
    const p = document.getElementById('adminPass').value;
    if (u === 'admin' && p === 'mountain2026') {
      MT.state.isAdmin = true;
      MT._saveSession();
      MT.closeModal('adminOverlay');
      document.getElementById('adminErr').textContent = '';
      document.getElementById('adminUser').value = '';
      document.getElementById('adminPass').value = '';
      MT.toast('Signed in as admin ✓');
      MT.updateAuthUI();
    } else {
      document.getElementById('adminErr').textContent = 'Incorrect username or password.';
    }
  });

  userBtn?.addEventListener('click', () => {
    if (MT.state.user) {
      MT.state.user = null;
      MT._saveSession();
      MT.toast('Signed out');
      MT.updateAuthUI();
    } else {
      MT.openModal('userOverlay');
    }
  });

  document.getElementById('revSignInBtn')?.addEventListener('click',
    () => MT.openModal('userOverlay'));

  document.getElementById('userSubmit')?.addEventListener('click', () => {
    const name  = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    if (!name || !email.includes('@')) {
      document.getElementById('userErr').textContent = 'Enter your name and a valid email.';
      return;
    }
    MT.state.user = { name, email };
    MT._saveSession();
    document.getElementById('userErr').textContent = '';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    MT.closeModal('userOverlay');
    MT.toast('Welcome, ' + name.split(' ')[0] + '!');
    MT.updateAuthUI();
  });
}

/* ---------- NAV SCROLL ---------- */
function initNav() {
  const nav = document.getElementById('siteNav');
  if (!nav || nav.classList.contains('page-nav')) return;
  window.addEventListener('scroll', () => {
    const was = nav.classList.contains('solid');
    const now = window.scrollY > 60;
    nav.classList.toggle('solid', now);
    if (was !== now) MT.updateAuthUI();
  });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  document.getElementById('hamBtn')?.addEventListener('click',
    () => document.getElementById('mobileMenu').classList.add('open'));
  document.getElementById('mobileClose')?.addEventListener('click',
    () => document.getElementById('mobileMenu').classList.remove('open'));
  document.querySelectorAll('.mobileMenu a').forEach(a =>
    a.addEventListener('click',
      () => document.getElementById('mobileMenu').classList.remove('open')));
}

/* ---------- ACTIVE NAV LINK ---------- */
function initActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a, .mobileMenu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('?')[0];
    a.classList.toggle('active', href === page);
  });
}

/* ---------- IMAGE RESIZE ---------- */
MT.resizeImage = function (file, maxW = 1100, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/* ---------- STAR HELPER ---------- */
MT.starString = function (n) {
  n = Math.round(n);
  return '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);
};

/* ---------- BOOT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Restore session FIRST, before anything reads MT.state
  MT._restoreSession();
  initModals();
  initAuth();
  initNav();
  initMobileMenu();
  initActiveLink();
  // Run page-specific init, then update UI so auth state is reflected
  if (typeof MT.pageInit === 'function') {
    const result = MT.pageInit();
    // pageInit may be async; update UI after it resolves
    Promise.resolve(result).then(() => MT.updateAuthUI());
  } else {
    MT.updateAuthUI();
  }
});
