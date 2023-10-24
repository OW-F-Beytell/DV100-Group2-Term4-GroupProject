// HTML template for the movie card
function createMovieCard(movie) {
   

    return `
    <div class="row movies">
    <div lass="col-sm-6 col-lg-3 col-md-4 col-xl-3 mb-3 col-xxl-2">
      <div class="col-3">
          <div class="card box movie1">
              <div class="card-body overlay2">
                <h5 class="card-title">Movie Title</h5>
                <p class="card-text">Movie details and further information</p>
                <a href="#" class="btn btn-watch">WATCH NOW</a>
              </div>
          </div>    
      </div>
    </div>
  </div>`;
}

const apiKey = '721f6c1ba010dd467b63985221a03ae9';
const tmdbEndpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

// Clear the movieContainer
const movieContainer = $('#movieContainer');
movieContainer.empty();

function createCarouselItem(movie) {

    return `
    <div class="row movies">
    <div lass="col-sm-6 col-lg-3 col-md-4 col-xl-3 mb-3 col-xxl-2">
      <div class="col-3">
          <div class="card box movie1">
              <div class="card-body overlay2">
                <h5 class="card-title">Movie Title</h5>
                <p class="card-text">Movie details and further information</p>
                <a href="#" class="btn btn-watch">WATCH NOW</a>
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
        const movies = data.results.slice(0, 15); // Load only 15 movies

        // Create the carousel items
        const carouselInner = $('#movieCarousel .carousel-inner');
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
                    console.log(`Director: ${director ? director.name : "N/A"}`);
                    console.log(`Description: ${movieDetails.overview}`);
                    console.log(`Viewer Rating: ${movie.vote_average}`);
                    
                    const genresArr = [];

                    movieDetails.genres.forEach(function(genre){
                        genresArr.push(genre.name);
                    });

                    // Create the movie card HTML and append it to the container
                    const movieCard = createMovieCard({
                        title: movie.title,
                        director: director ? director.name : "N/A",
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

