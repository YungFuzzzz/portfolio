import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

const projectsData = [
    {
        title: "Unveil",
        slogan: "Discover cities through authentic voices",
        image: "./assets/img/work/unveil.webp",
        fullImage: "./assets/img/work/unveil_fullscreen.webp",
        description:
            "Unveil is a mobile application that allows users to discover cities through audio-based storytelling. The app enables local residents to record and share audio fragments about places that are meaningful to them, while visitors can listen to these stories as they explore the city. Users are free to choose how they navigate the experience by selecting individual audio spots directly from an interactive map or by following curated tours that guide them through multiple locations. By combining location-based audio with personal narratives, Unveil adds an authentic and human layer to urban exploration and creates a stronger connection between people and the city.",
        categories: ["design", "development", "concepts"],
        role: "Branding, UX Research, UI Design, Development",
        year: "2025",
        technology: "Figma, React, Next.js, Firebase, MongoDB, Expo, Node.js",
        process: [
            "Unveil is developed as our bachelor project, where we set out to create a concept that brings together all of our skills as a team. The goal is to build something meaningful, engaging, and technically solid.",
            "After exploring different directions, we land on the idea of audio tours, allowing local residents of Mechelen to share their knowledge and stories with visitors. This approach creates a more personal and authentic way to experience the city, shaped by the voices of the people who live there.",
            "We start with the branding. The name Unveil reflects the idea of revealing hidden stories and perspectives. This concept is embedded in the visual identity, where the logo subtly references a curtain being pulled back, symbolizing discovery.",
            "Following the branding phase, the project moves into development. We introduce a system of soundspots, where recordings are tied to specific locations. Contributors are asked to record their stories on-site, adding context and authenticity to the experience.",
            "These recordings are linked to geolocation data and displayed on an interactive map. Users are encouraged to physically move through the city to unlock and listen to stories, creating an experience similar to location-based apps like Pokémon Go, but focused on culture and storytelling.",
            "In addition to individual soundspots, users can follow curated tours, turning the platform into a guided walking experience. The app is designed as a paid service, offering day passes, weekly passes, or unlimited access. Individual tours can also be purchased separately.",
            "From a technical perspective, the project pushes us to learn new tools and work around software limitations. The platform uses two separate databases: one for user authentication and account management, and another for storing and managing audio files.",
            "Moderation plays an important role in maintaining quality and safety. An algorithm is implemented to detect and filter spam and inappropriate language, ensuring a respectful environment for both listeners and contributors.",
            "Throughout the project, a strong focus is placed on user experience. Both the listener and the contributor flows are carefully designed to be intuitive, accessible, and engaging.",
            "While the project is developed around the city of Mechelen, the concept is built to scale. Unveil has the potential to be implemented in cities worldwide, transforming the way people discover urban environments through local narratives."
        ],
        contributors: [
            {
                name: "Wail Chebbai",
                role: "Product Design, UX Architecture, Concept Development",
                portfolio: "https://www.linkedin.com/in/wail-chebbai/",
            },
            {
                name: "Matthew Aerts",
                role: "Product Design, UX Architecture, Concept Development",
                portfolio: "https://matthew.be/",
            }
        ],
        liveUrl: "",
        detailImages: [
            "./assets/img/work/unveil_1.webp",
            "./assets/img/work/unveil_2.webp",
            "./assets/img/work/unveil_3.webp",
            "./assets/img/work/unveil_4.webp",
            "./assets/img/work/unveil_5.webp",
        ],
    },
    {
        title: "Swear",
        slogan: "3D Shoe Configurator for Swear London",
        image: "./assets/img/work/swear.webp",
        fullImage: "./assets/img/work/swear_fullscreen.webp",
        description: "The Swear 3D Shoe Configurator is an interactive web experience developed for Flux in collaboration with Swear London. The project involved creating a fully customizable shoe configurator using Three.js, allowing users to design their own shoes and place orders directly within the experience. In addition to the configurator, a backend management panel was developed to receive and process orders so the shoes could be produced accordingly. The visual direction closely followed Swear’s bold branding and rebellious attitude, with the interface and overall experience inspired by a nostalgic PlayStation 1 and 2 era aesthetic.",
        categories: ["design", "development"],
        role: "UI Design, Modeling, Texturing, World Building, Performance Optimization, Full Stack Development",
        year: "2025",
        technology: "Three.js, Blender, Affinity Designer, VUE, Node.js",
        process: [
            "Swear is developed in collaboration with the British footwear brand Swear London, following a brief provided by Flux. The goal is to create a 3D shoe configurator that aligns closely with the brand’s identity, supporting the launch of a customizable shoe.",
            "We begin with concept exploration, quickly gravitating towards a visual direction inspired by PS1 and PS2-era graphics, combined with the underground streetwear and grunge aesthetic that defines Swear. This direction allows us to create something nostalgic yet raw, perfectly matching the brand’s tone.",
            "From there, we move into 3D production. Using Blender, we build a stylized city environment that acts as the backdrop for the configurator, fully embracing and translating Swear’s visual language into a digital space.",
            "Alongside the visual experience, we develop a fully functional configurator that allows users to customize every aspect of the shoe. Materials, colors, and individual components can be adjusted in real time, creating a highly interactive and personal experience.",
            "On the technical side, the project includes a complete backend system. Orders created through the configurator are processed using a Vue-based platform, where each customization is captured in detail.",
            "We also design and build a dedicated management platform for Swear, allowing them to review incoming orders, accept requests, and track progress from production to delivery. This creates a seamless workflow between the user-facing experience and the brand’s internal operations.",
            "Throughout the project, the focus remains on creating a cohesive experience where visual identity, interaction, and functionality come together. The result is a configurator that not only reflects Swear’s aesthetic, but also supports a scalable and practical ordering system."
        ],
        contributors: [
            {
                name: "Sam Apers",
                role: "UI Design, Modeling, Texturing, World Building, Full Stack Development",
                portfolio: "https://hyenathedesigner.be/",
            },
        ],
        liveUrl: "https://swearthreejs.vercel.app/",
        detailImages: [
            "./assets/img/work/swear_1.webp",
            "./assets/img/work/swear_2.webp",
            "./assets/img/work/swear_3.webp",
            "./assets/img/work/swear_4.webp",
            "./assets/img/work/swear_5.webp",
            "./assets/img/work/swear_6.webp",
            "./assets/img/work/swear_7.webp"
        ],
    },
    {
        title: "Garderobe",
        slogan: "Luxury fashion app",
        image: "./assets/img/work/garderobe.webp",
        fullImage: "./assets/img/work/garderobe_fullscreen.webp",
        description: "React application integrated with CMS workflows for a fully working e-commerce platform.",
        categories: ["design", "development"],
        role: "Branding, UX/UI Design, Full-Stack Development, CMS Integration",
        year: "2025",
        technology: "React, Webflow CMS, TypeScript, Figma, Affinity Designer",
        process: [
            "Garderobe is developed as a two-part project, combining a customer-facing application with a structured content platform.",
            "The first part is a React-based application designed as a webshop for luxury fashion. The platform allows users to explore and purchase curated clothing pieces, creating a digital wardrobe experience reflected in the name Garderobe.",
            "The app includes key e-commerce features such as a wishlist system, giving users the ability to save items for later, and an order overview where purchases can be tracked and managed. The focus is on delivering a clean and intuitive interface that reflects the premium nature of the products.",
            "The second part of the project is a Webflow website, built to manage and present content. This platform is used to publish blog posts that keep users up to date with current fashion trends and seasonal releases.",
            "All product data and editorial content are managed through the Webflow CMS. This setup demonstrates how a CMS can act as a central content hub, with data flowing directly into the React application to dynamically display products and content.",
            "By combining both platforms, the project creates a seamless connection between content management and the shopping experience, resulting in a flexible and scalable system."
        ],
        contributors: [
        ],
        liveUrl: "",
        detailImages: [
            "./assets/img/work/garderobe_1.webp",
            "./assets/img/work/garderobe_2.webp",
            "./assets/img/work/garderobe_3.webp",
        ],
    },
    {
        title: "Sancus",
        slogan: "For the ones that aren't able to go out",
        image: "./assets/img/work/sancus.webp",
        fullImage: "./assets/img/work/sancus_fullscreen.webp",
        description: "Sancus is a government-focused platform designed to support individuals who are disconnected from society. It centralizes essential communication, encourages social reintegration through local events, and provides access to basic services such as food delivery, creating a more accessible, human-centered approach to public services.",
        categories: ["design", "concepts"],
        role: "Branding, UX Architecture, front-end development",
        year: "2024",
        technology: " photoshop, illustrator, Figma, html, css, js",
        process: [
            "Sancus is developed as a government-focused platform centered around social security and accessibility. The goal is to support individuals who, for various reasons, are unable or unwilling to engage with society in a traditional way, ensuring they remain informed and connected.",
            "The platform is designed as a central hub where all relevant government-related information is delivered directly to the user through a clear and structured inbox. This reduces complexity and makes essential communication more accessible.",
            "Beyond information, Sancus actively encourages users to reconnect with society. A calendar feature highlights local social events, providing opportunities for gradual and comfortable participation within their own community.",
            "To further support users in their daily lives, the platform also includes the option to purchase and schedule delivery of food packages, offering practical assistance alongside digital services.",
            "A key part of the project is the branding. Unlike many traditional government platforms, Sancus is designed to feel approachable, open, and trustworthy. The visual identity focuses on clarity and warmth, creating a more human-centered experience and redefining expectations of public service platforms.",
            "The project is developed as a website that brings all these features together into one cohesive experience. While the platform is no longer live, it demonstrates a complete system that combines accessibility, service design, and thoughtful user experience to support a vulnerable audience."
        ],
        contributors: [
            {
                name: "Matthew Aerts",
                role: "Product Design, UX Architecture, Concept Development",
                portfolio: "https://matthew.be/",
            }
        ],
        liveUrl: "",
        detailImages: [
            "./assets/img/work/sancus_1.webp",
            "./assets/img/work/sancus_2.webp",
            "./assets/img/work/sancus_3.webp",
        ],
    },
    {
        title: "Hoppin",
        slogan: "All mobility services in one place",
        image: "./assets/img/work/hoppin.webp",
        fullImage: "./assets/img/work/hoppin_fullscreen.webp",
        description: "Hoppin is a mobility app redesign that reimagines Belgium’s existing combimobility platform. Starting from branding alone, the project focuses on creating a clear, user-friendly experience that brings all transport options together into one seamless and accessible system.",
        categories: ["design", "branding"],
        role: "Visual Design, UI Design, UX Refinement, prototyping",
        year: "2023",
        technology: "Figma",
        process: [
            "Hoppin is approached as a full redesign of an existing mobility platform that lacked clarity and usability. With only the existing branding as a starting point, the project focuses on rebuilding the entire app experience from the ground up.",
            "The process begins in Figma, with a strong emphasis on UX and UI design. Initial work focuses on core flows such as onboarding, including login and signup, followed by user settings and preference management to tailor the experience to individual needs.",
            "From there, the main application is developed around a central map interface. This map acts as the core of the platform, bringing together all available mobility options across Belgium into one unified view.",
            "Users can plan routes with clear guidance and access all relevant information in one place, reducing the complexity of navigating different transport systems. The experience is designed to be intuitive, efficient, and easy to use in real-world scenarios.",
            "Additional features include the integration of shared mobility services such as bike sharing and car sharing, further expanding the platform into a complete combimobility solution.",
            "Throughout the project, the focus remains on simplifying mobility by creating a cohesive system where multiple transport options work together seamlessly within a single interface."
        ],
        contributors: [
            
        ],
        liveUrl: "",
        detailImages: [
            "./assets/img/work/hoppin_1.webp",
            "./assets/img/work/hoppin_2.webp",
            "./assets/img/work/hoppin_3.webp",
        ],
    },
    {
        title: "Artex",
        slogan: "Digital exhibitions for digital artists",
        image: "./assets/img/work/artex.webp",
        fullImage: "./assets/img/work/artex_fullscreen.webp",
        description: "Artex is a conceptual platform for digital artists, designed to showcase and monetize work across mediums such as 3D, image, motion, and typography. The project explores how digital exhibitions can bridge the gap between traditional art and digital creation.",
        categories: ["branding", "ui", "ux"],
        role: "Brand Design, UI/UX, prototyping",
        year: "2022",
        technology: "Figma, Adobe Suite",
        process: [
            "Artex is developed as a branding-focused project centered around creative exploration and visual identity. The goal is to design a platform concept that elevates digital art and positions it within a more traditional exhibition context.",
            "The idea behind Artex is to reduce the gap between physical and digital art by creating a space where digital artists can exhibit their work, participate in curated exhibitions, and generate income through their creations.",
            "The process begins with the branding. The name Artex is derived from “art” and “exhibition,” reflecting the core concept of the platform. The visual identity is designed to be both strong and neutral, allowing it to adapt to a wide range of artistic styles.",
            "A key element of the logo is its typographic construction. Each character is sourced from a different typeface, expressing the diversity and versatility of digital art across multiple disciplines.",
            "With full creative freedom, the project focuses on building a flexible identity system that can support various forms of digital expression without overpowering the work itself.",
            "In addition to the branding, a full application prototype is developed in Figma. The prototype explores both user and artist flows, allowing users to discover exhibitions and artworks, while giving artists the ability to participate in and contribute to digital exhibitions.",
            "Although the platform is not developed beyond the conceptual stage, the project demonstrates a complete vision that combines branding, interaction design, and digital experience into a cohesive system."
        ],
        contributors: [
            
        ],
        liveUrl: "",
        detailImages: [
            "./assets/img/work/artex_1.webp",
            "./assets/img/work/artex_2.webp",
            "./assets/img/work/artex_3.webp",
            "./assets/img/work/artex_4.webp",
            "./assets/img/work/artex_5.webp",
            "./assets/img/work/artex_6.webp",
            "./assets/img/work/artex_7.webp"
        ],
    },
];

window.__VICES_PROJECTS__ = projectsData;
window.dispatchEvent(
    new CustomEvent("projects:data-ready", {
        detail: projectsData,
    })
);

const canvas = document.getElementById("carouselCanvas");
const BASE_VIEWPORT_HEIGHT = 640;
const BASE_CAMERA_Y = 4.5;
const BASE_CAMERA_Z = 9.35;

if (!canvas) {
    console.warn("Carousel canvas not found");
} else {
    const scene = new THREE.Scene();
    scene.background = null;

    const renderer = new THREE.WebGLRenderer({
        canvas, 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
    });

    const container = canvas.parentElement;
    const startWidth = Math.max(1, container.clientWidth);
    const startHeight = Math.max(1, container.clientHeight);
    const camera = new THREE.PerspectiveCamera(56, startWidth / startHeight, 0.1, 100);

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const DPR_CAP = isTouchDevice ? 1.25 : 1.5;

    renderer.setSize(startWidth, startHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping;

    const applyCameraFraming = (viewportHeight) => {
        const scale = Math.max(0.9, viewportHeight / BASE_VIEWPORT_HEIGHT);
        camera.position.set(0, BASE_CAMERA_Y * scale, BASE_CAMERA_Z * scale);
        camera.lookAt(0, -0.35, 0);
    };

    applyCameraFraming(startHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.92);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.35);
    keyLight.position.set(2.8, 3.5, 5.5);
    scene.add(keyLight);

    const textureLoader = new THREE.TextureLoader();
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);
    carouselGroup.scale.setScalar(1.4);

    const totalItems = projectsData.length;
    const radius = 3.95;
    const stepAngle = (Math.PI * 2) / totalItems;
    const raycaster = new THREE.Raycaster();
    const ndcPointer = new THREE.Vector2();
    const meshes = [];

    const getWorldGapFromPixels = (px) => {
        const viewHeight = Math.max(1, container.clientHeight);
        const distance = camera.position.length();
        const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distance;
        return (px / viewHeight) * worldHeight;
    };

    const gapWorld = getWorldGapFromPixels(12);
    const panelArc = Math.max(0.14, stepAngle - gapWorld / radius);
    const panelArcLength = radius * panelArc;
    const panelWidth = panelArcLength;
    const itemHeight = panelWidth * 0.75;

    const vertexShader = `
        uniform float uBendRadius;
        uniform float uArc;
        uniform float uWidth;

        varying vec2 vUv;

        void main() {
            vUv = uv;

            vec3 p = position;
            float theta = (p.x / uWidth) * uArc;

            p.x = sin(theta) * uBendRadius;
            p.z = uBendRadius * (1.0 - cos(theta));

            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
    `;

    const fragmentShader = `
        uniform sampler2D uMap;
        uniform sampler2D uLabelMap;
        uniform float uHasMap;
        uniform float uLabelOpacity;

        varying vec2 vUv;

        void main() {
            vec3 baseCol;
            if (uHasMap > 0.5) {
                vec4 tex = texture2D(uMap, vUv);
                baseCol = tex.rgb;
            } else {
                baseCol = vec3(0.63, 0.63, 0.63);
            }

            vec4 labelTex = texture2D(uLabelMap, vec2(1.0 - vUv.x, vUv.y));
            float labelMix = clamp(labelTex.a * uLabelOpacity, 0.0, 1.0);
            vec3 outCol = mix(baseCol, labelTex.rgb, labelMix);

            gl_FragColor = vec4(outCol, 1.0);
        }
    `;

    const createLabelTexture = (title) => {
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 1024;
        labelCanvas.height = 768;
        const ctx = labelCanvas.getContext("2d");

        if (!ctx) {
            return new THREE.Texture();
        }

        ctx.clearRect(0, 0, labelCanvas.width, labelCanvas.height);

        const text = String(title || "PROJECT").toUpperCase();
        ctx.font = "700 72px Metropolis, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const measured = Math.ceil(ctx.measureText(text).width);
        const badgePaddingX = 64;
        const badgeHeight = 140;
        const badgeWidth = Math.min(labelCanvas.width - 120, measured + badgePaddingX * 2);

        const x = Math.floor((labelCanvas.width - badgeWidth) * 0.5);
        const y = Math.floor((labelCanvas.height - badgeHeight) * 0.5);

        ctx.fillStyle = "#e0acd5";
        ctx.fillRect(x, y, badgeWidth, badgeHeight);

        ctx.fillStyle = "#000000";
        ctx.fillText(text, labelCanvas.width * 0.5, labelCanvas.height * 0.5 + 2);

        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.NoColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        return texture;
    };

    const createMaterial = () => new THREE.ShaderMaterial({
        uniforms: {
            uMap: { value: new THREE.Texture() },
            uLabelMap: { value: new THREE.Texture() },
            uHasMap: { value: 0.0 },
            uLabelOpacity: { value: 0.0 },
            uBendRadius: { value: radius },
            uArc: { value: panelArc },
            uWidth: { value: panelWidth },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
    });

    projectsData.forEach((project, index) => {
        const geometry = new THREE.PlaneGeometry(panelWidth, itemHeight, 32, 1);
        const material = createMaterial();
        const mesh = new THREE.Mesh(geometry, material);

        const centerAngle = index * stepAngle;
        mesh.userData.index = index;
        mesh.userData.link = project.link || "#";
        mesh.userData.title = project.title;
        mesh.userData.baseAngle = centerAngle;
        mesh.userData.hoverMix = 0;

        const labelTexture = createLabelTexture(project.title);
        material.uniforms.uLabelMap.value = labelTexture;

        carouselGroup.add(mesh);
        meshes.push(mesh);

        textureLoader.load(
            project.image,
            (tex) => {
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                material.uniforms.uMap.value = tex;
                material.uniforms.uHasMap.value = 1.0;
            },
            undefined,
            () => {
                material.uniforms.uHasMap.value = 0.0;
            }
        );
    });

    carouselGroup.rotation.x = -0.24;

    const IDLE_SPIN = 0.00155;

    let carouselRotation = 0;
    let angularVelocity = IDLE_SPIN;
    let rafId = 0;
    let spinDirection = 1;
    let hoveredIndex = -1;

    let isDragging = false;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let dragDistance = 0;
    let dragAxis = null;
    let activePointerId = null;
    let hasCapturedPointer = false;
    let pointerInside = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let cursorState = "grab";

    const applyLayout = () => {
        meshes.forEach((mesh) => {
            const angle = mesh.userData.baseAngle + carouselRotation;
            const isHovered = mesh.userData.index === hoveredIndex;
            const hoverTarget = isHovered ? 1 : 0;
            mesh.userData.hoverMix += (hoverTarget - mesh.userData.hoverMix) * 0.22;
            const hoverMix = mesh.userData.hoverMix;
            const hoverPush = 0.34 * hoverMix;
            mesh.position.set(
                Math.sin(angle) * (radius + hoverPush),
                0,
                Math.cos(angle) * (radius + hoverPush)
            );

            // Keep each panel tangential to the cylinder (90deg orientation feel).
            mesh.rotation.y = angle + Math.PI;

            const front = (Math.cos(angle) + 1) * 0.5;
            mesh.scale.setScalar(1.0 + 0.09 * hoverMix);
            mesh.material.uniforms.uLabelOpacity.value = hoverMix;
            mesh.renderOrder = Math.floor(front * 1000);
        });
    };

    const onWheel = (event) => {
        angularVelocity += event.deltaY * 0.000045;
        angularVelocity = THREE.MathUtils.clamp(angularVelocity, -0.09, 0.09);
        if (Math.abs(angularVelocity) > 0.0001) {
            spinDirection = Math.sign(angularVelocity);
        }
    };

    const pointerToNdc = (event) => {
        const rect = canvas.getBoundingClientRect();
        ndcPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        ndcPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const setCursor = (next) => {
        if (cursorState === next) {
            return;
        }

        cursorState = next;
        canvas.style.cursor = next;
    };

    canvas.addEventListener("pointerdown", (event) => {
        isDragging = true;
        activePointerId = event.pointerId;
        dragAxis = null;
        hasCapturedPointer = false;
        downX = event.clientX;
        downY = event.clientY;
        lastX = event.clientX;
        dragDistance = 0;

        if (event.pointerType === "mouse") {
            canvas.setPointerCapture(event.pointerId);
            hasCapturedPointer = true;
        }
    });

    canvas.addEventListener("pointermove", (event) => {
        if (activePointerId !== null && event.pointerId !== activePointerId) {
            return;
        }

        pointerInside = true;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;

        if (!isDragging) {
            return;
        }

        const totalDx = event.clientX - downX;
        const totalDy = event.clientY - downY;

        if (!dragAxis) {
            if (Math.abs(totalDx) < 6 && Math.abs(totalDy) < 6) {
                return;
            }

            dragAxis = Math.abs(totalDx) >= Math.abs(totalDy) ? "x" : "y";

            if (dragAxis === "x" && !hasCapturedPointer) {
                canvas.setPointerCapture(event.pointerId);
                hasCapturedPointer = true;
            }
        }

        if (dragAxis !== "x") {
            return;
        }

        event.preventDefault();

        const dx = event.clientX - lastX;
        lastX = event.clientX;
        dragDistance += Math.abs(dx);

        const dragRotation = dx * 0.0043;
        carouselRotation += dragRotation;
        angularVelocity = dragRotation * 0.34;
        if (Math.abs(angularVelocity) > 0.0001) {
            spinDirection = Math.sign(angularVelocity);
        }
    });

    const onPointerUp = (event) => {
        if (activePointerId !== null && event.pointerId !== activePointerId) {
            return;
        }

        if (!isDragging) {
            return;
        }

        isDragging = false;
        if (hasCapturedPointer) {
            canvas.releasePointerCapture(event.pointerId);
        }
        hasCapturedPointer = false;

        const axis = dragAxis;
        dragAxis = null;
        activePointerId = null;

        if (axis === "y") {
            return;
        }

        const movedEnough = dragDistance > 6 || Math.abs(event.clientY - downY) > 6;
        if (movedEnough) {
            return;
        }

        pointerToNdc(event);
        raycaster.setFromCamera(ndcPointer, camera);
        const hits = raycaster.intersectObjects(meshes, false);
        if (hits.length === 0) {
            return;
        }

        const hit = hits[0].object;
        const projectIndex = hit?.userData?.index;
        if (typeof projectIndex !== "number") {
            return;
        }

        const projectData = projectsData[projectIndex];
        if (!projectData) {
            return;
        }

        window.dispatchEvent(
            new CustomEvent("project:open", {
                detail: {
                    ...projectData,
                    source: "carousel",
                },
            })
        );
    };

    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", () => {
        isDragging = false;
        dragAxis = null;
        activePointerId = null;
        hasCapturedPointer = false;
    });

    canvas.addEventListener("pointerenter", (event) => {
        pointerInside = true;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
    });

    canvas.addEventListener("pointerleave", () => {
        pointerInside = false;
        hoveredIndex = -1;
        setCursor("grab");
    });

    const animate = () => {
        rafId = window.requestAnimationFrame(animate);

        if (!isDragging) {
            angularVelocity *= 0.992;
            const minSpin = IDLE_SPIN;
            if (Math.abs(angularVelocity) < minSpin) {
                angularVelocity = minSpin * spinDirection;
            }
        }

        angularVelocity = THREE.MathUtils.clamp(angularVelocity, -0.09, 0.09);
        carouselRotation += angularVelocity;

        if (pointerInside && !isDragging) {
            pointerToNdc({ clientX: lastPointerX, clientY: lastPointerY });
            raycaster.setFromCamera(ndcPointer, camera);
            const hoverHits = raycaster.intersectObjects(meshes, false);
            hoveredIndex = hoverHits.length > 0 ? hoverHits[0].object.userData.index : -1;
            setCursor(hoveredIndex >= 0 ? "pointer" : "grab");
        }

        applyLayout();
        renderer.render(scene, camera);
    };

    const onResize = () => {
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        camera.aspect = w / h;
        applyCameraFraming(h);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    applyLayout();
    animate();

    window.addEventListener("beforeunload", () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        meshes.forEach((mesh) => {
            mesh.geometry.dispose();
            mesh.material.uniforms.uMap.value?.dispose?.();
            mesh.material.uniforms.uLabelMap.value?.dispose?.();
            mesh.material.dispose();
        });
    });
}


