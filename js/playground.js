// ------------------------------------
// PLAYGROUND - Three.js Grass & Logo Scene
// ------------------------------------
// Preloads models offscreen, only revealed via fade by main.js.
// Exposed on window.Playground so non-module scripts (main.js) can call it.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

const Playground = (() => {
    let scene, camera, renderer, controls, animationId;
    let isInitialised = false;
    let isRunning = false;

    // Scene objects
    let sunLight, ambientLight, hemiLight;
    let skyMat, skyMesh;
    let cubeCamera, cubeRenderTarget, chromeMat;
    let vicesLogo = null;
    let terrain = null;
    let grassMaterial = null;
    let grassChunks = [];
    let logoBox = null;
    let frameCount = 0;

    const clock = new THREE.Clock();

    // =============================================
    //  GrassMaterial class
    // =============================================
    class GrassMaterial {
        constructor() {
            this.uniforms = {
                uTime: { value: 0 },
                uBaseColor: { value: new THREE.Color('#3a5a2f') },
                uTipColor1: { value: new THREE.Color('#6b8c5f') },
                uTipColor2: { value: new THREE.Color('#4d6b45') },
                uGrassLightIntensity: { value: 2.5 },
                uNoiseScale: { value: 1.5 }
            };

            this.material = new THREE.MeshLambertMaterial({
                side: THREE.DoubleSide,
                color: 0x5a7a4f,
                transparent: false
            });

            this._setupShader();
        }

        _setupShader() {
            const self = this;
            this.material.onBeforeCompile = (shader) => {
                shader.uniforms.uTime = self.uniforms.uTime;
                shader.uniforms.uBaseColor = self.uniforms.uBaseColor;
                shader.uniforms.uTipColor1 = self.uniforms.uTipColor1;
                shader.uniforms.uTipColor2 = self.uniforms.uTipColor2;
                shader.uniforms.uGrassLightIntensity = self.uniforms.uGrassLightIntensity;
                shader.uniforms.uNoiseScale = self.uniforms.uNoiseScale;

                shader.vertexShader = `
                    uniform float uTime;
                    uniform float uNoiseScale;
                    varying vec2 vUv;
                    varying vec2 vGlobalUV;
                    varying vec3 vNormal;
                    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
                    float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=hash(i); float b=hash(i+vec2(1,0)); float c=hash(i+vec2(0,1)); float d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
                    void main(){
                        vUv=uv;
                        vNormal=normalize(normalMatrix*normal);
                        vec4 modelPosition=modelMatrix*instanceMatrix*vec4(position,1.0);
                        float terrainSize=30.0;
                        vGlobalUV=modelPosition.xz/terrainSize;
                        float windAmp=0.35; float windSpeed=0.8;
                        float noise1=noise(vGlobalUV*2.0+uTime*0.08);
                        float windWave1=sin(vGlobalUV.x*4.0+vGlobalUV.y*3.5+noise1*6.0+uTime*windSpeed);
                        float windInfluence=uv.y*uv.y;
                        float windEffect=windWave1*windAmp*windInfluence;
                        modelPosition.x+=windEffect;
                        modelPosition.z+=windEffect*0.6;
                        float bladeNoise=noise(vGlobalUV*50.0);
                        modelPosition.x+=sin(uTime*windSpeed+bladeNoise*10.0)*0.05*windInfluence;
                        modelPosition.y+=noise(vGlobalUV*uNoiseScale)*0.2*uv.y;
                        gl_Position=projectionMatrix*viewMatrix*modelPosition;
                    }
                `;

                shader.fragmentShader = `
                    uniform vec3 uBaseColor;
                    uniform vec3 uTipColor1;
                    uniform vec3 uTipColor2;
                    uniform float uGrassLightIntensity;
                    uniform float uNoiseScale;
                    varying vec2 vUv;
                    varying vec2 vGlobalUV;
                    varying vec3 vNormal;
                    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
                    float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=hash(i); float b=hash(i+vec2(1,0)); float c=hash(i+vec2(0,1)); float d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
                    void main(){
                        float ao=smoothstep(0.0,0.4,vUv.y);
                        ao=mix(0.75,1.0,ao);
                        float cn1=noise(vGlobalUV*uNoiseScale);
                        float cn2=noise(vGlobalUV*uNoiseScale*2.5+vec2(100.0));
                        float cv=cn1*0.6+cn2*0.4;
                        vec3 tipColor=mix(uTipColor1,uTipColor2,cv);
                        vec3 grassColor=mix(uBaseColor,tipColor,vUv.y*vUv.y);
                        grassColor*=ao;
                        vec3 lightDir=normalize(vec3(1.0,1.0,0.5));
                        float diffuse=mix(0.7,1.0,max(0.0,dot(vNormal,lightDir)));
                        grassColor*=diffuse*uGrassLightIntensity;
                        float rimLight=pow(1.0-vUv.y,3.0)*0.15;
                        grassColor+=vec3(rimLight*0.3,rimLight*0.5,rimLight*0.2);
                        gl_FragColor=vec4(grassColor,1.0);
                    }
                `;
            };
        }

        update(time) { this.uniforms.uTime.value = time; }
    }

    // =============================================
    //  Generate instanced grass
    // =============================================
    function generateGrass(terrainMesh) {
        grassMaterial = new GrassMaterial();

        const grassGeometry = new THREE.PlaneGeometry(0.1, 1.4, 1, 2);
        const positions = grassGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            const normalizedY = Math.max(0, Math.min(1, y / 1.4));
            const taper = Math.max(0.05, 1.0 - Math.pow(normalizedY, 0.4) * 0.95);
            positions.setX(i, positions.getX(i) * taper);
        }
        positions.needsUpdate = true;
        grassGeometry.computeBoundingSphere();

        terrainMesh.updateMatrixWorld(true);
        const sampler = new MeshSurfaceSampler(terrainMesh).build();

        const chunksCount = 64;
        const bladesPerChunk = 10000;

        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3(1, 1, 1);
        const normal = new THREE.Vector3();
        const yAxis = new THREE.Vector3(0, 1, 0);
        const matrix = new THREE.Matrix4();

        for (let c = 0; c < chunksCount; c++) {
            const instancedGrass = new THREE.InstancedMesh(
                grassGeometry, grassMaterial.material, bladesPerChunk
            );
            instancedGrass.frustumCulled = true;
            instancedGrass.castShadow = false;
            instancedGrass.receiveShadow = false;

            for (let i = 0; i < bladesPerChunk; i++) {
                sampler.sample(position, normal);
                position.applyMatrix4(terrainMesh.matrixWorld);
                normal.transformDirection(terrainMesh.matrixWorld);

                if (logoBox && logoBox.containsPoint(position)) { i--; continue; }

                quaternion.setFromUnitVectors(yAxis, normal);
                const randomRot = new THREE.Euler(0, Math.random() * Math.PI * 2, 0);
                quaternion.multiply(new THREE.Quaternion().setFromEuler(randomRot));

                const sv = 0.8 + Math.random() * 0.5;
                scale.set(sv, sv * (0.4 + Math.random() * 1.2), sv);
                matrix.compose(position, quaternion, scale);
                instancedGrass.setMatrixAt(i, matrix);
            }
            instancedGrass.instanceMatrix.needsUpdate = true;
            scene.add(instancedGrass);
            grassChunks.push(instancedGrass);
        }
    }

    // =============================================
    //  Build scene (called once by preload)
    // =============================================
    function init() {
        if (isInitialised) return Promise.resolve();

        return new Promise((resolve) => {
            const container = document.querySelector('.playground-canvas-container');
            if (!container) { resolve(); return; }

            // --- Renderer ---
            renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
            renderer.setPixelRatio(1);
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(renderer.domElement);

            // --- Scene ---
            scene = new THREE.Scene();
            scene.background = null; // transparent — sky shader fills it

            // --- Camera ---
            camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 6, 16);

            // --- Controls ---
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = -0.5;
            controls.minPolarAngle = 0;
            controls.maxPolarAngle = Math.PI / 2.5;
            controls.target.set(0, 0, 0);
            controls.update();

            // --- Lights ---
            sunLight = new THREE.DirectionalLight(0xfffef5, 4.5);
            sunLight.castShadow = true;
            sunLight.shadow.mapSize.width = 1024;
            sunLight.shadow.mapSize.height = 1024;
            sunLight.shadow.camera.near = 0.5;
            sunLight.shadow.camera.far = 500;
            sunLight.shadow.camera.left = -50;
            sunLight.shadow.camera.right = 50;
            sunLight.shadow.camera.top = 50;
            sunLight.shadow.camera.bottom = -50;
            scene.add(sunLight);

            ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            scene.add(ambientLight);

            hemiLight = new THREE.HemisphereLight(0xffffff, 0x9bd38d, 0.8);
            scene.add(hemiLight);

            // --- Sky shader ---
            const skyVertex = `
                varying vec3 vWorldPos;
                void main(){
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPos = worldPos.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;
            const skyFragment = `
                precision highp float;
                uniform float uTime;
                uniform vec3 uCameraPos;
                varying vec3 vWorldPos;
                float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
                float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=hash(i); float b=hash(i+vec2(1,0)); float c=hash(i+vec2(0,1)); float d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
                float fbm(vec2 p){ float v=0.0; float amp=0.5; for(int i=0;i<5;i++){ v+=amp*noise(p); p*=2.0; amp*=0.5; } return v; }
                void main(){
                    vec3 dir=normalize(vWorldPos-uCameraPos);
                    vec3 dayTop=vec3(0.4,0.65,0.95);
                    vec3 dayHorizon=vec3(0.98,0.85,0.7);
                    float horizon=smoothstep(-0.15,0.15,dir.y);
                    float band=floor((horizon*3.0))/3.0;
                    vec2 cloudUV=dir.xz*0.5+vec2(uTime*0.02,uTime*0.01);
                    float clouds=fbm(cloudUV*3.0);
                    float cloudMask=smoothstep(0.42,0.6,clouds);
                    cloudMask*=(1.0-pow(clamp(dir.y*1.2+0.2,0.0,1.0),2.0));
                    vec3 sky=mix(dayHorizon,dayTop,pow(clamp(dir.y*0.5+0.5,0.0,1.0),0.8));
                    sky=mix(sky,sky*(0.95+0.15*band),0.3);
                    vec3 cloudColor=vec3(1.0,0.98,0.95);
                    sky=mix(sky,cloudColor,cloudMask*0.7);
                    vec3 sunDir=normalize(vec3(0.5,0.8,0.3));
                    float sunDot=max(0.0,dot(dir,sunDir));
                    float sunGlow=pow(sunDot,64.0)*(1.2+0.2*sin(uTime));
                    vec3 sunColor=vec3(1.0,0.95,0.7);
                    sky+=sunColor*sunGlow;
                    sky=pow(sky,vec3(0.85));
                    gl_FragColor=vec4(sky,1.0);
                }
            `;
            skyMat = new THREE.ShaderMaterial({
                vertexShader: skyVertex,
                fragmentShader: skyFragment,
                side: THREE.BackSide,
                uniforms: { uTime: { value: 0 }, uCameraPos: { value: new THREE.Vector3() } },
                depthWrite: false,
                depthTest: false
            });
            skyMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), skyMat);
            skyMesh.scale.setScalar(200);
            skyMesh.frustumCulled = false;
            skyMesh.renderOrder = -1;
            scene.add(skyMesh);

            // --- CubeCamera for chrome reflections ---
            cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
                format: THREE.RGBAFormat,
                generateMipmaps: true,
                minFilter: THREE.LinearMipmapLinearFilter,
                magFilter: THREE.LinearFilter,
                colorSpace: THREE.SRGBColorSpace
            });
            cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
            scene.add(cubeCamera);

            chromeMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0.0,
                envMap: cubeRenderTarget.texture,
                envMapIntensity: 1.8,
                toneMapped: false
            });

            // --- Loading Manager (resolve promise when both models are loaded) ---
            const loadingManager = new THREE.LoadingManager();
            loadingManager.onLoad = () => {
                // Render one frame so GPU compiles everything
                renderer.render(scene, camera);
                isInitialised = true;
                resolve();
            };
            loadingManager.onError = (url) => {
                console.error('Playground: error loading', url);
                resolve(); // still resolve so the UI doesn't hang
            };

            const gltfLoader = new GLTFLoader(loadingManager);

            // --- Load viceslogo ---
            gltfLoader.load('./assets/models/viceslogo.glb', (gltf) => {
                vicesLogo = gltf.scene;
                vicesLogo.traverse(child => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff, metalness: 0.0, roughness: 0.3
                        });
                        child.material.side = THREE.FrontSide;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                const box = new THREE.Box3().setFromObject(vicesLogo);
                const yOffset = -box.min.y;
                vicesLogo.position.set(0, yOffset, 0);
                vicesLogo.scale.set(1.5, 1.5, 1.5);
                scene.add(vicesLogo);
                vicesLogo.updateMatrixWorld(true);
                logoBox = new THREE.Box3().setFromObject(vicesLogo);
                logoBox.expandByScalar(0.3);

                // If terrain is already loaded, regenerate grass with logo exclusion
                if (terrain) regenerateGrass();
            });

            // --- Load terrain ---
            gltfLoader.load('./assets/models/terrain.glb', (gltf) => {
                terrain = gltf.scene;
                let terrainMesh;
                const terrainMaterial = new THREE.MeshPhongMaterial({
                    color: 0x1e3815, flatShading: false, shininess: 5,
                    emissive: 0x0a1506, emissiveIntensity: 0.15
                });
                terrain.traverse(child => {
                    if (child.isMesh) {
                        child.material = terrainMaterial;
                        child.castShadow = false;
                        child.receiveShadow = true;
                        terrainMesh = child;
                    }
                });
                scene.add(terrain);
                if (terrainMesh) generateGrass(terrainMesh);
            });

            // --- Resize ---
            window.addEventListener('resize', onResize);
        });
    }

    function regenerateGrass() {
        grassChunks.forEach(ch => scene.remove(ch));
        grassChunks = [];
        let terrainMesh;
        terrain.traverse(child => { if (child.isMesh) terrainMesh = child; });
        if (terrainMesh) generateGrass(terrainMesh);
    }

    function onResize() {
        const container = document.querySelector('.playground-canvas-container');
        if (!camera || !renderer || !container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    // =============================================
    //  Animation loop
    // =============================================
    function animate() {
        if (!isRunning) return;
        animationId = requestAnimationFrame(animate);
        frameCount++;

        const elapsed = clock.getElapsedTime();

        // Sun rotation
        const sunSpeed = 0.15;
        const angle = elapsed * sunSpeed;
        const elevation = 0.7;
        const sunDir = new THREE.Vector3(
            Math.cos(angle) * Math.sqrt(1 - elevation * elevation),
            elevation,
            Math.sin(angle) * Math.sqrt(1 - elevation * elevation)
        ).normalize();
        sunLight.position.set(sunDir.x * 100, sunDir.y * 100, sunDir.z * 100);
        sunLight.intensity = 3.0;
        sunLight.color.setHex(0xfffef5);
        ambientLight.intensity = 0.8;

        // Sky
        skyMat.uniforms.uTime.value = elapsed;
        skyMat.uniforms.uCameraPos.value.copy(camera.position);
        skyMesh.position.copy(camera.position);

        // Grass
        if (grassMaterial) grassMaterial.update(elapsed);

        // Logo reflections every 3 frames
        if (vicesLogo && frameCount % 3 === 0) {
            vicesLogo.visible = false;
            const box = new THREE.Box3().setFromObject(vicesLogo);
            cubeCamera.position.copy(box.getCenter(new THREE.Vector3()));
            cubeCamera.update(renderer, scene);
            vicesLogo.visible = true;
        }

        controls.update();
        renderer.render(scene, camera);
    }

    // =============================================
    //  Public API — used by main.js
    // =============================================
    return {
        /** Initialise scene & load models. Returns Promise that resolves when ready. */
        preload() { return init(); },

        /** Start the render loop */
        start() {
            if (!isInitialised || isRunning) return;
            isRunning = true;
            clock.start();
            animate();
        },

        /** Stop the render loop */
        stop() {
            isRunning = false;
            if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
        },

        get ready() { return isInitialised; }
    };
})();

// Expose to non-module scripts (main.js)
window.Playground = Playground;
