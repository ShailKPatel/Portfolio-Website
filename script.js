// JavaScript for Portfolio Website
document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;

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

    var swiper = new Swiper(".mySwiper", {
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

    prevButton.addEventListener("click", function() {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            updateProjectVisibility();
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentProjectIndex < projectSections.length - 1) {
            currentProjectIndex++;
            updateProjectVisibility();
        }
    });

    updateProjectVisibility();
});

function showSkills(sem) {
    document.querySelectorAll('.college-skills-list').forEach(list => list.classList.remove('active'));
    document.querySelectorAll('.semester-buttons button').forEach(button => button.classList.remove('active'));
    
    let selectedList = document.getElementById('college-skills-list-' + sem);
    let selectedButton = document.querySelector('.semester-buttons button:nth-child(' + sem + ')');
    
    if (selectedList) {
        selectedList.classList.add('active');
    }
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}


const text = [
    "Machine Learning nerd with big dreams. 🤖",
    "B.E. AI & ML @ LJ University, Ahmedabad. Still human (for now).",
    "Obsessed with cutting-edge ML—because the future won’t build itself!",
    "AI for social good? Count me in! Healthcare, education, sustainability—you name it.",
    "Always learning, always coding, always caffeinated. ☕",
    "Got a cool AI project? Let’s make some magic happen! ✨"
];


let i = 0, j = 0;

function typeWriter() {
    const typewriterText = document.getElementById("typewriter-text");

    // Type out the current text character by character
    if (i < text[j].length) {
        typewriterText.textContent += text[j].charAt(i);
        i++;
        setTimeout(typeWriter, 40); // Slightly faster typing speed (reduced delay)
    } 
    // Move to the next chunk of text
    else if (j < text.length - 1) {
        typewriterText.innerHTML += "<br><br> ";  // Add a break between sentences/paragraphs
        j++;
        i = 0;
        setTimeout(typeWriter, 500);  // Add a pause before moving to the next line of text
    }
}

// Ensure the text wraps and stays inside the screen without overflowing
document.addEventListener("DOMContentLoaded", function () {
    const typewriterText = document.getElementById("typewriter-text");
    typewriterText.style.whiteSpace = "pre-wrap";  // Ensure text wraps correctly
    typewriterText.style.caretColor = "transparent"; // Hide the cursor
    typeWriter();
});


let slideIndex = 1;
showSlides(slideIndex);

// Function to navigate slides
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to display the correct slide
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

// Ensure only the first slide is visible on load
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});


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

    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const savedTheme = localStorage.getItem("theme") || systemPreference;
    setTheme(savedTheme);

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
});
