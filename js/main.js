// GSAP Animations for Ultra Minimal Menu

function updateLocalTime() {
    const timeElement = document.getElementById('localTime');
    if (timeElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes} CET`;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    updateLocalTime();
    setInterval(updateLocalTime, 1000);

    const links = document.querySelectorAll('a');
    const sections = document.querySelectorAll('.page-section');
    const contactItems = document.querySelectorAll('.contact-item');
    const worksFilterItems = document.querySelectorAll('.works-filter');
    const projectTitleNav = document.getElementById('project-title-nav');

    // ------------------------------------
    // MOBILE NAV TOGGLE
    // ------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function openMobileNav() {
        if (!navToggle || !nav) return;
        navToggle.classList.add('active');
        nav.classList.add('nav-open');
    }

    function closeMobileNav() {
        if (!navToggle || !nav) return;
        navToggle.classList.remove('active');
        nav.classList.remove('nav-open');
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    // Sync hamburger invert state with nav
    function syncToggleInvert() {
        if (!navToggle || !nav) return;
        if (nav.classList.contains('nav-invert')) {
            navToggle.classList.add('nav-invert');
        } else {
            navToggle.classList.remove('nav-invert');
        }
    }

    gsap.set('a', { '--pseudo-scale': 0 });

    // Hide all items initially for page load animation
    gsap.set('li:not(.contact-item):not(.works-filter)', { opacity: 0, y: 40 });

    // Hide showcase initially
    const showcaseContainer = document.querySelector('.showcase-container');
    if (showcaseContainer) {
        gsap.set(showcaseContainer, { opacity: 0, y: 100 });
    }

    contactItems.forEach(item => {
        item.style.display = 'none';
        gsap.set(item, { opacity: 0, width: 0, marginLeft: 0, marginRight: 0, pointerEvents: 'none' });
    });

    worksFilterItems.forEach(item => {
        item.style.display = 'none';
        gsap.set(item, { opacity: 0, width: 0, marginLeft: 0, marginRight: 0, pointerEvents: 'none' });
    });

    // ------------------------------------
    // PROJECT TITLE INITIAL STATE
    // ------------------------------------
    // The project title li is set to width:auto, margin:12px, but hidden via y:30 + opacity:0
    // (same as all other li items). showcase.js will fill in the text content.
    if (projectTitleNav) {
        projectTitleNav.classList.add('visible');
        gsap.set(projectTitleNav, { width: 'auto', marginLeft: 12, marginRight: 12 });
    }

    // ------------------------------------
    // PAGE LOAD ANIMATION - Unified Motion
    // ------------------------------------
    // We poll until the showcase has injected the project title text,
    // then we animate everything in as one smooth motion.
    function startPageLoadAnimation() {
        if (projectTitleNav) {
            const text = projectTitleNav.querySelector('.project-title-text');
            if (!text || !text.textContent) {
                requestAnimationFrame(startPageLoadAnimation);
                return;
            }
        }

        // Master timeline - one unified motion
        const master = gsap.timeline({ defaults: { ease: 'expo.out' } });

        // 1) Carousel rises from below: fade in, slide up (no scale to avoid jitter)
        if (showcaseContainer) {
            master.to(showcaseContainer, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out'
            }, 0);
        }

        // 2) Nav items sweep in with stagger, overlapping the carousel rise
        master.to('li:not(.contact-item):not(.works-filter)', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out'
        }, 0.15);
    }

    startPageLoadAnimation();

    // Mark home button as active
    const firstLink = links[0];
    if (firstLink) firstLink.classList.add('active');

    // ------------------------------------
    // HOVER ANIMATIONS FOR UNDERLINES
    // ------------------------------------
    links.forEach((link) => {
        let previousX = null;
        let underlineTimeline = null;

        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const relativePosition = mouseX / rect.width;
            const origin = relativePosition < 0.5 ? 'left' : 'right';

            if (underlineTimeline) underlineTimeline.kill();

            underlineTimeline = gsap.timeline();
            underlineTimeline.set(link, { '--pseudo-origin': origin });
            underlineTimeline.to(link, { '--pseudo-scale': 1, duration: 0.5, ease: 'power3.out' });
            previousX = mouseX;
        });

        link.addEventListener('mousemove', (e) => {
            if (previousX === null) return;
            const rect = link.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            if (Math.abs(currentX - previousX) > 2) {
                gsap.set(link, { '--pseudo-origin': currentX > previousX ? 'left' : 'right' });
            }
            previousX = currentX;
        });

        link.addEventListener('mouseleave', () => {
            previousX = null;

            // Always hide underline for home button, contact items, and works filters
            if (link.classList.contains('home-button') || link.closest('.contact-item') || link.closest('.works-filter')) {
                if (underlineTimeline) underlineTimeline.kill();
                gsap.to(link, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
                return;
            }

            // Don't hide underline if link is active
            if (link.classList.contains('active')) return;

            if (underlineTimeline) underlineTimeline.kill();
            gsap.to(link, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
        });
    });

    // ------------------------------------
    // NAV CLICK HANDLING
    // ------------------------------------
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            // Skip works filter links - handled separately
            if (link.closest('.works-filter')) return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            const currentSection = document.querySelector('.page-section.active');

            if (link.classList.contains('active')) return;

            const isContactLink = href === '#contact';
            const isHomePage = href === '#home';
            const isWorksLink = href === '#works';
            const isPlaygroundLink = href === '#playground';
            const leavingPlayground = currentSection && currentSection.id === 'playground';

            // --------------------------
            // NAV INVERT (dark bg mode)
            // --------------------------
            const nav = document.querySelector('nav');
            if (isPlaygroundLink) {
                nav.classList.add('nav-invert');
            } else {
                nav.classList.remove('nav-invert');
            }
            syncToggleInvert();

            // Close mobile nav after clicking a link
            if (isMobile()) {
                closeMobileNav();
            }

            // --------------------------
            // PLAYGROUND SCENE LIFECYCLE
            // --------------------------
            if (leavingPlayground && typeof Playground !== 'undefined') {
                Playground.stop();
            }

            // --------------------------
            // PROJECT TITLE SHOW/HIDE
            // --------------------------
            if (projectTitleNav) {
                if (isHomePage) {
                    projectTitleNav.classList.add('visible');

                    // Re-initialize title content if needed
                    const titleLink = projectTitleNav.querySelector('.project-title-link');
                    let container = projectTitleNav.querySelector('.project-title-animate-container');
                    if (!container && typeof globalUpdateActiveProject === 'function') {
                        const idx = titleLink?.dataset.projectIndex ? parseInt(titleLink.dataset.projectIndex) : 6;
                        globalUpdateActiveProject(idx, true, 1);
                        container = projectTitleNav.querySelector('.project-title-animate-container');
                    }
                    if (container) container.style.width = 'auto';

                    gsap.set(projectTitleNav, { width: 'auto' });
                    gsap.fromTo(projectTitleNav,
                        { marginLeft: 0, marginRight: 0, opacity: 0 },
                        { marginLeft: 12, marginRight: 12, opacity: 1, duration: 0.6, ease: 'expo.out' }
                    );
                } else {
                    gsap.to(projectTitleNav, {
                        marginLeft: 0, marginRight: 0, opacity: 0,
                        duration: 0.5, ease: 'expo.in',
                        onComplete: () => {
                            projectTitleNav.classList.remove('visible');
                            gsap.set(projectTitleNav, { width: 0 });
                        }
                    });
                }
            }

            // --------------------------
            // CONTACT ITEMS
            // --------------------------
            if (isContactLink) {
                // Show all contact items at once, then animate them expanding
                // as if the nav is stretching to reveal hidden content
                contactItems.forEach(item => {
                    item.style.display = 'block';
                    gsap.set(item, { width: 0, opacity: 0, marginLeft: 0, marginRight: 0 });
                });

                // Animate all items expanding simultaneously with slight stagger
                // Small delay so carousel images fade out first
                gsap.to(contactItems, {
                    width: 'auto',
                    opacity: 1,
                    marginLeft: 12,
                    marginRight: 12,
                    pointerEvents: 'auto',
                    duration: 0.7,
                    stagger: 0.03,
                    delay: 0.35,
                    ease: 'expo.out'
                });
            } else {
                // Collapse all at once, like the nav is shrinking back
                gsap.to(contactItems, {
                    width: 0,
                    opacity: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: 'none',
                    duration: 0.5,
                    stagger: { each: 0.02, from: 'end' },
                    ease: 'expo.in',
                    onComplete: () => {
                        contactItems.forEach(item => { item.style.display = 'none'; });
                    }
                });
            }

            // --------------------------
            // WORKS FILTER ITEMS
            // --------------------------
            if (isWorksLink) {
                worksFilterItems.forEach(item => {
                    item.style.display = 'block';
                    gsap.set(item, { width: 0, opacity: 0, marginLeft: 0, marginRight: 0 });
                });

                gsap.to(worksFilterItems, {
                    width: 'auto',
                    opacity: 1,
                    marginLeft: 12,
                    marginRight: 12,
                    pointerEvents: 'auto',
                    duration: 0.7,
                    stagger: 0.03,
                    delay: 0.35,
                    ease: 'expo.out'
                });

                // Populate works list
                populateWorksList();
            } else {
                gsap.to(worksFilterItems, {
                    width: 0,
                    opacity: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    pointerEvents: 'none',
                    duration: 0.5,
                    stagger: { each: 0.02, from: 'end' },
                    ease: 'expo.in',
                    onComplete: () => {
                        worksFilterItems.forEach(item => { item.style.display = 'none'; });
                        // Remove active filter highlights
                        worksFilterItems.forEach(item => {
                            const a = item.querySelector('a');
                            if (a) a.classList.remove('filter-active');
                        });
                    }
                });
            }

            // --------------------------
            // ACTIVE LINKS
            // --------------------------
            links.forEach(l => {
                l.classList.remove('active');
                gsap.to(l, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
            });
            link.classList.add('active');

            if (!link.classList.contains('home-button')) {
                gsap.set(link, { '--pseudo-scale': 1 });
            }

            // --------------------------
            // SECTION TRANSITION
            // --------------------------
            if (currentSection && targetSection && currentSection !== targetSection) {
                const leavingAbout = currentSection.id === 'about';

                // Helper: run after the old section has faded out
                function revealTarget(delay) {
                    targetSection.classList.add('active');

                    if (targetId === 'about') {
                        gsap.set('.about-animate', { opacity: 0, y: 16 });
                    }

                    // Playground: preload scene, show section, then fade canvas
                    if (targetId === 'playground' && typeof Playground !== 'undefined') {
                        const canvasContainer = targetSection.querySelector('.playground-canvas-container');
                        gsap.set(canvasContainer, { opacity: 0 });

                        // Show the section instantly (dark bg)
                        gsap.fromTo(targetSection, { opacity: 0 }, {
                            opacity: 1, duration: 0.4, ease: 'expo.out', delay: delay
                        });

                        // Preload then fade canvas in
                        Playground.preload().then(() => {
                            Playground.start();
                            gsap.to(canvasContainer, {
                                opacity: 1, duration: 1.2, ease: 'power2.inOut', delay: delay + 0.15
                            });
                        });
                        return;
                    }

                    gsap.fromTo(targetSection, { opacity: 0 }, {
                        opacity: 1, duration: 0.6, ease: 'expo.out', delay: delay,
                        onStart: () => {
                            if (targetId === 'about') {
                                animateAboutContent();
                            }
                            if (targetId === 'project-detail') {
                                animateDetailIn();
                            }
                        }
                    });
                }

                if (leavingAbout) {
                    // Animate about content out first, then transition
                    const aboutItems = currentSection.querySelectorAll('.about-animate');
                    gsap.to(aboutItems, {
                        opacity: 0,
                        y: -12,
                        duration: 0.4,
                        stagger: { each: 0.04, from: 'end' },
                        ease: 'power4.in',
                        onComplete: () => {
                            gsap.to(currentSection, {
                                opacity: 0, duration: 0.3, ease: 'expo.in',
                                onComplete: () => { currentSection.classList.remove('active'); }
                            });
                            revealTarget(0.1);
                        }
                    });
                } else if (currentSection.id === 'project-detail') {
                    animateDetailOut(currentSection);
                    revealTarget(0.3);
                } else {
                    gsap.to(currentSection, {
                        opacity: 0, duration: 0.5, ease: 'expo.in',
                        onComplete: () => { currentSection.classList.remove('active'); }
                    });
                    revealTarget(0.2);
                }
            }

            window.location.hash = href;
        });
    });

    // ------------------------------------
    // POPULATE PROJECT DETAIL
    // ------------------------------------
    function populateProjectDetail(project) {
        const imagesContainer = document.querySelector('.project-detail-images');
        const detailTitle = document.querySelector('.project-detail-title');
        const detailDescription = document.querySelector('.project-detail-description');
        const detailRole = document.querySelector('.project-detail-role');
        const detailYear = document.querySelector('.project-detail-year');
        const detailTech = document.querySelector('.project-detail-technology');
        const detailLiveBtn = document.querySelector('.project-detail-live-btn');

        // Dynamically create image elements
        if (imagesContainer) {
            imagesContainer.innerHTML = '';
            const fallback = project.fullImage || project.image;
            const images = project.detailImages || [fallback, fallback];
            images.forEach(src => {
                const div = document.createElement('div');
                div.className = 'project-detail-img';
                div.style.backgroundImage = `url(${src})`;
                imagesContainer.appendChild(div);
            });
            // Reset scroll position
            imagesContainer.scrollTop = 0;
        }

        if (detailTitle) detailTitle.textContent = project.title;
        if (detailDescription) detailDescription.textContent = project.description;
        if (detailRole) detailRole.textContent = project.role || '';
        if (detailYear) detailYear.textContent = project.year || '';
        if (detailTech) detailTech.textContent = project.technology || '';

        // Live button
        if (detailLiveBtn) {
            if (project.liveUrl) {
                detailLiveBtn.href = project.liveUrl;
                detailLiveBtn.classList.remove('hidden');
            } else {
                detailLiveBtn.classList.add('hidden');
            }
        }
    }

    function animateDetailIn() {
        const detailSection = document.getElementById('project-detail');
        if (!detailSection) return;

        const images = detailSection.querySelectorAll('.project-detail-img');
        const info = detailSection.querySelector('.project-detail-info');
        const title = detailSection.querySelector('.project-detail-title');
        const about = detailSection.querySelector('.project-detail-about');
        const metaItems = detailSection.querySelectorAll('.project-detail-meta-item');
        const liveBtn = detailSection.querySelector('.project-detail-live-btn:not(.hidden)');

        // Reset parent info container (animateDetailOut sets it to opacity:0)
        if (info) gsap.set(info, { opacity: 1, y: 0 });

        // Set initial states
        gsap.set(images, { opacity: 0, y: 60 });
        gsap.set([title, about], { opacity: 0, y: 30 });
        gsap.set(metaItems, { opacity: 0, y: 20 });
        if (liveBtn) gsap.set(liveBtn, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ delay: 0.15 });

        // Images stagger in from below
        tl.to(images, {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power4.out'
        }, 0);

        // Title
        tl.to(title, {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power4.out'
        }, 0.1);

        // About
        tl.to(about, {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power4.out'
        }, 0.2);

        // Meta items
        tl.to(metaItems, {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power4.out'
        }, 0.3);

        // Live button
        if (liveBtn) {
            tl.to(liveBtn, {
                opacity: 1, y: 0,
                duration: 0.6,
                ease: 'power4.out'
            }, 0.45);
        }
    }

    function animateDetailOut(currentSection, onComplete) {
        if (!currentSection || currentSection.id !== 'project-detail') {
            // Not on detail page, just fade out normally
            gsap.to(currentSection, {
                opacity: 0, duration: 0.5, ease: 'expo.in',
                onComplete: () => {
                    currentSection.classList.remove('active');
                    if (onComplete) onComplete();
                }
            });
            return;
        }

        const images = currentSection.querySelectorAll('.project-detail-img');
        const info = currentSection.querySelector('.project-detail-info');

        const tl = gsap.timeline({
            onComplete: () => {
                currentSection.classList.remove('active');
                gsap.set(currentSection, { opacity: 0 });
                if (onComplete) onComplete();
            }
        });

        // Images slide down and fade
        tl.to(images, {
            opacity: 0, y: 40,
            duration: 0.4,
            stagger: { each: 0.05, from: 'end' },
            ease: 'power3.in'
        }, 0);

        // Info fades out
        tl.to(info, {
            opacity: 0, y: -20,
            duration: 0.4,
            ease: 'power3.in'
        }, 0);
    }

    // ------------------------------------
    // PROJECT TITLE CLICK HANDLER
    // ------------------------------------
    const projectTitleLink = document.querySelector('.project-title-link');
    if (projectTitleLink) {
        projectTitleLink.addEventListener('click', (e) => {
            e.preventDefault();

            const projectIndex = parseInt(projectTitleLink.dataset.projectIndex);
            if (projectIndex >= 0 && typeof projectsData !== 'undefined' && projectsData[projectIndex]) {
                const project = projectsData[projectIndex];
                populateProjectDetail(project);

                const currentSection = document.querySelector('.page-section.active');
                const detailSection = document.getElementById('project-detail');

                if (currentSection && detailSection) {
                    gsap.to(currentSection, {
                        opacity: 0, duration: 0.5, ease: 'expo.in',
                        onComplete: () => { currentSection.classList.remove('active'); }
                    });
                    detailSection.classList.add('active');
                    gsap.set(detailSection, { opacity: 1 });
                    animateDetailIn();
                }

                links.forEach(l => l.classList.remove('active'));
                projectTitleLink.classList.add('active');
                window.location.hash = '#project-detail';
            }
        });
    }

    // ------------------------------------
    // AUTO RESIZE WHEN TITLE CHANGES
    // ------------------------------------
    if (projectTitleNav) {
        const observer = new MutationObserver(() => {
            if (projectTitleNav.classList.contains('visible')) {
                const container = projectTitleNav.querySelector('.project-title-animate-container');
                if (container) container.style.width = 'auto';
            }
        });

        // Observe the entire project title link for child changes
        const titleLink = projectTitleNav.querySelector('.project-title-link');
        if (titleLink) {
            observer.observe(titleLink, { childList: true, subtree: true, characterData: true });
        }
    }

    // ------------------------------------
    // WORKS PAGE - LIST & HOVER IMAGE
    // ------------------------------------
    let activeWorksFilter = null;

    function populateWorksList(filterCategory = null) {
        const worksList = document.querySelector('.works-list');
        if (!worksList) return;

        // Filter projects
        const filtered = filterCategory
            ? projectsData.filter(p => p.categories && p.categories.includes(filterCategory))
            : projectsData;

        // Clear existing
        worksList.innerHTML = '';

        // Add title
        const title = document.createElement('div');
        title.className = 'works-list-title';
        title.textContent = 'Work';
        worksList.appendChild(title);
        gsap.set(title, { opacity: 0, x: -20 });

        // Build list items
        filtered.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'works-list-item';
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = project.title;
            a.dataset.projectIndex = projectsData.indexOf(project);
            item.appendChild(a);
            worksList.appendChild(item);

            // Set initial state for animation
            gsap.set(item, { opacity: 0, x: -20 });
        });

        // Animate items in
        gsap.to('.works-list-title, .works-list-item', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.2
        });

        // Hover events for fullscreen image (card-stack slide)
        const hoverBack = document.querySelector('.works-hover-back');
        const hoverFront = document.querySelector('.works-hover-front');
        const listItems = worksList.querySelectorAll('.works-list-item a');
        let lastHoveredIndex = -1;
        let isFirstHover = true;
        let frontIsActive = true;
        let leaveTimeout = null;
        
        listItems.forEach((a, listIndex) => {
            // Underline hover animation (same as nav)
            let previousX = null;
            let underlineTl = null;

            a.addEventListener('mouseenter', (e) => {
                // Underline animation
                const rect = a.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const origin = (mouseX / rect.width) < 0.5 ? 'left' : 'right';
                if (underlineTl) underlineTl.kill();
                underlineTl = gsap.timeline();
                underlineTl.set(a, { '--pseudo-origin': origin });
                underlineTl.to(a, { '--pseudo-scale': 1, duration: 0.5, ease: 'power3.out' });
                previousX = mouseX;

                // Cancel any pending leave fade-out
                if (leaveTimeout) {
                    clearTimeout(leaveTimeout);
                    leaveTimeout = null;
                }
                
                // Kill any running animations on the layers
                gsap.killTweensOf(hoverBack);
                gsap.killTweensOf(hoverFront);
                
                const idx = parseInt(a.dataset.projectIndex);
                const project = projectsData[idx];
                if (!project || !hoverBack || !hoverFront) return;
                
                const imgUrl = `url(${project.fullImage || project.image})`;
                
                if (isFirstHover || lastHoveredIndex === -1) {
                    // First hover: set image on front layer and fade in
                    frontIsActive = true;
                    hoverFront.style.backgroundImage = imgUrl;
                    gsap.set(hoverFront, { y: 0, opacity: 0, zIndex: 2 });
                    gsap.set(hoverBack, { opacity: 0, zIndex: 1 });
                    gsap.to(hoverFront, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                    isFirstHover = false;
                } else if (lastHoveredIndex !== listIndex) {
                    // Switching between images: card-stack slide
                    const direction = listIndex > lastHoveredIndex ? 1 : -1;
                    
                    const incoming = frontIsActive ? hoverBack : hoverFront;
                    const outgoing = frontIsActive ? hoverFront : hoverBack;
                    
                    // Make sure outgoing is fully visible and in place
                    gsap.set(outgoing, { y: 0, opacity: 1, zIndex: 1 });
                    
                    // Set incoming image and position it off-screen
                    incoming.style.backgroundImage = imgUrl;
                    gsap.set(incoming, { 
                        y: direction * window.innerHeight, 
                        opacity: 1, 
                        zIndex: 3
                    });
                    
                    // Slide incoming over the outgoing
                    gsap.to(incoming, {
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            gsap.set(incoming, { zIndex: 2 });
                            gsap.set(outgoing, { zIndex: 1, opacity: 0 });
                        }
                    });
                    
                    frontIsActive = !frontIsActive;
                }
                
                lastHoveredIndex = listIndex;
                worksList.classList.add('hovering');
            });

            a.addEventListener('mousemove', (e) => {
                if (previousX === null) return;
                const rect = a.getBoundingClientRect();
                const currentX = e.clientX - rect.left;
                if (Math.abs(currentX - previousX) > 2) {
                    gsap.set(a, { '--pseudo-origin': currentX > previousX ? 'left' : 'right' });
                }
                previousX = currentX;
            });

            a.addEventListener('mouseleave', () => {
                // Hide underline
                previousX = null;
                if (underlineTl) underlineTl.kill();
                gsap.to(a, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });

                // Delay the fade-out so moving between items doesn't trigger it
                leaveTimeout = setTimeout(() => {
                    gsap.killTweensOf(hoverBack);
                    gsap.killTweensOf(hoverFront);
                    gsap.to([hoverBack, hoverFront], { 
                        opacity: 0, 
                        duration: 0.5, 
                        ease: 'power2.in',
                        onComplete: () => {
                            gsap.set([hoverBack, hoverFront], { y: 0 });
                            lastHoveredIndex = -1;
                            isFirstHover = true;
                        }
                    });
                    worksList.classList.remove('hovering');
                }, 50);
            });

            // Click to go to project detail
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const idx = parseInt(a.dataset.projectIndex);
                const project = projectsData[idx];
                if (!project) return;

                populateProjectDetail(project);

                const currentSection = document.querySelector('.page-section.active');
                const detailSection = document.getElementById('project-detail');

                if (currentSection && detailSection) {
                    gsap.to(currentSection, {
                        opacity: 0, duration: 0.5, ease: 'expo.in',
                        onComplete: () => { currentSection.classList.remove('active'); }
                    });
                    detailSection.classList.add('active');
                    gsap.set(detailSection, { opacity: 1 });
                    animateDetailIn();
                }

                // Collapse works filters
                gsap.to(worksFilterItems, {
                    width: 0, opacity: 0, marginLeft: 0, marginRight: 0,
                    pointerEvents: 'none', duration: 0.5,
                    stagger: { each: 0.02, from: 'end' }, ease: 'expo.in',
                    onComplete: () => {
                        worksFilterItems.forEach(item => { item.style.display = 'none'; });
                    }
                });

                document.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                window.location.hash = '#project-detail';
            });
        });
    }

    // ------------------------------------
    // WORKS FILTER CLICK HANDLING
    // ------------------------------------
    worksFilterItems.forEach(filterItem => {
        const filterLink = filterItem.querySelector('a');
        if (!filterLink) return;

        filterLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const category = filterLink.dataset.filter;

            // Toggle filter
            if (activeWorksFilter === category) {
                activeWorksFilter = null;
                filterLink.classList.remove('filter-active');
            } else {
                // Remove active from all filters
                worksFilterItems.forEach(item => {
                    const a = item.querySelector('a');
                    if (a) a.classList.remove('filter-active');
                });
                activeWorksFilter = category;
                filterLink.classList.add('filter-active');
            }

            // Re-populate list with filter
            populateWorksList(activeWorksFilter);
        });
    });

    // ------------------------------------
    // ABOUT PAGE ANIMATION
    // ------------------------------------
    function animateAboutContent() {
        const items = document.querySelectorAll('.about-animate');
        if (!items.length) return;

        // Reset all items
        gsap.set(items, { opacity: 0, y: 16 });

        // Stagger animate each block
        gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.1
        });
    }

});
