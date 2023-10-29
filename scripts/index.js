// JavaScript code in your library.js file

// Define a function to populate movie cards
function populateMovieCards(movieData) {
    const movieContainer = document.querySelector('.movies');
  
    // Iterate through the movie data and create a card for each movie
    movieData.forEach((movie) => {
      const movieCard = document.querySelector('.movie').cloneNode(true);
  
      // Populate the card with movie data
      const cardTitle = movieCard.querySelector('.card-title');
      const cardText = movieCard.querySelector('.card-text');
      const watchNowButton = movieCard.querySelector('.btn-watch');
  
      cardTitle.textContent = movie.title;
      cardText.textContent = movie.description;
      watchNowButton.href = movie.link;
  
      // Append the movie card to the movies container
      movieContainer.appendChild(movieCard);
    });
  }
  
  // Example movie data (replace with your actual data)
  const moviecard = [
    {
      title: 'Movie Title 1',
      description: 'Description for Movie 1',
      link: 'https://example.com/movie1',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    {
      title: 'Movie Title 2',
      description: 'Description for Movie 2',
      link: 'https://example.com/movie2',
    },
    // Add more movie objects as needed
  ];
  
  // Call the populateMovieCards function with your movie data
  populateMovieCards(movieData);
  