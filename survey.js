// variables
const safeInput = document.getElementById("dropdown");
const submitButton = document.getElementById("survey-submit");
const completeDiv = document.getElementById("complete");
const test = document.getElementById("result");
const noDiv = document.getElementById("no-option");
const form = document.getElementById("post-survey-form");


// code
document.addEventListener('DOMContentLoaded', function() {
    safeInput.addEventListener('change', function() {
        if (safeInput.value === 'no') {
            noDiv.innerHTML = `<label class="survey-label" for="unsafe">Why did you feel unsafe?</label> <input id="unsafe" type="text" required>`;
        } else {
            noDiv.innerHTML = ''; // Clear the div if another option is selected
        }
    });
});

submitButton.addEventListener("click", () =>{
})

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(this);
    console.log('Form data:', Object.fromEntries(formData.entries()));
    window.location.href = 'C:/VS%20Code/Websites/The_Cove/survey-complete.html';
    // Redirect to the home page
});

// form.addEventListener("submit", function(event){
//     event.preventDefault;

//     const form = event.target;
//     const formData = new FormData(form);

//     fetch(form.action, {
//         method: form.method,
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             window.location.href = '/home.html'; // Redirect to the home page
//         } else {
//             console.error('Form submission failed.');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// })