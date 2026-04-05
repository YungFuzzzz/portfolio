const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.getElementById("navPanel");
const navLines = document.querySelectorAll(".nav-toggle-line");
const closeNavTargets = document.querySelectorAll(".nav-menu-link, .nav-social-link, .nav-panel-cta");
const navMenuLinks = document.querySelectorAll(".nav-menu-link");
const navSocialLinks = document.querySelectorAll(".nav-social-link");
const navPanelImage = document.querySelector(".nav-panel-image");
const navPanelCta = document.querySelector(".nav-panel-cta");
const navBrand = document.querySelector(".nav-brand");
const heroAnchorLinks = document.querySelectorAll('.hero-cta[href^="#"]');
const navHasGsap = typeof window.gsap !== "undefined";

let scrollRaf = 0;

const isInternalHashLink = (href) => typeof href === "string" && href.startsWith("#") && href.length > 1;

const animateScrollTo = (targetY, durationMs = 520) => {
    if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
        scrollRaf = 0;
    }

    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) {
        return;
    }

    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
            scrollRaf = window.requestAnimationFrame(tick);
        } else {
            scrollRaf = 0;
        }
    };

    scrollRaf = window.requestAnimationFrame(tick);
};

const handleAnchorNavigation = (event, linkEl) => {
    const href = linkEl?.getAttribute("href") || "";
    if (!isInternalHashLink(href)) {
        return;
    }

    const target = document.querySelector(href);
    if (!target) {
        return;
    }

    event.preventDefault();
    const top = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
    animateScrollTo(top, 520);

    if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
    }
};

const bindHoverAndFocus = (element, onEnter, onLeave) => {
    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);
    element.addEventListener("focus", onEnter);
    element.addEventListener("blur", onLeave);
};

const WIDTH_STAGE_MS = 420;
const PANEL_STAGE_MS = 360;
let widthStageTimer = 0;
let collapseStageTimer = 0;
let panelAnimRaf = 0;

const getLineMetrics = () => {
    if (!navToggle || navLines.length < 2) {
        return { hoverSwapY: 7, openCrossY: 3.5 };
    }

    const lineStyles = window.getComputedStyle(navLines[0]);
    const toggleStyles = window.getComputedStyle(navToggle);
    const lineHeight = Number.parseFloat(lineStyles.height) || 2;
    const rowGap = Number.parseFloat(toggleStyles.rowGap || toggleStyles.gap) || 5;
    const centerDistance = lineHeight + rowGap;

    return {
        hoverSwapY: centerDistance,
        openCrossY: centerDistance / 2,
    };
};

const clearStageTimers = () => {
    if (widthStageTimer) {
        window.clearTimeout(widthStageTimer);
        widthStageTimer = 0;
    }

    if (collapseStageTimer) {
        window.clearTimeout(collapseStageTimer);
        collapseStageTimer = 0;
    }

    if (panelAnimRaf) {
        window.cancelAnimationFrame(panelAnimRaf);
        panelAnimRaf = 0;
    }
};

const animatePanelIn = () => {
    if (!navHasGsap || !siteNav?.classList.contains("is-panel-open")) {
        return;
    }

    gsap.killTweensOf([".nav-menu-link", ".nav-social-link", ".nav-panel-image", ".nav-panel-cta"]);

    gsap.fromTo(
        navMenuLinks,
        { autoAlpha: 0, x: -26 },
        {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.065,
            ease: "power2.out",
            delay: 0.12,
            overwrite: true,
        }
    );

    gsap.fromTo(
        navSocialLinks,
        { autoAlpha: 0, y: 10 },
        {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.055,
            ease: "power2.out",
            delay: 0.28,
            overwrite: true,
        }
    );

    if (navPanelImage) {
        gsap.fromTo(
            navPanelImage,
            { autoAlpha: 0, scale: 1.05 },
            {
                autoAlpha: 1,
                scale: 1,
                duration: 0.56,
                ease: "power2.out",
                delay: 0.14,
                overwrite: true,
            }
        );
    }

    if (navPanelCta) {
        gsap.fromTo(
            navPanelCta,
            { autoAlpha: 0, y: 14 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
                ease: "power2.out",
                delay: 0.34,
                overwrite: true,
            }
        );
    }
};

const animateLinesState = (state) => {
    if (navLines.length < 2) {
        return;
    }

    const [lineTop, lineBottom] = navLines;
    const { hoverSwapY, openCrossY } = getLineMetrics();

    const target =
        state === "open"
            ? { topY: openCrossY, topRotate: 45, bottomY: -openCrossY, bottomRotate: -45 }
            : state === "hover"
                ? { topY: hoverSwapY, topRotate: 0, bottomY: -hoverSwapY, bottomRotate: 0 }
                : { topY: 0, topRotate: 0, bottomY: 0, bottomRotate: 0 };

    if (navHasGsap) {
        gsap.to(lineTop, {
            y: target.topY,
            rotate: target.topRotate,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: true,
        });

        gsap.to(lineBottom, {
            y: target.bottomY,
            rotate: target.bottomRotate,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: true,
        });
        return;
    }
};

const setMenuState = (isOpen) => {
    if (!siteNav || !navToggle || !navPanel) {
        return;
    }

    clearStageTimers();

    const hoverActive = navToggle.matches(":hover");

    if (isOpen) {
        siteNav.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        animateLinesState("open");

        widthStageTimer = window.setTimeout(() => {
            const stillOpen = navToggle.getAttribute("aria-expanded") === "true";
            if (!stillOpen) {
                return;
            }

            siteNav.classList.add("is-panel-open");
            navPanel.setAttribute("aria-hidden", "false");

            panelAnimRaf = window.requestAnimationFrame(() => {
                panelAnimRaf = 0;
                animatePanelIn();
            });
        }, WIDTH_STAGE_MS + 40);

        return;
    }

    siteNav.classList.remove("is-panel-open");
    navPanel.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    animateLinesState(hoverActive ? "hover" : "closed");

    collapseStageTimer = window.setTimeout(() => {
        const stillClosed = navToggle.getAttribute("aria-expanded") === "false";
        if (!stillClosed) {
            return;
        }

        siteNav.classList.remove("is-open");
        animateLinesState(navToggle.matches(":hover") ? "hover" : "closed");
    }, PANEL_STAGE_MS + 30);
};

const setupMenuRollEffects = () => {
    navMenuLinks.forEach((link) => {
        const roll = link.querySelector(".nav-menu-roll");
        if (!roll) {
            return;
        }

        const animateIn = () => {
            if (!navHasGsap) {
                roll.style.transform = "translateY(-50%)";
                return;
            }

            gsap.to(roll, {
                yPercent: -50,
                duration: 0.38,
                ease: "power2.out",
                overwrite: true,
            });
        };

        const animateOut = () => {
            if (!navHasGsap) {
                roll.style.transform = "translateY(0%)";
                return;
            }

            gsap.to(roll, {
                yPercent: 0,
                duration: 0.34,
                ease: "power2.out",
                overwrite: true,
            });
        };

        bindHoverAndFocus(link, animateIn, animateOut);
    });
};

const setupSocialHoverEffects = () => {
    if (!navHasGsap) {
        return;
    }

    navSocialLinks.forEach((social) => {
        const hoverIn = () => {
            gsap.to(social, {
                color: "#e0acd5",
                duration: 0.1,
                ease: "power2.out",
                overwrite: true,
            });
        };

        const hoverOut = () => {
            gsap.to(social, {
                color: "rgba(20,20,20,0.86)",
                duration: 0.12,
                ease: "power2.out",
                overwrite: true,
            });
        };

        bindHoverAndFocus(social, hoverIn, hoverOut);
    });
};

const setupNavCtaHoverEffects = () => {
    if (!navPanelCta || !navHasGsap) {
        return;
    }

    const hoverIn = () => {
        gsap.to(navPanelCta, {
            backgroundColor: "#000000",
            color: "#e0acd5",
            duration: 0.1,
            ease: "power2.out",
            overwrite: true,
        });
    };

    const hoverOut = () => {
        gsap.to(navPanelCta, {
            backgroundColor: "#e0acd5",
            color: "#000000",
            duration: 0.12,
            ease: "power2.out",
            overwrite: true,
        });
    };

    bindHoverAndFocus(navPanelCta, hoverIn, hoverOut);
};

if (siteNav && navToggle && navPanel) {
    setupMenuRollEffects();
    setupSocialHoverEffects();
    setupNavCtaHoverEffects();

    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });

    closeNavTargets.forEach((target) => {
        target.addEventListener("click", (event) => {
            handleAnchorNavigation(event, target);
            setMenuState(false);
        });
    });

    if (navBrand) {
        navBrand.addEventListener("click", (event) => {
            handleAnchorNavigation(event, navBrand);
            setMenuState(false);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            setMenuState(false);
        }
    });

    navToggle.addEventListener("mouseenter", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            return;
        }

        animateLinesState("hover");
    });

    navToggle.addEventListener("mouseleave", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        animateLinesState(isOpen ? "open" : "closed");
    });

    window.addEventListener("resize", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            animateLinesState("open");
            return;
        }

        animateLinesState(navToggle.matches(":hover") ? "hover" : "closed");
    });
}

heroAnchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        handleAnchorNavigation(event, link);
    });
});
