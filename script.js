(() => {
  "use strict";
  const data = window.XEDGE_CONFIG || { characters: [], updates: [] };
  const grid = document.getElementById('character-grid');
  const updates = document.getElementById('updates-list');
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const validUrl = url => {
    if (!url || typeof url !== 'string') return false;
    try { const target = new URL(url, window.location.href); return target.protocol === 'https:' || target.protocol === 'http:'; }
    catch { return false; }
  };

  function renderCards(filter = 'all') {
    if (!grid) return;
    const collection = data.characters.filter(item => filter === 'all' || item.type === filter);
    grid.innerHTML = collection.map(item => {
      const live = validUrl(item.downloadUrl);
      const image = item.image ? `<img src="${escapeText(item.image)}" alt="${escapeText(item.name)} 公式掲載画像" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-unavailable')">` : '';
      const action = live
        ? `<a class="character-download active" href="${escapeText(item.downloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeText(item.name)} ZIPをダウンロード">ZIP DOWNLOAD <span aria-hidden="true">↗</span></a>`
        : `<span class="character-download pending" aria-disabled="true">DOWNLOAD SOON <span aria-hidden="true">—</span></span>`;
      return `<article class="character-card accent-${escapeText(item.accent)}">
        <div class="character-visual ${item.image ? 'has-image' : ''}">
          <span class="char-corner top-left"></span><span class="char-corner bottom-right"></span>
          <div class="character-design-grid" aria-hidden="true"></div>
          <div class="character-image">${image}</div>
          <div class="character-placeholder" aria-hidden="true"><span class="motif">${escapeText(item.motif || 'X')}</span><span class="placeholder-line"></span><small>CHARACTER ART<br>COMING SOON</small></div>
          <span class="character-no">${escapeText(item.number)}<i> / 04</i></span>
          <span class="char-status">${escapeText(item.status)}</span>
          <span class="visual-name">${escapeText(item.english)}</span>
        </div>
        <div class="character-body"><p class="character-category">${escapeText(item.category)}</p><h3>${escapeText(item.name)}<span>${escapeText(item.english)}</span></h3>
          <p class="character-description">${escapeText(item.description)}</p>
          <div class="char-features">${(item.features || []).map(f => `<span>${escapeText(f)}</span>`).join('')}</div>
          <div class="character-bottom"><span>${escapeText(item.version || 'VERSION TBA')}${item.fileSize ? ' / '+escapeText(item.fileSize) : ''}</span>${action}</div>
        </div>
      </article>`;
    }).join('');
    if (collection.length === 0) grid.innerHTML = '<p>該当するキャラクターはありません。</p>';
  }

  function renderUpdates() {
    if (!updates) return;
    updates.innerHTML = (data.updates || []).map((item, i) => `<article class="update-item"><span class="update-index">0${i+1}</span><time datetime="${escapeText(String(item.date || '').replaceAll('.', '-'))}">${escapeText(item.date)}</time><span class="update-label">${escapeText(item.label)}</span><div class="update-details"><h3>${escapeText(item.title)}</h3><p>${escapeText(item.text)}</p></div><span class="update-arrow" aria-hidden="true">↗</span></article>`).join('') || '<p class="no-updates">新しいリリース情報は準備中です。</p>';
  }
  renderCards(); renderUpdates();
  const year = document.getElementById('copyright-year');
  if(year) year.textContent = new Date().getFullYear();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    renderCards(button.dataset.filter);
  }));
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const closeNav = () => { menu?.setAttribute('aria-expanded','false'); nav?.classList.remove('nav-open'); };
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded)); nav?.classList.toggle('nav-open',!expanded);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('keydown', event => { if(event.key === 'Escape') closeNav(); });
})();
