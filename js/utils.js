// ============================================================
// Shared Utilities - js/utils.js
// ============================================================

// ─── Toast Notifications ─────────────────────────────────────

function toast(message, type = 'success') {
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', warning: 'bg-amber-500', info: 'bg-blue-500' };
  const icons = {
    success: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    warning: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
    info: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-3';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white text-sm font-medium ${colors[type]} translate-x-20 opacity-0 transition-all duration-300 max-w-sm`;
  el.innerHTML = `${icons[type]}<span class="flex-1">${message}</span>`;
  container.appendChild(el);
  requestAnimationFrame(() => { el.classList.remove('translate-x-20', 'opacity-0'); });
  setTimeout(() => {
    el.classList.add('translate-x-20', 'opacity-0');
    setTimeout(() => el.remove(), 300);
  }, 4000);
}

// ─── Modal Helpers ────────────────────────────────────────────

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function confirmDialog(message) { return window.confirm(message); }

// ─── Format Helpers ───────────────────────────────────────────

function fmtCurrency(n) { return 'KES ' + Number(n).toLocaleString('en-KE'); }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }
function roleColor(role) {
  const map = { admin: 'bg-purple-100 text-purple-700', registry: 'bg-blue-100 text-blue-700', finance: 'bg-green-100 text-green-700', lecturer: 'bg-amber-100 text-amber-700', student: 'bg-slate-100 text-slate-700' };
  return map[role] || 'bg-gray-100 text-gray-700';
}
function gradeColor(grade) {
  if (!grade) return 'text-gray-400';
  if (grade.startsWith('A')) return 'text-emerald-600 font-bold';
  if (grade.startsWith('B')) return 'text-blue-600 font-semibold';
  if (grade.startsWith('C')) return 'text-amber-600';
  if (grade === 'D') return 'text-orange-600';
  return 'text-red-600 font-bold';
}
function statusBadge(status) {
  return status === 'active'
    ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>Active</span>'
    : '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"><span class="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>Inactive</span>';
}
function clearanceBadge(cleared) {
  return cleared
    ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">✓ Cleared</span>'
    : '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">✗ Not Cleared</span>';
}

// ─── Sidebar Renderer ─────────────────────────────────────────

function renderSidebar(activePage) {
  const session = Auth.getSession();
  if (!session) { window.location.href = 'index.html'; return; }

  const visibleNav = NAV_ITEMS.filter(item => item.roles.includes(session.role));
  const navHTML = visibleNav.map(item => {
    const isActive = item.href === activePage;
    return `
      <a href="${item.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
        ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1' : 'text-slate-400 hover:bg-white/5 hover:text-white'}">
        <span class="${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}">${ICONS[item.icon]}</span>
        ${item.label}
      </a>`;
  }).join('');

  const roleLabels = { admin: 'Administrator', registry: 'Registry Staff', finance: 'Finance Officer', lecturer: 'Lecturer', student: 'Student' };
  const roleColors = { admin: 'text-purple-400', registry: 'text-blue-400', finance: 'text-emerald-400', lecturer: 'text-amber-400', student: 'text-slate-400' };

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="flex flex-col h-full">
      <!-- Logo Section -->
      <div class="px-8 py-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-2xl ring-4 ring-indigo-500/10">
            <img src="assets/images/logo.png" alt="CUU" class="h-full w-auto object-contain" onerror="this.src='https://ui-avatars.com/api/?name=CU&background=6366f1&color=fff'">
          </div>
          <div>
            <div class="text-white font-black text-base leading-none tracking-tighter uppercase">Cavendish</div>
            <div class="text-indigo-500 text-[10px] font-bold tracking-[0.2em] mt-1">UNIVERSITY</div>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <p class="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Core Modules</p>
        ${navHTML}
      </nav>

      <!-- User Profile Card -->
      <div class="p-4 mt-auto">
        <div class="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              ${session.name.charAt(0)}
            </div>
            <div class="min-w-0">
              <div class="text-white text-sm font-bold truncate leading-none">${session.name.split(' ')[0]}</div>
              <div class="text-[10px] font-bold mt-1 uppercase tracking-wider ${roleColors[session.role]}">${roleLabels[session.role]}</div>
            </div>
          </div>
          <button onclick="Auth.logout()" class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>`;
}

// ─── Page Shell Builder ───────────────────────────────────────

function buildPage(activePage, title) {
  const session = Auth.getSession();
  if (!session) { window.location.href = 'index.html'; return null; }

  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.innerHTML = `
      <div class="flex items-center gap-6 flex-1">
        <button id="sidebar-toggle" class="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors" onclick="document.getElementById('sidebar-wrapper').classList.toggle('-translate-x-full')">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div>
          <h1 class="text-xl font-black text-slate-900 tracking-tight leading-none">${title}</h1>
          <p class="text-xs text-slate-400 font-medium mt-1.5 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div class="hidden md:flex flex-1 max-w-md ml-4">
          <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <input type="text" placeholder="Search records, finance or grades..." 
              class="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl text-xs font-medium transition-all outline-none" 
              onkeyup="if(event.key==='Enter'){ const v=this.value.toLowerCase(); if(v.includes('fin')) window.location.href='finance.html'; if(v.includes('stu')) window.location.href='students.html'; if(v.includes('rep')) window.location.href='reports.html'; if(v.includes('use')) window.location.href='users.html'; if(v.includes('das')) window.location.href='dashboard.html'; if(v.includes('grad')) window.location.href='grades.html'; }">
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden xl:flex flex-col items-end">
          <span class="text-[10px] font-black text-slate-900 uppercase tracking-widest">${session.name}</span>
          <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">System Online</span>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-lg">
          <div class="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-indigo-600 font-black text-sm">
            ${session.name.charAt(0)}
          </div>
        </div>
      </div>`;
  }
  renderSidebar(activePage);
  return session;
}

// ─── Table Search Helper ──────────────────────────────────────

function filterTable(tableId, query) {
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  const q = query.toLowerCase();
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ─── Empty State ─────────────────────────────────────────────

function emptyState(message) {
  return `<tr><td colspan="100" class="px-6 py-16 text-center">
    <div class="flex flex-col items-center gap-3 text-slate-400">
      <svg class="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p class="text-sm">${message}</p>
    </div>
  </td></tr>`;
}

// ─── Common Layout Shell HTML ─────────────────────────────────
// Each HTML page includes this structure inline for full control.
