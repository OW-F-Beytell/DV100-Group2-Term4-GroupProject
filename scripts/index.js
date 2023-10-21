// Define an array of movie objects
const movies = [
    {
      title: "Movie 1",
      genre: "Action",
      description: "Description for Movie 1",
      watchNow: 1,
    },
    {
      title: "Movie 2",
      genre: "Horror",
      description: "Description for Movie 2",
      watchNow: 2,
    },
    // Add 23 more movies here with similar structure
  ];

  // Function to generate movie cards
  function generateMovieCards() {
    const movieLibrary = document.querySelector(".movie-library-page");
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const movieCard = document.createElement("div");
      movieCard.classList.add("group");
      movieCard.id = `moviecard${i + 1}`;

      const movieDetails = document.createElement("div");
      movieDetails.classList.add("group-2");

      const overlapGroup = document.createElement("div");
      overlapGroup.classList.add("overlap-group");

      const movieTitle = document.createElement("div");
      movieTitle.classList.add("text-wrapper-4");
      movieTitle.textContent = movie.title;

      const movieDescription = document.createElement("p");
      movieDescription.classList.add("text-wrapper-3");
      movieDescription.textContent = movie.description;

      overlapGroup.appendChild(movieTitle);
      overlapGroup.appendChild(movieDescription);

      const watchNowButton = document.createElement("div");
      watchNowButton.classList.add("frame-4");
      watchNowButton.classList.add("link-2");
      watchNowButton.textContent = "WATCH NOW";
      watchNowButton.setAttribute("onclick", `watchNow(${movie.watchNow})`);

      movieDetails.appendChild(overlapGroup);
      movieDetails.appendChild(watchNowButton);

      movieCard.appendChild(movieDetails);
      movieLibrary.appendChild(movieCard);
    }
  }

  // Call the function to generate movie cards
  generateMovieCards();
