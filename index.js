const API_KEY =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5f5ed0d111b066d1979166145c58d65d&page=1";

const image_Path = "https://image.tmdb.org/t/p/original";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=5f5ed0d111b066d1979166145c58d65d&query=";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector(".search");
fetchMovies(API_KEY);
async function fetchMovies(url) {
  const res = await fetch(url);
  const movieData = await res.json();
  // console.log(movieData.results);
  loadMovie(movieData);

  return movieData;
}

function loadMovie(movieData) {
  main.innerHTML = "";

  movieData.results.forEach((element) => {
    const { title, vote_average, poster_path, overview } = element;
    const div = document.createElement("div");
    div.classList.add("movie");
    // img.src = image_Path + element.poster_path;
    div.innerHTML = `
    <img
          src=${image_Path + poster_path}
          alt="logo"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class='${getVoteBy(vote_average)}'>${vote_average}</span>
        </div>

        <div class='overview'>
        <h3>Overview</h3>
        ${overview}</div>`;

    main.appendChild(div);
  });
}

function getVoteBy(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = search.value;
  if (searchInput) {
    fetchMovies(searchApi + searchInput);
    search.value = "";
  }
});
