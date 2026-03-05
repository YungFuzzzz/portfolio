// Desktop GSAP Animations for Ultra Minimal Menu

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
    const contactItems = document.querySelectorAll('.contact-item');
    const worksFilterItems = document.querySelectorAll('.works-filter');
    const projectTitleNav = document.getElementById('project-title-nav');

    // GSAP initial states
    gsap.set('a', { '--pseudo-scale': 0 });
    gsap.set('li:not(.contact-item):not(.works-filter)', { opacity: 0, y: 40 });

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

    // Project title initial state
    if (projectTitleNav) {
        projectTitleNav.classList.add('visible');
        gsap.set(projectTitleNav, { width: 'auto', marginLeft: 12, marginRight: 12 });
    }

    // Page load animation
    function startPageLoadAnimation() {
        if (projectTitleNav) {
            const text = projectTitleNav.querySelector('.project-title-text');
            if (!text || !text.textContent) {
                requestAnimationFrame(startPageLoadAnimation);
                return;
            }
        }

        const master = gsap.timeline({ defaults: { ease: 'expo.out' } });

        if (showcaseContainer) {
            master.to(showcaseContainer, {
                opacity: 1, y: 0, duration: 1, ease: 'power4.out'
            }, 0);
        }

        master.to('li:not(.contact-item):not(.works-filter)', {
            opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power4.out'
        }, 0.15);
    }

    startPageLoadAnimation();

    const firstLink = links[0];
    if (firstLink) firstLink.classList.add('active');

    // Hover animations for underlines
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
            if (link.classList.contains('home-button') || link.closest('.contact-item') || link.closest('.works-filter')) {
                if (underlineTimeline) underlineTimeline.kill();
                gsap.to(link, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
                return;
            }
            if (link.classList.contains('active')) return;
            if (underlineTimeline) underlineTimeline.kill();
            gsap.to(link, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
        });
    });

    // Nav click handling
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
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

            // Nav invert
            const nav = document.querySelector('nav');
            if (isPlaygroundLink) {
                nav.classList.add('nav-invert');
            } else {
                nav.classList.remove('nav-invert');
            }

            // Playground lifecycle
            if (leavingPlayground && typeof Playground !== 'undefined') {
                Playground.stop();
            }

            // Project title show/hide
            if (projectTitleNav) {
                if (isHomePage) {
                    projectTitleNav.classList.add('visible');
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

            // Contact items
            if (isContactLink) {
                contactItems.forEach(item => {
                    item.style.display = 'block';
                    gsap.set(item, { width: 0, opacity: 0, marginLeft: 0, marginRight: 0 });
                });
                gsap.to(contactItems, {
                    width: 'auto', opacity: 1, marginLeft: 12, marginRight: 12,
                    pointerEvents: 'auto', duration: 0.7, stagger: 0.03, delay: 0.35, ease: 'expo.out'
                });
            } else {
                gsap.to(contactItems, {
                    width: 0, opacity: 0, marginLeft: 0, marginRight: 0,
                    pointerEvents: 'none', duration: 0.5,
                    stagger: { each: 0.02, from: 'end' }, ease: 'expo.in',
                    onComplete: () => { contactItems.forEach(item => { item.style.display = 'none'; }); }
                });
            }

            // Works filter items
            if (isWorksLink) {
                worksFilterItems.forEach(item => {
                    item.style.display = 'block';
                    gsap.set(item, { width: 0, opacity: 0, marginLeft: 0, marginRight: 0 });
                });
                gsap.to(worksFilterItems, {
                    width: 'auto', opacity: 1, marginLeft: 12, marginRight: 12,
                    pointerEvents: 'auto', duration: 0.7, stagger: 0.03, delay: 0.35, ease: 'expo.out'
                });
                populateWorksList();
            } else {
                gsap.to(worksFilterItems, {
                    width: 0, opacity: 0, marginLeft: 0, marginRight: 0,
                    pointerEvents: 'none', duration: 0.5,
                    stagger: { each: 0.02, from: 'end' }, ease: 'expo.in',
                    onComplete: () => {
                        worksFilterItems.forEach(item => { item.style.display = 'none'; });
                        worksFilterItems.forEach(item => {
                            const a = item.querySelector('a');
                            if (a) a.classList.remove('filter-active');
                        });
                    }
                });
            }

            // Active links
            links.forEach(l => {
                l.classList.remove('active');
                gsap.to(l, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });
            });
            link.classList.add('active');
            if (!link.classList.contains('home-button')) {
                gsap.set(link, { '--pseudo-scale': 1 });
            }

            // Section transition
            if (currentSection && targetSection && currentSection !== targetSection) {
                const leavingAbout = currentSection.id === 'about';

                function revealTarget(delay) {
                    targetSection.classList.add('active');

                    if (targetId === 'about') {
                        gsap.set('.about-animate', { opacity: 0, y: 16 });
                    }

                    if (targetId === 'playground' && typeof Playground !== 'undefined') {
                        const canvasContainer = targetSection.querySelector('.playground-canvas-container');
                        gsap.set(canvasContainer, { opacity: 0 });
                        gsap.fromTo(targetSection, { opacity: 0 }, {
                            opacity: 1, duration: 0.4, ease: 'expo.out', delay: delay
                        });
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
                            if (targetId === 'about') animateAboutContent();
                            if (targetId === 'project-detail') animateDetailIn();
                        }
                    });
                }

                if (leavingAbout) {
                    const aboutItems = currentSection.querySelectorAll('.about-animate');
                    gsap.to(aboutItems, {
                        opacity: 0, y: -12, duration: 0.4,
                        stagger: { each: 0.04, from: 'end' }, ease: 'power4.in',
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

    // Populate project detail
    function populateProjectDetail(project) {
        const imagesContainer = document.querySelector('.project-detail-images');
        const detailTitle = document.querySelector('.project-detail-title');
        const detailDescription = document.querySelector('.project-detail-description');
        const detailRole = document.querySelector('.project-detail-role');
        const detailYear = document.querySelector('.project-detail-year');
        const detailTech = document.querySelector('.project-detail-technology');
        const detailLiveBtn = document.querySelector('.project-detail-live-btn');

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
            imagesContainer.scrollTop = 0;
        }

        if (detailTitle) detailTitle.textContent = project.title;
        if (detailDescription) detailDescription.textContent = project.description;
        if (detailRole) detailRole.textContent = project.role || '';
        if (detailYear) detailYear.textContent = project.year || '';
        if (detailTech) detailTech.textContent = project.technology || '';

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

        if (info) gsap.set(info, { opacity: 1, y: 0 });
        gsap.set(images, { opacity: 0, y: 60 });
        gsap.set([title, about], { opacity: 0, y: 30 });
        gsap.set(metaItems, { opacity: 0, y: 20 });
        if (liveBtn) gsap.set(liveBtn, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(images, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power4.out' }, 0);
        tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, 0.1);
        tl.to(about, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, 0.2);
        tl.to(metaItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power4.out' }, 0.3);
        if (liveBtn) {
            tl.to(liveBtn, { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }, 0.45);
        }
    }

    function animateDetailOut(currentSection, onComplete) {
        if (!currentSection || currentSection.id !== 'project-detail') {
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
        tl.to(images, { opacity: 0, y: 40, duration: 0.4, stagger: { each: 0.05, from: 'end' }, ease: 'power3.in' }, 0);
        tl.to(info, { opacity: 0, y: -20, duration: 0.4, ease: 'power3.in' }, 0);
    }

    // Project title click handler
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

    // Auto resize when title changes
    if (projectTitleNav) {
        const observer = new MutationObserver(() => {
            if (projectTitleNav.classList.contains('visible')) {
                const container = projectTitleNav.querySelector('.project-title-animate-container');
                if (container) container.style.width = 'auto';
            }
        });
        const titleLink = projectTitleNav.querySelector('.project-title-link');
        if (titleLink) {
            observer.observe(titleLink, { childList: true, subtree: true, characterData: true });
        }
    }

    // Works page - list & hover image
    let activeWorksFilter = null;

    function populateWorksList(filterCategory = null) {
        const worksList = document.querySelector('.works-list');
        if (!worksList) return;

        const filtered = filterCategory
            ? projectsData.filter(p => p.categories && p.categories.includes(filterCategory))
            : projectsData;

        worksList.innerHTML = '';

        const title = document.createElement('div');
        title.className = 'works-list-title';
        title.textContent = 'Work';
        worksList.appendChild(title);
        gsap.set(title, { opacity: 0, x: -20 });

        filtered.forEach((project) => {
            const item = document.createElement('div');
            item.className = 'works-list-item';
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = project.title;
            a.dataset.projectIndex = projectsData.indexOf(project);
            item.appendChild(a);
            worksList.appendChild(item);
            gsap.set(item, { opacity: 0, x: -20 });
        });

        gsap.to('.works-list-title, .works-list-item', {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out', delay: 0.2
        });

        // Hover events for fullscreen image
        const hoverBack = document.querySelector('.works-hover-back');
        const hoverFront = document.querySelector('.works-hover-front');
        const listItems = worksList.querySelectorAll('.works-list-item a');
        let lastHoveredIndex = -1;
        let isFirstHover = true;
        let frontIsActive = true;
        let leaveTimeout = null;

        listItems.forEach((a, listIndex) => {
            let previousX = null;
            let underlineTl = null;

            a.addEventListener('mouseenter', (e) => {
                const rect = a.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const origin = (mouseX / rect.width) < 0.5 ? 'left' : 'right';
                if (underlineTl) underlineTl.kill();
                underlineTl = gsap.timeline();
                underlineTl.set(a, { '--pseudo-origin': origin });
                underlineTl.to(a, { '--pseudo-scale': 1, duration: 0.5, ease: 'power3.out' });
                previousX = mouseX;

                if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                gsap.killTweensOf(hoverBack);
                gsap.killTweensOf(hoverFront);

                const idx = parseInt(a.dataset.projectIndex);
                const project = projectsData[idx];
                if (!project || !hoverBack || !hoverFront) return;

                const imgUrl = `url(${project.fullImage || project.image})`;

                if (isFirstHover || lastHoveredIndex === -1) {
                    frontIsActive = true;
                    hoverFront.style.backgroundImage = imgUrl;
                    gsap.set(hoverFront, { y: 0, opacity: 0, zIndex: 2 });
                    gsap.set(hoverBack, { opacity: 0, zIndex: 1 });
                    gsap.to(hoverFront, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                    isFirstHover = false;
                } else if (lastHoveredIndex !== listIndex) {
                    const direction = listIndex > lastHoveredIndex ? 1 : -1;
                    const incoming = frontIsActive ? hoverBack : hoverFront;
                    const outgoing = frontIsActive ? hoverFront : hoverBack;
                    gsap.set(outgoing, { y: 0, opacity: 1, zIndex: 1 });
                    incoming.style.backgroundImage = imgUrl;
                    gsap.set(incoming, { y: direction * window.innerHeight, opacity: 1, zIndex: 3 });
                    gsap.to(incoming, {
                        y: 0, duration: 0.5, ease: 'power3.inOut',
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
                previousX = null;
                if (underlineTl) underlineTl.kill();
                gsap.to(a, { '--pseudo-scale': 0, duration: 0.3, ease: 'power2.in' });

                leaveTimeout = setTimeout(() => {
                    gsap.killTweensOf(hoverBack);
                    gsap.killTweensOf(hoverFront);
                    gsap.to([hoverBack, hoverFront], {
                        opacity: 0, duration: 0.5, ease: 'power2.in',
                        onComplete: () => {
                            gsap.set([hoverBack, hoverFront], { y: 0 });
                            lastHoveredIndex = -1;
                            isFirstHover = true;
                        }
                    });
                    worksList.classList.remove('hovering');
                }, 50);
            });

            // Click to project detail
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

                gsap.to(worksFilterItems, {
                    width: 0, opacity: 0, marginLeft: 0, marginRight: 0,
                    pointerEvents: 'none', duration: 0.5,
                    stagger: { each: 0.02, from: 'end' }, ease: 'expo.in',
                    onComplete: () => { worksFilterItems.forEach(item => { item.style.display = 'none'; }); }
                });

                document.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                window.location.hash = '#project-detail';
            });
        });
    }

    // Works filter click handling
    worksFilterItems.forEach(filterItem => {
        const filterLink = filterItem.querySelector('a');
        if (!filterLink) return;

        filterLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const category = filterLink.dataset.filter;

            if (activeWorksFilter === category) {
                activeWorksFilter = null;
                filterLink.classList.remove('filter-active');
            } else {
                worksFilterItems.forEach(item => {
                    const a = item.querySelector('a');
                    if (a) a.classList.remove('filter-active');
                });
                activeWorksFilter = category;
                filterLink.classList.add('filter-active');
            }

            populateWorksList(activeWorksFilter);
        });
    });

    // About page animation
    function animateAboutContent() {
        const items = document.querySelectorAll('.about-animate');
        if (!items.length) return;
        gsap.set(items, { opacity: 0, y: 16 });
        gsap.to(items, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.1
        });
    }

});
