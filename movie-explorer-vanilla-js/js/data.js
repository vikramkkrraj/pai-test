// Data / API layer
const OMDB_API_KEY = '8e2cd48e'; 
const OMDB_BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query){
  const url = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  console.log(res);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'False') return [];
  return (data.Search || []).map(m => ({
    imdbID: m.imdbID,
    Title: m.Title,
    Year: m.Year,
    Poster: m.Poster
  }));
}

export async function getMovieById(id){
  const url = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'False') throw new Error('Not found');
  return data;
}

export async function getLocalMovies(){
  const res = await fetch('data/dummy.json');
  if (!res.ok) throw new Error('Local data missing');
  const data = await res.json();
  return data;
}

export async function filterLocalMovies(query){
  const list = await getLocalMovies();
  const lower = query.toLowerCase();
  return list.filter(m => (m.Title || '').toLowerCase().includes(lower));
}
