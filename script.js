// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Page Transition Animations =====
function initPageTransitions() {
    if (typeof gsap === 'undefined') return;
    
    // Page entrance animation - fade in with upward movement
    gsap.set('body', { opacity: 0, y: 20 });
    gsap.to('body', {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 0.1
    });
    
    // Intercept internal navigation links for smooth page transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only transition for internal links (same domain)
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                e.preventDefault();
                
                // Page exit animation - fade out with slight downward movement
                gsap.to('body', {
                    duration: 0.4,
                    opacity: 0,
                    y: -15,
                    ease: 'power2.in',
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
}

// Initialize page transitions immediately
initPageTransitions();

// ===== Active Navigation Link =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveNav();

// ===== GSAP Animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined') {
        
        // Hero Section Animations - Modern, calm, technology-focused
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            // Initial states - set elements invisible and positioned below
            gsap.set('.hero h1', { opacity: 0, y: 40 });
            gsap.set('.hero p', { opacity: 0, y: 30 });
            gsap.set('.hero .btn', { opacity: 0, y: 20, scale: 0.96 });
            
            // Create a timeline for sequential, coordinated animations
            const heroTimeline = gsap.timeline({ delay: 0.2 });
            
            // Main heading - slides up with smooth fade
            heroTimeline.to('.hero h1', {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            });
            
            // Subheading - follows with slight overlap for natural flow
            heroTimeline.to('.hero p', {
                duration: 0.7,
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            }, '-=0.4');
            
            // CTA buttons - final reveal with subtle scale
            heroTimeline.to('.hero .btn', {
                duration: 0.6,
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.12,
                ease: 'back.out(1.4)'
            }, '-=0.3');
        }

        // Page Header Animation
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            gsap.set('.page-header h1', { opacity: 0, y: 25 });
            gsap.set('.page-header p', { opacity: 0, y: 18 });
            
            gsap.to('.page-header h1', {
                duration: 0.7,
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            });
            gsap.to('.page-header p', {
                duration: 0.6,
                y: 0,
                opacity: 1,
                delay: 0.15,
                ease: 'power2.out'
            });
        }

        // About Cards Animation - Scroll-triggered dashboard reveal
        const aboutCards = document.querySelectorAll('.about-card');
        if (aboutCards.length > 0) {
            gsap.set('.about-card', { 
                opacity: 0, 
                y: 35, 
                scale: 0.95,
                transformOrigin: 'center bottom'
            });
            
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || 0);
                        gsap.to(entry.target, {
                            duration: 0.6,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            delay: index * 0.1
                        });
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -40px 0px'
            });
            
            aboutCards.forEach((card, index) => {
                card.setAttribute('data-index', index);
                aboutObserver.observe(card);
            });
        }

        // Feature Cards Animation - Dashboard-like scroll reveal
        const featureCards = document.querySelectorAll('.feature-card');
        if (featureCards.length > 0) {
            // Set initial state - invisible, below position, slightly smaller
            gsap.set('.feature-card', { 
                opacity: 0, 
                y: 35, 
                scale: 0.95,
                transformOrigin: 'center bottom'
            });
            
            // Create Intersection Observer for scroll-triggered animations
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || 0);
                        // Animate card when it enters viewport
                        gsap.to(entry.target, {
                            duration: 0.6,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            delay: index * 0.08 // Staggered timing based on position
                        });
                        featureObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });
            
            // Observe each feature card
            featureCards.forEach((card, index) => {
                card.setAttribute('data-index', index);
                featureObserver.observe(card);
            });
        }

        // Contact Form Animation - scroll triggered with left/right entry
        const contactForm = document.querySelector('.contact-form');
        const contactInfo = document.querySelector('.contact-info');
        if (contactForm && contactInfo) {
            gsap.set('.contact-info', { opacity: 0, x: -35 });
            gsap.set('.contact-form', { opacity: 0, x: 35 });
            
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to('.contact-info', {
                            duration: 0.6,
                            x: 0,
                            opacity: 1,
                            ease: 'power2.out'
                        });
                        gsap.to('.contact-form', {
                            duration: 0.6,
                            x: 0,
                            opacity: 1,
                            ease: 'power2.out',
                            delay: 0.1
                        });
                        contactObserver.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            contactObserver.observe(contactForm);
        }

        // Section Titles Animation with scroll trigger
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title, index) => {
            gsap.set(title, { opacity: 0, y: 25 });
            
            const titleObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            duration: 0.6,
                            y: 0,
                            opacity: 1,
                            ease: 'power2.out'
                        });
                        titleObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            titleObserver.observe(title);
        });

        // Alternating left/right scroll animations for content sections
        const animateSections = document.querySelectorAll('.section');
        animateSections.forEach((section, index) => {
            const content = section.querySelector('.container');
            if (content) {
                // Alternate direction: even = left, odd = right (subtle movement)
                const direction = index % 2 === 0 ? -30 : 30;
                
                gsap.set(content, { 
                    opacity: 0, 
                    x: direction
                });
                
                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            gsap.to(entry.target, {
                                duration: 0.6,
                                x: 0,
                                opacity: 1,
                                ease: 'power2.out'
                            });
                            sectionObserver.unobserve(entry.target);
                        }
                    });
                }, { 
                    threshold: 0.15,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                sectionObserver.observe(content);
            }
        });

        // Enhanced hover animations for cards - lift + soft shadow
        document.querySelectorAll('.about-card, .feature-card').forEach(card => {
            // Store original box-shadow
            const originalShadow = getComputedStyle(card).boxShadow;
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.28,
                    y: -6,
                    scale: 1.02,
                    boxShadow: '0 16px 35px rgba(67, 97, 238, 0.18)',
                    ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.28,
                    y: 0,
                    scale: 1,
                    boxShadow: originalShadow,
                    ease: 'power2.out'
                });
            });
        });

        // Enhanced button hover animation - lift + soft shadow
        document.querySelectorAll('.btn').forEach(btn => {
            const originalBtnShadow = getComputedStyle(btn).boxShadow;
            
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.25,
                    y: -4,
                    scale: 1.03,
                    boxShadow: '0 12px 25px rgba(67, 97, 238, 0.25)',
                    ease: 'power2.out'
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.25,
                    y: 0,
                    scale: 1,
                    boxShadow: originalBtnShadow,
                    ease: 'power2.out'
                });
            });
        });

        // Contact items hover - subtle lift effect
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    duration: 0.3,
                    x: 8,
                    ease: 'power2.out'
                });
                gsap.to(item.querySelector('.icon'), {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.3,
                    x: 0,
                    ease: 'power2.out'
                });
                gsap.to(item.querySelector('.icon'), {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Nav links hover - subtle underline effect with lift
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.2,
                    y: -2,
                    ease: 'power2.out'
                });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.2,
                    y: 0,
                    ease: 'power2.out'
                });
            });
        });

        // Navbar drop-in animation from top
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            gsap.set('.navbar', { opacity: 0, y: -80 });
            gsap.to('.navbar', {
                duration: 0.6,
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            });
        }

        // Logo animation with slight delay after navbar
        const logo = document.querySelector('.logo');
        if (logo) {
            gsap.set('.logo', { opacity: 0, scale: 0.85 });
            gsap.to('.logo', {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                ease: 'back.out(1.4)',
                delay: 0.4
            });
        }

        // Nav links sequential fade in with stagger
        const navLinksDesktop = document.querySelectorAll('.nav-links a');
        if (navLinksDesktop.length > 0) {
            gsap.set('.nav-links a', { opacity: 0, y: -12 });
            gsap.to('.nav-links a', {
                duration: 0.4,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.5
            });
        }

        // Footer Animation - fade in and slide up when reaching bottom
        const footer = document.querySelector('.footer');
        if (footer) {
            // Set initial state - invisible and below
            gsap.set('.footer', { opacity: 0, y: 30 });
            gsap.set('.footer-logo', { opacity: 0, y: 15 });
            gsap.set('.footer-links a', { opacity: 0, y: 12 });
            gsap.set('.footer-bottom', { opacity: 0 });
            
            // Create Intersection Observer for footer
            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Create timeline for coordinated footer animation
                        const footerTimeline = gsap.timeline();
                        
                        // Footer container fades in and slides up
                        footerTimeline.to('.footer', {
                            duration: 0.6,
                            opacity: 1,
                            y: 0,
                            ease: 'power2.out'
                        });
                        
                        // Logo appears with slight bounce
                        footerTimeline.to('.footer-logo', {
                            duration: 0.45,
                            opacity: 1,
                            y: 0,
                            ease: 'back.out(1.3)'
                        }, '-=0.35');
                        
                        // Footer links stagger in
                        footerTimeline.to('.footer-links a', {
                            duration: 0.35,
                            opacity: 1,
                            y: 0,
                            stagger: 0.08,
                            ease: 'power2.out'
                        }, '-=0.25');
                        
                        // Copyright fades in last
                        footerTimeline.to('.footer-bottom', {
                            duration: 0.4,
                            opacity: 1,
                            ease: 'power2.out'
                        }, '-=0.15');
                        
                        footerObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -20px 0px'
            });
            
            footerObserver.observe(footer);
        }
    }
});

// ===== Contact Form Handling =====
const contactFormElement = document.getElementById('contactForm');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && message) {
            // Show success message with animation
            const successMessage = document.querySelector('.success-message');
            successMessage.classList.add('show');
            
            if (typeof gsap !== 'undefined') {
                gsap.from(successMessage, {
                    duration: 0.5,
                    y: 20,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }

            // Reset form
            contactFormElement.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(successMessage, {
                        duration: 0.3,
                        opacity: 0,
                        y: -10,
                        onComplete: () => {
                            successMessage.classList.remove('show');
                            gsap.set(successMessage, { opacity: 1, y: 0 });
                        }
                    });
                } else {
                    successMessage.classList.remove('show');
                }
            }, 5000);
        }
    });
}

// ===== Navbar Scroll Effect with GSAP =====
let lastScroll = 0;
let isNavbarCompact = false;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (typeof gsap !== 'undefined') {
        // Scroll down - compact navbar
        if (currentScroll > 80 && currentScroll > lastScroll && !isNavbarCompact) {
            isNavbarCompact = true;
            gsap.to(navbar, {
                duration: 0.4,
                padding: '0.6rem 2rem',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });
            gsap.to('.logo', {
                duration: 0.3,
                fontSize: '1.25rem',
                ease: 'power2.out'
            });
            gsap.to('.nav-links a', {
                duration: 0.3,
                padding: '0.4rem 0.8rem',
                ease: 'power2.out'
            });
        }
        // Scroll up or at top - expand navbar
        else if ((currentScroll < lastScroll || currentScroll <= 80) && isNavbarCompact) {
            isNavbarCompact = false;
            gsap.to(navbar, {
                duration: 0.4,
                padding: '1rem 2rem',
                boxShadow: currentScroll > 50 ? '0 4px 30px rgba(0, 0, 0, 0.15)' : '0 2px 20px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
            gsap.to('.logo', {
                duration: 0.3,
                fontSize: '1.5rem',
                ease: 'power2.out'
            });
            gsap.to('.nav-links a', {
                duration: 0.3,
                padding: '0.5rem 1rem',
                ease: 'power2.out'
            });
        }
        // Update shadow based on scroll position
        else if (currentScroll > 50 && currentScroll <= 80) {
            gsap.to(navbar, {
                duration: 0.3,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });
        } else if (currentScroll <= 50) {
            gsap.to(navbar, {
                duration: 0.3,
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        }
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
