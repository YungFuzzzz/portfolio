import * as THREE from 'three';

// Project data
const projects = [
    { 
        title: 'UNVEIL', 
        subtitle: 'Bachelor Thesis', 
        image: 'assets/img/unveil.png',
        link: '#'
    },
    { 
        title: 'SWEAR', 
        subtitle: '3D shoe configurator', 
        image: 'assets/img/swear.png',
        link: '#'
    },
    { 
        title: 'GARDEROBE', 
        subtitle: 'React App with webflow cms', 
        image: 'assets/img/garderobe.png',
        link: '#'
    },
    { 
        title: 'SANCUS', 
        subtitle: 'Government platform', 
        image: 'assets/img/sancus.png',
        link: '#'
    },
    { 
        title: 'HOPPIN', 
        subtitle: 'Design and user interface', 
        image: 'assets/img/hoppin.png',
        link: '#'
    },
    { 
        title: 'ARTEX', 
        subtitle: 'Branding, UI and UX', 
        image: 'assets/img/artex.png',
        link: '#'
    }
];

// Scene setup
const canvas = document.getElementById('carousel-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 22;

// Renderer
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Carousel settings
const carouselItems = [];
const totalProjects = projects.length;
const angleStep = (Math.PI * 2) / totalProjects;
const radius = 12;
let currentRotation = 0;
let targetRotation = 0;

// Mouse parallax
const mousePos = { x: 0, y: 0 };
const targetCameraPos = { x: 0, y: 0 };

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Create carousel items
const textureLoader = new THREE.TextureLoader();
projects.forEach((project, index) => {
    // Load texture
    const texture = textureLoader.load(project.image);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // Create plane geometry (16:9 aspect ratio)
    const geometry = new THREE.PlaneGeometry(5, 2.8125);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position in circle
    const angle = index * angleStep;
    mesh.position.x = Math.sin(angle) * radius;
    mesh.position.z = Math.cos(angle) * radius;
    // Point radially outward from center
    mesh.rotation.y = angle;
    
    // Store project data
    mesh.userData = {
        index,
        project: project,
        originalScale: { x: 1, y: 1, z: 1 }
    };
    
    scene.add(mesh);
    carouselItems.push(mesh);
});

// Update project title display
const projectDescEl = document.getElementById('project-description');
function updateProjectDescription(index) {
    const project = projects[index];
    const p = projectDescEl.querySelector('p');
    
    p.textContent = project.subtitle;
    
    projectDescEl.classList.add('active');
}

// Get current front item
function getCurrentFrontIndex() {
    const normalizedRotation = ((currentRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.round(normalizedRotation / angleStep) % totalProjects;
}

// Scroll handler
let scrollTimeout;
window.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    const rotationAmount = (delta * 0.003);
    
    targetRotation += rotationAmount;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Snap to nearest item only after user stops scrolling
        const nearestAngle = Math.round(targetRotation / angleStep) * angleStep;
        targetRotation = nearestAngle;
        
        // Update description
        const frontIndex = getCurrentFrontIndex();
        updateProjectDescription(frontIndex);
    }, 500); // Increased from 100ms to 500ms for smoother, less aggressive snapping
});

// Touch support
let touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    targetRotation += delta * 0.002;
    touchStartY = touchEndY;
});

canvas.addEventListener('touchend', () => {
    const nearestAngle = Math.round(targetRotation / angleStep) * angleStep;
    targetRotation = nearestAngle;
    const frontIndex = getCurrentFrontIndex();
    updateProjectDescription(frontIndex);
});

// Click handler
canvas.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(carouselItems);
    
    if (intersects.length > 0) {
        const clickedItem = intersects[0].object;
        const clickedIndex = clickedItem.userData.index;
        const frontIndex = getCurrentFrontIndex();
        
        if (clickedIndex === frontIndex) {
            // Navigate to project
            const projectLink = clickedItem.userData.project.link;
            if (projectLink && projectLink !== '#') {
                window.location.href = projectLink;
            } else {
                console.log('Opening project:', clickedItem.userData.project.title);
            }
        } else {
            // Rotate to clicked item
            targetRotation = clickedIndex * angleStep;
            updateProjectDescription(clickedIndex);
        }
    }
});

// Hover effect
canvas.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    // Update mouse position for parallax
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCameraPos.x = -mousePos.x * 2;
    targetCameraPos.y = -mousePos.y * 1.5;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(carouselItems);
    
    // Reset all scales
    carouselItems.forEach(item => {
        gsap.to(item.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Scale up hovered item
    if (intersects.length > 0) {
        const hoveredItem = intersects[0].object;
        canvas.style.cursor = 'pointer';
        gsap.to(hoveredItem.scale, {
            x: 1.05,
            y: 1.05,
            z: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    } else {
        canvas.style.cursor = 'default';
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth rotation
    currentRotation += (targetRotation - currentRotation) * 0.1;
    
    // Smooth parallax camera movement
    camera.position.x += (targetCameraPos.x - camera.position.x) * 0.05;
    camera.position.y += (targetCameraPos.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    
    // Rotate all items around center
    carouselItems.forEach((item, index) => {
        const angle = index * angleStep - currentRotation;
        item.position.x = Math.sin(angle) * radius;
        item.position.z = Math.cos(angle) * radius;
        // Update rotation so each image points radially outward (like wheel spokes)
        item.rotation.y = angle;
    });
    
    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize
updateProjectDescription(0);
animate();

// Entrance animation
gsap.from('.scroll-indicator', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out'
});
