// Project data - uitgebreide informatie per project
const projectsData = {
    'UNVEIL': {
        title: 'UNVEIL',
        subtitle: 'Bachelor Thesis',
        category: 'Thesis Project',
        year: '2025',
        role: 'UX Research, UI Design, Development',
        tech: 'React, Next.js, Firebase, MongoDB, Expo',
        liveUrl: null, // No live version available
        description: `Unveil is a mobile application that allows users to discover cities through audio-based storytelling. The app enables local residents to record and share audio fragments about places that are meaningful to them, while visitors can listen to these stories as they explore the city. Users are free to choose how they navigate the experience by selecting individual audio spots directly from an interactive map or by following curated tours that guide them through multiple locations. By combining location-based audio with personal narratives, Unveil adds an authentic and human layer to urban exploration and creates a stronger connection between people and the city.`,
        images: [
            'assets/img/unveil.png',
            'assets/img/unveil_img_1.png',
            'assets/img/unveil_img_2.png'
        ]
    },
    'SWEAR': {
        title: 'SWEAR',
        subtitle: '3D shoe configurator',
        category: 'E-Commerce',
        year: '2025',
        role: '3D Development, Modeling, UI Design, Development',
        tech: 'Three.js, Vue, Blender, MongoDB, Node.js',
        liveUrl: 'https://swearthreejs.vercel.app/',
        description: `The Swear 3D Shoe Configurator is an interactive web experience developed for Flux in collaboration with Swear London. The project involved creating a fully customizable shoe configurator using Three.js, allowing users to design their own shoes and place orders directly within the experience. In addition to the configurator, a backend management panel was developed to receive and process orders so the shoes could be produced accordingly. The visual direction closely followed Swear’s bold branding and rebellious attitude, with the interface and overall experience inspired by a nostalgic PlayStation 1 and 2 era aesthetic.`,
        images: [
            'assets/img/swear.png',
            'assets/img/swear_img_1.png',
            'assets/img/swear_img_2.png'
        ]
    },
    'GARDEROBE': {
        title: 'GARDEROBE',
        subtitle: 'React App with webflow cms',
        category: 'Web Application',
        year: '2025',
        role: 'Full Stack Development, UI / UX',
        tech: 'React, Webflow CMS, Expo Go',
        liveUrl: 'https://faisal---mobile-development.webflow.io/',
        description: `Garderobe is a mobile application focused on the discovery and purchase of luxury fashion. The project involved building a fully functional app using Expo that dynamically displays content fetched from a CMS, closely reflecting a real world production setup. A Webflow CMS was implemented to manage products and editorial content, including blogs that are also published on the web version of the platform. Within the app, users can browse and purchase items, add products to a wishlist, and manage their orders and saved items through a dedicated profile section, creating a seamless and polished shopping experience.`,
        images: [
            'assets/img/garderobe.png',
            'assets/img/garderobe_img_1.png',
            'assets/img/garderobe_img_2.png'
        ]
    },
    'SANCUS': {
        title: 'SANCUS',
        subtitle: 'Government platform',
        category: 'Government',
        year: '2024',
        role: 'UI/UX Design, Frontend Development',
        tech: 'HTML, CSS, JavaScript',
        liveUrl: null,
        description: `Sancus is a digital platform developed for a government institution within the social security sector. The project focused on supporting individuals who are unable to leave their homes due to mental or physical limitations, either temporarily or permanently. Through the platform, users can arrange food packages to be delivered to their homes and access a social calendar designed to encourage gradual reintegration into society through community activities. In addition, the platform provides a centralized space where users can manage and store all government related documents, offering clarity, support, and accessibility in situations where daily life can be challenging.`,
        images: [
            'assets/img/sancus.png',
            'assets/img/sancus_img_1.png',
            'assets/img/sancus_img_2.png'
        ]
    },
    'HOPPIN': {
        title: 'HOPPIN',
        subtitle: 'Design and user interface',
        category: 'UI/UX Design',
        year: '2023',
        role: 'UI/UX Design, Prototyping',
        tech: 'Figma',
        client: 'Hoppin Mobility',
        liveUrl: null, // Mobile app - not web accessible
        description: `Hoppin is a conceptual redesign project aimed at transforming an existing basic application into a more complete and usable platform. Starting from an early stage product, we were given full creative freedom to reimagine the experience and design a hopping route planner with usability as the core focus. The project emphasized clear user flows, intuitive interactions, and a well considered interface, making it primarily an exercise in UI and UX design to explore how thoughtful design decisions can significantly improve the overall user experience.`,
        images: [
            'assets/img/hoppin.png',
            'assets/img/hoppin_img_1.png',
            'assets/img/hoppin_img_2.png'
        ]
    },
    'ARTEX': {
        title: 'ARTEX',
        subtitle: 'Branding',
        category: 'Branding',
        year: '2022',
        role: 'Brand Design',
        tech: 'Figma',
        liveUrl: null,
        description: `ARTEX is a branding and app design project centered around the theme of culture. The concept focuses on creating a digital exhibition platform that gives digital artists the opportunity to present their work in a curated, exhibition style environment. The project involved developing the branding and interactive prototype for an app where artists can participate in exhibitions, while users purchase access to view them, similar to how physical exhibitions operate in real life. By translating the traditional exhibition model to a digital space, ARTEX aims to bridge the gap between digital and physical art and provide digital artists with the recognition and value they deserve.`,
        images: [
            'assets/img/artex.png',
            'assets/img/artex_img_1.png',
            'assets/img/artex_img_2.png'
        ]
    }
};

// Get project data from localStorage or URL parameter
function getProjectData() {
    // Try to get from localStorage first
    const storedProject = localStorage.getItem('currentProject');
    if (storedProject) {
        const basicData = JSON.parse(storedProject);
        // Merge with full project data
        const fullData = projectsData[basicData.title];
        if (fullData) {
            return fullData;
        }
        return basicData;
    }
    
    // Fallback: get from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle = urlParams.get('project');
    if (projectTitle && projectsData[projectTitle]) {
        return projectsData[projectTitle];
    }
    
    // Default fallback
    return projectsData['UNVEIL'];
}

// Get all project titles for next project
function getNextProject(currentTitle) {
    const projectTitles = Object.keys(projectsData);
    const currentIndex = projectTitles.indexOf(currentTitle);
    const nextIndex = (currentIndex + 1) % projectTitles.length;
    return projectsData[projectTitles[nextIndex]];
}

// Initialize page
function initProjectDetail() {
    const projectData = getProjectData();
    
    // Populate page content
    document.getElementById('project-title').textContent = projectData.title;
    document.getElementById('project-category').textContent = projectData.category;
    document.getElementById('hero-img').src = projectData.images[0];
    document.getElementById('hero-img').alt = projectData.title;
    document.getElementById('project-role').textContent = projectData.role;
    document.getElementById('project-year').textContent = projectData.year;
    document.getElementById('project-tech').textContent = projectData.tech;
    document.getElementById('project-description').textContent = projectData.description;
    
    // Update page title
    document.title = `${projectData.title} - Project Detail`;
    
    // Populate gallery
    const gallery = document.getElementById('project-gallery');
    projectData.images.slice(1).forEach(imgSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${imgSrc}" alt="${projectData.title}" loading="lazy">`;
        gallery.appendChild(galleryItem);
    });
    
    // Show live project button if URL exists
    if (projectData.liveUrl) {
        const liveSection = document.getElementById('view-live-section');
        const liveLink = document.getElementById('live-project-link');
        liveLink.href = projectData.liveUrl;
        liveSection.style.display = 'block';
    }
    
    // Trigger entrance animations
    setTimeout(() => {
        triggerEntranceAnimations();
    }, 100);
}

// Navigate to project with animation
function navigateToProject(projectData) {
    // Store project data
    localStorage.setItem('currentProject', JSON.stringify(projectData));
    
    // Trigger expand animation
    const overlay = document.getElementById('expand-overlay');
    overlay.classList.add('expanding');
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = 'project-detail.html';
    }, 800);
}

// Entrance animations
function triggerEntranceAnimations() {
    const main = document.querySelector('.project-detail-main');
    main.classList.add('loaded');
    
    // Animate elements with GSAP
    gsap.to('.back-button', {
        opacity: 1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.to('.project-hero-image', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.to('.project-hero-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.to('.project-info', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.to('.project-description-section', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.to('.project-gallery', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.to('.view-live-project', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.9,
        ease: 'power3.out'
    });
}

// Handle back button with animation
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-link');
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Clear stored project
        localStorage.removeItem('currentProject');
        
        // Fade out and navigate
        gsap.to('.project-detail-main', {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                window.location.href = 'work.html';
            }
        });
    });
});

// Initialize on load
initProjectDetail();
