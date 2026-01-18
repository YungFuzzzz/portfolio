import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

// --- Loading Manager ---
const loadingManager = new THREE.LoadingManager();

// Create loading screen in same style as index page
const loadingScreen = document.createElement('div');
loadingScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #f8f8f8; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 9999; font-family: Metropolis, sans-serif;';

const loadingText = document.createElement('div');
loadingText.textContent = 'LOADING';
loadingText.style.cssText = 'font-size: 16px; font-weight: 800; margin-bottom: 16px; color: #000; letter-spacing: 0.5px;';

const progressContainer = document.createElement('div');
progressContainer.style.cssText = 'width: 200px; height: 2px; background: rgba(0,0,0,0.12); border-radius: 0; overflow: hidden;';

const loadingBar = document.createElement('div');
loadingBar.style.cssText = 'width: 0%; height: 100%; background: #000; transition: width 0.2s ease;';

const loadingProgress = document.createElement('div');
loadingProgress.textContent = '0%';
loadingProgress.style.cssText = 'margin-top: 12px; font-size: 12px; color: rgba(0,0,0,0.75); font-weight: 400;';

progressContainer.appendChild(loadingBar);
loadingScreen.appendChild(loadingText);
loadingScreen.appendChild(progressContainer);
loadingScreen.appendChild(loadingProgress);
document.body.appendChild(loadingScreen);

loadingManager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100;
  loadingBar.style.width = progress + '%';
  loadingProgress.textContent = Math.round(progress) + '%';
};

loadingManager.onLoad = () => {
  console.log('All assets loaded!');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      loadingScreen.remove();
    }, 400);
  }, 300);
};

loadingManager.onError = (url) => {
  console.error('Error loading:', url);
};

const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(1); // Fixed 1x pixel ratio for better performance
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null;

const clock = new THREE.Clock();

// Camera
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 6, 16);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = -0.5;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2.5; // Higher lock - can't go below terrain
controls.target.set(0, 0, 0);
controls.update();

// Dynamic sun light that rotates around the scene
const sunLight = new THREE.DirectionalLight(0xfffef5, 4.5);
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

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// Add hemisphere light for more uniform lighting from all directions
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x9bd38d, 0.8);
scene.add(hemiLight);

// Central logo - will be loaded from GLTF
let vicesLogo = null;

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
float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); float a = hash(i); float b = hash(i + vec2(1.0,0.0)); float c = hash(i + vec2(0.0,1.0)); float d = hash(i + vec2(1.0,1.0)); vec2 u = f*f*(3.0-2.0*f); return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y; }
float fbm(vec2 p){ float v=0.0; float amp=0.5; for(int i=0;i<5;i++){ v+=amp*noise(p); p*=2.0; amp*=0.5; } return v; }
void main(){
  vec3 dir = normalize(vWorldPos - uCameraPos);
  
  // Static daytime sky - lighter and more stylized
  vec3 dayTop=vec3(0.4,0.65,0.95);
  vec3 dayHorizon=vec3(0.98,0.85,0.7);
  
  float horizon=smoothstep(-0.15,0.15,dir.y);
  float band=floor((horizon*3.0))/3.0;
  vec2 cloudUV=dir.xz*0.5+vec2(uTime*0.02,uTime*0.01);
  float clouds=fbm(cloudUV*3.0);
  float cloudMask=smoothstep(0.42,0.6,clouds);
  cloudMask*=(1.0-pow(clamp(dir.y*1.2+0.2,0.0,1.0),2.0));
  
  vec3 sky=mix(dayHorizon,dayTop,pow(clamp(dir.y*0.5+0.5,0.0,1.0),0.8));
  sky=mix(sky,sky*(0.95+0.15*band),0.3); // Less banding, brighter
  vec3 cloudColor=vec3(1.0,0.98,0.95);
  sky=mix(sky,cloudColor,cloudMask*0.7); // Lighter clouds
  
  // Static sun for visual reference
  vec3 sunDir=normalize(vec3(0.5,0.8,0.3));
  float sunDot=max(0.0,dot(dir,sunDir));
  float sunGlow=pow(sunDot,64.0)*(1.2+0.2*sin(uTime));
  vec3 sunColor=vec3(1.0,0.95,0.7);
  sky+=sunColor*sunGlow;
  sky=pow(sky,vec3(0.85)); // Brighter gamma
  gl_FragColor=vec4(sky,1.0);
}
`;
const skyMat = new THREE.ShaderMaterial({
  vertexShader: skyVertex,
  fragmentShader: skyFragment,
  side: THREE.BackSide,
  uniforms: { uTime: {value:0}, uCameraPos: {value: new THREE.Vector3()} },
  depthWrite:false,
  depthTest:false
});
const skyMesh = new THREE.Mesh(new THREE.SphereGeometry(1,48,32), skyMat);
skyMesh.scale.setScalar(200);
skyMesh.frustumCulled=false;
skyMesh.renderOrder=-1;
scene.add(skyMesh);

// --- CubeCamera for chrome reflections ---
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, { 
  format: THREE.RGBAFormat, 
  generateMipmaps: true, 
  minFilter: THREE.LinearMipmapLinearFilter,
  magFilter: THREE.LinearFilter,
  colorSpace: THREE.SRGBColorSpace
});
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

const chromeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0.0,
  envMap: cubeRenderTarget.texture,
  envMapIntensity: 1.8,
  toneMapped: false
});

// --- FluffyGrass Material ---
class GrassMaterial {
  constructor(){
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
    
    this.setupGrassMaterial();
  }
  
  setupGrassMaterial(){
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
        
        // Simple noise function
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
        float noise(vec2 p){ 
          vec2 i = floor(p); 
          vec2 f = fract(p); 
          float a = hash(i); 
          float b = hash(i + vec2(1.0,0.0)); 
          float c = hash(i + vec2(0.0,1.0)); 
          float d = hash(i + vec2(1.0,1.0)); 
          vec2 u = f*f*(3.0-2.0*f); 
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y; 
        }
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Wind effect with variation
          vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
          float terrainSize = 30.0;
          vGlobalUV = modelPosition.xz / terrainSize;
          
          // Multiple wind layers for varied movement
          float windAmp = 0.35;
          float windSpeed = 0.8;
          
          // Primary wind wave
          float noise1 = noise(vGlobalUV * 2.0 + uTime * 0.08);
          float windWave1 = sin(vGlobalUV.x * 4.0 + vGlobalUV.y * 3.5 + noise1 * 6.0 + uTime * windSpeed);
          
          // Use single wind wave for better performance
          float combinedWind = windWave1;
          
          // Apply wind only to tips with quadratic falloff
          float windInfluence = uv.y * uv.y;
          float windEffect = combinedWind * windAmp * windInfluence;
          
          modelPosition.x += windEffect;
          modelPosition.z += windEffect * 0.6;
          
          // Add slight random sway per blade
          float bladeNoise = noise(vGlobalUV * 50.0);
          modelPosition.x += sin(uTime * windSpeed + bladeNoise * 10.0) * 0.05 * windInfluence;
          
          // Vary height with noise
          modelPosition.y += noise(vGlobalUV * uNoiseScale) * 0.2 * uv.y;
          
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
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
        float noise(vec2 p){ 
          vec2 i = floor(p); 
          vec2 f = fract(p); 
          float a = hash(i); 
          float b = hash(i + vec2(1.0,0.0)); 
          float c = hash(i + vec2(0.0,1.0)); 
          float d = hash(i + vec2(1.0,1.0)); 
          vec2 u = f*f*(3.0-2.0*f); 
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y; 
        }
        
        void main() {
          // No transparency - solid grass
          float alpha = 1.0;
          
          // Fake Ambient Occlusion - darker at base
          float ao = smoothstep(0.0, 0.4, vUv.y);
          ao = mix(0.75, 1.0, ao); // Much lighter base
          
          // Color variation using noise
          float colorNoise1 = noise(vGlobalUV * uNoiseScale);
          float colorNoise2 = noise(vGlobalUV * uNoiseScale * 2.5 + vec2(100.0));
          
          // Combine noise for color variation
          float colorVariation = colorNoise1 * 0.6 + colorNoise2 * 0.4;
          
          // Mix tip colors with variation
          vec3 tipColor = mix(uTipColor1, uTipColor2, colorVariation);
          
          // Base to tip gradient
          vec3 grassColor = mix(uBaseColor, tipColor, vUv.y * vUv.y);
          
          // Apply ambient occlusion
          grassColor *= ao;
          
          // Simple lighting with high fill light for uniform vibrancy
          vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
          float diffuse = mix(0.7, 1.0, max(0.0, dot(vNormal, lightDir))); // Less contrast
          
          // Apply lighting with AO consideration
          grassColor *= diffuse * uGrassLightIntensity;
          
          // Subtle rim light on tips for extra pop
          float rimLight = pow(1.0 - vUv.y, 3.0) * 0.15;
          grassColor += vec3(rimLight * 0.3, rimLight * 0.5, rimLight * 0.2);
          
          gl_FragColor = vec4(grassColor, alpha);
        }
      `;
    };
  }
  
  update(time){
    this.uniforms.uTime.value = time;
  }
}

// --- Grass system ---
let terrain = null;
let grassMaterial = null;
let grassChunks = [];
let logoBox = null; // Store logo bounding box for exclusion

function generateGrass(terrainMesh){
  console.log('Generating fluffy grass with chunks...');
  
  // Create grass material
  grassMaterial = new GrassMaterial();
  
  // Simpler grass blade geometry for better performance
  const grassGeometry = new THREE.PlaneGeometry(0.1, 1.4, 1, 2); // Lower grass
  grassGeometry.translate(0, 0.0, 0); // No offset - blade starts at ground level
  
  // Make blade more pointy - stronger taper
  const positions = grassGeometry.attributes.position;
  for(let i = 0; i < positions.count; i++){
    const y = positions.getY(i);
    const normalizedY = Math.max(0, Math.min(1, y / 1.4)); // 0 at bottom, 1 at top
    const taper = Math.max(0.05, 1.0 - Math.pow(normalizedY, 0.4) * 0.95); // Very sharp point
    const currentX = positions.getX(i);
    positions.setX(i, currentX * taper);
  }
  positions.needsUpdate = true;
  grassGeometry.computeBoundingSphere();
  
  terrainMesh.updateMatrixWorld(true);
  const sampler = new MeshSurfaceSampler(terrainMesh).build();
  
  // Create multiple smaller chunks for frustum culling
  const chunksCount = 64; // More chunks for better culling
  const bladesPerChunk = 10000; // Total: 640k blades - super dense!
  
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  const normal = new THREE.Vector3();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const matrix = new THREE.Matrix4();
  
  console.log(`Creating ${chunksCount} grass chunks...`);
  
  for(let chunkIdx = 0; chunkIdx < chunksCount; chunkIdx++){
    const instancedGrass = new THREE.InstancedMesh(
      grassGeometry,
      grassMaterial.material,
      bladesPerChunk
    );
    
    // Enable frustum culling per chunk
    instancedGrass.frustumCulled = true;
    instancedGrass.castShadow = false;
    instancedGrass.receiveShadow = false;
    
    // Set bounds for better frustum culling
    instancedGrass.computeBoundingSphere();
    
    for(let i = 0; i < bladesPerChunk; i++){
      sampler.sample(position, normal);
      position.applyMatrix4(terrainMesh.matrixWorld);
      normal.transformDirection(terrainMesh.matrixWorld);
      
      // Check if grass blade is inside logo bounding box
      if(logoBox && logoBox.containsPoint(position)){
        // Skip this blade - it's inside the logo area
        i--;
        continue;
      }
      
      quaternion.setFromUnitVectors(yAxis, normal);
      const randomRot = new THREE.Euler(0, Math.random() * Math.PI * 2, 0);
      const randomQuat = new THREE.Quaternion().setFromEuler(randomRot);
      quaternion.multiply(randomQuat);
      
      const scaleVal = 0.8 + Math.random() * 0.5;
      scale.set(scaleVal, scaleVal * (0.4 + Math.random() * 1.2), scaleVal); // More height variation
      
      matrix.compose(position, quaternion, scale);
      instancedGrass.setMatrixAt(i, matrix);
    }
    
    instancedGrass.instanceMatrix.needsUpdate = true;
    scene.add(instancedGrass);
    grassChunks.push(instancedGrass);
  }
  
  console.log(`Generated ${chunksCount * bladesPerChunk} grass blades in ${chunksCount} chunks!`);
}

// --- Load viceslogo ---
const logoLoader = new GLTFLoader();
logoLoader.load('./assets/models/viceslogo.glb', (gltf) => {
  vicesLogo = gltf.scene;
  
  console.log('Vices logo loaded:', vicesLogo);
  
  // Apply white material to all meshes
  vicesLogo.traverse(child => {
    if(child.isMesh){
      console.log('Logo mesh found:', child.name);
      
      // Simple white material
      child.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.3
      });
      child.material.side = THREE.FrontSide;
      
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  // Calculate bounding box to position logo on terrain
  const box = new THREE.Box3().setFromObject(vicesLogo);
  const height = box.max.y - box.min.y;
  const yOffset = -box.min.y; // Offset to put bottom at y=0
  
  // Position on terrain surface
  vicesLogo.position.set(0, yOffset, 0);
  vicesLogo.scale.set(1.5, 1.5, 1.5);
  scene.add(vicesLogo);
  
  // Update bounding box after positioning and store for grass exclusion
  vicesLogo.updateMatrixWorld(true);
  logoBox = new THREE.Box3().setFromObject(vicesLogo);
  // Expand box slightly to create clearance around logo
  logoBox.expandByScalar(0.3);
  
  // Regenerate grass if terrain is already loaded
  if(terrain){
    // Clear existing grass
    grassChunks.forEach(chunk => scene.remove(chunk));
    grassChunks = [];
    
    // Find terrain mesh
    let terrainMesh;
    terrain.traverse(child => {
      if(child.isMesh) terrainMesh = child;
    });
    
    if(terrainMesh){
      generateGrass(terrainMesh);
    }
  }
  
  console.log('Vices logo loaded successfully, height:', height);
}, 
undefined, 
(error) => {
  console.error('Error loading viceslogo:', error);
});

// --- Load terrain ---
const loader = new GLTFLoader(loadingManager);
loader.load('./assets/models/terrain.glb', (gltf)=>{
  terrain = gltf.scene;
  let terrainMesh;
  
  const terrainMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x1e3815,
    flatShading: false,
    shininess: 5,
    emissive: 0x0a1506,
    emissiveIntensity: 0.15
  });
  
  terrain.traverse(child=>{
    if(child.isMesh){
      child.material = terrainMaterial;
      child.castShadow=false;
      child.receiveShadow=true;
      terrainMesh = child;
    }
  });
  scene.add(terrain);
  
  console.log('Terrain loaded successfully');

  // --- Generate fluffy grass on terrain ---
  if(terrainMesh){
    generateGrass(terrainMesh);
  }
});

// Resize
function resize(){
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w,h);
  camera.aspect=w/h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize);
new ResizeObserver(resize).observe(container);
resize();

// Animate
let frameCount = 0;
function animate(){
  const elapsed = clock.getElapsedTime();
  frameCount++;
  
  // Sun rotates in a circle at daytime elevation for moving shadows
  const sunSpeed = 0.15; // Slow rotation
  const angle = elapsed * sunSpeed;
  
  // Keep sun at good daytime elevation (around 60 degrees) and rotate around Y axis
  const elevation = 0.7; // High sun position
  const sunDir = new THREE.Vector3(
    Math.cos(angle) * Math.sqrt(1 - elevation * elevation),
    elevation,
    Math.sin(angle) * Math.sqrt(1 - elevation * elevation)
  ).normalize();
  
  // Position sun light
  sunLight.position.set(sunDir.x * 100, sunDir.y * 100, sunDir.z * 100);
  
  // Keep constant daytime lighting - bright and vibrant
  sunLight.intensity = 3.0;
  sunLight.color.setHex(0xfffef5);
  ambientLight.intensity = 0.8;
  
  // Sky
  skyMat.uniforms.uTime.value = elapsed;
  skyMat.uniforms.uCameraPos.value.copy(camera.position);
  skyMesh.position.copy(camera.position);

  // Update grass animation
  if(grassMaterial){
    grassMaterial.update(elapsed);
  }

  // Logo reflections - update every 3 frames for better performance
  if(vicesLogo && frameCount % 3 === 0){
    vicesLogo.visible = false;
    
    // Position camera at logo center
    const box = new THREE.Box3().setFromObject(vicesLogo);
    const center = box.getCenter(new THREE.Vector3());
    cubeCamera.position.copy(center);
    
    // Update cube camera
    cubeCamera.update(renderer, scene);
    vicesLogo.visible = true;
  }

  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();