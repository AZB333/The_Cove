// Fetch photos from backend and display them
async function loadPhotos() {
    const gallery = document.getElementById("photo-gallery");
    gallery.innerHTML = "<p>Loading...</p>";

    try {
    const res = await fetch("/photos-data");
    const photos = await res.json();

    if (photos.length === 0) {
        gallery.innerHTML = "<p>No photos yet. Be the first to upload!</p>";
        return;
    }

    gallery.innerHTML = "";
    photos.forEach(photo => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "photo-card";

        const img = document.createElement("img");
        img.src = `${photo.filepath}`;
        img.alt = photo.originalname;
        img.loading = "lazy";

        const caption = document.createElement("p");
        caption.textContent = `Uploaded by ${photo.username}`;

        imgContainer.appendChild(img);
        imgContainer.appendChild(caption);
        gallery.appendChild(imgContainer);
    });
    } catch (err) {
    console.error("Error loading photos:", err);
    gallery.innerHTML = "<p>Failed to load photos. Please try again later.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadPhotos);