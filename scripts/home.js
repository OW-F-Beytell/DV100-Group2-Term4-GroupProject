let watchListArr = [];
function loadWatchList() {
    if(localStorage.getItem('watchList') === null){
        watchListArr = [];
    }
    else{
        watchListArr = JSON.parse(localStorage.getItem('watchList'));
    }
}

const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
const tmdbEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

const movieContainer = $('#movieContainer');


$(document).ready(function () {
    loadWelcomeMovieContent();
})

function loadWelcomeMovieContent() {
    $.ajax({
        url: tmdbEndpoint,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 12); // Load only 12 movies

            movies.forEach(function (movie, index) {

                const movieId = movie.id;
                const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

                $.ajax({
                    url: movieDetailsEndpoint,
                    method: 'GET',
                    success: function (movieDetails) {
                        const director = movieDetails.credits.crew.find(person => person.job === "Director");
                        
                        const genresArr = [];

                        movieDetails.genres.forEach(function(genre){
                            genresArr.push(genre.name);
                        });

                        // Create the movie card HTML and append it to the container
                        const movieCard = createMovieCard({
                            movieID : movie.id,
                            movieTitle: movie.title,
                            movieDirector: director.name,
                            movieScore: movie.vote_average,
                            moviePoster: movie.poster_path,
                            movieDescription: movieDetails.overview,
                            movieGenreList: genresArr
                        });

                        // Append the card to the movieContainer
                        movieContainer.append(movieCard);
                    },
                    error: function (error) {
                        console.log('Error:', error);
                    }
                });
            });
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}


function createMovieCard(movie) {
    const director = movie.movieDirector ? movie.movieDirector : "N/A";
    const rating = movie.movieScore ? movie.movieScore : "N/A";
    let returnValue = `
            <div class="col">
                <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w500${movie.moviePoster}" style="border-radius: 20px;" class="card-img-top" alt="...">
                    <div class="card-img-overlay">
                        <h3> ${movie.movieTitle}</h3>
                        <p>Director: ${director}<br> Rating: ${rating}</p>
                        <a href="../pages/individual page.html" class="btn btn-watch" onclick="goToMovie(${movie.movieID});">WATCH NOW</a>
                        <a class="btn btn-watch" onclick="addToWatchList(${movie.movieID});">WATCH LATER</a>
                    </div>
                </div>
            </div>
            `;

    return returnValue;
}

// Function to create a carousel item from movie data
function createCarouselItem(movie) {
    const director = movie.director ? movie.director : "N/A";
    const rating = movie.vote_average ? movie.vote_average : "N/A";

    return `
        <div class="carousel-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="d-block w-100 background-img" alt="...">
            <div class="overlay">
                <div class="card m-5" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${movie.title}</h2>
                                <p class="card-text">Director: ${director}</p>
                                <p>Rating: ${rating}</p>
                                <img src="assets/Retro-btn.svg">
                                <img src="assets/Add-btn.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

function addToWatchList(movieID){
    watchListArr.push(movieID);

    localStorage.setItem('watchList',JSON.stringify(watchListArr));
    console.log(watchListArr);
}

function goToMovie(movieID) {
    localStorage.setItem('currMovie', JSON.stringify(movieID));
}