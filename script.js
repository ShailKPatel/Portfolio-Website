// JavaScript for Portfolio Website
document.addEventListener("DOMContentLoaded", function () {
    // Variables
    const themeToggleButton = document.getElementById("theme-toggle");

    // Full Page Scroll Snap with Infinite Scroll
    document.addEventListener("wheel", (e) => {
        const sections = document.querySelectorAll(".section");
        const currentIndex = Math.round(window.scrollY / window.innerHeight);

        let nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= sections.length) nextIndex = 0; // Loop to first section
        if (nextIndex < 0) nextIndex = sections.length - 1; // Loop to last section

        sections[nextIndex].scrollIntoView({ behavior: "instant" });
    });

    // Dynamic Body Class Update on Scroll
    document.addEventListener("scroll", () => {
        const sections = document.querySelectorAll(".section");
        const scrollY = window.scrollY;

        document.body.className = ""; // Clear previous classes
        sections.forEach((section) => {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;

            if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                document.body.classList.add(`page-${section.id}`);
            }
        });
    });

    // Initialize Swiper
    document.addEventListener("DOMContentLoaded", function () {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
    

    // Project Navigation Logic
    let currentProjectIndex = 0;
    const projectSections = document.querySelectorAll(".project-details");
    const prevButton = document.getElementById("prev-project");
    const nextButton = document.getElementById("next-project");

    function updateProjectVisibility() {
        projectSections.forEach((section, index) => {
            section.style.display = index === currentProjectIndex ? "block" : "none";
        });

        prevButton.disabled = currentProjectIndex === 0;
        nextButton.disabled = currentProjectIndex === projectSections.length - 1;
    }

    prevButton.addEventListener("click", function () {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            updateProjectVisibility();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentProjectIndex < projectSections.length - 1) {
            currentProjectIndex++;
            updateProjectVisibility();
        }
    });

    updateProjectVisibility();
});

// Show Skills based on Semester
function showSkills(sem) {
    document.querySelectorAll(".college-skills-list").forEach((list) =>
        list.classList.remove("active")
    );
    document.querySelectorAll(".semester-buttons button").forEach((button) =>
        button.classList.remove("active")
    );

    let selectedList = document.getElementById("college-skills-list-" + sem);
    let selectedButton = document.querySelector(
        ".semester-buttons button:nth-child(" + sem + ")"
    );

    if (selectedList) {
        selectedList.classList.add("active");
    }
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Typewriter Effect
const text = [
    "Machine Learning nerd with big dreams. 🤖",
    "B.E. AI & ML @ LJ University, Ahmedabad. Still human (for now).",
    "Obsessed with cutting-edge ML—because the future won’t build itself!",
    "AI for social good? Count me in! Healthcare, education, sustainability—you name it.",
    "Always learning, always coding, always caffeinated. ☕",
    "Got a cool AI project? Let’s make some magic happen! ✨",
];

let i = 0,
    j = 0;

function typeWriter() {
    const typewriterText = document.getElementById("typewriter-text");

    if (i < text[j].length) {
        typewriterText.textContent += text[j].charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    } else if (j < text.length - 1) {
        typewriterText.innerHTML += "<br><br>";
        j++;
        i = 0;
        setTimeout(typeWriter, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const typewriterText = document.getElementById("typewriter-text");
    typewriterText.style.whiteSpace = "pre-wrap";
    typewriterText.style.caretColor = "transparent";
    typeWriter();
});

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");

    if (!toggleButton) {
        console.error("Theme toggle button not found!");
        return;
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const savedTheme = localStorage.getItem("theme") || systemPreference;
    setTheme(savedTheme);

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
});



class OrderedHashMap {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.data = [];
    }

    add(key, value) {
        if (this.data.some(item => item.key === key)) {
            return; // Prevent duplicate keys
        }

        if (this.data.length >= this.maxSize) {
            this.data.pop(); // Remove the oldest entry when exceeding max size
        }

        this.data.unshift({ key, value }); // Add new entry at the beginning
    }

    getAll() {
        return this.data;
    }
}

// Create a new testimonial manager with max 5 entries
const testimonialManager = new OrderedHashMap(5);

function addNewTestimonial() {
    const name = document.getElementById("testimonial-writer").value.trim();
    const message = document.getElementById("testimonial-message").value.trim();

    // Ensure reCAPTCHA API is loaded before calling it
    if (typeof grecaptcha === "undefined") {
        alert("reCAPTCHA is not loaded yet. Please try again.");
        return;
    }

    const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA token

    if (!name || !message) {
        alert("Please enter your name and testimonial.");
        return;
    }

    if (!recaptchaResponse) {
        alert("Please verify that you are not a robot.");
        return;
    }

    const userEmail = prompt("Enter your email to confirm:");
    if (userEmail !== "shailpatel.conect@gmail.com") {
        alert("Email verification failed.");
        return;
    }

    testimonialManager.add(name, message);
    renderTestimonials();

    // Reset reCAPTCHA after submission
    grecaptcha.reset();
}




function renderTestimonials() {
    const list = document.getElementById("testimonial-list");
    list.innerHTML = ""; // Clear existing testimonials

    const testimonials = testimonialManager.getAll();

    if (testimonials.length === 0) {
        list.innerHTML = `<p class="no-testimonials">No Testimonials yet.</p>`;
        return;
    }

    testimonials.forEach(({ key, value }) => {
        const box = document.createElement("div");
        box.classList.add("testimonial-box");

        box.innerHTML = `
            <p class="testimonial-message">"${value}"</p>
            <p class="testimonial-author">— ${key}</p>
        `;

        list.appendChild(box);
    });
}

// Initialize empty state
renderTestimonials();
