const safeInput = document.getElementById('safe-dropdown');
const noDiv = document.getElementById("no-option");


safeInput.addEventListener('change', function() {
    if (safeInput.value === 'no') {
        noDiv.innerHTML = `
            <label class="survey-label" for="unsafe">Why did you feel unsafe?</label> 
            <input id="unsafe" name="unsafe_reason" type="text" required>
        `;
    } else {
        noDiv.innerHTML = ''; // Clear the div if another option is selected
    }
});


document.getElementById("post-survey-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    rating: document.querySelector('input[name="rating"]:checked').value,
    safe: document.querySelector('select[name="safe"]').value,
    music: document.getElementById("music").value,
    ceiling: document.querySelector('select[name="ceiling"]').value,
    more: document.getElementById("more").value,
    less: document.getElementById("less").value,
    unsafe_reason: document.getElementById("unsafe") ? document.getElementById("unsafe").value : null
  };

  try {
    const response = await fetch("/submit-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Thank you for submitting your feedback!");
      window.location.href = "/"; // redirect back home
    } else {
      alert("Something went wrong — please try again later.");
    }
  } catch (err) {
    console.error("Error submitting survey:", err);
    alert("Error submitting survey. Check console for details.");
  }
});
