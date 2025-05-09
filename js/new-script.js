// Typing animation for hero section
const dynamicText = document.querySelector('.dynamic-text');
const words = ['Flutter Developer', 'AI/ML Enthusiast', 'IT Consultant'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
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
        typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
    }

    setTimeout(typeEffect, typingDelay);
}

// Enhanced scroll animations
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

// Parallax effect for hero section
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

// Smooth scrolling with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Certificate Slider
const initCertificateSlider = () => {
    const slider = document.querySelector('.certificates-slider');
    const cards = document.querySelectorAll('.certificate-card');
    let currentIndex = 0;

    // Create navigation buttons
    const nav = document.createElement('div');
    nav.className = 'certificate-nav';
    nav.innerHTML = `
        <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
    `;
    slider.parentElement.appendChild(nav);

    const prevBtn = nav.querySelector('.prev-btn');
    const nextBtn = nav.querySelector('.next-btn');

    // Function to update slider position
    const updateSlider = () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(slider).gap);
        const offset = currentIndex * (cardWidth + gap);

        cards.forEach((card, index) => {
            card.style.transform = `translateX(-${offset}px)`;
            card.style.opacity = index === currentIndex ? '1' : '0.5';
            card.style.scale = index === currentIndex ? '1' : '0.9';
        });
    };

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        updateSlider();
    });

    // Initialize slider
    updateSlider();

    // Auto-advance slider
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }, 5000);
    });
};

// Interactive Background
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

// Cursor Follower
const initCursorFollower = () => {
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        // Smooth cursor movement
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animate);
    };

    animate();

    // Cursor effects on interactive elements
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

// Enhanced Project Card Animations
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

// Enhanced Scroll Animations
const enhanceScrollAnimations = () => {
    const elements = document.querySelectorAll('.section-title, .about-content, .skill-card, .project-card, .certificate-card, .contact-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('slide-in');
                } else if (entry.target.classList.contains('about-content')) {
                    entry.target.classList.add('slide-up');
                } else if (entry.target.classList.contains('skill-card') ||
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('certificate-card')) {
                    entry.target.classList.add('rotate-in');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize all features
window.addEventListener('load', () => {
    typeEffect();
    handleParallax();
    initInteractiveBackground();
    initCursorFollower();
    initScrollAnimations();
    enhanceProjectCards();
    initCertificateSlider();
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll); 