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
    const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
    const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits,images`;
    $.ajax({
        url: movieDetailsEndpoint,
        method: 'GET',
        success: function (movieDetails) {
            const director = movieDetails.credits.crew.find(person => person.job === "Director");

            const genresArr = [];

            movieDetails.genres.forEach(function(genre){
                genresArr.push(genre.name);
            });

            // // Create movie card function
             function createMovieCard({ movie }) {
                 return (
                     `<div className="movie-card">
                         <img src={'https://image.tmdb.org/t/p/w500/${movie.poster_path}} alt={${movie.title} Poster'} />
                         <h2>{movie.title}</h2>
                         <p>Director: {movie.director}</p>
                         <p>Score: {movie.vote_average}</p>
                         <p>{movie.overview}</p>
                         <ul className="genre-list">
                             {movie.genres.map(genre => (
                                 <li key={genre.id}>{genre.name}</li>
                             ))}
                         </ul>
                     </div>`
             );
        }

            // const movieData = {
            //     id: 1,
            //     title: 'Movie Title',
            //     director: 'Director Name',
            //     vote_average: 8.0,
            //     poster_path: '/path/to/poster.jpg',
            //     overview: 'Movie description here.',
            //     genres: [{id: 1, name: 'Action' }, {id: 2, name: 'Drama' }]
            // };


            // Create the movie card HTML and append it to the container
            const movieCard = createMovieCard({
                movie: {
                    id: movieDetails.id,
                    title: movieDetails.title,
                    director: director.name,
                    vote_average: movieDetails.vote_average,
                    moviePoster: movie.poster_path,
                    overview: movieDetails.overview,
                    genres: genresArr
                }
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
