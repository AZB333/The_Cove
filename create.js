const form = document.getElementById("create-form");





form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(this);
    console.log('Form data:', Object.fromEntries(formData.entries()));
    window.location.href = 'C:/VS%20Code/Websites/The_Cove/home.html';
    // Redirect to the home page
});






// get the valid phone number regex
/*
const input = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const output = document.getElementById("results-div");


checkButton.addEventListener("click", () => {
            //country code, space, area code, space, three, space, four
    const nothing = /^\d{3}\d{3}\d{4}$/;
    const dashes = /^\d{3}-\d{3}-\d{4}$/;
    const parenDashes = /^\(\d{3}\)\d{3}-\d{4}$/;
    const oneSpaces = /^1 \d{3} \d{3} \d{4}$/;
    const oneParenDashes = /^1\(\d{3}\)\d{3}-\d{4}$/;
    const oneSpaceParenSpaceDash = /^1 \(\d{3}\) \d{3}-\d{4}$/;
    const oneSpaceDashes = /^1 \d{3}-\d{3}-\d{4}$/;

    if(input.value == ""){
        alert("Please provide a phone number");
        return;
    }
    const acceptList = [nothing, dashes, parenDashes, oneSpaces, oneParenDashes, oneSpaceParenSpaceDash, oneSpaceDashes];
    const isValid = (number) => acceptList.some((regex) => regex.test(input.value));
    if(isValid(input.value) == true){
        output.innerHTML += `
        <p style="color: green" id="result-p">Valid US number: ${input.value}</p>
        `;
        return;
    }
    else{
        output.innerHTML += `
        <p style="color: red" id="result-p">Invalid US number: ${input.value}</p>
        `;
        return;
    }
     //add the color based on if good or not

});

clearButton.addEventListener("click", () => {
    output.innerHTML = "";
})

*/