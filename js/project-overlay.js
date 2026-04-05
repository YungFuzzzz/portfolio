(() => {
    const hasGsap = typeof window.gsap !== "undefined";

    const overlay = document.createElement("aside");
    overlay.className = "project-overlay";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
        <div class="project-overlay-backdrop" data-overlay-close="true"></div>
        <div class="project-overlay-panel" role="dialog" aria-modal="true" aria-label="Project details">
            <div class="project-overlay-stage">
                <button class="btn btn--alt project-overlay-back" type="button" aria-label="Go back">Back</button>
                <section class="project-overlay-hero">
                    <img class="project-overlay-hero-image" alt="">
                    <div class="project-overlay-hero-copy">
                        <h2 class="project-overlay-title"></h2>
                        <p class="project-overlay-tagline"></p>
                    </div>
                    <div class="project-overlay-hero-actions">
                        <button class="btn btn--alt project-overlay-scroll-btn" type="button">Scroll to view</button>
                        <button class="btn btn--accent project-overlay-read-btn" type="button">Click to read</button>
                    </div>
                </section>
                <section class="project-overlay-gallery"></section>
            </div>
        </div>

        <aside class="project-overlay-read-panel" aria-hidden="true">
            <button class="btn btn--alt project-overlay-read-close" type="button" aria-label="Close project details">Close</button>
            <div class="project-overlay-read-content">
                <p class="project-overlay-kicker">Project overview</p>
                <h3 class="project-overlay-read-title"></h3>
                <p class="project-overlay-read-description"></p>
                <div class="project-overlay-meta">
                    <div class="project-overlay-meta-row">
                        <span class="project-overlay-meta-label">Role</span>
                        <span class="project-overlay-meta-value" data-meta="role"></span>
                    </div>
                    <div class="project-overlay-meta-row">
                        <span class="project-overlay-meta-label">Technology</span>
                        <span class="project-overlay-meta-value" data-meta="technology"></span>
                    </div>
                    <div class="project-overlay-meta-row">
                        <span class="project-overlay-meta-label">Year</span>
                        <span class="project-overlay-meta-value" data-meta="year"></span>
                    </div>
                </div>
                <a class="btn btn--accent project-overlay-live" target="_blank" rel="noopener noreferrer">View live</a>

                <section class="project-overlay-process" aria-label="Project process">
                    <p class="project-overlay-kicker">Process</p>
                    <div class="project-overlay-process-body"></div>
                </section>

                <section class="project-overlay-contributors" aria-label="Project contributors">
                    <p class="project-overlay-kicker">Contributors</p>
                    <div class="project-overlay-contributors-list"></div>
                </section>
            </div>
        </aside>
    `;

    document.body.appendChild(overlay);

    const backdropEl = overlay.querySelector(".project-overlay-backdrop");
    const panelEl = overlay.querySelector(".project-overlay-panel");
    const backBtn = overlay.querySelector(".project-overlay-back");
    const heroImageEl = overlay.querySelector(".project-overlay-hero-image");
    const titleEl = overlay.querySelector(".project-overlay-title");
    const taglineEl = overlay.querySelector(".project-overlay-tagline");
    const scrollBtn = overlay.querySelector(".project-overlay-scroll-btn");
    const readBtn = overlay.querySelector(".project-overlay-read-btn");
    const heroActionsEl = overlay.querySelector(".project-overlay-hero-actions");
    const galleryEl = overlay.querySelector(".project-overlay-gallery");
    const readPanelEl = overlay.querySelector(".project-overlay-read-panel");
    const readCloseBtn = overlay.querySelector(".project-overlay-read-close");
    const readTitleEl = overlay.querySelector(".project-overlay-read-title");
    const readDescriptionEl = overlay.querySelector(".project-overlay-read-description");
    const roleEl = overlay.querySelector('[data-meta="role"]');
    const yearEl = overlay.querySelector('[data-meta="year"]');
    const techEl = overlay.querySelector('[data-meta="technology"]');
    const liveEl = overlay.querySelector(".project-overlay-live");
    const processBodyEl = overlay.querySelector(".project-overlay-process-body");
    const processSectionEl = overlay.querySelector(".project-overlay-process");
    const contributorsSectionEl = overlay.querySelector(".project-overlay-contributors");
    const contributorsListEl = overlay.querySelector(".project-overlay-contributors-list");

    let isOpen = false;
    let isAnimating = false;
    let ignoreNextPopstate = false;
    let currentOpenSource = "carousel";

    const updateHeroActionsOffset = () => {
        if (!(heroActionsEl instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            return;
        }

        const y = Math.max(0, panelEl.scrollTop);
        heroActionsEl.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const getTagline = (projectData) => {
        // Prioritize slogan field if it exists
        if (projectData?.slogan) {
            return String(projectData.slogan).trim();
        }

        const description = String(projectData?.description || "").trim();
        if (!description) {
            return "Selected project case";
        }

        const sentence = description.split(".")[0].trim();
        if (!sentence) {
            return description;
        }

        return sentence.endsWith(".") ? sentence : `${sentence}.`;
    };

    const setReadPanelState = (isPanelOpen, instant = false) => {
        if (!(readPanelEl instanceof HTMLElement)) {
            return;
        }

        overlay.classList.toggle("read-open", isPanelOpen);
        readPanelEl.classList.toggle("is-open", isPanelOpen);
        readPanelEl.setAttribute("aria-hidden", String(!isPanelOpen));

        if (isPanelOpen) {
            readPanelEl.scrollTop = 0;
        }

        if (hasGsap && instant) {
            gsap.killTweensOf(readPanelEl);
            gsap.set(readPanelEl, { clearProps: "transform" });
        }
    };

    const updateScrollHint = () => {
        if (!(scrollBtn instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            return;
        }

        scrollBtn.classList.toggle("is-hidden", panelEl.scrollTop > 24);
    };

    const hideOverlayImmediately = () => {
        overlay.classList.remove("is-open");
        overlay.classList.remove("read-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("project-overlay-open");

        if (backdropEl instanceof HTMLElement) {
            backdropEl.style.opacity = "0";
        }

        if (panelEl instanceof HTMLElement) {
            panelEl.style.opacity = "0";
            panelEl.style.transform = "none";
            panelEl.scrollTop = 0;
        }

        if (heroActionsEl instanceof HTMLElement) {
            heroActionsEl.style.transform = "translate3d(0, 0, 0)";
        }

        setReadPanelState(false, true);
        updateScrollHint();
    };

    const animateOpen = () => {
        if (!hasGsap || !(backdropEl instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            if (backdropEl instanceof HTMLElement) {
                backdropEl.style.opacity = "1";
            }
            if (panelEl instanceof HTMLElement) {
                panelEl.style.opacity = "1";
                panelEl.style.transform = "translateY(0px)";
            }
            return;
        }

        gsap.killTweensOf([backdropEl, panelEl]);
        gsap.to(backdropEl, { opacity: 1, duration: 0.24, ease: "power2.out", overwrite: true });
        gsap.fromTo(
            panelEl,
            { opacity: 1, yPercent: -100, clearProps: "transform" },
            { opacity: 1, yPercent: 0, duration: 0.42, ease: "power3.out", overwrite: true }
        );
    };

    const animateClose = (onComplete) => {
        if (!hasGsap || !(backdropEl instanceof HTMLElement) || !(panelEl instanceof HTMLElement)) {
            onComplete();
            return;
        }

        gsap.killTweensOf([backdropEl, panelEl]);
        gsap.to(panelEl, {
            opacity: 1,
            yPercent: -100,
            duration: 0.34,
            ease: "power3.in",
            overwrite: true,
            onComplete: () => {
                gsap.set(panelEl, { clearProps: "transform" });
            },
        });
        gsap.to(backdropEl, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.in",
            overwrite: true,
            onComplete,
        });
    };

    const closeOverlay = ({ fromPopstate = false } = {}) => {
        if (!isOpen || isAnimating) {
            return;
        }

        isAnimating = true;
        setReadPanelState(false, true);
        animateClose(() => {
            isOpen = false;
            isAnimating = false;
            hideOverlayImmediately();
        });

        if (!fromPopstate) {
            ignoreNextPopstate = true;
            window.history.back();
        }
    };

    const openOverlay = (projectData) => {
        if (!projectData || isAnimating) {
            return;
        }

        if (isOpen) {
            closeOverlay({ fromPopstate: true });
        }

        const title = projectData.title || "Project";
        const leadImage = projectData.fullImage || projectData.image || "";
        const tagline = getTagline(projectData);
        currentOpenSource = projectData?.source === "work-list" ? "work-list" : "carousel";

        titleEl.textContent = title;
        taglineEl.textContent = tagline;
        readTitleEl.textContent = title;

        if (heroImageEl instanceof HTMLImageElement) {
            heroImageEl.src = leadImage;
            heroImageEl.alt = title;
        }

        readDescriptionEl.textContent = projectData.description || "";
        roleEl.textContent = projectData.role || "-";
        yearEl.textContent = projectData.year || "-";
        techEl.textContent = projectData.technology || "-";

        const liveUrl = projectData.liveUrl || "";
        if (liveUrl) {
            liveEl.href = liveUrl;
            liveEl.style.display = "inline-flex";
        } else {
            liveEl.removeAttribute("href");
            liveEl.style.display = "none";
        }

        const processItems = Array.isArray(projectData.process)
            ? projectData.process.map((item) => String(item || "").trim()).filter(Boolean)
            : [String(projectData.process || "").trim()].filter(Boolean);

        if (processBodyEl) {
            processBodyEl.innerHTML = "";

            if (processItems.length === 0) {
                const fallback = document.createElement("p");
                fallback.className = "project-overlay-process-text";
                fallback.textContent =
                    "This project was developed through iterative concepting, visual exploration, and implementation sprints.";
                processBodyEl.appendChild(fallback);
            } else {
                processItems.forEach((paragraph) => {
                    const paragraphEl = document.createElement("p");
                    paragraphEl.className = "project-overlay-process-text";
                    paragraphEl.textContent = paragraph;
                    processBodyEl.appendChild(paragraphEl);
                });
            }
        }
        if (processSectionEl) {
            processSectionEl.style.display = "block";
        }

        const contributors = Array.isArray(projectData.contributors) ? projectData.contributors : [];
        if (contributorsListEl) {
            contributorsListEl.innerHTML = "";

            if (contributors.length === 0) {
                const emptyState = document.createElement("p");
                emptyState.className = "project-overlay-contributor-empty";
                emptyState.textContent = "No external contributors for this project.";
                contributorsListEl.appendChild(emptyState);
            } else {
                contributors.forEach((person) => {
                    const item = document.createElement("article");
                    item.className = "project-overlay-contributor";

                    const nameEl = document.createElement("p");
                    nameEl.className = "project-overlay-contributor-name";
                    nameEl.textContent = person?.name ? String(person.name) : "Unknown";

                    const roleNode = document.createElement("p");
                    roleNode.className = "project-overlay-contributor-role";
                    roleNode.textContent = person?.role ? String(person.role) : "Contributor";

                    item.appendChild(nameEl);
                    item.appendChild(roleNode);

                    const portfolio = person?.portfolio ? String(person.portfolio) : "";
                    if (portfolio) {
                        const linkEl = document.createElement("a");
                        linkEl.className = "project-overlay-contributor-link";
                        linkEl.href = portfolio;
                        linkEl.target = "_blank";
                        linkEl.rel = "noopener noreferrer";
                        linkEl.textContent = "View portfolio";
                        item.appendChild(linkEl);
                    }

                    contributorsListEl.appendChild(item);
                });
            }
        }

        if (contributorsSectionEl) {
            contributorsSectionEl.style.display = "block";
        }

        galleryEl.innerHTML = "";
        const detailImages = Array.isArray(projectData.detailImages) && projectData.detailImages.length > 0
            ? projectData.detailImages
            : leadImage
                ? [leadImage]
                : [];

        detailImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${title} detail ${index + 1}`;
            galleryEl.appendChild(img);
        });

        if (panelEl instanceof HTMLElement) {
            panelEl.scrollTop = 0;
        }

        updateHeroActionsOffset();

        setReadPanelState(false, true);
        updateScrollHint();

        isOpen = true;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("project-overlay-open");

        window.history.pushState({ overlay: "project", source: currentOpenSource }, "", window.location.href);
        animateOpen();
    };

    hideOverlayImmediately();

    if (panelEl instanceof HTMLElement) {
        panelEl.addEventListener(
            "scroll",
            () => {
                updateScrollHint();
                updateHeroActionsOffset();
            },
            { passive: true }
        );
    }

    backBtn.addEventListener("click", () => closeOverlay());
    readBtn.addEventListener("click", () => setReadPanelState(true));
    readCloseBtn.addEventListener("click", () => setReadPanelState(false));

    scrollBtn.addEventListener("click", () => {
        galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    overlay.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const isReadOpen = readPanelEl.classList.contains("is-open");
        if (isReadOpen) {
            const clickedInsideReadPanel = Boolean(target.closest(".project-overlay-read-panel"));
            const clickedReadTrigger = Boolean(target.closest(".project-overlay-read-btn"));
            const clickedReadClose = Boolean(target.closest(".project-overlay-read-close"));

            if (!clickedInsideReadPanel && !clickedReadTrigger && !clickedReadClose) {
                setReadPanelState(false);

                // When read panel is open, a backdrop click should first close the panel.
                if (target.hasAttribute("data-overlay-close")) {
                    return;
                }
            }
        }

        if (target.hasAttribute("data-overlay-close")) {
            closeOverlay();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!isOpen) {
            return;
        }

        if (event.key === "Escape") {
            if (readPanelEl.classList.contains("is-open")) {
                setReadPanelState(false);
            } else {
                closeOverlay();
            }
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

            // Don't close overlay if hamburger menu toggle is clicked
            if (target.closest(".nav-toggle")) {
                return;
            }

            const navTarget = target.closest(".site-nav a, .site-nav button, .nav-menu-link, .nav-panel-cta, .nav-brand");
            if (!navTarget) {
                return;
            }

            closeOverlay({ fromPopstate: true });
        },
        true
    );

    window.addEventListener("popstate", () => {
        if (ignoreNextPopstate) {
            ignoreNextPopstate = false;
            return;
        }

        if (isOpen) {
            closeOverlay({ fromPopstate: true });
        }
    });

    window.addEventListener("project:open", (event) => {
        const customEvent = event;
        openOverlay(customEvent.detail);
    });
})();
