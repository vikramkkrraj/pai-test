import { isFavorite } from './favorites.js';

export function renderMovies(movies, container, onViewDetails, isFavorites){
  clearElement(container);
  if (!movies || !movies.length) return;
  movies.forEach((m, idx) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.animationDelay = (idx * 0.04) + 's';
    card.innerHTML = `
      <img src="${sanitize(m.Poster)}" alt="${sanitize(m.Title)}" />
      <div class="card-body">
        <h3 class="card-title">${sanitize(m.Title)}</h3>
        ${m.Year ? `<div class="card-meta">${sanitize(m.Year)}</div>` : ''}
        <button class="view-details">View Details</button>
      </div>
    `;
    card.querySelector('.view-details').addEventListener('click', () => onViewDetails(m));
    container.appendChild(card);
  });
}

export function openModal(movie, mode, onAction){
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  overlay.classList.remove('hidden');

  const {
    Poster, Title, Year, Genre, Plot, imdbID
  } = movie;

  const actionBtnLabel = mode === 'add' ? 'Add to Favorites' : 'Remove from Favorites';
  const actionBtnClass = mode === 'add' ? 'btn-primary' : 'btn-danger';

  content.innerHTML = `
    <div class="modal-content">
      <img src="${sanitize(Poster)}" alt="${sanitize(Title)}"/>
      <div class="modal-details">
        <h2>${sanitize(Title)}</h2>
        ${Year ? `<p><strong>Year:</strong> ${sanitize(Year)}</p>` : ''}
        ${Genre ? `<p><strong>Genre:</strong> ${sanitize(Genre)}</p>` : ''}
        ${Plot ? `<p><strong>Plot:</strong> ${sanitize(Plot)}</p>` : ''}
        <div class="modal-actions">
          <button id="actionBtn" class="${actionBtnClass}">${actionBtnLabel}</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('actionBtn').addEventListener('click', () => {
    onAction(mode, movie);
  });
}

export function closeModal(){
  document.getElementById('modalOverlay').classList.add('hidden');
}

export function showLoader(loader){
  loader.classList.remove('hidden');
}
export function hideLoader(loader){
  loader.classList.add('hidden');
}

export function showEmpty(message){
  const el = document.getElementById('emptyState');
  el.textContent = message;
  el.classList.remove('hidden');
}
export function clearUI(results, emptyEl){
  clearElement(results);
  emptyEl.textContent = '';
  emptyEl.classList.add('hidden');
}

function clearElement(el){
  while(el.firstChild) el.removeChild(el.firstChild);
}

function sanitize(str){
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, s => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[s]));
}

export { clearElement };
