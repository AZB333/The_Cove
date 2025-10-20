document.getElementById("post-survey-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    rating: document.querySelector('input[name="rating"]:checked').value,
    safe: document.querySelector('select[name="safe"]').value,
    music: document.getElementById("music").value,
    ceiling: document.querySelector('select[name="ceiling"]').value,
    more: document.getElementById("more").value,
    less: document.getElementById("less").value,
  };

  try {
    const response = await fetch("/survey", {
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
