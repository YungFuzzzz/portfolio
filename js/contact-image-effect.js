(() => {
    const imageContainer = document.getElementById("imageContainer");
    const imageElement = document.getElementById("myImage");

    if (!imageContainer || !imageElement || typeof window.THREE === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (reduceMotion || coarsePointer) {
        return;
    }

    let easeFactor = 0.02;
    let scene;
    let camera;
    let renderer;
    let planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let prevPosition = { x: 0.5, y: 0.5 };

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D u_texture;
        uniform vec2 u_mouse;
        uniform vec2 u_prevMouse;
        uniform float u_aberrationIntensity;

        void main() {
            vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
            vec2 centerOfPixel = gridUV + vec2(1.0 / 20.0, 1.0 / 20.0);

            vec2 mouseDirection = u_mouse - u_prevMouse;

            vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
            float pixelDistanceToMouse = length(pixelToMouseDirection);
            float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

            vec2 uvOffset = strength * -mouseDirection * (0.12 + (u_aberrationIntensity * 0.08));
            vec2 uv = vUv - uvOffset;

            vec4 color = texture2D(u_texture, uv);
            gl_FragColor = vec4(color.rgb, 1.0);
        }
    `;

    const initializeScene = (texture) => {
        scene = new window.THREE.Scene();

        camera = new window.THREE.PerspectiveCamera(
            80,
            imageElement.offsetWidth / imageElement.offsetHeight,
            0.01,
            10
        );
        camera.position.z = 1;

        const shaderUniforms = {
            u_mouse: { value: new window.THREE.Vector2() },
            u_prevMouse: { value: new window.THREE.Vector2() },
            u_aberrationIntensity: { value: 0.0 },
            u_texture: { value: texture }
        };

        planeMesh = new window.THREE.Mesh(
            new window.THREE.PlaneGeometry(2, 2),
            new window.THREE.ShaderMaterial({
                uniforms: shaderUniforms,
                vertexShader,
                fragmentShader
            })
        );

        scene.add(planeMesh);

        renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
        renderer.domElement.classList.add("contact-image-canvas");

        imageContainer.appendChild(renderer.domElement);
        imageContainer.classList.add("is-effect-ready");
    };

    const animateScene = () => {
        window.requestAnimationFrame(animateScene);

        mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
        mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

        planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
        planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

        aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
        planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

        renderer.render(scene, camera);
    };

    const handleMouseMove = (event) => {
        easeFactor = 0.02;
        const rect = imageContainer.getBoundingClientRect();
        prevPosition = { ...targetMousePosition };

        targetMousePosition.x = (event.clientX - rect.left) / rect.width;
        targetMousePosition.y = (event.clientY - rect.top) / rect.height;

        aberrationIntensity = 1;
    };

    const handleMouseEnter = (event) => {
        easeFactor = 0.02;
        const rect = imageContainer.getBoundingClientRect();

        mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
        mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
        easeFactor = 0.05;
        targetMousePosition = { ...prevPosition };
    };

    const handleResize = () => {
        if (!renderer || !camera || !imageElement.offsetWidth || !imageElement.offsetHeight) {
            return;
        }

        camera.aspect = imageElement.offsetWidth / imageElement.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);
    };

    const textureLoader = new window.THREE.TextureLoader();
    textureLoader.load(
        imageElement.currentSrc || imageElement.src,
        (texture) => {
            texture.minFilter = window.THREE.LinearFilter;
            texture.magFilter = window.THREE.LinearFilter;

            initializeScene(texture);
            animateScene();

            imageContainer.addEventListener("mousemove", handleMouseMove);
            imageContainer.addEventListener("mouseenter", handleMouseEnter);
            imageContainer.addEventListener("mouseleave", handleMouseLeave);
            window.addEventListener("resize", handleResize, { passive: true });
        }
    );
})();
