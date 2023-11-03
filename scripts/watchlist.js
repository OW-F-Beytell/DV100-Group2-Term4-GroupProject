// // Retrieve and display from localStorage
// function displayWatchlist() {
//     const watchlistElement = document.getElementById('watchlist');
  
//     // Check if 'watchList' item is in the localstorage
//     if (localStorage.getItem('watchList')) {
//       // Retrieve and parse the watchlist data from localStorage
//       const watchListData = JSON.parse(localStorage.getItem('watchList'));
  
//       // Check if there are items in watchlist
//       if (watchListData.length > 0) {
//         // Create a HTML list to display the watchlist
//         const ul = document.createElement('ul');
  
//         // Loop through movie ID in the watchlist and create list
//         watchListData.forEach((movieID) => {
//           const li = document.createElement('li');
//           li.textContent = `Movie ID: ${movieID}`;
//           ul.appendChild(li);
//         });
  
//         // Append the list to the watchlist element
//         watchlistElement.appendChild(ul);
//       } else {
//         watchlistElement.textContent = 'Your watchlist is empty.';
//       }
//     } else {
//       watchlistElement.textContent = 'Your watchlist is empty.';
//     }
//   }
  
//   // Call function to display the watchlist when the page load
//   displayWatchlist();

watchlist = [424,389];
// watchlist = JSON.parse(localStorage.getItem('watchList'));
watchlist.forEach(function (movieID) {
    const movieDetailsEndpoint = 'https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits,images';
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
            console.log(movieDetails)
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
});
