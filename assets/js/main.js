function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function closeMenu() {
    document.querySelector('.nav-links').classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function () {
    // Privacy policy modal
    const modal = document.getElementById("privacyModal");
    if (modal) {
        document.querySelectorAll(".privacy-link").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                modal.style.display = "flex";
            });
        });
        const closeBtn = modal.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Play the animation only while it is on screen
    const video = document.getElementById("scrollVideo");
    if (video && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(video);
    }

    // Slideshow gallery
    const gallery = document.querySelector(".gallery");
    const slides = document.querySelectorAll(".gallery-item");
    if (!gallery || slides.length === 0) {
        return;
    }

    let index = 0;
    let interval = null;

    function showSlide(i) {
        slides.forEach((slide, n) => slide.classList.toggle("active", n === i));
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 6000);
    }

    const nextBtn = gallery.querySelector(".next");
    const prevBtn = gallery.querySelector(".prev");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });
    }

    // Touch swipe support for mobile
    let startX = 0;
    gallery.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });
    gallery.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) nextSlide();
        if (startX < endX - 50) prevSlide();
        resetTimer();
    });

    showSlide(index);
    resetTimer();
});

// Scroll-triggered reveals: sections fade up, the charging chart draws itself
document.addEventListener("DOMContentLoaded", function () {
    const targets = document.querySelectorAll(".reveal, .reveal-section .text, .reveal-chart");
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targets.forEach((el) => el.classList.add("in-view"));
        return;
    }
    document.documentElement.classList.add("js-reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.25 }
    );
    targets.forEach((el) => observer.observe(el));
});
