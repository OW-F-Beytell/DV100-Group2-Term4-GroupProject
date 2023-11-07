let watchListArr = [];
function loadWatchList() {
    if(localStorage.getItem('watchList') === null){
        watchListArr = [];
    }
    else{
        watchListArr = JSON.parse(localStorage.getItem('watchList'));
    }
}

// The apiKey and tmdbEndpoint declared at the top level for accessibility
const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
let tmdbURL = '';

// Assume 'movieblock' is an ID of an element
let movieContainer = $('#movieContainer');

$(document).ready(function () {
    loadInitialContent();
});

function loadInitialContent() {
    tmdbURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

    $.ajax({
        url: tmdbURL,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 25); // Adjust the number of movies as needed

            movies.forEach(function (movie, index) {
                const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

                $.ajax({
                    url: movieDetailsEndpoint,
                    method: 'GET',
                    success: function (movieDetails) {
                        const director = movieDetails.credits.crew.find(person => person.job === "Director");
                        const genresArr = movieDetails.genres.map(genre => genre.name);

                        const movieCard = createMovieCard({
                            movieID: movie.id,
                            movieTitle: movie.title,
                            movieDirector: director ? director.name : "N/A",
                            movieScore: movie.vote_average,
                            moviePoster: movie.poster_path,
                            movieDescription: movieDetails.overview,
                            movieGenreList: genresArr,
                        });

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

// Fixed equality checks in the dropdownOnclick function
function dropdownOnclick() {
    let genreName = $('#genreFilter').val();
    console.log(genreName);
    let genreID = -1;

    if (genreName === 'action') {
        genreID = 28;
    } else if (genreName === 'animation') {
        genreID = 16;
    } else if (genreName === 'comedies') {
        genreID = 35;
    } else if (genreName === 'crime') {
        genreID = 80;
    } else if (genreName === 'drama') {
        genreID = 18;
    } else if (genreName === 'fantasy') {
        genreID = 14;
    } else if (genreName === 'horror') {
        genreID = 27;
    } else if (genreName === 'kidsFam') {
        genreID = 10751;
    } else if (genreName === 'musicals') {
        genreID = 10402;
    } else if (genreName === 'romance') {
        genreID = 10749;
    } else if (genreName === 'mystery') {
        genreID = 9648;
    } else if (genreName === 'sciFi') {
        genreID = 878;
    } else if (genreName === 'thrillers') {
        genreID = 53;
    }

    filterMovies(genreID);
}

// Function to filter movies by genre
function filterMovies(genreID) {
    tmdbURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreID}&append_to_response=credits,images`;
    movieContainer.empty();
    $.ajax({
        url: tmdbURL,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 25); // Adjust the number of movies as needed

            movies.forEach(function (movie, index) {
                const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

                $.ajax({
                    url: movieDetailsEndpoint,
                    method: 'GET',
                    success: function (movieDetails) {
                        const director = movieDetails.credits.crew.find(person => person.job === "Director");
                        const genresArr = movieDetails.genres.map(genre => genre.name);

                        const movieCard = createMovieCard({
                            movieID: movie.id,
                            movieTitle: movie.title,
                            movieDirector: director ? director.name : "N/A",
                            movieScore: movie.vote_average,
                            moviePoster: movie.poster_path,
                            movieDescription: movieDetails.overview,
                            movieGenreList: genresArr,
                        });

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
    
    // Create and return the movie card HTML
    // The movie card creation code here remains unchanged
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
    </div>`;
return returnValue;
}

function addToWatchList(movieID){
    watchListArr.push(movieID);
    localStorage.setItem('watchList', JSON.stringify(watchListArr));
}

function goToMovie(movieID) {
    localStorage.setItem('currMovie', JSON.stringify(movieID));
}

$(document).ready(function () {
    loadWatchList();
    // Call any other functions needed on document ready
});
