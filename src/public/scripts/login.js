document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      alert(`Login failed: ${errText}`);
      return;
    }

    const data = await res.json();
    // alert(data.message); // "Login successful"
    window.location.href = "/"; // redirect to home page
  } catch (err) {
    console.error(err);
    alert("An error occurred while logging in.");
  }
});
