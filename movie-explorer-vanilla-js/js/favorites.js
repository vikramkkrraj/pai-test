const STORAGE_KEY = 'movie_explorer_favorites_v1';

export function getFavorites(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  }catch(e){
    console.error('getFavorites parse', e);
    return [];
  }
}

export function saveFavorites(list){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }catch(e){
    console.error('saveFavorites', e);
  }
}

export function addFavorite(movie){
  const list = getFavorites();
  if (!movie || !movie.imdbID) return;
  if (list.some(m => m.imdbID === movie.imdbID)) return; 
  const keep = pick(movie, ['imdbID','Title','Year','Genre','Plot','Poster']);
  list.push(keep);
  saveFavorites(list);
}

export function removeFavorite(id){
  const list = getFavorites().filter(m => m.imdbID !== id);
  saveFavorites(list);
}

export function isFavorite(id){
  const list = getFavorites();
  return list.some(m => m.imdbID === id);
}

function pick(obj, keys){
  const out = {};
  keys.forEach(k => out[k] = obj[k]);
  return out;
}
