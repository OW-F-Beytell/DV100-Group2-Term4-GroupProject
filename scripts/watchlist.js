// // Retrieve and display from localStorage
// function displayWatchlist() {
     const watchlistElement = document.getElementById('movieContainer');
  
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

watchlist = [424, 389];
const apiKey = '453832e297403c7f70c5984dbfa5ebc9';

// Function to create a movie card and append it to the movieContainer
function createMovieCard(movieDetails) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  // Create the card's inner HTML
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}" alt="${movieDetails.title} Poster" />
    <div class="movie-details">
      <h2>${movieDetails.title}</h2>
      <ul class="genre-list">
        ${movieDetails.genres.map(genre => `<li>${genre}</li>`).join('')}
      </ul>
      <p class="director">Director: ${movieDetails.director}</p>
      <p>Score: ${movieDetails.vote_average}</p>
      <p>${movieDetails.overview}</p>
      <button class="remove-button">Remove</button>
    </div>
  `;

  // Add an event listener to the "Remove" button
  card.querySelector('.remove-button').addEventListener('click', function () {
    // Remove the card from the page
    card.remove();

    // Remove the movie from local storage
    const watchlist = JSON.parse(localStorage.getItem('watchList') || '[]');
    const movieIndex = watchlist.indexOf(movieDetails.id);
    if (movieIndex !== -1) {
      watchlist.splice(movieIndex, 1);
      localStorage.setItem('watchList', JSON.stringify(watchlist));
    }
  });

  return card;
}

// Fetch and display movie details for each movie in the watchlist
watchlist.forEach(function (movieID) {
  const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;

  $.ajax({
    url: movieDetailsEndpoint,
    method: 'GET',
    success: function (movieDetails) {
      const director = movieDetails.credits.crew.find(person => person.job === "Director");
      const genresArr = movieDetails.genres.map(genre => genre.name);

      // Create the movie card
      const movieCard = createMovieCard({
        id: movieDetails.id,
        title: movieDetails.title,
        director: director.name,
        vote_average: movieDetails.vote_average,
        poster_path: movieDetails.poster_path,
        overview: movieDetails.overview,
        genres: genresArr,
      });

      // Append the movie card to the movieContainer
      // document.getElementById('#movieContainer').appendChild(movieCard);
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });
});