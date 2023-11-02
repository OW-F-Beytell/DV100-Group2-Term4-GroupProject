// Retrieve and display from localStorage
function displayWatchlist() {
    const watchlistElement = document.getElementById('watchlist');
  
    // Check if 'watchList' item is in the localstorage
    if (localStorage.getItem('watchList')) {
      // Retrieve and parse the watchlist data from localStorage
      const watchListData = JSON.parse(localStorage.getItem('watchList'));
  
      // Check if there are items in watchlist
      if (watchListData.length > 0) {
        // Create a HTML list to display the watchlist
        const ul = document.createElement('ul');
  
        // Loop through movie ID in the watchlist and create list
        watchListData.forEach((movieID) => {
          const li = document.createElement('li');
          li.textContent = `Movie ID: ${movieID}`;
          ul.appendChild(li);
        });
  
        // Append the list to the watchlist element
        watchlistElement.appendChild(ul);
      } else {
        watchlistElement.textContent = 'Your watchlist is empty.';
      }
    } else {
      watchlistElement.textContent = 'Your watchlist is empty.';
    }
  }
  
  // Call function to display the watchlist when the page load
  displayWatchlist();