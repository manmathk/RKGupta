const grid = document.getElementById('gallery-grid');
const filters = document.getElementById('filters');
const dialog = document.getElementById('art-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogTitle = document.getElementById('dialog-title');
const dialogMeta = document.getElementById('dialog-meta');
const dialogDescription = document.getElementById('dialog-description');
const dialogCategory = document.getElementById('dialog-category');

let activeFilter = 'All';

function categories() {
  return ['All', ...new Set(ARTWORKS.map(a => a.category).filter(Boolean))];
}

function renderFilters() {
  filters.innerHTML = categories().map(category => `
    <button class="filter ${category === activeFilter ? 'active' : ''}" data-filter="${category}">${category}</button>
  `).join('');
  filters.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderGallery();
    });
  });
}

function renderGallery() {
  const visible = activeFilter === 'All'
    ? ARTWORKS
    : ARTWORKS.filter(art => art.category === activeFilter);

  if (!visible.length) {
    grid.innerHTML = '<div class="empty">No artwork in this collection yet.</div>';
    return;
  }

  grid.innerHTML = visible.map((art, index) => `
    <article class="art-card" tabindex="0" data-index="${ARTWORKS.indexOf(art)}" aria-label="View ${escapeHtml(art.title)}">
      <img loading="lazy" src="${art.image}" alt="${escapeHtml(art.title)} by Rajkumar Gupta">
      <div class="art-card-body">
        <h3>${escapeHtml(art.title)}</h3>
        <p>${escapeHtml(art.medium || '')}${art.year && art.year !== '—' ? ' · ' + escapeHtml(art.year) : ''}</p>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.art-card').forEach(card => {
    const open = () => openArtwork(Number(card.dataset.index));
    card.addEventListener('click', open);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
}

function openArtwork(index) {
  const art = ARTWORKS[index];
  if (!art) return;
  dialogImage.src = art.image;
  dialogImage.alt = `${art.title} by Rajkumar Gupta`;
  dialogTitle.textContent = art.title;
  dialogCategory.textContent = art.category || 'Artwork';
  dialogMeta.textContent = [art.medium, art.year !== '—' ? art.year : ''].filter(Boolean).join(' · ');
  dialogDescription.textContent = art.description || '';
  dialog.showModal();
}

document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
document.getElementById('year').textContent = new Date().getFullYear();

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
  }[char]));
}

renderFilters();
renderGallery();
