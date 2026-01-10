// GSAP Animations for Index Page
gsap.from('nav', {
    y: -50,
    opacity: 0,
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

// Navbar color switch on scroll
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > heroBottom - 100) {
        nav.classList.add('nav-dark');
    } else {
        nav.classList.remove('nav-dark');
    }
});
