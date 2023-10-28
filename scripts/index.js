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


// Local Storage
let validateForm_serialized = JSON.stringify(validateForm);

localStorage.setItem("validateForm", validateForm_serialized);

let validateForm_deserialized = JSON.parse(localStorage.getItem("validatedForm"));

console.log("validateForm", validateForm_deserialized);