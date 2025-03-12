const slider = document.getElementById('slider');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = slider.children;
const totalSlides = slides.length;

let index = 0;

// Function to move slider
function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

// Auto slide function
function autoSlide() {
    index = (index + 1) % totalSlides;
    updateSlider();
}

// Manual controls
prev.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides; // Loop backward
    updateSlider();
});

next.addEventListener('click', () => {
    index = (index + 1) % totalSlides; // Loop forward
    updateSlider();
});

// Touch events for swipe
let startX = 0;
let isDragging = false;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    if (startX - currentX > 50) {
        next.click(); // Swipe left
        isDragging = false;
    } else if (currentX - startX > 50) {
        prev.click(); // Swipe right
        isDragging = false;
    }
});

slider.addEventListener('touchend', () => {
    isDragging = false;
});

// Start auto slide
let autoSlideInterval = setInterval(autoSlide, 3000); // Change every 3 seconds

// Pause auto slide on hover
slider.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseout', () => autoSlideInterval = setInterval(autoSlide, 3000));
