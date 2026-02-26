// Project Showcase - Voku Studio Style Arch Carousel

// Animation Configuration - Unified settings
const ANIMATION_CONFIG = {
    titleScroll: {
        duration: 0.4,
        ease: 'power2.inOut',
        offset: 18
    }
};

// Global projects data
const projectsData = [
    {
        title: 'Unveil',
        image: './assets/img/unveil.webp',
        fullImage: './assets/img/unveil_full.webp',
        description: 'Unveil is a mobile application that allows users to discover cities through audio-based storytelling. The app enables local residents to record and share audio fragments about places that are meaningful to them, while visitors can listen to these stories as they explore the city. Users are free to choose how they navigate the experience by selecting individual audio spots directly from an interactive map or by following curated tours that guide them through multiple locations. By combining location-based audio with personal narratives, Unveil adds an authentic and human layer to urban exploration and creates a stronger connection between people and the city.',
        categories: ['design', 'development', 'concepts'],
        role: 'UX Research, UI Design, Development',
        year: '2025',
        technology: 'Figma, React, Next.js, Firebase, MongoDB, Expo, Node.js',
        liveUrl: '',
        detailImages: ['./assets/img/unveil_1.webp', './assets/img/unveil_2.webp', './assets/img/unveil_3.webp', './assets/img/unveil_4.webp', './assets/img/unveil_5.webp', './assets/img/unveil_6.webp']
    },
    {
        title: 'Swear',
        image: './assets/img/swear.webp',
        fullImage: './assets/img/swear_full.webp',
        description: 'The Swear 3D Shoe Configurator is an interactive web experience developed for Flux in collaboration with Swear London. The project involved creating a fully customizable shoe configurator using Three.js, allowing users to design their own shoes and place orders directly within the experience. In addition to the configurator, a backend management panel was developed to receive and process orders so the shoes could be produced accordingly. The visual direction closely followed Swear’s bold branding and rebellious attitude, with the interface and overall experience inspired by a nostalgic PlayStation 1 and 2 era aesthetic.',
        categories: ['design', 'development'],
        role: '3D Development, Modeling, UI Design, Development',
        year: '2025',
        technology: 'Three.js, Vue, Blender, MongoDB, Node.js',
        liveUrl: 'https://swearthreejs.vercel.app/',
        detailImages: ['./assets/img/swear_1.webp', './assets/img/swear_2.webp', './assets/img/swear_3.webp', './assets/img/swear_4.webp', './assets/img/swear_5.webp']
    },
    {
        title: 'Garderobe',
        image: './assets/img/garderobe.webp',
        fullImage: './assets/img/garderobe_full.webp',
        description: 'Garderobe is a mobile application focused on the discovery and purchase of luxury fashion. The project involved building a fully functional app using Expo that dynamically displays content fetched from a CMS, closely reflecting a real world production setup. A Webflow CMS was implemented to manage products and editorial content, including blogs that are also published on the web version of the platform. Within the app, users can browse and purchase items, add products to a wishlist, and manage their orders and saved items through a dedicated profile section, creating a seamless and polished shopping experience.',
        categories: ['design', 'development'],
        role: 'Full Stack Development, UI / UX Design',
        year: '2025',
        technology: 'React, Webflow CMS, Expo Go',
        liveUrl: 'https://faisal---mobile-development.webflow.io/',
        detailImages: ['./assets/img/garderobe_1.webp', './assets/img/garderobe_2.webp', './assets/img/garderobe_3.webp', './assets/img/garderobe_4.webp', './assets/img/garderobe_5.webp', './assets/img/garderobe_6.webp']
    },
    {
        title: 'Sancus',
        image: './assets/img/sancus.webp',
        fullImage: './assets/img/sancus_full.webp',
        description: 'Sancus is a digital platform developed for a government institution within the social security sector. The project focused on supporting individuals who are unable to leave their homes due to mental or physical limitations, either temporarily or permanently. Through the platform, users can arrange food packages to be delivered to their homes and access a social calendar designed to encourage gradual reintegration into society through community activities. In addition, the platform provides a centralized space where users can manage and store all government related documents, offering clarity, support, and accessibility in situations where daily life can be challenging.',
        categories: ['concepts', 'design'],
        role: 'UI/UX Design, Frontend Development',
        year: '2024',
        technology: 'Figma, HTML, CSS, JavaScript',
        liveUrl: '',
        detailImages: ['./assets/img/sancus_1.webp', './assets/img/sancus_2.webp', './assets/img/sancus_3.webp']
    },
    {
        title: 'Hoppin',
        image: './assets/img/hoppin.webp',
        fullImage: './assets/img/hoppin_full.webp',
        description: 'Hoppin is a conceptual redesign project aimed at transforming an existing basic application into a more complete and usable platform. Starting from an early stage product, we were given full creative freedom to reimagine the experience and design a hopping route planner with usability as the core focus. The project emphasized clear user flows, intuitive interactions, and a well considered interface, making it primarily an exercise in UI and UX design to explore how thoughtful design decisions can significantly improve the overall user experience.',
        categories: ['design'],
        role: 'UI/UX Design, Prototyping',
        year: '2024',
        technology: 'Figma',
        liveUrl: '',
        detailImages: ['./assets/img/hoppin_1.webp', './assets/img/hoppin_2.webp', './assets/img/hoppin_3.webp', './assets/img/hoppin_4.webp', './assets/img/hoppin_5.webp', './assets/img/hoppin_6.webp']
    },
    {
        title: 'Artex',
        image: './assets/img/artex.webp',
        fullImage: './assets/img/artex_full.webp',
        description: 'ARTEX is a branding and app design project centered around the theme of culture. The concept focuses on creating a digital exhibition platform that gives digital artists the opportunity to present their work in a curated, exhibition style environment. The project involved developing the branding and interactive prototype for an app where artists can participate in exhibitions, while users purchase access to view them, similar to how physical exhibitions operate in real life. By translating the traditional exhibition model to a digital space, ARTEX aims to bridge the gap between digital and physical art and provide digital artists with the recognition and value they deserve.',
        categories: ['design', 'concepts'],
        role: 'Brand Design',
        year: '2023',
        technology: 'Figma',
        liveUrl: '',
        detailImages: ['./assets/img/artex_1.webp', './assets/img/artex_2.webp', './assets/img/artex_3.webp', './assets/img/artex_4.webp', './assets/img/artex_5.webp']
    }
];

// Global reference to update function (set after initialization)
let globalUpdateActiveProject = null;

document.addEventListener('DOMContentLoaded', () => {
    initProjectShowcase();
});

function initProjectShowcase() {
    const showcaseContainer = document.querySelector('.showcase-container');
    if (!showcaseContainer) return;

    // IMAGE SIZE - Change dimensions in both URLs below AND in css/showcase.css (.showcase-item)
    // Current: 288x384 (4:3 portrait ratio - keep this ratio when changing)
    const projects = projectsData;

    // Create showcase track
    const track = document.createElement('div');
    track.className = 'showcase-track';
    
    // Create showcase items (duplicate for seamless loop)
    const items = [];
    const allProjects = [...projects, ...projects, ...projects];
    
    allProjects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'showcase-item';
        item.dataset.projectTitle = project.title;
        item.dataset.projectDescription = project.description;
        item.innerHTML = `<img src="${project.image}" alt="${project.title}" draggable="false">`;
        track.appendChild(item);
        items.push(item);
    });
    
    showcaseContainer.appendChild(track);

    // Configuration
    const itemsPerSet = projects.length;
    const totalItems = items.length; // 18 (3 sets)
    const mobile = window.innerWidth <= 768;
    const itemSpacing = mobile ? 150 : 240;
    const archHeight = mobile ? 350 : 550;
    const archWidth = window.innerWidth * 1;
    
    // Scroll state
    let scroll = 0;
    let targetScroll = 0;
    let lastScrollForDirection = 0;
    const ease = 0.1;
    let velocity = 0;
    let lastWheelTime = 0;
    const momentumDecay = 0.92; // How quickly momentum fades (0.92 = smooth deceleration)
    const momentumThreshold = 0.1; // Stop applying momentum below this value
    
    // Calculate position for each item
    function updatePositions() {
        const centerX = window.innerWidth / 2;
        const centerIndex = scroll / itemSpacing;
        const itemWidth = mobile ? 180 : 288;
        const halfTotal = totalItems / 2;
        
        items.forEach((item, index) => {
            // Wrap each item individually so it loops seamlessly
            let offsetIndex = index - centerIndex;
            // Normalize to range [-halfTotal, halfTotal) for seamless wrapping
            offsetIndex = ((offsetIndex % totalItems) + totalItems + halfTotal) % totalItems - halfTotal;
            
            const itemCenterX = centerX + (offsetIndex * itemSpacing);
            const x = itemCenterX - (itemWidth / 2); // Offset for top-left positioning
            
            // Calculate distance from center (normalized -1 to 1)
            const horizontalDistance = (itemCenterX - centerX) / (archWidth / 2);
            const absDistance = Math.abs(horizontalDistance);
            
            // Calculate Y position (circular arch formula)
            // Use circular formula: y = sqrt(r^2 - x^2) for a true arch
            let yOffset = 0;
            if (absDistance <= 1) {
                yOffset = archHeight * Math.sqrt(1 - Math.pow(horizontalDistance, 2));
            }
            const y = window.innerHeight * 0.6 - yOffset; // Lower on the page (60% down)
            
            // Scale based on distance from center (fade out smoothly at edges)
            let scale = 1;
            if (absDistance < 1) {
                scale = Math.max(0.5, 1 - (absDistance * 0.3));
            } else {
                // Fade out completely beyond the arch
                const overshoot = absDistance - 1;
                scale = Math.max(0, 0.5 - (overshoot * 1.5));
            }
            
            // Opacity with smooth fade at edges - 9 items visible (4-1-4)
            let opacity = 1;
            if (absDistance > 0.85) {
                const fadeStart = 0.85;
                const fadeEnd = 1.1;
                const fadeProgress = (absDistance - fadeStart) / (fadeEnd - fadeStart);
                opacity = Math.max(0, 1 - fadeProgress);
            }
            
            // Z-index: items at the apex (lowest absDistance) should be in front
            // Higher z-index for items closer to apex/center
            const zIndex = Math.round(yOffset * 10);
            
            // Apply transforms (no rotation - keep images upright/straight)
            gsap.set(item, {
                x: x,
                y: y,
                scale: scale,
                opacity: opacity,
                rotationZ: 0,
                rotationY: 0,
                zIndex: zIndex
            });
        });
    }
    
    // Animation loop
    function animate() {
        // Apply momentum deceleration if no recent wheel input
        const timeSinceWheel = Date.now() - lastWheelTime;
        if (timeSinceWheel > 50 && Math.abs(velocity) > momentumThreshold) {
            targetScroll += velocity;
            velocity *= momentumDecay;
        } else if (timeSinceWheel > 50) {
            velocity = 0;
        }
        
        // Smooth lerp to target
        scroll += (targetScroll - scroll) * ease;
        
        updatePositions();
        updateCurrentProject();
        requestAnimationFrame(animate);
    }
    
    // Update current project based on scroll position
    let lastProjectIndex = -1;
    function updateCurrentProject() {
        const currentIndex = Math.round(scroll / itemSpacing);
        const projectIndex = ((currentIndex % itemsPerSet) + itemsPerSet) % itemsPerSet;
        
        if (projectIndex !== lastProjectIndex) {
            // Determine scroll direction
            const scrollDirection = scroll > lastScrollForDirection ? 1 : -1;
            lastScrollForDirection = scroll;
            
            updateActiveProject(currentIndex, false, scrollDirection);
            lastProjectIndex = projectIndex;
        }
    }
    
    // Update active project and nav title
    function updateActiveProject(index, skipAnimation = false, scrollDirection = 1) {
        // Calculate actual project index (accounting for duplicates and negative modulo)
        const projectIndex = ((index % itemsPerSet) + itemsPerSet) % itemsPerSet;
        const project = projects[projectIndex];
        
        // Update nav title
        const navTitle = document.getElementById('project-title-nav');
        const navTitleLink = document.querySelector('.project-title-link');
        
        if (navTitle && navTitleLink && project) {
            // Get current title from data attribute (more reliable than textContent)
            const currentTitle = navTitleLink.dataset.currentTitle;
            const newTitle = project.title;
            
            // If first load or skip animation, just set the title
            if (skipAnimation || !currentTitle) {
                const container = document.createElement('div');
                container.className = 'project-title-animate-container';
                
                const text = document.createElement('span');
                text.className = 'project-title-text';
                text.textContent = newTitle;
                
                container.appendChild(text);
                navTitleLink.innerHTML = '';
                navTitleLink.appendChild(container);
                navTitleLink.dataset.projectIndex = projectIndex;
                navTitleLink.dataset.currentTitle = newTitle;
                return;
            }
            
            // Only animate if title actually changed
            if (currentTitle !== newTitle) {
                // Create animated scroll effect
                const container = document.createElement('div');
                container.className = 'project-title-animate-container';
                
                const oldText = document.createElement('span');
                oldText.className = 'project-title-text';
                oldText.textContent = currentTitle;
                oldText.style.position = 'absolute';
                oldText.style.top = '0';
                oldText.style.left = '0';
                oldText.style.width = '100%';
                
                const newText = document.createElement('span');
                newText.className = 'project-title-text';
                newText.textContent = newTitle;
                
                container.appendChild(oldText);
                container.appendChild(newText);
                
                navTitleLink.innerHTML = '';
                navTitleLink.appendChild(container);
                
                // Unified animation using config
                const config = ANIMATION_CONFIG.titleScroll;
                const offset = config.offset;
                
                // Position new text below or above based on scroll direction
                gsap.set(oldText, { y: 0 });
                gsap.set(newText, { y: scrollDirection * offset });
                
                const tl = gsap.timeline();
                
                tl.to(oldText, {
                    y: -scrollDirection * offset,
                    duration: config.duration,
                    ease: config.ease
                }, 0);
                
                tl.to(newText, {
                    y: 0,
                    duration: config.duration,
                    ease: config.ease
                }, 0);
                
                navTitleLink.dataset.currentTitle = newTitle;
            }
            
            navTitleLink.dataset.projectIndex = projectIndex;
        }
    }
    
    // Mouse wheel scrolling
    showcaseContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Update scroll and capture velocity
        const delta = e.deltaY * 0.25;
        targetScroll += delta;
        velocity = delta * 0.3; // Capture velocity for momentum
        lastWheelTime = Date.now();
    });

    // Touch / drag support for mobile
    let touchStartX = 0;
    let touchLastX = 0;
    let isTouching = false;

    showcaseContainer.addEventListener('touchstart', (e) => {
        isTouching = true;
        touchStartX = e.touches[0].clientX;
        touchLastX = touchStartX;
        velocity = 0;
    }, { passive: true });

    showcaseContainer.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        const currentX = e.touches[0].clientX;
        const delta = (touchLastX - currentX) * 1.2;
        targetScroll += delta;
        velocity = delta * 0.3;
        lastWheelTime = Date.now();
        touchLastX = currentX;
    }, { passive: true });

    showcaseContainer.addEventListener('touchend', () => {
        isTouching = false;
    }, { passive: true });
    
    // Initialize - start at first item
    scroll = 0;
    targetScroll = 0;
    lastScrollForDirection = 0;
    updatePositions();
    animate();
    
    // Set initial active project (without animation)
    updateActiveProject(0, true, 1);
    
    // Store reference globally
    globalUpdateActiveProject = updateActiveProject;
    
    // Dispatch event to signal showcase is ready
    window.dispatchEvent(new CustomEvent('showcaseInitialized'));
}
