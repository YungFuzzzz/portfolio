(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initBlobField = (sectionSelector, fieldSelector, blobSpecs) => {
        const section = document.querySelector(sectionSelector);
        const field = section?.querySelector(fieldSelector);

        if (!section || !field) {
            return;
        }

        const blobs = blobSpecs.map((spec) => {
            const blob = document.createElement("span");
            blob.className = spec.className;
            blob.style.width = `${spec.size}px`;
            blob.style.height = `${spec.size}px`;
            field.appendChild(blob);

            return {
                element: blob,
                ...spec
            };
        });

        const getBounds = () => {
            const width = field.clientWidth;
            const height = field.clientHeight;
            const inset = Math.max(56, Math.min(width, height) * 0.12);

            return { width, height, inset };
        };

        const positionBlob = (blob, elapsed) => {
            const { width, height, inset } = getBounds();
            const maxX = Math.max(inset, width - blob.size - inset);
            const maxY = Math.max(inset, height - blob.size - inset);
            const availableX = Math.max(0, maxX - inset);
            const availableY = Math.max(0, maxY - inset);
            const centerX = inset + availableX * blob.baseX;
            const centerY = inset + availableY * blob.baseY;
            const phaseTime = elapsed * blob.speed;
            const wobbleX = Math.sin(phaseTime + blob.phase) * availableX * blob.travelX;
            const driftX = Math.sin(phaseTime * 2.35 + blob.phase * 0.73) * availableX * blob.travelX * 0.48;
            const wobbleY = Math.cos(phaseTime * 0.92 + blob.phase * 1.18) * availableY * blob.travelY;
            const driftY = Math.sin(phaseTime * 1.4 + blob.phase * 0.41) * availableY * blob.travelY * 0.22;
            const x = Math.min(maxX, Math.max(inset, centerX + wobbleX + driftX));
            const y = Math.min(maxY, Math.max(inset, centerY + wobbleY + driftY));
            const scale = blob.scale + Math.sin(phaseTime * 0.65 + blob.phase) * 0.06;

            blob.element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        };

        const paintStatic = () => {
            const elapsed = 0;

            blobs.forEach((blob) => positionBlob(blob, elapsed));
        };

        const animate = () => {
            if (reduceMotion) {
                paintStatic();
                return;
            }

            const tick = (time) => {
                blobs.forEach((blob) => positionBlob(blob, time));
                window.requestAnimationFrame(tick);
            };

            window.requestAnimationFrame(tick);
        };

        const onResize = () => {
            paintStatic();
        };

        paintStatic();
        animate();
        window.addEventListener("resize", onResize, { passive: true });
    };

    initBlobField("#lab", ".lab-blob-field", [
        {
            className: "lab-blob lab-blob--one",
            size: 280,
            baseX: 0.18,
            baseY: 0.24,
            travelX: 0.3,
            travelY: 0.12,
            speed: 0.00014,
            phase: 0.2,
            scale: 1.05
        },
        {
            className: "lab-blob lab-blob--two",
            size: 360,
            baseX: 0.72,
            baseY: 0.3,
            travelX: 0.26,
            travelY: 0.14,
            speed: 0.00011,
            phase: 1.6,
            scale: 1
        },
        {
            className: "lab-blob lab-blob--three",
            size: 240,
            baseX: 0.56,
            baseY: 0.74,
            travelX: 0.34,
            travelY: 0.11,
            speed: 0.00016,
            phase: 2.7,
            scale: 0.95
        }
    ]);

    initBlobField("#contact", ".contact-blob-field", [
        {
            className: "lab-blob lab-blob--one",
            size: 300,
            baseX: 0.24,
            baseY: 0.2,
            travelX: 0.27,
            travelY: 0.12,
            speed: 0.00012,
            phase: 0.5,
            scale: 1
        },
        {
            className: "lab-blob lab-blob--two",
            size: 340,
            baseX: 0.76,
            baseY: 0.38,
            travelX: 0.23,
            travelY: 0.14,
            speed: 0.0001,
            phase: 1.8,
            scale: 1.03
        },
        {
            className: "lab-blob lab-blob--three",
            size: 260,
            baseX: 0.58,
            baseY: 0.76,
            travelX: 0.31,
            travelY: 0.1,
            speed: 0.00015,
            phase: 2.4,
            scale: 0.94
        }
    ]);
})();