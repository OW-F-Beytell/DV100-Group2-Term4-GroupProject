
//------------------------------------
// Movie Library js//

const moviecard1 = [
    { name: "The Fast and Furious", info: "This is the first movie" },
    { name: "Movie 2", info: "Another exciting movie" },
    { name: "Movie 3", info: "Don't miss this one!" }
];

// Function to populate movie cards
function populateMovieCards() {
    const movieCardsContainer = document.getElementById("movie-cards-container");

    movies.forEach((movie, index) => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <div class="movie-info">
                <h2 class="movie-name">${movie.name}</h2>
                <p class="movie-description">${movie.info}</p>
            </div>
            <button class="watch-now-button" onclick="watchNow(${index})">WATCH NOW</button>
        `;

        movieCardsContainer.appendChild(movieCard);
    });
}

// Function to simulate "WATCH NOW" button action
function watchNow(index) {
    alert(`You clicked the 'WATCH NOW' button for Movie ${index + 1}`);
}

// Call the function to populate movie cards
populateMovieCards();
