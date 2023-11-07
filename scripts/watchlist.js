const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
// // Retrieve and display from localStorage
const watchlistElement = document.getElementById('movieContainer');

let watchlist = [];

function loadWatchList() {
  if(localStorage.getItem('watchList') === null){
    watchlist = [];
  }
  else{
    watchlist = JSON.parse(localStorage.getItem('watchList'));
  }
  console.log(watchlist);
  displayWatchList();
}

$(document).ready(function () {
  loadWatchList();
  // displayWatchList();
});

function displayWatchList() {
  $("#movieContainer").empty();
   // Fetch and display movie details for each movie in the watchlist
  watchlist.forEach(function (movieID) {
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

    $.ajax({
      url: movieDetailsURL,
      method: 'GET',
      success: function (movieDetails) {
        const director = movieDetails.credits.crew.find(person => person.job === "Director");
        const genresArr = movieDetails.genres.map(genre => genre.name);

        // Create the movie card
        const movieCard = createMovieCard({
          movieID: movieDetails.id,
          movieTitle: movieDetails.title,
          movieDirector: director ? director.name : "N/A",
          movieScore: movieDetails.vote_average,
          moviePoster: movieDetails.poster_path,
          movieDescription: movieDetails.overview,
          movieGenreList: genresArr,
        });

        // Append the movie card to the movieContainer
        $("#movieContainer").append(movieCard);
      },
      error: function (error) {
        console.log('Error:', error);
      }
    });
  });
}

// Function to create a movie card and append it to the movieContainer
function createMovieCard(movie) {
  const director = movie.movieDirector ? movie.movieDirector : "N/A";
  const rating = movie.movieScore ? movie.movieScore : "N/A";

  return `
          <div class="col">
              <div class="card h-100">
                  <img src="https://image.tmdb.org/t/p/w500${movie.moviePoster}" style="border-radius: 20px;" class="card-img-top" alt="...">
                  <div class="card-img-overlay align-items-center">
                          <h3> ${movie.movieTitle}</h3>
                          <p>Director: ${director}<br> Rating: ${rating}</p>
                          <a href="../pages/individual page.html" class="btn btn-watch" onclick="goToMovie(${movie.movieID});">WATCH NOW</a>
                          <a class="btn btn-watch" onclick="removeFromWatchList(${movie.movieID});">REMOVE</a>
                  </div>
              </div>
          </div>`;
}

function removeFromWatchList(movieID) {
  watchlist.forEach(function (index) {
    if (index === movieID) {
      watchlist.pop()
    }
  });
  console.log(watchlist);
  localStorage.setItem('watchList',JSON.stringify(watchlist));
  loadWatchList();
}