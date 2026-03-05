// 3D Carousel with Scroll Control
let currentRotation = 0;
let targetRotation = 0;
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const angleIncrement = 360 / totalItems;
const radius = 700; // Distance from center

// Position items in a circle
items.forEach((item, index) => {
    const angle = angleIncrement * index;
    const theta = (angle * Math.PI) / 180;
    
    const x = Math.sin(theta) * radius;
    const z = Math.cos(theta) * radius;
    
    item.style.transform = `
        translate(-50%, -50%)
        translate3d(${x}px, 0, ${z}px)
        rotateY(${-angle}deg)
    `;
});

// Scroll-based rotation
let scrollTimeout;
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const delta = e.deltaY;
    const rotationAmount = delta * 0.1;
    
    targetRotation += rotationAmount;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Snap to nearest item
        const snapRotation = Math.round(targetRotation / angleIncrement) * angleIncrement;
        targetRotation = snapRotation;
    }, 150);
}, { passive: false });

// Smooth animation loop
function animate() {
    currentRotation += (targetRotation - currentRotation) * 0.1;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    requestAnimationFrame(animate);
}
animate();

// Click handler for carousel items
items.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Get the current rotation to find which item is in front
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        const currentIndex = Math.round(normalizedRotation / angleIncrement) % totalItems;
        
        // Only navigate if clicking the front item
        if (index === currentIndex) {
            console.log(`Opening project ${index + 1}`);
            // TODO: Navigate to project page
            // window.location.href = `project-${index + 1}.html`;
        } else {
            // Rotate to clicked item
            const rotationNeeded = index * angleIncrement;
            targetRotation = rotationNeeded;
        }
    });
});

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

carousel.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    const rotationAmount = delta * 0.5;
    
    targetRotation += rotationAmount * 0.1;
    touchStartY = touchEndY;
}, { passive: true });

carousel.addEventListener('touchend', () => {
    // Snap to nearest item
    const snapRotation = Math.round(targetRotation / angleIncrement) * angleIncrement;
    targetRotation = snapRotation;
}, { passive: true });

// Initial entrance animation
gsap.from('.scroll-indicator', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out'
});
