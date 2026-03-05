// Wait for scene to load before starting animations
window.addEventListener('sceneLoaded', () => {
    gsap.to('nav', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.logo', {
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.nav-links li', {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Animate hero content
    gsap.to('.hero-content', {
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero h1', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.bio-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out'
    });

    // Animate copyright
    gsap.to('.hero-footer', {
        opacity: 1,
        duration: 0.8,
        delay: 1.4,
        ease: 'power2.out'
    });
});
