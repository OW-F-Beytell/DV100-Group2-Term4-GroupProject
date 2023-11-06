
const apiKey = '453832e297403c7f70c5984dbfa5ebc9';
const movieContainer = $('#movieContainer');

// Function to create a carousel item from movie data
function createCarouselItem(movie) {
    const director = movie.director ? movie.director : "N/A";
    const rating = movie.vote_average ? movie.vote_average : "N/A";

    return `
        <div class="carousel-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="d-block w-100 background-img" alt="...">
            <div class="overlay">
                <div class="card m-5" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${movie.title}</h2>
                                <p class="card-text">Director: ${director}</p>
                                <p>Rating: ${rating}</p>
                                <img src="assets/Retro-btn.svg">
                                <img src="assets/Add-btn.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

$(document).ready(function () {
    loadWelcomeMovieContent();
})

// Local Storage username
// function saveName(username) {
//     localStorage.setItem('currMovie', JSON.stringify(username));
// } onclick="saveName(${name.username});"

let userDetails = []

saveUserDetails = () => {

  let username = document.getElementById('username').value;
  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;

  userDetails.push({
    username: username,
    userEmail: userEmail,
    userPassword: userPassword // Fix the variable name here
  });

  console.log(userDetails);
  document.getElementById("signupForm").reset(); // Fix the form id here

  let data = JSON.stringify(userDetails);
  localStorage.setItem('order', data);
  window.location.href = 'index.html'
}
