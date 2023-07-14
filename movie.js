const apiUrl = "http://localhost:3000/movies";

function fetchMovies() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(movies => displayMovies(movies))
}

function displayMovies(movies) {
  const moviesList = document.getElementById("movies");
  moviesList.innerHTML = "";

  movies.map(movie => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
      <button onclick="editMovie(${movie.id})">Edit</button>
      <button onclick="deleteMovie(${movie.id})">Delete</button>
    `;
    moviesList.appendChild(listItem);
  });
}

function addMovie(e) {
    e.preventDefault();

    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");
    const directorInput = document.getElementById("director");
    const releaseYearInput = document.getElementById("release-year");

    const movie = {
        title: titleInput.value,
        genre: genreInput.value,
        director: directorInput.value,
        releaseYear: parseInt(releaseYearInput.value)
    };

    fetch(apiUrl, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(() => {
        fetchMovies();
        titleInput.value = "";
        genreInput.value = "";
        directorInput.value = "";
        releaseYearInput.value = "";
    })
}

function editMovie(movieId) {
    const title = prompt("Enter the new title:");
    const genre = prompt("Enter the new genre:");
    const director = prompt("Enter the new director:");
    const releaseYear = parseInt(prompt("Enter the new release year:"));

    const updatedMovie={title,genre,director,releaseYear}

    fetch(`${apiUrl}/${movieId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedMovie)
    })
    .then(response => response.json())
    .then(() => {
        fetchMovies();
    })
}

function deleteMovie(movieId) {
    if (confirm("Are you sure you want to delete this movie?")) {
    fetch(`${apiUrl}/${movieId}`, {
        method: "DELETE"
    })
    .then(() => {
        fetchMovies();
    })}
}
document.getElementById("movie-form").addEventListener("submit", addMovie);

fetchMovies();
