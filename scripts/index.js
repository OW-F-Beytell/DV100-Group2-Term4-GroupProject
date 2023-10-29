$(document).ready(function() {

    //-------------------------------------------------------------------------------------------------------
    //Sign Up Form
    //-------------------------------------------------------------------------------------------------------

    //On Submit, prevent default form submission behaviour and do this instead.

    $('#signupForm').submit(function(event) {

        event.preventDefault();

        if (this.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Add any code that should run on submit
            window.location.href = '../pages/homepage.html';
        }
        $(this).addClass('was-validated');
    });


    //-------------------------------------------------------------------------------------------------------
    //Log In Form
    //-------------------------------------------------------------------------------------------------------

    $('#loginForm').submit(function(event) {            

        event.preventDefault();

        if (this.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Add any code that should run on submit
            window.location.href = '../pages/homepage.html';
        }
        $(this).addClass('was-validated');
    });

});

const form = document.querySelector('#signUpForm');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');

form.addEventListener('submit', (event) => {

    event.preventDefault();
    validateForm();

});

function validateForm() {
    //username
    if(usernameInput.ariaValueMax.trim() == ''){
        setError(usernameInput, "Name is required");
    } else if (usernameInput.trim().length < 5){
        setError(usernameInput, "Name needs to contain a minimum of 3 characters");
    } else {
        setSuccess(usernameInput);
    }

    //email
    if(emailInput.ariaValueMax.trim() == ''){
        setError(emailInput, "Email address is required");
    } else if (emailInput.trim().value){
        setError(emailInput, "Provide a valid email address");
    } else {
        setSuccess(emailInput);
    }

    //password
    if(passwordInput.ariaValueMax.trim() == ''){
        setError(passwordInput, "Enter a password");
    } else if (passwordInput.trim().length < 8){
        setError(passwordInput, "Password must contain at least 8 characters");
    } else {
        setSuccess(passwordInput);
    }

    //confirm password
    if(confirmPasswordInput.ariaValueMax.trim() == ''){
        setError(confirmPasswordInput, "Enter a password");
    } else if (confirmPasswordInput.trim().value !== passwordInput.value){
        setError(confirmPasswordInput, "Password must contain at least 8 characters");
    } else {
        setSuccess(confirmPasswordInput);
    }

}



        //----------------------
        // Movie Library
        //----------------------
        // JavaScript code in your library.js file

                // Define a function to fetch movie data from the API
                function fetchMovies() {
                    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
                    const genre = 'all'; // You can change this to the desired genre
                
                    // Fetch data from the API
                    fetch(`https://api.example.com/movies?api_key=${apiKey}&genre=${genre}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const movies = data.results;
                
                        // Loop through the movies and populate the HTML
                        movies.forEach((movie, index) => {
                        const movieCard = document.querySelector('.movie').cloneNode(true);
                
                        // Populate movie card with data
                        movieCard.querySelector('.card-title').textContent = movie.title;
                        movieCard.querySelector('.card-text').textContent = movie.description;
                        movieCard.querySelector('.btn-watch').href = movie.link;
                
                        // Append the movie card to the movies container
                        document.querySelector('.movies').appendChild(movieCard);
                        });
                    })
                    .catch((error) => {
                        console.error('Error fetching movies:', error);
                    });
                }
                
                // Listen for the page to load
                document.addEventListener('DOMContentLoaded', fetchMovies);
  


// Local Storage
let validateForm_serialized = JSON.stringify(validateForm);

localStorage.setItem("validateForm", validateForm_serialized);

let validateForm_deserialized = JSON.parse(localStorage.getItem("validatedForm"));

console.log("validateForm", validateForm_deserialized);