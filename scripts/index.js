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

});