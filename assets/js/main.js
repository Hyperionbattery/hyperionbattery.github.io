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

// Lead forms: submit in the background, show a thank-you, and record a GA event
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-lead-form]").forEach((form) => {
        form.addEventListener("submit", async (event) => {
            if (!window.fetch || !window.FormData) return; // fall back to a normal post
            event.preventDefault();
            const button = form.querySelector("button[type=submit]");
            const label = button ? button.textContent : "";
            if (button) { button.disabled = true; button.textContent = "Sending..."; }
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { Accept: "application/json" },
                });
                if (!response.ok) throw new Error("Form error " + response.status);
                if (typeof gtag === "function") {
                    gtag("event", "generate_lead", { form_name: form.dataset.leadForm });
                }
                const thanks = document.createElement("div");
                thanks.className = "form-thanks";
                thanks.setAttribute("role", "status");
                thanks.innerHTML = form.dataset.leadForm === "homeowner"
                    ? "<h3>You're on the list.</h3><p>We'll email you when we're ready for early testers.</p>"
                    : "<h3>Thanks, we got it.</h3><p>Matt will email you within two business days to set up a short call and your free bill review.</p>";
                form.replaceWith(thanks);
            } catch (err) {
                if (button) { button.disabled = false; button.textContent = label; }
                let note = form.querySelector(".form-error");
                if (!note) {
                    note = document.createElement("p");
                    note.className = "form-error";
                    form.appendChild(note);
                }
                note.textContent = "Sorry, that didn't go through. Please try again in a moment.";
            }
        });
    });

    // Sticky mobile button: hide it while a form is on screen
    const sticky = document.querySelector(".sticky-cta");
    if (sticky && "IntersectionObserver" in window) {
        const visible = new Set();
        const watch = new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
            sticky.classList.toggle("hidden", visible.size > 0);
        });
        document.querySelectorAll("form[data-lead-form], #Assessment").forEach((el) => watch.observe(el));
    }
});
