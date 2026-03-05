// Image morph effect on hover
const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
const sourceImage = document.getElementById('source-image');
const container = document.querySelector('.about-image');

// Grid settings
const gridWidth = 40; // Width of each tile
const gridHeight = 25; // Height of each tile
let tiles = [];
let mouseX = -1000;
let mouseY = -1000;
let prevMouseX = -1000;
let prevMouseY = -1000;
let mouseVelocity = 0;
let isHovering = false;

// Wait for image to load
sourceImage.onload = function() {
    initCanvas();
    animate();
};

// If image is already loaded
if (sourceImage.complete) {
    initCanvas();
    animate();
}

function initCanvas() {
    // Set canvas size to match container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Calculate grid
    const cols = Math.ceil(canvas.width / gridWidth);
    const rows = Math.ceil(canvas.height / gridHeight);
    
    tiles = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            tiles.push({
                x: col * gridWidth,
                y: row * gridHeight,
                offsetX: 0,
                offsetY: 0,
                targetOffsetX: 0,
                targetOffsetY: 0
            });
        }
    }
}

// Mouse events
container.addEventListener('mouseenter', () => {
    isHovering = true;
});

container.addEventListener('mouseleave', () => {
    isHovering = false;
    mouseX = -1000;
    mouseY = -1000;
});

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Calculate velocity
    const dx = mouseX - prevMouseX;
    const dy = mouseY - prevMouseY;
    mouseVelocity = Math.sqrt(dx * dx + dy * dy);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate image dimensions to cover canvas
    const imgAspect = sourceImage.naturalWidth / sourceImage.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
    } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
    }
    
    // Update and draw tiles
    tiles.forEach(tile => {
        // Calculate distance from mouse
        const dx = mouseX - (tile.x + gridWidth / 2);
        const dy = mouseY - (tile.y + gridHeight / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate displacement based on distance and velocity
        const maxDistance = 250; // Max distance for effect
        const baseDisplacement = 35; // Base pixel displacement
        const velocityMultiplier = Math.min(mouseVelocity * 0.5, 30); // Max 30px extra from velocity
        const maxDisplacement = baseDisplacement + velocityMultiplier;
        
        if (isHovering && distance < maxDistance) {
            const force = 1 - (distance / maxDistance);
            // Push away from mouse (negative direction)
            tile.targetOffsetX = -(dx / distance) * force * maxDisplacement;
            tile.targetOffsetY = -(dy / distance) * force * maxDisplacement;
        } else {
            tile.targetOffsetX = 0;
            tile.targetOffsetY = 0;
        }
        
        // Smooth interpolation
        tile.offsetX += (tile.targetOffsetX - tile.offsetX) * 0.15;
        tile.offsetY += (tile.targetOffsetY - tile.offsetY) * 0.15;
        
        // Calculate source coordinates with displacement
        // Instead of moving the tile position, we adjust what part of the source image we sample
        const srcX = ((tile.x - tile.offsetX - drawX) / drawWidth) * sourceImage.naturalWidth;
        const srcY = ((tile.y - tile.offsetY - drawY) / drawHeight) * sourceImage.naturalHeight;
        const srcWidth = (gridWidth / drawWidth) * sourceImage.naturalWidth;
        const srcHeight = (gridHeight / drawHeight) * sourceImage.naturalHeight;
        
        // Draw tile at original position but with displaced source
        ctx.drawImage(
            sourceImage,
            srcX, srcY, srcWidth, srcHeight,
            tile.x, tile.y, gridWidth, gridHeight
        );
    });
    
    // Decay velocity
    mouseVelocity *= 0.9;
}

// Handle resize
window.addEventListener('resize', () => {
    initCanvas();
});
