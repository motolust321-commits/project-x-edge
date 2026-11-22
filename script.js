(() => {
  'use strict';
  const data = window.XEDGE_CONFIG || { characters: [], updates: [] };
  const collection = Array.isArray(data.characters) ? data.characters : [];
  const grid = document.getElementById('character-grid');
  const updatesRoot = document.getElementById('updates-list');
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const isWebURL = value => {
    if (!value || typeof value !== 'string') return false;
    try { return ['https:', 'http:'].includes(new URL(value, window.location.href).protocol); }
    catch { return false; }
  };
  const isSafeImageURL = value => {
    if (!value || typeof value !== 'string') return false;
    try { return ['http:', 'https:', 'file:'].includes(new URL(value, window.location.href).protocol); }
    catch { return false; }
  };

  function cardHTML(item) {
    const ready = isWebURL(item.downloadUrl);
    const art = isSafeImageURL(item.image)
      ? `<img src="${escapeText(item.image)}" alt="${escapeText(item.name)} 立ち絵" loading="lazy" decoding="async">` : '';
    const download = ready
      ? `<a class="character-download live" href="${escapeText(item.downloadUrl)}" rel="noopener noreferrer" target="_blank" aria-label="${escapeText(item.name)}のZIPをダウンロード">ZIP DOWNLOAD <span aria-hidden="true">↗</span></a>`
      : `<span class="character-download pending" aria-disabled="true">DOWNLOAD SOON <span aria-hidden="true">—</span></span>`;
    return `<article class="character-card accent-${escapeText(item.accent || 'cyan')}">
      <div class="character-visual">
        <div class="character-raster" aria-hidden="true"></div>
        <div class="character-circle" aria-hidden="true"></div>
        <div class="character-watermark" aria-hidden="true">${escapeText(item.motif || 'X')}</div>
        <div class="character-image">${art}</div>
        <span class="character-no">${escapeText(item.number || '--')}<small>/ 04</small></span>
        <span class="character-status"><i></i> ${escapeText(item.status || '制作中')}</span>
        <span class="character-visual-title">${escapeText(item.english || '')}</span>
        <span class="character-visual-caption">${art ? 'CHARACTER FILE' : 'ARTWORK COMING SOON'}</span>
        <span class="card-corner corner-a" aria-hidden="true"></span><span class="card-corner corner-b" aria-hidden="true"></span>
      </div>
      <div class="character-body"><div class="character-category"><i></i>${escapeText(item.category || 'CHARACTER')}</div>
        <h3>${escapeText(item.name)}<small>${escapeText(item.english || '')}</small></h3>
        <p class="character-description">${escapeText(item.description || '')}</p>
        <div class="character-tags">${(item.features || []).map(tag => `<span>${escapeText(tag)}</span>`).join('')}</div>
        <div class="character-bottom"><div class="character-version"><span>BUILD STATUS</span><strong>${escapeText(item.version || 'VERSION TBA')}${item.fileSize ? ' / ' + escapeText(item.fileSize) : ''}</strong></div>${download}</div>
      </div>
    </article>`;
  }

  function initCardImages() {
    grid?.querySelectorAll('.character-image img').forEach(img => {
      const visual = img.closest('.character-visual');
      const onReady = () => visual?.classList.add('image-ready');
      const onError = () => { img.hidden = true; visual?.classList.remove('image-ready'); };
      img.addEventListener('load', onReady, { once: true });
      img.addEventListener('error', onError, { once: true });
      if (img.complete) (img.naturalWidth > 0 ? onReady : onError)();
    });
  }

  function renderCards(filter = 'all') {
    if (!grid) return;
    const visible = collection.filter(item => filter === 'all' || item.type === filter);
    grid.innerHTML = visible.map(cardHTML).join('') || '<p class="empty-results">このカテゴリのキャラクターはまだありません。</p>';
    initCardImages();
  }

  function renderUpdates() {
    if (!updatesRoot) return;
    const updates = Array.isArray(data.updates) ? data.updates : [];
    updatesRoot.innerHTML = updates.map((entry, index) => `<article class="update-item">
      <span class="update-num">${String(index + 1).padStart(2, '0')}</span>
      <time datetime="${escapeText(String(entry.date || '').replaceAll('.', '-'))}">${escapeText(entry.date || '')}</time>
      <span class="update-label">${escapeText(entry.label || 'NEWS')}</span>
      <div class="update-text"><h3>${escapeText(entry.title || '')}</h3><p>${escapeText(entry.text || '')}</p></div>
      <span class="update-icon" aria-hidden="true">↗</span>
    </article>`).join('') || '<p class="empty-results">新しい更新情報は準備中です。</p>';
  }

  function updateShowcase() {
    const chosen = collection.find(item => item.id === 'nanaya') || collection[0];
    if (!chosen) return;
    const img = document.getElementById('showcase-image');
    const stage = document.getElementById('hero-showcase');
    const name = document.getElementById('showcase-name');
    const sub = document.getElementById('showcase-sub');
    const status = document.getElementById('showcase-status');
    if (name) name.textContent = chosen.english || chosen.name || 'FEATURED CHARACTER';
    if (sub) sub.textContent = chosen.name || '';
    if (status) status.textContent = chosen.status || 'IN DEVELOPMENT';
    if (img && isSafeImageURL(chosen.image)) {
      img.addEventListener('load', () => stage?.classList.add('has-portrait'), { once: true });
      img.addEventListener('error', () => stage?.classList.remove('has-portrait'), { once: true });
      img.src = chosen.image;
      img.alt = `${chosen.name} 立ち絵`;
      if (img.complete && img.naturalWidth > 0) stage?.classList.add('has-portrait');
    }
  }

  renderCards();
  renderUpdates();
  updateShowcase();
  ['hero-character-count', 'roster-total', 'filter-total'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(collection.length).padStart(2, '0');
  });
  const year = document.getElementById('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      renderCards(button.dataset.filter);
    });
  });

  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('menu-toggle');
  const closeMenu = () => { nav?.classList.remove('nav-open'); toggle?.setAttribute('aria-expanded', 'false'); };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / limit))})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
})();
