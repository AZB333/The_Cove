document.getElementById("create-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const birthday = document.getElementById("dob").value;
  const username = document.getElementById("create-username").value;
  const password = document.getElementById("create-password").value;

  try {
    const res = await fetch("/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, birthday, username, password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      alert(`Account creation failed: ${errText}`);
      return;
    }

    // alert("Account created!");
    window.location.href = "/"; // redirect to home page
  } catch (err) {
    console.error(err);
    alert("An error occurred while creating your account.");
  }
});
