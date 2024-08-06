const form = document.getElementById("login-form");





form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(this);
    console.log('Form data:', Object.fromEntries(formData.entries()));
    window.location.href = 'C:/VS%20Code/Websites/The_Cove/home.html';
    // Redirect to the home page
});