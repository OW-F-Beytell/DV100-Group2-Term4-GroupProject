$(document).ready(function () {
    // Sample movie data for demonstration
    const movies = [
        {
            title: "Movie 1",
            year: 2023,
            genre: "Action",
            imdbScore: 8.5,
            imageUrl: "movie1.jpg",
        },
        {
            title: "Movie 2",
            year: 2022,
            genre: "Sci-Fi",
            imdbScore: 9.0,
            imageUrl: "movie2.jpg",
        },
        // Add more movie data here
    ];

    // Function to populate movie cards
    function populateMovieCards() {
        const movieList = $('#movie-list');
        movieList.empty();

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];

            const movieCard = $('<div class="movie-card">');
            const movieImage = $(`<img src="${movie.imageUrl}" alt="${movie.title}">`);
            const movieDetails = $('<div class="movie-details">');

            movieDetails.append(`<h3>${movie.title}</h3>`);
            movieDetails.append(`<p>Year: ${movie.year}</p>`);
            movieDetails.append(`<p>Genre: ${movie.genre}</p>`);
            movieDetails.append(`<p>IMDB Score: ${movie.imdbScore}</p>`);
            // Add buttons for individual movie page and watchlist

            movieCard.append(movieImage);
            movieCard.append(movieDetails);
            movieList.append(movieCard);
        }
    }

    // Sample initial movie population
    populateMovieCards();

    // Add event listeners for filter options and update the movie list
    $('#genre, #year, #imdb-score').change(function () {
        // Implement filtering logic based on user selections
        // Update the movies array with filtered data
        // Call populateMovieCards() to display the filtered movies
    });
});
