import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

const canvas = document.getElementById("skillsCarouselCanvas");

if (!canvas) {
    // Exit silently on pages where the section is absent.
} else {
    const container = canvas.parentElement;

    if (!container) {
        // Exit silently when the stage container is missing.
    } else {
        const skillsData = [
            { title: "BRANDING" },
            { title: "VISUAL IDENTITY" },
            { title: "UI DESIGN" },
            { title: "DIGITAL DESIGN" },
            { title: "GRAPHIC DESIGN" },
            { title: "TYPOGRAPHY" },
            { title: "ART DIRECTION" },
            { title: "INTERACTION DESIGN" },
            { title: "PROTOTYPING" },
            { title: "CREATIVE DIRECTION" },
            { title: "MOTION DESIGN" }
        ];

        const BASE_VIEWPORT_HEIGHT = 640;
        const BASE_CAMERA_Y = 4.5;
        const BASE_CAMERA_Z = 9.35;

        const scene = new THREE.Scene();
        scene.background = null;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false
        });

        const startWidth = Math.max(1, container.clientWidth);
        const startHeight = Math.max(1, container.clientHeight);
        const camera = new THREE.PerspectiveCamera(56, startWidth / startHeight, 0.1, 100);

        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        const dprCap = isTouchDevice ? 1.25 : 1.5;

        renderer.setSize(startWidth, startHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.NoToneMapping;

        const applyCameraFraming = (viewportWidth, viewportHeight) => {
            const scale = Math.max(0.9, viewportHeight / BASE_VIEWPORT_HEIGHT);
            const aspect = Math.max(0.55, viewportWidth / Math.max(1, viewportHeight));
            const widthCompensation = THREE.MathUtils.clamp(1.5 / aspect, 1, 1.45);
            camera.position.set(0, BASE_CAMERA_Y * scale, BASE_CAMERA_Z * scale * widthCompensation);
            camera.lookAt(0, -0.35, 0);
        };

        applyCameraFraming(startWidth, startHeight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.92);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.35);
        keyLight.position.set(2.8, 3.5, 5.5);
        scene.add(keyLight);

        const carouselGroup = new THREE.Group();
        scene.add(carouselGroup);
        carouselGroup.scale.setScalar(1.4);

        const radius = 3.95;
        const meshes = [];
        const raycaster = new THREE.Raycaster();
        const ndcPointer = new THREE.Vector2();

        const getWorldGapFromPixels = (px) => {
            const viewHeight = Math.max(1, container.clientHeight);
            const distance = camera.position.length();
            const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distance;
            return (px / viewHeight) * worldHeight;
        };

        const gapWorld = getWorldGapFromPixels(12);
        const itemHeight = 2.15;
        const fixedFontSize = 188;

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
            uniform vec3 uAccent;
            uniform float uHoverMix;

            varying vec2 vUv;

            void main() {
                vec2 flipped = vec2(1.0 - vUv.x, vUv.y);
                vec4 tex = texture2D(uMap, flipped);
                vec3 baseColor = mix(vec3(0.0), uAccent, uHoverMix);
                gl_FragColor = vec4(baseColor, tex.a);
            }
        `;

        const createSkillTexture = (title) => {
            const probeCanvas = document.createElement("canvas");
            const probeCtx = probeCanvas.getContext("2d");
            const text = String(title || "SKILL").toUpperCase();

            let measuredWidth = 820;
            if (probeCtx) {
                probeCtx.font = `900 ${fixedFontSize}px Metropolis, sans-serif`;
                measuredWidth = Math.ceil(probeCtx.measureText(text).width);
            }

            const padX = 84;
            const textureHeight = 512;
            const textureWidth = Math.max(512, measuredWidth + padX * 2);

            const textureCanvas = document.createElement("canvas");
            textureCanvas.width = textureWidth;
            textureCanvas.height = textureHeight;

            const ctx = textureCanvas.getContext("2d");
            if (!ctx) {
                return {
                    texture: new THREE.Texture(),
                    worldWidth: itemHeight * 2.3
                };
            }

            ctx.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
            ctx.font = `900 ${fixedFontSize}px Metropolis, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, textureCanvas.width * 0.5, textureCanvas.height * 0.52);

            const texture = new THREE.CanvasTexture(textureCanvas);
            texture.colorSpace = THREE.NoColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;

            const aspect = textureCanvas.width / textureCanvas.height;
            const worldWidth = itemHeight * aspect;

            return {
                texture,
                worldWidth
            };
        };

        const createMaterial = (panelWidth, panelArc) => new THREE.ShaderMaterial({
            uniforms: {
                uMap: { value: new THREE.Texture() },
                uAccent: { value: new THREE.Color(0xe0acd5) },
                uHoverMix: { value: 0.0 },
                uBendRadius: { value: radius },
                uArc: { value: panelArc },
                uWidth: { value: panelWidth }
            },
            vertexShader,
            fragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false
        });

        const builtItems = skillsData.map((skill) => {
            const textureData = createSkillTexture(skill.title);
            const panelWidth = textureData.worldWidth;

            return {
                texture: textureData.texture,
                panelWidth
            };
        });

        const rawPanelAngles = builtItems.map((item) => item.panelWidth / radius);
        const rawGapAngle = gapWorld / radius;
        const rawTotalAngle = rawPanelAngles.reduce((sum, angle) => sum + angle + rawGapAngle, 0);
        const angleScale = (Math.PI * 2) / rawTotalAngle;
        const panelAngles = rawPanelAngles.map((angle) => angle * angleScale);
        const gapAngle = rawGapAngle * angleScale;

        let cursorAngle = 0;

        builtItems.forEach((item, index) => {
            const panelWidth = item.panelWidth;
            const panelArc = panelAngles[index];

            const geometry = new THREE.PlaneGeometry(panelWidth, itemHeight, 32, 1);
            const material = createMaterial(panelWidth, panelArc);
            const mesh = new THREE.Mesh(geometry, material);

            mesh.userData.index = index;
            mesh.userData.baseAngle = cursorAngle + panelArc * 0.5;
            mesh.userData.hoverMix = 0;
            cursorAngle += panelArc + gapAngle;

            carouselGroup.add(mesh);
            meshes.push(mesh);

            material.uniforms.uMap.value = item.texture;
        });

        carouselGroup.rotation.x = -0.24;

        const IDLE_SPIN = 0.00155;

        let carouselRotation = 0;
        let angularVelocity = IDLE_SPIN;
        let rafId = 0;
        let spinDirection = 1;
        let hoveredIndex = -1;
        let pointerInside = false;
        let lastPointerX = 0;
        let lastPointerY = 0;

        let isDragging = false;
        let lastX = 0;

        const pointerToNdc = (event) => {
            const rect = canvas.getBoundingClientRect();
            ndcPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            ndcPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const applyLayout = () => {
            meshes.forEach((mesh) => {
                const angle = mesh.userData.baseAngle + carouselRotation;
                mesh.position.set(
                    Math.sin(angle) * radius,
                    0,
                    Math.cos(angle) * radius
                );

                mesh.rotation.y = angle + Math.PI;

                const hoverTarget = mesh.userData.index === hoveredIndex ? 1 : 0;
                mesh.userData.hoverMix += (hoverTarget - mesh.userData.hoverMix) * 0.14;
                mesh.material.uniforms.uHoverMix.value = mesh.userData.hoverMix;

                const front = (Math.cos(angle) + 1) * 0.5;
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

        canvas.addEventListener("pointerdown", (event) => {
            isDragging = true;
            lastX = event.clientX;
            canvas.setPointerCapture(event.pointerId);
            canvas.style.cursor = "grabbing";
        });

        canvas.addEventListener("pointermove", (event) => {
            pointerInside = true;
            lastPointerX = event.clientX;
            lastPointerY = event.clientY;

            if (!isDragging) {
                return;
            }

            const dx = event.clientX - lastX;
            lastX = event.clientX;

            const dragRotation = dx * 0.0043;
            carouselRotation += dragRotation;
            angularVelocity = dragRotation * 0.34;
            if (Math.abs(angularVelocity) > 0.0001) {
                spinDirection = Math.sign(angularVelocity);
            }
        });

        const onPointerUp = (event) => {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            canvas.releasePointerCapture(event.pointerId);
            canvas.style.cursor = hoveredIndex >= 0 ? "pointer" : "grab";
        };

        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
        canvas.addEventListener("pointerenter", (event) => {
            pointerInside = true;
            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
        });
        canvas.addEventListener("pointerleave", () => {
            pointerInside = false;
            hoveredIndex = -1;
            if (!isDragging) {
                canvas.style.cursor = "grab";
            }
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
                // Select the most visible mesh (closest to facing camera)
                const visibleMeshes = meshes
                    .map((mesh) => {
                        const angle = mesh.userData.baseAngle + carouselRotation;
                        const visibility = Math.cos(angle);
                        return { mesh, visibility };
                    })
                    .filter(({ visibility }) => visibility > 0.2)
                    .sort((a, b) => b.visibility - a.visibility);
                
                hoveredIndex = visibleMeshes.length > 0 ? visibleMeshes[0].mesh.userData.index : -1;
                canvas.style.cursor = hoveredIndex >= 0 ? "pointer" : "grab";
            }

            applyLayout();
            renderer.render(scene, camera);
        };

        const onResize = () => {
            const w = Math.max(1, container.clientWidth);
            const h = Math.max(1, container.clientHeight);
            camera.aspect = w / h;
            applyCameraFraming(w, h);
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("resize", onResize);

        canvas.style.cursor = "grab";
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
                mesh.material.dispose();
            });
        });
    }
}
