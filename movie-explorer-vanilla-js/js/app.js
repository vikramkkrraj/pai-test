import { searchMovies, getMovieById, filterLocalMovies } from './data.js';
import { renderMovies, showLoader, hideLoader, showEmpty, clearUI, openModal, closeModal } from './ui.js';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from './favorites.js';

const searchInput = document.getElementById('searchInput');
const resultsEl = document.getElementById('results');
const loaderEl = document.getElementById('loader');
const emptyStateEl = document.getElementById('emptyState');
const toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');

const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');

let debounceTimer = null;
const DEBOUNCE_MS = 500;
let isFavoritesView = false;

// ========= Event Listeners =========
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (isFavoritesView) return; 
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => performSearch(query), DEBOUNCE_MS);
});

toggleFavoritesBtn.addEventListener('click', () => {
  isFavoritesView = !isFavoritesView;
  if (isFavoritesView) {
    toggleFavoritesBtn.textContent = 'Back to Search';
    showFavorites();
  } else {
    toggleFavoritesBtn.textContent = 'Show Favorites';
    const q = searchInput.value.trim();
    performSearch(q);
  }
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
modalCloseBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


showEmpty('Start typing to search for movies...');
function showFavorites() {
  const favs = getFavorites();
  clearUI(resultsEl, emptyStateEl);
  if (!favs.length) {
    showEmpty('No favorites yet.');
    return;
  }
  hideLoader(loaderEl);
  renderMovies(favs, resultsEl, onViewDetails, true);
}

async function performSearch(query) {
  clearUI(resultsEl, emptyStateEl);
  if (!query) {
    showEmpty('Start typing to search for movies...');
    return;
  }

  showLoader(loaderEl);
  try {
    const movies = await searchMovies(query);
    if (!movies.length) {
      const local = await filterLocalMovies(query);
      if (!local.length) {
        showEmpty('No movies found.');
      } else {
        renderMovies(local, resultsEl, onViewDetails, false);
      }
    } else {
      renderMovies(movies, resultsEl, onViewDetails, false);
    }
  } catch (err) {
    console.error('Search error', err);
    try {
      const local = await filterLocalMovies(query);
      if (!local.length) {
        showEmpty('No movies found (even in fallback).');
      } else {
        renderMovies(local, resultsEl, onViewDetails, false);
      }
    } catch (e) {
      console.error('Local fallback failed', e);
      showEmpty('Something went wrong. Try again later.');
    }
  } finally {
    hideLoader(loaderEl);
  }
}

async function onViewDetails(movie) {
  let full = movie;
  try {
    if (movie.imdbID) {
      full = await getMovieById(movie.imdbID);
    }
  } catch (err) {
    console.warn('OMDb detail failed, falling back to local object', err);
  }
  const favorite = isFavorite(full.imdbID);
  openModal(full, favorite ? 'remove' : 'add', onModalAction);
}

function onModalAction(action, movie) {
  if (action === 'add') {
    addFavorite(movie);
  } else if (action === 'remove') {
    removeFavorite(movie.imdbID);
    if (isFavoritesView) {
      showFavorites();
    }
  }
  closeModal();
}
