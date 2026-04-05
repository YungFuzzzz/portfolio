(() => {
    const loader = document.getElementById("siteLoader");

    window.__siteLoaderDone = false;

    if (!loader) {
        window.__siteLoaderDone = true;
        window.dispatchEvent(new CustomEvent("site-loader:complete"));
        return;
    }

    const progressFill = loader.querySelector(".loader-progress-fill");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const MIN_DISPLAY_MS = prefersReducedMotion ? 520 : 2900;
    const INTRO_DURATION_MS = prefersReducedMotion ? 360 : 2600;
    const state = { value: 0 };
    const previousBodyOverflow = document.body.style.overflow;
    const startTime = performance.now();

    let introAnimation = null;
    let isFinishing = false;
    let isRemoved = false;
    let isPageLoaded = false;
    let finishDelayTimer = 0;
    let cleanupSafetyTimer = 0;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const setProgress = (nextValue) => {
        const value = clamp(nextValue, 0, 100);
        const pct = `${value}%`;

        loader.style.setProperty("--loader-progress-pct", pct);

        if (progressFill) {
            progressFill.style.transform = `scaleX(${value / 100})`;
        }
    };

    const clearFinishDelayTimer = () => {
        if (!finishDelayTimer) {
            return;
        }

        window.clearTimeout(finishDelayTimer);
        finishDelayTimer = 0;
    };

    const clearCleanupSafetyTimer = () => {
        if (!cleanupSafetyTimer) {
            return;
        }

        window.clearTimeout(cleanupSafetyTimer);
        cleanupSafetyTimer = 0;
    };

    const cleanup = () => {
        if (isRemoved) {
            return;
        }

        isRemoved = true;
        clearFinishDelayTimer();
        clearCleanupSafetyTimer();
        document.body.style.overflow = previousBodyOverflow;
        window.__siteLoaderDone = true;
        window.dispatchEvent(new CustomEvent("site-loader:complete"));
        loader.remove();
    };

    const slideOut = () => {
        const fallbackDuration = prefersReducedMotion ? 360 : 980;
        clearCleanupSafetyTimer();
        cleanupSafetyTimer = window.setTimeout(cleanup, fallbackDuration);

        if (typeof window.gsap !== "undefined") {
            gsap.to(loader, {
                yPercent: -100,
                duration: prefersReducedMotion ? 0.34 : 0.88,
                ease: "power3.inOut",
                onComplete: cleanup,
            });
            return;
        }

        loader.style.transition = "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)";
        loader.style.transform = "translateY(-100%)";
        cleanupSafetyTimer = window.setTimeout(cleanup, 760);
    };

    const finishLoader = () => {
        if (isFinishing || isRemoved) {
            return;
        }

        isFinishing = true;

        if (introAnimation && typeof introAnimation.kill === "function") {
            introAnimation.kill();
        }

        if (typeof window.gsap !== "undefined") {
            gsap.to(state, {
                value: 100,
                duration: prefersReducedMotion ? 0.12 : 0.18,
                ease: "none",
                onUpdate: () => {
                    setProgress(state.value);
                },
                onComplete: slideOut,
            });
            return;
        }

        setProgress(100);
        slideOut();
    };

    const scheduleFinishIfReady = () => {
        if (!isPageLoaded || isFinishing || isRemoved) {
            return;
        }

        clearFinishDelayTimer();

        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

        finishDelayTimer = window.setTimeout(() => {
            finishDelayTimer = 0;
            finishLoader();
        }, remaining);
    };

    document.body.style.overflow = "hidden";
    setProgress(0);

    if (typeof window.gsap !== "undefined") {
        introAnimation = gsap.to(state, {
            value: 94,
            duration: INTRO_DURATION_MS / 1000,
            ease: "power3.in",
            onUpdate: () => {
                setProgress(state.value);
            },
        });
    } else {
        const start = performance.now();
        const targetDuration = INTRO_DURATION_MS;

        const tick = (now) => {
            if (isFinishing) {
                return;
            }

            const elapsed = now - start;
            const t = clamp(elapsed / targetDuration, 0, 1);
            const eased = t * t * t;
            const progress = clamp(eased * 94, 0, 94);
            setProgress(progress);

            if (progress < 94) {
                window.requestAnimationFrame(tick);
            }
        };

        window.requestAnimationFrame(tick);
    }

    window.addEventListener(
        "load",
        () => {
            isPageLoaded = true;
            scheduleFinishIfReady();
        },
        { once: true }
    );

    if (document.readyState === "complete") {
        window.setTimeout(() => {
            isPageLoaded = true;
            scheduleFinishIfReady();
        }, 60);
    }
})();
