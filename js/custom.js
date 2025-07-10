//
/*
$(document).ready(function () {
	$('#fullpage').fullpage({
		'verticalCentered': false,
		'scrollingSpeed': 600,
		'autoScrolling': false,
		'css3': true,
		'navigation': true,
		'navigationPosition': 'right',
	});
});
*/

// wow
/*
$(function () {
	new WOW().init();
	$(".rotate").textrotator();
})
*/

// Mobile-friendly interactions
document.addEventListener('DOMContentLoaded', function () {
	// Add touch feedback to buttons and links
	const touchElements = document.querySelectorAll('.btn, .portfolio-thumb, .media .fa, .social-icon li a');
	touchElements.forEach(element => {
		element.addEventListener('touchstart', function () {
			this.classList.add('touch-active');
		});
		element.addEventListener('touchend', function () {
			this.classList.remove('touch-active');
		});
	});

	// Smooth scroll for mobile
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Prevent double-tap zoom on mobile
	document.addEventListener('touchend', function (event) {
		event.preventDefault();
		event.target.click();
	}, { passive: false });

	// Add swipe gestures for portfolio items
	const portfolioItems = document.querySelectorAll('.portfolio-thumb');
	let touchStartX = 0;
	let touchEndX = 0;

	portfolioItems.forEach(item => {
		item.addEventListener('touchstart', e => {
			touchStartX = e.changedTouches[0].screenX;
		});

		item.addEventListener('touchend', e => {
			touchEndX = e.changedTouches[0].screenX;
			handleSwipe(item);
		});
	});

	function handleSwipe(item) {
		const swipeThreshold = 50;
		if (touchEndX < touchStartX - swipeThreshold) {
			// Swipe left
			item.style.transform = 'translateX(-10px)';
			setTimeout(() => {
				item.style.transform = 'translateX(0)';
			}, 300);
		} else if (touchEndX > touchStartX + swipeThreshold) {
			// Swipe right
			item.style.transform = 'translateX(10px)';
			setTimeout(() => {
				item.style.transform = 'translateX(0)';
			}, 300);
		}
	}

	// Add pull-to-refresh functionality (Commented out)
	/*
	let touchStartY = 0;
	let touchEndY = 0;
	const body = document.body;

	body.addEventListener('touchstart', e => {
		touchStartY = e.touches[0].clientY;
	});

	body.addEventListener('touchmove', e => {
		touchEndY = e.touches[0].clientY;
		const pullDistance = touchEndY - touchStartY;

		if (window.scrollY === 0 && pullDistance > 0) {
			e.preventDefault();
			body.style.transform = `translateY(${pullDistance * 0.3}px)`;
		}
	});

	body.addEventListener('touchend', () => {
		body.style.transform = '';
	});
	*/
});

// Enhanced mobile interactions
document.addEventListener('DOMContentLoaded', function () {
	// Add parallax effect for mobile (Commented out)
	/*
	const parallaxElements = document.querySelectorAll('#home, .portfolio-thumb');
	window.addEventListener('scroll', () => {
		parallaxElements.forEach(element => {
			const speed = 0.5;
			const yPos = -(window.pageYOffset * speed);
			element.style.transform = `translateY(${yPos}px)`;
		});
	});
	*/

	// Add touch feedback for all interactive elements
	const interactiveElements = document.querySelectorAll('.btn, .portfolio-thumb, .media .fa, .social-icon li a, input[type="submit"]');
	interactiveElements.forEach(element => {
		element.addEventListener('touchstart', function () {
			this.classList.add('touch-active');
		});
		element.addEventListener('touchend', function () {
			this.classList.remove('touch-active');
		});
	});

	// Improved portfolio item interactions
	const portfolioItems = document.querySelectorAll('.portfolio-thumb');
	portfolioItems.forEach(item => {
		item.addEventListener('touchstart', function () {
			this.style.transform = 'scale(0.98)';
		});
		item.addEventListener('touchend', function () {
			this.style.transform = 'scale(1)';
		});
	});

	// Add haptic feedback for important interactions
	if ('vibrate' in navigator) {
		const hapticElements = document.querySelectorAll('.btn, input[type="submit"]');
		hapticElements.forEach(element => {
			element.addEventListener('touchstart', () => {
				navigator.vibrate(10);
			});
		});
	}

	// Improved scroll performance
	let scrollTimeout;
	window.addEventListener('scroll', () => {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(() => {
				scrollTimeout = null;
				// Update any scroll-based animations here
			}, 100);
		}
	});

	// Add loading animation for images
	const images = document.querySelectorAll('img');
	images.forEach(img => {
		img.addEventListener('load', function () {
			this.classList.add('loaded');
		});
	});

	// Enhanced mobile navigation (Commented out as #fp-nav is related to fullPage.js)
	/*
	const navLinks = document.querySelectorAll('#fp-nav ul li a');
	navLinks.forEach(link => {
		link.addEventListener('touchstart', function () {
			navLinks.forEach(l => l.classList.remove('active'));
			this.classList.add('active');
		});
	});
	*/

	// Add pull-to-refresh with loading indicator (Commented out)
	/*
	let isRefreshing = false;
	const refreshIndicator = document.createElement('div');
	refreshIndicator.className = 'refresh-indicator';
	document.body.appendChild(refreshIndicator);

	let startY = 0;
	let pullDistance = 0;

	document.addEventListener('touchstart', e => {
		if (window.scrollY === 0) {
			startY = e.touches[0].clientY;
		}
	});

	document.addEventListener('touchmove', e => {
		if (window.scrollY === 0 && !isRefreshing) {
			pullDistance = e.touches[0].clientY - startY;
			if (pullDistance > 0) {
				e.preventDefault();
				refreshIndicator.style.transform = `translateY(${pullDistance}px)`;
				refreshIndicator.style.opacity = Math.min(pullDistance / 100, 1);
			}
		}
	});

	document.addEventListener('touchend', () => {
		if (pullDistance > 100 && !isRefreshing) {
			isRefreshing = true;
			refreshIndicator.classList.add('refreshing');
			// Simulate refresh
			setTimeout(() => {
				isRefreshing = false;
				refreshIndicator.classList.remove('refreshing');
				refreshIndicator.style.transform = '';
				refreshIndicator.style.opacity = '0';
				pullDistance = 0;
			}, 1500);
		} else {
			refreshIndicator.style.transform = '';
			refreshIndicator.style.opacity = '0';
			pullDistance = 0;
		}
	});
	*/
});

// --- Minimalist transitions and hover/focus effects for desktop ---
document.addEventListener('DOMContentLoaded', function () {
	// Fade/slide-in on scroll for major sections and cards
	const fadeElements = document.querySelectorAll('.section-title, .about-content, .project-card, .certificate-card, .contact-content');
	function revealOnScroll() {
		const triggerBottom = window.innerHeight * 0.92;
		fadeElements.forEach(el => {
			const rect = el.getBoundingClientRect();
			if (rect.top < triggerBottom) {
				el.classList.add('fade-in-element', 'is-visible');
			}
		});
	}
	window.addEventListener('scroll', revealOnScroll);
	revealOnScroll();

	// Keyboard focus visible for accessibility
	const focusable = document.querySelectorAll('.btn, a, .project-card, .certificate-card, input, textarea');
	focusable.forEach(el => {
		el.addEventListener('focus', function () {
			this.classList.add('focus-visible');
		});
		el.addEventListener('blur', function () {
			this.classList.remove('focus-visible');
		});
	});

	// Desktop hover effect for project/certificate cards
	function addHoverEffect(selector, hoverClass) {
		document.querySelectorAll(selector).forEach(el => {
			el.addEventListener('mouseenter', function () {
				this.classList.add(hoverClass);
			});
			el.addEventListener('mouseleave', function () {
				this.classList.remove(hoverClass);
			});
		});
	}
	addHoverEffect('.project-card', 'card-hover');
	addHoverEffect('.certificate-card', 'card-hover');
	addHoverEffect('.btn', 'btn-hover');
	addHoverEffect('.nav-links a', 'nav-hover');

	// Optional: subtle cursor follower for desktop
	const cursor = document.querySelector('.cursor-follower');
	if (cursor) {
		document.addEventListener('mousemove', e => {
			cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
		});
		cursor.style.position = 'fixed';
		cursor.style.width = '20px';
		cursor.style.height = '20px';
		cursor.style.borderRadius = '50%';
		cursor.style.background = 'rgba(80,80,80,0.13)';
		cursor.style.pointerEvents = 'none';
		cursor.style.zIndex = '10000';
		cursor.style.transition = 'transform 0.13s cubic-bezier(.4,0,.2,1)';
	}
});