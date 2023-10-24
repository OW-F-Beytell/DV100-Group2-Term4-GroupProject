
/* Movie Library JS */
    // script.js

// Define your API keys here (consider using environment variables)
const apiKey = 'your_api_key';

// Fetch and populate movie data
function fetchAndPopulateMovies() {
    // Get selected filter criteria
    const selectedGenre = document.getElementById('genre').value;
    const selectedYear = document.getElementById('year').value;
    const minIMDB = document.getElementById('imdb').value;
    const maxIMDB = document.getElementById('imdb').value;

    // Construct your API endpoint with API key and filter criteria
    const apiUrl = `https://api.example.com/movies?api_key=${apiKey}&genre=${selectedGenre}&year=${selectedYear}&minIMDB=${minIMDB}&maxIMDB=${maxIMDB}`;

    // Make an API request to fetch movie data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear existing movie cards
            const movieContainer = document.getElementById('movie-container');
            movieContainer.innerHTML = '';

            // Populate movie cards with fetched data
            data.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('col-md-3', 'mb-3');
                card.innerHTML = `
                    <div class="card">
                        <img src="${movie.imageUrl}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.description}</p>
                            <p class="card-text">IMDB Score: ${movie.imdbScore}</p>
                            <a href="individual-movie.html" class="btn btn-primary">View Movie</a>
                            <button class="btn btn-secondary">Watch Movie</button>
                        </div>
                    </div>
                `;
                movieContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}

// Add event listeners to trigger movie fetch when filter criteria change
document.getElementById('genre').addEventListener('change', fetchAndPopulateMovies);
document.getElementById('year').addEventListener('change', fetchAndPopulateMovies);
document.getElementById('imdb').addEventListener('change', fetchAndPopulateMovies);

// Initial population of movies on page load
fetchAndPopulateMovies();
