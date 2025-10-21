document.addEventListener("DOMContentLoaded", async () => {
  const nav = document.getElementById("nav");
  const navLeft = document.getElementById("nav-left");

  try {
    const res = await fetch("/auth/status");
    const data = await res.json();

    nav.innerHTML = ''; // clear old links

    if (data.loggedIn) {
      // Show when user is logged in
      const home = `<a href="/">Home</a>`;
      const calendar = `<a href="/calendar">Event Calendar</a>`;
      const survey = `<a href="/survey">Take the Survey</a>`;
      const about = `<a href="/about">About Us</a>`;
      const photos = `<a href="/photos">Photo Gallery</a>`;
      const uploads = `<a href="/uploads">Uploads</a>`;
      const welcome = `<span class="left">Welcome, ${data.username}!</span>`;
      const logout = `<a href="#" id="logout-btn">Logout</a>`;

      nav.innerHTML = `${home}${calendar}${survey}${about}${photos}${uploads}${logout}`;
      navLeft.innerHTML = `The Cove ${welcome}`;

      // Logout logic
      document.getElementById("logout-btn").addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch("/logout", { method: "POST" });
        window.location.href = "/login";
      });
    } else {
      // Show default nav if logged out
      nav.innerHTML = `
        <a href="/">Home</a>
        <a href="/create">Create an Account</a>
        <a href="/login">Login</a>
        <a href="/calendar">Event Calendar</a>
        <a href="/survey">Take the Survey</a>
        <a href="/photos">Photo Gallery</a>
        <a href="/uploads">Uploads</a>
        <a href="/about">About Us</a>
      `;
    }
  } catch (err) {
    console.error("Error loading navbar:", err);
  }
});
