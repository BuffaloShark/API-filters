const apiKey = '4c143b18';
const apiURL = 'https://www.omdbapi.com/';

const searchMovies = async () => {
  const searchInput = document.querySelector('#search-input');
  const listMovie = document.querySelector('#list-movie');

  const query = searchInput.value.trim();
  if (!query) return;

  listMovie.innerHTML = 'Loading...';

  const res = await fetch(`${apiURL}?apiKey=${apiKey}&s=${query}`);
  const data = await res.json();

  if (data.Response === 'True') {
    listMovie.innerHTML = data.Search.map(movie => `
      <div class="col-md-4">
        <div class="card my-2" data-id="${movie.imdbID}">
          <img src="${movie.Poster}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          </div>
        </div>
      </div>
    `).join('');
  } else {
    listMovie.innerHTML = `<h1 class="text-center">${data.Error}</h1>`;
  }

};


document.querySelector('#search-button').addEventListener('click', searchMovies);

document.querySelector('#search-input').addEventListener('keyup', e => {
  if (e.key === 'Enter') searchMovies();
});

document.querySelector('#list-movie').addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (card?.dataset.id) showMovieDetails(card.dataset.id);
});
