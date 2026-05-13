// Hero image
const heroImage = document.querySelector(".hero-image");
const heroImages = ["images/imagehometest.jpg"]; // renamed to avoid conflict
let currentIndex = 0;

// Start with empty background and solid color
heroImage.style.backgroundImage = "";
heroImage.style.backgroundColor = "#000000";
heroImage.style.opacity = 1;

// Fade in first image
setTimeout(() => {
    heroImage.style.transition = "opacity 1s ease-in-out";
    heroImage.style.opacity = 0; // fade out solid color
    setTimeout(() => {
        heroImage.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
        heroImage.style.opacity = 1; // fade in first image
    }, 1000);
}, 1200);

// Auto-change every 10 seconds
setInterval(() => {
    heroImage.style.opacity = 0; // fade out current image
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImage.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
        heroImage.style.opacity = 1; // fade in next image
    }, 500);
}, 10000);

// Scroll zoom effect and parallax text
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Slight scale effect on image
    const scaleValue = 1 + scrollY / 3000;
    heroImage.style.transform = `scale(${scaleValue}) translateY(${scrollY / 10}px)`;

    // Optional: move text slightly down for parallax
    const heroText = document.querySelector(".hero-text");
    if (heroText) {
        heroText.style.transform = `translateY(${scrollY / 20}px)`;
    }
});

// Gallery row-span calculation for CSS grid masonry
const gallery = document.querySelector('.gallery');
if (gallery) {
    const galleryImages = gallery.querySelectorAll('img');
    galleryImages.forEach(img => {
        img.addEventListener('load', () => {
            const rowHeight = parseInt(getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(getComputedStyle(gallery).getPropertyValue('gap'));
            const span = Math.ceil((img.offsetHeight + rowGap) / (rowHeight + rowGap));
            img.style.setProperty('--span', span);
        });
    });
}

// Fade in images when they load
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery-item img");

    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        }
    });
});

