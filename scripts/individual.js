let watchListArr = [];
function loadWatchList() {
    if(localStorage.getItem('watchList') === null){
        watchListArr = [];
    }
    else{
        watchListArr = JSON.parse(localStorage.getItem('watchList'));
        console.log(watchListArr);
    }
}

let currMovieID = null;

function loadCurrMovie() {
    if(localStorage.getItem('currMovie') === null){
        currMovieID = null;
    }
    else{
        $('#movieInfoContainer').append(`
        <div class="col">
            <div class="container movieInfo">
                <h1 id="movieTitleHeading">Movie Title</h1>
                <h4 id="movieRating">PG 13</h4>
                <p id="movieDeets">1998 | HD | 1h 30min | Romance | Musical</p> <br>
                <p id="movieSynopsis">An autism spectrum boy starts a beautiful friendship with each other. When they all grew up, a tragic event occurs, putting their friendship on the edge of destruction.</p>

                <p id="movieContributors">Starring: Name Surname, Name Surname, Name Surname. <br>
                    Creators: Name Surname, Name Surname, Name Surname.</p>

                <span class="badge rounded-pill text-bg-light">Rate Movie</span>
                <span class="badge rounded-pill text-bg-light">Share</span>
                <span class="badge rounded-pill text-bg-light">Download</span>
                    <br>
                <a href="#" class="btn btn-play pt-2"><p>PLAY</p></a>
                <a href="#" class="btn btn-trailer pt-2" onclick="addToWatchList(movieID)"><p>ADD TO WATCH LATER</p></a>
            </div>
        </div>

        <div class="col">
            <div class="card h-100" id="posterContainer">
                
            </div>
        </div>
        `);

        currMovieID = JSON.parse(localStorage.getItem('currMovie'));
        // console.log(currMovieID);

        const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${currMovieID}?api_key=${apiKey}&language=en-US&with_crew&append_to_response=credits,images`;
        $.ajax({
            url: movieDetailsEndpoint,
            method: 'GET',
            success: function (currMovie) {
                const castArr = [];
                const directorArr = [];
                const genresArr = [];

                let i = 0;
                currMovie.credits.cast.forEach(function(castMember){
                    i++;
                    if (i <= 5) {
                        castArr.push(castMember.name);
                    }
                });
                console.log(castArr);
                i = 0;
                currMovie.credits.crew.forEach(function(crewMember){
                    if (crewMember.job === "Director") {
                        directorArr.push(crewMember.name);
                    }
                });
                currMovie.genres.forEach(function(genre){
                    genresArr.push(genre.name);
                });

                // Create the movie card HTML and append it to the container
                const movieDetails = {
                    movieID : currMovie.id,
                    movieTitle: currMovie.title,
                    movieYear: currMovie.release_date.substr(0, 4),
                    movieDescription: currMovie.overview,
                    movieCast: castArr.join(", "),
                    movieDirector: directorArr.join(", "),
                    movieScore: currMovie.vote_average,
                    moviePoster: currMovie.poster_path,
                    movieGenreList: genresArr.join(", ")
                };

                $('#movieTitleHeading').text(movieDetails.movieTitle);

                // $('#movieDeets').html(`${movieDetails.movieYear} |`);

                $('#movieContributors').html(`<strong>Starring:</strong> ${movieDetails.movieCast} <br>
                <strong>Creators:</strong> ${movieDetails.movieDirector}`);

                $('#posterContainer').append(`
                    <img src="https://image.tmdb.org/t/p/w500${movieDetails.moviePoster}" style="border-radius: 20px;" class="card-img-top" alt="..."></img>
                `);
                console.log(currMovie);
                console.log(movieDetails);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
        
    
    }
}

const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
const tmdbEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

const suggestedMovieContainer = $('#suggestedMovieContainer');


$(document).ready(function () {
    loadCurrMovie();
    loadWatchList();
    loadSuggestedMovieContent();
})

function loadSuggestedMovieContent() {
    $.ajax({
        url: tmdbEndpoint,
        method: 'GET',
        success: function (data) {
            const movies = data.results.slice(0, 12);

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
                        suggestedMovieContainer.append(movieCard);
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
            </div>`;
    return returnValue;
}


function addToWatchList(movieID){
    watchListArr.push(movieID);

    if(localStorage.getItem('watchList') === null){
        localStorage.setItem('watchList',JSON.stringify(watchListArr));
    }
    else{
        localStorage.setItem('watchList',JSON.stringify(watchListArr));
    }
    console.log(watchListArr);
}

function goToMovie(movieID) {
    localStorage.setItem('currMovie', JSON.stringify(movieID));
    console.log(movieID);    
}