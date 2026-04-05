(() => {
    const canvas = document.getElementById("ditherCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });

    if (!ctx) {
        return;
    }

    const gridCanvas = document.createElement("canvas");
    const gridCtx = gridCanvas.getContext("2d", { alpha: true, desynchronized: true });

    if (!gridCtx) {
        return;
    }

    const bayer8 = [
        0, 48, 12, 60, 3, 51, 15, 63,
        32, 16, 44, 28, 35, 19, 47, 31,
        8, 56, 4, 52, 11, 59, 7, 55,
        40, 24, 36, 20, 43, 27, 39, 23,
        2, 50, 14, 62, 1, 49, 13, 61,
        34, 18, 46, 30, 33, 17, 45, 29,
        10, 58, 6, 54, 9, 57, 5, 53,
        42, 26, 38, 22, 41, 25, 37, 21,
    ];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellSize = 3;
    let animationId = 0;
    let lastFrame = 0;
    let pendingResizeRaf = 0;
    let isVisible = true;
    let lastValidWidth = 0;
    let lastValidHeight = 0;

    let waveRows = new Int16Array(0);
    let grainMap = new Uint8Array(0);
    let imageData = null;
    let pixels = null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMq = window.matchMedia("(max-width: 768px)").matches;
    const isChrome = /Chrome\//.test(navigator.userAgent) && !/Edg\//.test(navigator.userAgent);
    const quality = {
        desktopCols: isChrome ? 520 : 780,
        mobileCols: isChrome ? 180 : 260,
        fps: reducedMotion ? 30 : isChrome ? 36 : 60,
        upperDepthFactor: isChrome ? 0.16 : 0.2,
        lowerDepthFactor: isChrome ? 0.18 : 0.24,
        maxCell: isChrome ? 4 : 3,
    };
    const container = canvas.parentElement;
    const ditherColor = { r: 1, g: 1, b: 1 };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const hash = (x, y) => {
        const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
        return s - Math.floor(s);
    };

    const smoothstep = (edge0, edge1, x) => {
        const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
        return t * t * (3 - 2 * t);
    };

    const recomputeMaps = () => {
        grainMap = new Uint8Array(cols * rows);

        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < cols; x += 1) {
                const idx = y * cols + x;
                grainMap[idx] = Math.floor(hash(x * 0.6, y * 0.6) * 255);
            }
        }
    };

    const applySize = (nextWidth, nextHeight) => {
        width = nextWidth;
        height = nextHeight;
        lastValidWidth = width;
        lastValidHeight = height;

        const targetColumns = mobileMq ? quality.mobileCols : quality.desktopCols;
        cellSize = clamp(Math.round(width / targetColumns), 1, quality.maxCell);
        cols = Math.max(1, Math.ceil(width / cellSize));
        rows = Math.max(1, Math.ceil(height / cellSize));

        waveRows = new Int16Array(cols);
        recomputeMaps();

        canvas.width = width;
        canvas.height = height;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;

        gridCanvas.width = cols;
        gridCanvas.height = rows;
        imageData = gridCtx.createImageData(cols, rows);
        pixels = imageData.data;
    };

    const resize = () => {
        const bounds = container ? container.getBoundingClientRect() : canvas.getBoundingClientRect();

        const measuredWidth = Math.floor(bounds.width);
        const measuredHeight = Math.floor(bounds.height);

        const nextWidth = measuredWidth > 1 ? measuredWidth : lastValidWidth;
        const nextHeight = measuredHeight > 1 ? measuredHeight : lastValidHeight;

        if (nextWidth < 2 || nextHeight < 2) {
            return;
        }

        if (nextWidth === width && nextHeight === height) {
            return;
        }

        applySize(nextWidth, nextHeight);
    };

    const scheduleResize = () => {
        if (pendingResizeRaf !== 0) {
            return;
        }

        pendingResizeRaf = window.requestAnimationFrame(() => {
            pendingResizeRaf = 0;
            resize();
        });
    };

    const updateWaveRows = (t) => {
        const baseline = 0.5 + Math.sin(t * 0.08) * 0.012;
        const swell = Math.sin(t * 0.14) * 0.014;

        for (let x = 0; x < cols; x += 1) {
            const nx = x / Math.max(cols - 1, 1);
            const wave = isChrome
                ? baseline +
                    Math.sin(nx * 5.4 + t * 0.32 + swell * 18) * 0.09 +
                    Math.sin(nx * 12.8 - t * 0.54 + Math.sin(nx * 2.2 + t * 0.20) * 1.05) * 0.054
                : baseline +
                    Math.sin(nx * 5.4 + t * 0.32 + swell * 18) * 0.09 +
                    Math.sin(nx * 12.8 - t * 0.54 + Math.sin(nx * 2.2 + t * 0.20) * 1.05) * 0.054 +
                    Math.sin(nx * 26.5 + t * 0.80 + Math.sin(nx * 8.7 - t * 0.24) * 1.2) * 0.024;

            waveRows[x] = clamp(Math.floor(clamp(wave, 0.29, 0.74) * rows), 0, rows - 1);
        }
    };

    const writeCell = (x, y, r, g, b) => {
        const idx = (y * cols + x) * 4;
        pixels[idx] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
        pixels[idx + 3] = 255;
    };

    const renderGrid = (tSeconds) => {
        if (!pixels) {
            return;
        }

        updateWaveRows(tSeconds);
        
        pixels.fill(200);

        const upperDepthRows = Math.max(12, Math.round(rows * quality.upperDepthFactor));
        const lowerDepthRows = Math.max(14, Math.round(rows * quality.lowerDepthFactor));

        for (let x = 0; x < cols; x += 1) {
            const waveRow = waveRows[x];

            const ditherStart = Math.max(0, waveRow - upperDepthRows);
            const ditherEnd = Math.min(rows - 1, waveRow + lowerDepthRows);

            for (let y = ditherStart; y <= ditherEnd; y += 1) {
                const rowOffset = y * cols;
                const distance = y - waveRow;
                const absDistance = Math.abs(distance);
                const isAbove = distance < 0;
                const localDepth = isAbove ? upperDepthRows : lowerDepthRows;

                if (absDistance > localDepth) {
                    continue;
                }

                const edgeFade = 1 - smoothstep(0.0, 1.0, absDistance / Math.max(localDepth, 1));
                const grain = (grainMap[rowOffset + x] / 255) * 0.24;

                const sideBias = isAbove ? 0.9 : 1.02;
                const tone = clamp(0.1 + edgeFade * 1.02 * sideBias + grain, 0, 1);
                const matrixIndex = (y % 8) * 8 + (x % 8);
                const thresholdJitter = ((grain / 0.24) - 0.5) * 0.08;
                const threshold = clamp(bayer8[matrixIndex] / 63 + thresholdJitter, 0, 1);

                if (tone <= threshold) {
                    continue;
                }

                const jitter = ((x + y) % 2) * 0.08;
                const alpha = clamp(0.28 + edgeFade * 0.7 - jitter, 0, 0.95);
                const r = Math.round(255 + (ditherColor.r - 255) * alpha);
                const g = Math.round(255 + (ditherColor.g - 255) * alpha);
                const b = Math.round(255 + (ditherColor.b - 255) * alpha);
                writeCell(x, y, r, g, b);
            }

            // Keep a crisp animated wave edge.
            writeCell(x, waveRow, ditherColor.r, ditherColor.g, ditherColor.b);
            if (waveRow > 0 && x % 3 !== 0) {
                writeCell(x, waveRow - 1, ditherColor.r, ditherColor.g, ditherColor.b);
            }
        }

        gridCtx.putImageData(imageData, 0, 0);
    };

    const render = (timeMs) => {
        const fps = quality.fps;
        const frameInterval = 1000 / fps;

        if (timeMs - lastFrame < frameInterval) {
            animationId = window.requestAnimationFrame(render);
            return;
        }

        lastFrame = timeMs;

        if (!isVisible) {
            animationId = window.requestAnimationFrame(render);
            return;
        }

        const tSeconds = timeMs * 0.001;
        renderGrid(tSeconds);

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(gridCanvas, 0, 0, cols, rows, 0, 0, width, height);

        animationId = window.requestAnimationFrame(render);
    };

    resize();
    animationId = window.requestAnimationFrame(render);

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries.length > 0) {
                isVisible = entries[0].isIntersecting;
            }
        },
        { threshold: 0.05 }
    );

    observer.observe(canvas);

    window.addEventListener("resize", scheduleResize);
    mobileMq.addEventListener("change", scheduleResize);

    if (window.ResizeObserver && container) {
        const resizeObserver = new ResizeObserver(() => {
            scheduleResize();
        });
        resizeObserver.observe(container);

        window.addEventListener("beforeunload", () => {
            resizeObserver.disconnect();
        });
    }

    window.addEventListener("beforeunload", () => {
        window.cancelAnimationFrame(animationId);
        observer.disconnect();
        if (pendingResizeRaf !== 0) {
            window.cancelAnimationFrame(pendingResizeRaf);
        }
    });
})();
