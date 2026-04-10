import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

const projectsData = [
    {
        title: "Unveil",
        slogan: "Discover cities through authentic voices",
        image: "./assets/img/work/unveil.webp",
        fullImage: "./assets/img/work/unveil_fullscreen.webp",
        description: [
            "Unveil is a mobile storytelling app that lets users explore cities through location-based audio stories shared by locals.",
            "Residents record personal stories tied to specific places, while visitors discover them on an interactive map or through curated walking tours.",
            "The platform combines branding, UX design, and technical development to create an engaging experience that connects people with the authentic narratives of a city. The result is a more emotional and human way of experiencing urban spaces through sound, movement, and narrative."
        ],
        categories: ["design", "development", "concepts"],
        role: "Branding, UX Research, UI Design, Development",
        year: "2025",
        breakdown: {
            concept: [
                "Unveil is a mobile storytelling platform that connects people to cities through location-based audio experiences.",
                "The project explores how urban environments can be experienced through personal narratives shared by locals, turning everyday places into meaningful story points."
            ],
            how: [
                "The experience is built around “soundspots” — geolocated audio fragments recorded on-site by residents. This ensures authenticity and creates a direct link between story and location.",
                "Users can explore the city freely through an interactive map or follow curated walking tours designed as guided experiences.",
                "The app encourages physical movement through space, blending digital interaction with real-world exploration."
            ],
            what: [
                "Unveil includes an interactive map-based exploration system, user-generated audio storytelling through soundspots, and curated walking tours that guide users through the city in different ways. The platform also features a dual database system for authentication and content management, along with an audio upload and storage infrastructure. A moderation system is implemented to filter spam and inappropriate content, ensuring a safe and high-quality experience. Overall, the platform combines UX design, branding, and technical development into one cohesive experience."
            ],
            result: [
                "Unveil transforms city exploration into an immersive storytelling experience, blending local voices with digital mapping.",
                "The concept demonstrates how location-based audio can create emotional connections to urban spaces and is designed to scale across multiple cities."
            ],
        },
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
        description: [
            "The Swear 3D Shoe Configurator is an interactive web experience developed for Flux in collaboration with Swear London. The project involved creating a fully customizable shoe configurator using Three.js, allowing users to design their own shoes and place orders directly within the experience.",
            "In addition to the configurator, a backend management panel was developed to receive and process orders so the shoes could be produced accordingly. The visual direction closely followed Swear’s bold branding and rebellious attitude, with the interface and overall experience inspired by a nostalgic PlayStation 1 and 2 era aesthetic."
        ],
        categories: ["design", "development"],
        role: "UI Design, Modeling, Texturing, World Building, Performance Optimization, Full Stack Development",
        year: "2025",
        breakdown: {
            concept: [
                "Swear is a 3D shoe configurator developed in collaboration with Swear London, based on a brief provided by Flux.",
                "The project explores how a luxury streetwear brand can translate its identity into an interactive digital product for customization and ordering."
            ],

            how: [
                "The project starts with visual research and concept exploration, defining a direction inspired by PS1/PS2-era aesthetics combined with underground streetwear and grunge influences that reflect Swear’s identity.",
                "We then build a stylized 3D environment in Blender, designed as a digital world that supports the configurator and reinforces the brand’s visual language.",
                "The user experience is designed around real-time customization, allowing users to modify materials, colors, and individual shoe components directly within the interface."
            ],

            what: [
                "The project includes a fully functional 3D configurator with real-time customization of shoe elements such as materials, colors, and components.",
                "On the technical side, orders generated in the configurator are processed through a Vue-based system that captures and structures customization data.",
                "A dedicated management platform is also developed for Swear, allowing internal teams to review, approve, and track orders from creation to production and delivery."
            ],

            result: [
                "The result is a cohesive digital experience where branding, interaction, and product configuration come together in one system.",
                "The configurator translates Swear’s visual identity into an interactive environment while supporting a scalable and production-ready ordering workflow."
            ],
        },
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
        description: [
            "React application integrated with CMS workflows for a fully working e-commerce platform."
        ],
        categories: ["design", "development"],
        role: "Branding, UX/UI Design, Full-Stack Development, CMS Integration",
        year: "2025",
        breakdown: {
            concept: [
                "Garderobe is a two-part digital fashion project combining a customer-facing e-commerce experience with a structured content management platform.",
                "The project explores how a luxury fashion experience can be translated into a digital wardrobe, allowing users to browse, curate, and purchase selected pieces."
            ],

            how: [
                "The customer-facing application is built in React and designed as a luxury fashion webshop, focusing on a clean and premium user experience.",
                "Core e-commerce features include product browsing, a wishlist system for saving items, and an order overview for tracking purchases.",
                "The interface is designed to feel minimal and editorial, reinforcing the high-end positioning of the products."
            ],

            what: [
                "In parallel, a Webflow-based CMS platform is developed to manage editorial content and product data.",
                "This system is used to publish fashion-focused blog content, keeping users informed about trends and seasonal releases.",
                "The CMS is connected to the React application, allowing content and product data to be dynamically synced and displayed across the platform."
            ],

            result: [
                "The result is a connected ecosystem where content management and e-commerce are seamlessly integrated.",
                "Garderobe demonstrates how a CMS-driven architecture can support both editorial storytelling and a scalable shopping experience."
            ],
        },
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
        description: [
            "Sancus is a government-focused platform designed to support individuals who are disconnected from society. It centralizes essential communication and encourages social reintegration through local events.",
            "The platform also provides access to basic services such as food delivery, creating a more accessible, human-centered approach to public services."
        ],
        categories: ["design", "concepts"],
        role: "Branding, UX Architecture, front-end development",
        year: "2024",
        breakdown: {
            concept: [
                "Sancus is a government-focused platform centered around social security, accessibility, and inclusion.",
                "The project explores how public services can better support individuals who are less able or willing to engage with traditional systems, while keeping them informed and connected."
            ],

            how: [
                "The platform is designed as a central information hub where government updates are delivered through a structured and accessible inbox system.",
                "In addition to information delivery, Sancus encourages social reconnection through a calendar of local events, helping users gradually re-engage with their community in a low-pressure way.",
                "The experience is designed to be clear and guided, reducing complexity and making essential services more approachable."
            ],

            what: [
                "The platform also includes practical support features such as food package ordering and scheduled delivery, combining digital services with real-world assistance.",
                "A key focus of the project is the branding and visual identity, designed to feel approachable, warm, and trustworthy rather than institutional.",
                "The system is built as a unified web platform that brings together communication, services, and accessibility-focused features."
            ],

            result: [
                "Sancus demonstrates a service design approach to government platforms, combining accessibility, communication, and practical support in one system.",
                "Although the platform is no longer live, it represents a complete concept for a more human-centered public service experience."
            ],
        },
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
        description: [
            "Hoppin is a mobility app redesign that reimagines Belgium’s existing combimobility platform.",
            "Starting from branding alone, the project focuses on creating a clear, user-friendly experience that brings all transport options together into one seamless and accessible system."
        ],
        categories: ["design", "branding"],
        role: "Visual Design, UI Design, UX Refinement, prototyping",
        year: "2023",
        breakdown: {
            concept: [
                "Hoppin is a full redesign of an existing mobility platform that suffered from limited clarity and usability.",
                "Starting from the existing branding, the project focuses on rebuilding the entire user experience from the ground up with a strong UX foundation."
            ],

            how: [
                "The design process starts in Figma, with a focus on restructuring core user flows such as onboarding, login, and account setup.",
                "Additional attention is given to settings and preference management, allowing the experience to adapt to individual user needs.",
                "The main interface is built around a central map system, which serves as the core navigation layer for all mobility services in Belgium."
            ],

            what: [
                "The platform allows users to plan routes with clear guidance and access all relevant mobility information within a single interface.",
                "Shared mobility services such as bike sharing and car sharing are integrated into the system, expanding it into a complete combimobility solution.",
                "The result is a unified digital environment where multiple transport options are combined into one coherent system."
            ],

            result: [
                "The final experience is intuitive, efficient, and designed for real-world use.",
                "The project demonstrates how complex mobility systems can be simplified into a clear and accessible user experience."
            ],
        },
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
        description: [
            "Artex is a conceptual platform for digital artists, designed to showcase and monetize work across mediums such as 3D, image, motion, and typography.",
            "The project explores how digital exhibitions can bridge the gap between traditional art and digital creation."
        ],
        categories: ["branding", "ui", "ux"],
        role: "Brand Design, UI/UX, prototyping",
        year: "2022",
        breakdown: {
            concept: [
                "Artex is a branding and platform concept focused on creative exploration and digital art.",
                "The project aims to bridge the gap between digital and physical art by creating a space where digital artists can exhibit work, participate in curated exhibitions, and generate income through their creations."
            ],

            how: [
                "The project starts with the development of the brand identity, with the name Artex derived from “art” and “exhibition,” reflecting the core purpose of the platform.",
                "The visual identity is designed to be flexible and neutral, allowing it to support a wide range of artistic styles without overpowering the work itself.",
                "The logo system is built using a typographic approach where each character is sourced from a different typeface, representing the diversity of digital artistic expression."
            ],

            what: [
                "A complete Figma prototype is developed, exploring both user and artist flows.",
                "Users can discover exhibitions and artworks, while artists can upload, manage, and showcase their work within curated digital exhibitions.",
                "The system is designed as a scalable platform concept that supports both discovery and creation within the same environment."
            ],

            result: [
                "The project remains conceptual but presents a complete vision that combines branding, interaction design, and platform thinking into one cohesive system.",
                "Artex demonstrates how digital art platforms can be structured around both curation and creator participation."
            ],
        },
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


