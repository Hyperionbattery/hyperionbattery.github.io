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
        let index = 0;
        const slides = document.querySelectorAll(".gallery-item");
        const totalSlides = slides.length;
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");
        let interval = setInterval(nextSlide, 6000); // Auto-change every 5 seconds

        function showSlide(index) {
        slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        });
        }

        document.querySelector('.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        document.querySelector('.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 6000);

        function nextSlide() {
            index = (index + 1) % totalSlides;
            showSlide(index);
        }

        function prevSlide() {
            index = (index - 1 + totalSlides) % totalSlides;
            showSlide(index);
        }

        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetTimer();
        });

        function resetTimer() {
            clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        }

        showSlide(index);

        // Touch swipe support for mobile
        let startX = 0;
        document.querySelector(".gallery").addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        document.querySelector(".gallery").addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) nextSlide();  // Swipe Left
            if (startX < endX - 50) prevSlide();  // Swipe Right
            resetTimer();
        });
        });

