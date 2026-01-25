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

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const projectsSection = document.querySelector('.projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

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

// About Section Animations
// Animate title with split effect
gsap.from('.about-title', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Animate description text
gsap.from('.about-description', {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay: 0.15,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Animate image with scale and fade
gsap.from('.about-image img', {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.1,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Animate buttons
gsap.from('.about-buttons', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay: 0.3,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Projects Section Animations
gsap.from('.projects h2', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

// Animate each project item individually
gsap.utils.toArray('.project-item').forEach((item, index) => {
    gsap.from(item, {
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

gsap.from('.projects-btn', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.projects-btn',
        start: 'top 90%',
        toggleActions: 'play none none none'
    }
});

// Project hover image functionality
const imageContainer = document.querySelector('.project-image-container');
let currentImageUrl = null;

if (imageContainer) {
    // Create a single image element
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';
    imageContainer.appendChild(imageDiv);
    
    document.addEventListener('mousemove', (e) => {
        if (currentImageUrl && window.innerWidth > 968) {
            const x = e.clientX - 250;
            const y = e.clientY - 175;
            imageDiv.style.left = x + 'px';
            imageDiv.style.top = y + 'px';
        }
    });
    
    document.querySelectorAll('.project-item').forEach(item => {
        const imageUrl = item.getAttribute('data-image');
        
        item.addEventListener('mouseenter', () => {
            if (imageUrl && window.innerWidth > 968) {
                currentImageUrl = imageUrl;
                imageDiv.style.backgroundImage = `url(${imageUrl})`;
                imageDiv.style.display = 'block';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            imageDiv.style.display = 'none';
            currentImageUrl = null;
        });
    });
}

// Contact Section Animations
gsap.from('.contact-title', {
    y: 40,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.contact-email', {
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.1,
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.social-icon', {
    y: 20,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    delay: 0.2,
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});
