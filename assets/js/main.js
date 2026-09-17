        function toggleMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }
        
        function closeMenu() {
            document.querySelector('.nav-links').classList.remove('active');
        }

        // Get the modal, the link, and the close button
    const modal = document.getElementById("privacyModal");
    const privacyLink = document.getElementById("privacyPolicyLink");
    const closeBtn = document.querySelector(".close-btn");

    if (modal && privacyLink && closeBtn) {
        // Show the modal when the privacy link is clicked
        privacyLink.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default link action
            modal.style.display = "flex"; // Show the modal as a flex container
        });

        // Close the modal when the close button is clicked
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal
        });

        // Close the modal when clicking outside the modal content
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none"; // Hide the modal
            }
        });
    }

        // JavaScript for autoplay video
        document.addEventListener("DOMContentLoaded", function () {
          const video = document.getElementById("scrollVideo");
        
          const observer = new IntersectionObserver(
            function (entries) {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  video.play();
                } else {
                  video.pause();
                }
              });
            },
            {
              threshold: 0.5,
            }
          );
        
          if (video) {
            observer.observe(video);
          }
        });


    // JavaScript for slideshow gallery
    document.addEventListener("DOMContentLoaded", function () {
        const gallery = document.querySelector(".gallery");
        const slides = document.querySelectorAll(".gallery-item");
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

        if (!gallery || slides.length === 0 || !nextBtn || !prevBtn) {
            return;
        }

        let index = 0;
        let interval = setInterval(nextSlide, 6000);

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
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

        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetTimer();
        });

        showSlide(index);

        // Touch swipe support for mobile
        let startX = 0;
        gallery.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        gallery.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) nextSlide();  // Swipe Left
            if (startX < endX - 50) prevSlide();  // Swipe Right
            resetTimer();
        });
        });
