// Typing animation for hero section
const dynamicText = document.querySelector('.dynamic-text');
// const words = ['Flutter Developer', 'AI/ML Enthusiast', 'IT Consultant']; // Original words
// Updated words to match hero section typing text from index.html
const words = dynamicText && dynamicText.dataset.texts ? JSON.parse(dynamicText.dataset.texts) : ['intuitive experiences', 'engaging interfaces', 'human-centered AI'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
    if (!dynamicText) return; // Guard clause if element doesn't exist
    const currentWord = words[wordIndex];

    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Delay before typing new word
    }

    setTimeout(typeEffect, typingDelay);
}

// Commented out: Enhanced scroll animations (animateOnScroll)
/*
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .section-title, .about-content, .contact-content');

    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            // Add different animations based on element type
            if (element.classList.contains('section-title')) {
                element.classList.add('slide-in');
            } else if (element.classList.contains('about-content') || element.classList.contains('contact-content')) {
                element.classList.add('slide-up');
            } else {
                element.classList.add('rotate-in');
            }

            // Add staggered delay for grid items
            if (element.classList.contains('skill-card') ||
                element.classList.contains('project-card') ||
                element.classList.contains('certificate-card')) {
                element.style.animationDelay = `${index * 0.2}s`;
            }
        }
    });
};
*/

// Commented out: Parallax effect for hero section
/*
const handleParallax = () => {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};
*/

// Smooth scrolling with enhanced animation (Kept)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Adjusted for potentially fixed navbar height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Certificate Slider (Kept, minor robustness check)
const initCertificateSlider = () => {
    const slider = document.querySelector('.certificates-slider');
    if (!slider) return; // Guard clause

    const cards = slider.querySelectorAll('.certificate-card');
    if (cards.length === 0) return; // No cards to slide

    let currentIndex = 0;

    // Create navigation buttons if they don't exist (idempotency)
    let nav = slider.parentElement.querySelector('.certificate-nav');
    if (!nav) {
        nav = document.createElement('div');
        nav.className = 'certificate-nav'; // CSS can target this
        nav.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        slider.parentElement.appendChild(nav);
    }

    const prevBtn = nav.querySelector('.prev-btn');
    const nextBtn = nav.querySelector('.next-btn');

    // Function to update slider position
    const updateSlider = () => {
        // This implementation assumes a horizontal scroll.
        // For a more robust slider, consider libraries or more complex calculations for visible cards.
        // The current CSS will likely handle the visual presentation (e.g., overflow hidden on slider).
        // This JS part is mainly for controlling which card is "active" or "current".
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)'; // Example active style
            } else {
                card.style.opacity = '0.7'; // Example inactive style
                card.style.transform = 'scale(0.95)'; // Example inactive style
            }
        });
        // Note: Actual "sliding" might be better handled by CSS transitions on a container,
        // or by adjusting scrollLeft if it's a scrollable container.
        // The original script's translateX might not work as expected without specific CSS.
        // For now, focusing on opacity/scale changes.
    };

    if (cards.length > 0) { // Only init if cards exist
        updateSlider(); // Initial call
    }


    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Loop
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length; // Loop
        updateSlider();
    });

    // Auto-advance slider (optional, can be kept or removed)
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }, 5000);
    });
};


// Commented out: Interactive Background
/*
const initInteractiveBackground = () => {
    const shapes = document.querySelectorAll('.bg-shape');
    const container = document.querySelector('.interactive-bg');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};
*/

// Commented out: Cursor Follower
/*
const initCursorFollower = () => {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animate);
    };
    animate();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .certificate-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursor.style.opacity = '0.5';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursor.style.opacity = '0.5';
        });
    });
};
*/

// Commented out: Enhanced Project Card Animations (initProjectCards)
/*
const initProjectCards = () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            const links = card.querySelectorAll('.project-link');

            overlay.style.opacity = '1';
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(0)';
                    link.style.opacity = '1';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            const links = card.querySelectorAll('.project-link');

            overlay.style.opacity = '0';
            links.forEach(link => {
                link.style.transform = 'translateY(20px)';
                link.style.opacity = '0';
            });
        });
    });
};
*/

// Refined Scroll Animations (initScrollAnimations)
const initScrollAnimations = () => {
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .section-title, .about-text > p, .about-stats .stat-item, .contact-info .contact-item, .contact-form > input, .contact-form > textarea, .hero-text > *, .footer-content > *');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-element', 'is-visible');
                observer.unobserve(entry.target); // Optional: stop observing after animation
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in-element'); // Add base class for initial hidden state
        observer.observe(element);
    });
};

// Initialize features
window.addEventListener('load', () => {
    typeEffect();
    // handleParallax(); // Commented out
    // initInteractiveBackground(); // Commented out
    // initCursorFollower(); // Commented out
    initScrollAnimations(); // Replaces enhanceScrollAnimations and animateOnScroll
    // initProjectCards(); // Commented out
    initCertificateSlider();
});

// Commented out: Add scroll event listener for animations (animateOnScroll)
// window.addEventListener('scroll', animateOnScroll);