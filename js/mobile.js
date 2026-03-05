// Mobile JavaScript — Navigation, Carousel, Work List, Project Detail

// Project data (shared with desktop showcase.js)
var projectsData = [
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
        description: 'The Swear 3D Shoe Configurator is an interactive web experience developed for Flux in collaboration with Swear London. The project involved creating a fully customizable shoe configurator using Three.js, allowing users to design their own shoes and place orders directly within the experience. In addition to the configurator, a backend management panel was developed to receive and process orders so the shoes could be produced accordingly. The visual direction closely followed Swear\'s bold branding and rebellious attitude, with the interface and overall experience inspired by a nostalgic PlayStation 1 and 2 era aesthetic.',
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

document.addEventListener('DOMContentLoaded', function () {

    // ------------------------------------
    // LOCAL TIME
    // ------------------------------------
    function updateLocalTime() {
        var el = document.getElementById('localTime');
        if (!el) return;
        var now = new Date();
        var h = String(now.getHours()).padStart(2, '0');
        var m = String(now.getMinutes()).padStart(2, '0');
        el.textContent = h + ':' + m + ' CET';
    }
    updateLocalTime();
    setInterval(updateLocalTime, 1000);

    // ------------------------------------
    // SECTION NAVIGATION
    // ------------------------------------
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('.section');
    var heroSection = document.getElementById('hero');

    function showSection(id) {
        sections.forEach(function (s) {
            s.classList.remove('active');
        });
        navLinks.forEach(function (l) {
            l.classList.remove('active');
        });

        var target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            target.scrollTop = 0;
        }

        // Highlight nav link
        var activeLink = document.querySelector('.nav-link[data-section="' + id + '"]');
        if (activeLink) activeLink.classList.add('active');
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Start on hero
    heroSection.classList.add('active');

    // ------------------------------------
    // HERO CAROUSEL — horizontal scroll
    // ------------------------------------
    var carouselTrack = document.getElementById('carouselTrack');

    projectsData.forEach(function (project, index) {
        var item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.index = index;

        var img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.draggable = false;
        item.appendChild(img);

        var title = document.createElement('div');
        title.className = 'carousel-item-title';
        title.textContent = project.title;
        item.appendChild(title);

        item.addEventListener('click', function () {
            openProjectDetail(index);
        });

        carouselTrack.appendChild(item);
    });

    // ------------------------------------
    // WORK LIST
    // ------------------------------------
    var workList = document.getElementById('workList');
    var filterBtns = document.querySelectorAll('.filter-btn');
    var activeFilter = 'all';

    function renderWorkList(filter) {
        workList.innerHTML = '';

        var filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(function (p) { return p.categories && p.categories.indexOf(filter) !== -1; });

        filtered.forEach(function (project) {
            var idx = projectsData.indexOf(project);
            var card = document.createElement('div');
            card.className = 'work-card';

            var imgWrap = document.createElement('div');
            imgWrap.className = 'work-card-image';
            var img = document.createElement('img');
            img.src = project.fullImage || project.image;
            img.alt = project.title;
            imgWrap.appendChild(img);
            card.appendChild(imgWrap);

            var titleEl = document.createElement('div');
            titleEl.className = 'work-card-title';
            titleEl.textContent = project.title;
            card.appendChild(titleEl);

            var meta = document.createElement('div');
            meta.className = 'work-card-meta';
            meta.textContent = project.role + ' — ' + project.year;
            card.appendChild(meta);

            card.addEventListener('click', function () {
                openProjectDetail(idx);
            });

            workList.appendChild(card);
        });
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderWorkList(activeFilter);
        });
    });

    // Initial render
    renderWorkList('all');

    // ------------------------------------
    // PROJECT DETAIL
    // ------------------------------------
    var detailOverlay = document.getElementById('projectDetail');
    var detailBack = document.getElementById('detailBack');

    function openProjectDetail(index) {
        var project = projectsData[index];
        if (!project) return;

        document.getElementById('detailTitle').textContent = project.title;
        document.getElementById('detailDescription').textContent = project.description;
        document.getElementById('detailRole').textContent = project.role || '';
        document.getElementById('detailTechnology').textContent = project.technology || '';
        document.getElementById('detailYear').textContent = project.year || '';

        var liveBtn = document.getElementById('detailLiveBtn');
        if (project.liveUrl) {
            liveBtn.href = project.liveUrl;
            liveBtn.classList.remove('hidden');
        } else {
            liveBtn.classList.add('hidden');
        }

        // Images
        var imagesContainer = document.getElementById('detailImages');
        imagesContainer.innerHTML = '';
        var images = project.detailImages || [project.fullImage || project.image];
        images.forEach(function (src) {
            var div = document.createElement('div');
            div.className = 'detail-img';
            div.style.backgroundImage = 'url(' + src + ')';
            imagesContainer.appendChild(div);
        });

        detailOverlay.scrollTop = 0;
        detailOverlay.classList.add('active');
    }

    detailBack.addEventListener('click', function () {
        detailOverlay.classList.remove('active');
    });

});
