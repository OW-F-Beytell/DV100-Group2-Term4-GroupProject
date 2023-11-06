const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
let movieAPIEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;
let currMovieID = null;
let trailerContainer = $('#trailerContainer');
const suggestedMovieContainer = $('#suggestedMovieContainer');

let watchListArr = [];
function loadWatchList() {
    if(localStorage.getItem('watchList') === null){
        watchListArr = [];
    }
    else{
        watchListArr = JSON.parse(localStorage.getItem('watchList'));
    }
}

function loadCurrMovie() {
    if(localStorage.getItem('currMovie') === null){
        currMovieID = null;
    }
    else{
        $('#movieInfoContainer').append(`
            <div class="col">
                <div class="container movieInfo">
                    <h1 id="movieTitleHeading">Movie Title</h1>
                    <p id="movieDeets" style="font-weight: bold;">1998 | 1h 30min | Romance | Musical</p> <br>
                    <p id="movieSynopsis">An autism spectrum boy starts a beautiful friendship with each other. When they all grew up, a tragic event occurs, putting their friendship on the edge of destruction.</p>
                    <p id="movieContributors">Starring: Name Surname, Name Surname, Name Surname. <br>
                        Creators: Name Surname, Name Surname, Name Surname. <br>
                        Creators: Name Surname, Name Surname, Name Surname.</p>
                    <a href="#" class="btn btn-play pt-2"><p>PLAY</p></a>
                    <a href="#" class="btn btn-trailer pt-2" onclick="addToWatchList(movieID)"><p>ADD TO WATCH LATER</p></a>
                </div>
            </div>
            <div class="col" style="text-align: center;">
                <img src="../assets/Example movie poster.png" class="img-fluid" id="posterContainer" style="border-radius: 5%;">
            </div>
        `);

        currMovieID = JSON.parse(localStorage.getItem('currMovie'));

        const movieDetailsURL = `https://api.themoviedb.org/3/movie/${currMovieID}?api_key=${apiKey}&language=en-US&with_crew&append_to_response=credits,images,videos,release_dates`;
        $.ajax({
            url: movieDetailsURL,
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
                i = 0;
                currMovie.credits.crew.forEach(function(crewMember){
                    if (crewMember.job === "Director") {
                        directorArr.push(crewMember.name);
                    }
                });
                currMovie.genres.forEach(function(genre){
                    genresArr.push(genre.name);
                });

                function minsToHrs(mins) {
                    let numHours = Math.floor(mins / 60);
                    let numMins = mins - numHours*60;
                    return numHours.toString() + "h " + numMins.toString() + "mins";                    
                }
                let movieVids = currMovie.videos.results;
                let videoAddress = "";
               movieVids.forEach(function (video) {
                    if (video.type === "Trailer") {
                        videoAddress = "https://www.youtube.com/embed/" + video.key;
                    }
                })
                // Create the movie card HTML and append it to the container
                const movieDetails = {
                    movieID : currMovie.id,
                    movieTitle: currMovie.title,
                    movieYear: currMovie.release_date.substr(0, 4),
                    movieDuration: minsToHrs(currMovie.runtime),
                    movieDescription: currMovie.overview,
                    movieCast: castArr.join(", "),
                    movieDirector: directorArr.join(", "),
                    movieScore: currMovie.vote_average,
                    moviePoster: currMovie.poster_path,
                    movieTrailer: videoAddress,
                    movieGenreList: genresArr.join(" | ")
                };

                $('#movieTitleHeading').text(movieDetails.movieTitle);
                $('#movieDeets').html(`${movieDetails.movieYear} | ${movieDetails.movieDuration} | ${movieDetails.movieGenreList}`);
                $('#movieSynopsis').text(movieDetails.movieDescription);
                $('#movieContributors').html(`<strong>Starring:</strong> ${movieDetails.movieCast} <br>
                <strong>Creators:</strong> ${movieDetails.movieDirector} <br>
                <strong>Audience Rating:</strong> ${(movieDetails.movieScore *10).toFixed(2)}%`);
                $('#posterContainer').attr("src", "https://image.tmdb.org/t/p/w500"+movieDetails.moviePoster);
                trailerContainer.append(`
                    <p class="ratio ratio-16x9" align="center"><iframe src="${movieDetails.movieTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>    
                `);

                loadSimilarMovies(currMovie.genres);
                console.log(currMovie.genres);
            },
            error: function (error) {
                console.log('Error:', error);
            }
    });
}
}



$(document).ready(function () {
    loadCurrMovie();
    loadWatchList();
})

function createSuggestionRow(){
    return `
        <div class="row row-cols-2 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-xs-2 g-4" id="suggestionContainer">
            
        </div>
    `;
}


function loadSimilarMovies(genres) {
    genres.forEach(function (genre) {
        suggestedMovieContainer.append(`<h4 style="margin-top: 25px;">${genre.name}</h4>`);
        genreName = genre.name;
        suggestedMovieContainer.append(`
            <div class="row row-cols-2 row-cols-xl-6 row-cols-lg-3 row-cols-md-2 row-cols-xs-2 g-4" id="${genreName}Container" style="margin-top: 0;">
                
            </div>
        `);
        const currContainer = $(`#${genreName}Container`);
        callGenresMovies(genre.id, currContainer);
    });
    
}
function callGenresMovies(genre, container) {
    suggestedGenreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genre.id}&append_to_response=credits,images`;
    $.ajax({
        url: suggestedGenreURL,
        method: 'GET',
        success: function (data) {
            console.log(data);
            const movies = data.results.slice(0, 8);

            movies.forEach(function (movie, index) {
                callSingleMovie(movie, container);
            });
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}
function callSingleMovie(movie, container) {
    const movieId = movie.id;
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

    $.ajax({
        url: movieDetailsURL,
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

            container.append(movieCard);
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