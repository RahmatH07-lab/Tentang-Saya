// Tidak diperlukan script tambahan karena animasi sudah diatur dengan CSS.
// Namun, jika ingin membuat slider lebih dinamis, tambahkan logika di sini.
console.log("Slider aktif!")

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

// Clone first and last slide for seamless looping
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

slider.appendChild(firstSlideClone);
slider.insertBefore(lastSlideClone, slides[0]);

const totalSlides = document.querySelectorAll('.slide').length;
const slideWidth = 100 / totalSlides;

slider.style.transform = `translateX(-${slideWidth}%)`;

// Update slide width for seamless transitions
slider.style.width = `${totalSlides * 100}%`;
document.querySelectorAll('.slide').forEach(slide => {
    slide.style.width = `${100 / totalSlides}%`;
});

function goToSlide(index) {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${index * slideWidth}%)`;
    currentIndex = index;

    // Reset for seamless looping
    slider.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-${(totalSlides - 2) * slideWidth}%)`;
            currentIndex = totalSlides - 2;
        }
        if (currentIndex === totalSlides - 1) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-${slideWidth}%)`;
            currentIndex = 1;
        }
    });
}

prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// Auto-slide (opsional)
setInterval(() => {
    goToSlide(currentIndex + 1);
}, 5000);
