(() => {
    const hasGsap = typeof window.gsap !== "undefined";
    const triggerBtn = document.getElementById("seeAllWorkBtn");
    if (!(triggerBtn instanceof HTMLButtonElement)) {
        return;
    }

    const overlay = document.createElement("aside");
    overlay.className = "work-list-overlay";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
        <div class="work-list-overlay-backdrop" data-work-list-close="true"></div>
        <section class="work-list-overlay-panel" role="dialog" aria-modal="true" aria-label="All work">
            <button class="btn btn--alt work-list-overlay-back" type="button" aria-label="Go back">Back</button>
            <div class="work-list-overlay-content">
                <h2 class="work-list-overlay-title">All work</h2>
                <div class="work-list-overlay-grid" role="list"></div>
            </div>
        </section>
        <figure class="work-list-hover-preview" aria-hidden="true">
            <img alt="">
        </figure>
    `;

    document.body.appendChild(overlay);

    const backdropEl = overlay.querySelector(".work-list-overlay-backdrop");
    const panelEl = overlay.querySelector(".work-list-overlay-panel");
    const backBtn = overlay.querySelector(".work-list-overlay-back");
    const listEl = overlay.querySelector(".work-list-overlay-grid");
    const previewEl = overlay.querySelector(".work-list-hover-preview");
    const previewImageEl = overlay.querySelector(".work-list-hover-preview img");

    let projects = [];
    let isOpen = false;
    let isAnimating = false;
    let activeHoverItem = null;

    const getTagline = (projectData) => {
        const slogan = String(projectData?.slogan || "").trim();
        if (slogan) {
            return slogan;
        }

        const description = Array.isArray(projectData?.description)
            ? projectData.description.map((item) => String(item || "").trim()).filter(Boolean).join(" ")
            : String(projectData?.description || "").trim();
        if (!description) {
            return "Selected project case";
        }

        const firstSentence = description.split(".")[0].trim();
        if (!firstSentence) {
            return description;
        }

        return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
    };

    const setPreviewImage = (projectData) => {
        if (!(previewImageEl instanceof HTMLImageElement)) {
            return;
        }

        const src = String(projectData?.image || projectData?.fullImage || "").trim();
        const alt = String(projectData?.title || "Project").trim();

        if (!src) {
            previewImageEl.removeAttribute("src");
            previewImageEl.alt = "";
            return;
        }

        previewImageEl.src = src;
        previewImageEl.alt = `${alt} preview`;
    };

    const movePreview = (clientX, clientY) => {
        if (!(previewEl instanceof HTMLElement)) {
            return;
        }

        const previewRect = previewEl.getBoundingClientRect();
        const width = Math.max(120, previewRect.width || 180);
        const height = Math.max(90, previewRect.height || 135);

        const margin = 14;
        const maxX = window.innerWidth - width - margin;
        const maxY = window.innerHeight - height - margin;

        const nextX = Math.min(Math.max(margin, clientX + 22), Math.max(margin, maxX));
        const nextY = Math.min(Math.max(margin, clientY - 16), Math.max(margin, maxY));

        if (hasGsap) {
            gsap.to(previewEl, {
                x: nextX,
                y: nextY,
                duration: 0.22,
                ease: "power2.out",
                overwrite: true,
            });
            return;
        }

        previewEl.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };

    const showPreview = (projectData, pointerEvent) => {
        if (!(previewEl instanceof HTMLElement)) {
            return;
        }

        setPreviewImage(projectData);

        if (!(previewImageEl instanceof HTMLImageElement) || !previewImageEl.src) {
            return;
        }

        previewEl.style.visibility = "visible";
        previewEl.style.opacity = "1";

        movePreview(pointerEvent.clientX, pointerEvent.clientY);

        if (hasGsap) {
            gsap.killTweensOf(previewEl);
            gsap.to(previewEl, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.18,
                ease: "power2.out",
                overwrite: true,
            });
        } else {
            previewEl.style.opacity = "1";
        }
    };

    const hidePreview = () => {
        if (!(previewEl instanceof HTMLElement)) {
            return;
        }

        activeHoverItem = null;

        if (hasGsap) {
            gsap.killTweensOf(previewEl);
            gsap.to(previewEl, {
                autoAlpha: 0,
                scale: 0.92,
                duration: 0.16,
                ease: "power2.out",
                overwrite: true,
            });
        } else {
            previewEl.style.opacity = "0";
            previewEl.style.visibility = "hidden";
        }
    };

    const bindItemHover = (item, projectData) => {
        if (!(item instanceof HTMLButtonElement)) {
            return;
        }

        item.addEventListener("pointerenter", (event) => {
            activeHoverItem = item;
            showPreview(projectData, event);
        });

        item.addEventListener("pointermove", (event) => {
            if (activeHoverItem !== item) {
                return;
            }

            movePreview(event.clientX, event.clientY);
        });

        item.addEventListener("pointerleave", () => {
            hidePreview();
        });

        item.addEventListener("mouseenter", (event) => {
            activeHoverItem = item;
            showPreview(projectData, event);
        });

        item.addEventListener("mousemove", (event) => {
            if (activeHoverItem !== item) {
                return;
            }

            movePreview(event.clientX, event.clientY);
        });

        item.addEventListener("mouseleave", () => {
            hidePreview();
        });

        item.addEventListener("blur", () => {
            hidePreview();
        });
    };

    const animateOpen = () => {
        if (!(backdropEl instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            return;
        }

        if (!hasGsap) {
            backdropEl.style.opacity = "1";
            panelEl.style.transform = "translateY(0%)";
            return;
        }

        const items = listEl instanceof HTMLElement ? listEl.querySelectorAll(".work-list-item") : [];
        gsap.killTweensOf([backdropEl, panelEl, items]);

        gsap.set(backdropEl, { opacity: 0 });
        gsap.set(panelEl, { yPercent: -100 });
        gsap.set(items, { y: 18, opacity: 0 });

        const tl = gsap.timeline({ defaults: { overwrite: true } });
        tl.to(backdropEl, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0)
            .to(panelEl, { yPercent: 0, duration: 0.38, ease: "power3.out" }, 0)
            .to(items, { y: 0, opacity: 1, stagger: 0.04, duration: 0.24, ease: "power2.out" }, 0.16);
    };

    const animateClose = (onComplete) => {
        if (!(backdropEl instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            onComplete();
            return;
        }

        if (!hasGsap) {
            onComplete();
            return;
        }

        gsap.killTweensOf([backdropEl, panelEl]);
        gsap.to(backdropEl, {
            opacity: 0,
            duration: 0.16,
            ease: "power1.out",
            overwrite: true,
        });
        gsap.to(panelEl, {
            yPercent: -100,
            duration: 0.26,
            ease: "power3.in",
            overwrite: true,
            onComplete,
        });
    };

    const renderProjects = () => {
        if (!(listEl instanceof HTMLElement)) {
            return;
        }

        listEl.innerHTML = "";

        projects.forEach((project) => {
            const item = document.createElement("button");
            item.className = "work-list-item";
            item.type = "button";

            const title = String(project?.title || "Project");
            const year = String(project?.year || "-");
            const tagline = getTagline(project);

            item.innerHTML = `
                <div class="work-list-item-head">
                    <p class="work-list-item-title">${title}</p>
                    <p class="work-list-item-year">${year}</p>
                </div>
                <p class="work-list-item-tagline">${tagline}</p>
            `;

            bindItemHover(item, project);

            item.addEventListener("click", () => {
                hideListOverlay();

                window.dispatchEvent(
                    new CustomEvent("project:open", {
                        detail: {
                            ...project,
                            source: "work-list",
                        },
                    })
                );
            });

            listEl.appendChild(item);
        });
    };

    const setProjects = (nextProjects) => {
        projects = Array.isArray(nextProjects) ? nextProjects : [];
        triggerBtn.disabled = projects.length === 0;
        triggerBtn.setAttribute("aria-disabled", String(projects.length === 0));
        renderProjects();
    };

    const showListOverlay = ({ pushHistory = true } = {}) => {
        if (isOpen || isAnimating) {
            return;
        }

        isAnimating = true;
        isOpen = true;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("work-list-overlay-open");
        animateOpen();

        window.setTimeout(() => {
            isAnimating = false;
        }, 420);

        if (pushHistory) {
            window.history.pushState({ overlay: "work-list" }, "", window.location.href);
        }
    };

    const hideListOverlay = () => {
        if (!isOpen || isAnimating) {
            return;
        }

        isAnimating = true;
        hidePreview();

        const completeClose = () => {
            isOpen = false;
            isAnimating = false;
            overlay.classList.remove("is-open");
            overlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("work-list-overlay-open");

            if (panelEl instanceof HTMLElement) {
                panelEl.scrollTop = 0;
                panelEl.style.transform = "";
            }
            if (backdropEl instanceof HTMLElement) {
                backdropEl.style.opacity = "";
            }
        };

        animateClose(completeClose);
    };

    const closeListOverlay = ({ fromPopstate = false } = {}) => {
        if (!isOpen) {
            return;
        }

        hideListOverlay();

        if (!fromPopstate) {
            window.history.back();
        }
    };

    triggerBtn.addEventListener("click", () => {
        showListOverlay();
    });

    if (backBtn instanceof HTMLButtonElement) {
        backBtn.addEventListener("click", () => closeListOverlay());
    }

    overlay.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target.hasAttribute("data-work-list-close")) {
            closeListOverlay();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!isOpen) {
            return;
        }

        if (event.key === "Escape") {
            closeListOverlay();
        }
    });

    document.addEventListener(
        "click",
        (event) => {
            if (!isOpen) {
                return;
            }

            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            if (target.closest(".nav-toggle")) {
                return;
            }

            const navTarget = target.closest(".site-nav a, .site-nav button, .nav-menu-link, .nav-panel-cta, .nav-brand");
            if (!navTarget) {
                return;
            }

            hideListOverlay();
        },
        true
    );

    window.addEventListener("popstate", (event) => {
        const stateOverlay = event.state?.overlay;

        if (stateOverlay === "work-list") {
            showListOverlay({ pushHistory: false });
            return;
        }

        if (isOpen) {
            closeListOverlay({ fromPopstate: true });
        }
    });

    window.addEventListener("projects:data-ready", (event) => {
        setProjects(event.detail);
    });

    if (hasGsap && previewEl instanceof HTMLElement) {
        gsap.set(previewEl, { autoAlpha: 0, scale: 0.92, x: 0, y: 0 });
    }

    if (Array.isArray(window.__VICES_PROJECTS__)) {
        setProjects(window.__VICES_PROJECTS__);
    }
})();
