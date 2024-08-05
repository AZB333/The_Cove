// variables
const safeInput = document.getElementById("dropdown");
const submitButton = document.getElementById("survey-submit");
const completeDiv = document.getElementById("complete");
const test = document.getElementById("result");
const noDiv = document.getElementById("no-option");


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
    completeDiv.innerHTML = `
        <p>Complete!</p>
    `;

})