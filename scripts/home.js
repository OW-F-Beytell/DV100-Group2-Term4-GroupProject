JS: // HTML template for the movie card
function createMovieCard(movie) {
    const director = movie.director ? movie.director : "N/A";
    const rating = movie.vote_average ? movie.vote_average : "N/A";

    return `
        <div class="col-6 col-lg-3 col-md-4 col-xl-2 mb-3">
            <div class="movie-container">
                <img class="movie-block" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <div class="img-overlay">
                    <h4>${movie.title}</h4>
                    <p>Director: ${director} <br> Rating: ${rating}</p>
                    <button type="button" class="btn">
                        <div class="row movie-links">
                            <div class="col-8">
                                <a href="pages/movie.html">
                                    
                                </a>
                            </div>
                            <div class="col-4">
                               
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>`;
}

const apiKey = '721f6c1ba010dd467b63985221a03ae9';
const tmdbEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

const movieContainer = $('#movieContainer');
movieContainer.empty();

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

// API
$.ajax({
    url: tmdbEndpoint,
    method: 'GET',
    success: function (data) {
        const movies = data.results.slice(0, 12); // Load only 12 movies

        // Create the carousel items
        const carouselInner = $('#movieCarousel .carousel-inner');
        carouselInner.empty();
        // carouselInner.empty();

        movies.forEach(function (movie, index) {
            console.log(`Movie ${index + 1}:`);
            console.log(`Title: ${movie.title}`);

            const movieId = movie.id;
            const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

            $.ajax({
                url: movieDetailsEndpoint,
                method: 'GET',
                success: function (movieDetails) {
                    console.log(`Title: ${movie.title}`);
                    const director = movieDetails.credits.crew.find(person => person.job === "Director");
                    console.log(`Director: ${director}`);
                    console.log(`Description: ${movieDetails.overview}`);
                    console.log(`Viewer Rating: ${movie.vote_average}`);
                    
                    const genresArr = [];

                    movieDetails.genres.forEach(function(genre){
                        genresArr.push(genre.name);
                    });

                    // Create the movie card HTML and append it to the container
                    const movieCard = createMovieCard({
                        title: movie.title,
                        director: director.name,
                        vote_average: movie.vote_average,
                        poster_path: movie.poster_path,
                        description: movieDetails.overview,
                        genres: genresArr
                    });

                    // Append the card to the movieContainer
                    movieContainer.append(movieCard);

                    // Create the carousel item and append it to the carousel
                    const carouselItem = createCarouselItem(movie);
                    carouselInner.append(carouselItem);

                    console.log('-------------------------');
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

function addToWatchList(title,director,rating, description, genres, imageurl){
    console.log(genres)
    const temp = {
        'title':title,
        'director':director,
        'rating':rating,
        'description':description,
        'genres':genres,
        'imgUrl':imageurl
    }

    if(localStorage.getItem('watchList') === null){
        localStorage.setItem('watchList',JSON.stringify([temp]));
    }
    else{
        const watchList = JSON.parse(localStorage.getItem('watchList'));
        watchList.push(temp);
        localStorage.setItem('watchList',JSON.stringify(watchList));
    }
 

}

function addToLocalStorageAndGoToMovie(title, director, rating, description, genres, imageurl, cast, boxOffice) {
    // Create an object with the movie data
    const temp = {
        'title': title,
        'director': director,
        'rating': rating,
        'description': description,
        'genres': genres,
        'imgUrl': imageurl,
        'actors': cast,
        'box-office': boxOffice
    };

    // Check if local storage already contains a 'movie' key
    if (localStorage.getItem('movie') === null) {
        // If not, create a new array and add the movie data
        localStorage.setItem('movie', JSON.stringify([temp]));
    } else {
        // If it exists, retrieve the existing data, add the new movie data, and update local storage
        const movie = JSON.parse(localStorage.getItem('movie'));
        movie.push(temp);
        localStorage.setItem('movie', JSON.stringify(movie));
    }

    // Redirect to the website
    window.location.href = 'pages/movie.html';

    
}