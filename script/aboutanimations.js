// About page animations
gsap.registerPlugin(ScrollTrigger);

// Set initial states
gsap.set(['.about-image', '.about-content h1', '.intro', '.about-text', '.skills-section', '.skill-category', '.button-container'], {
    opacity: 0
});

// Fade in image
gsap.to('.about-image', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3
});

// Fade in title
gsap.to('.about-content h1', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.5
});

// Fade in intro
gsap.to('.intro', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.7
});

// Fade in about text
gsap.to('.about-text', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.9
});

// Fade in skills section
gsap.to('.skills-section', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.1
});

// Animate skill categories
gsap.to('.skill-category', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 1.3
});

// Fade in button container
gsap.to('.button-container', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.6
});

