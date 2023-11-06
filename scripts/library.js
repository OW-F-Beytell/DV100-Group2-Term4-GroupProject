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
const movieContainer = $('#movieContainer'); //Stel na whatever jy die kaarte by wil add





// Stuk code om die genre id te vind //
loadMovieContent(chosenGenreID);





function loadMovieContent(chosenGenreID) {

    const tmdbEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${chosenGenreID}&append_to_response=credits,images`;

    $.ajax({
        url: tmdbEndpoint,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 25); // Load only 25 movies

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