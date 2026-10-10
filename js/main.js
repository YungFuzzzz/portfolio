        const galleryItems = [...document.querySelectorAll(".work figure")];
        const lightbox = document.querySelector(".lightbox");
        const lightboxStage = document.querySelector(".lightbox-stage");
        const lightboxImage = document.querySelector(".lightbox-image");
        const lightboxVideo = document.querySelector(".lightbox-video");
        const lightboxModel = document.querySelector(".lightbox-model");
        const closeButton = document.querySelector(".lightbox-close");
        const previousButton = document.querySelector(".lightbox-prev");
        const nextButton = document.querySelector(".lightbox-next");
        const pageLinks = [...document.querySelectorAll("[data-page]")];
        const pageOverlay = document.querySelector(".page-overlay");
        const work = document.querySelector(".work");
        const pageContents = [...document.querySelectorAll("[data-page-content]")];
        const pageCloseButton = document.querySelector(".page-overlay__close");
        const mobileMenuButton = document.querySelector(".mobile-menu-button");
        const mobileMenuHome = document.querySelector(".page-overlay__home");
        const mobileViewport = window.matchMedia("(max-width: 699px)");
        mobileMenuButton.disabled = !mobileViewport.matches;
        let activeImage = 0;
        let pointerStartX = 0;
        let pointerStartY = 0;
        let pointerDragging = false;
        let pointerAxisLocked = false;
        let openingImage = null;
        let imageAnimation = null;
        let swipeAnimationTimeout = null;
        let activeMediaType = "image";
        let overlayAnimation = null;

        function animateOverlayIn(content) {
            if (!window.gsap) {
                return;
            }

            if (overlayAnimation) {
                overlayAnimation.kill();
            }

            window.gsap.set(pageOverlay, { opacity: 0 });
            window.gsap.set(content, { opacity: 0, y: 24 });
            overlayAnimation = window.gsap.timeline()
                .to(pageOverlay, { opacity: 1, duration: 0.45, ease: "power2.out" })
                .to(content, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.2");
        }

        function openPage(pageName) {
            mobileMenuHome.style.display = "none";
            pageContents.forEach((content) => {
                content.classList.toggle("is-active", content.dataset.pageContent === pageName);
            });
            pageOverlay.classList.add("is-open");
            work.classList.add("page-open");
            pageOverlay.setAttribute("aria-hidden", "false");
            pageOverlay.scrollTop = 0;
            document.body.style.overflow = "hidden";
            animateOverlayIn(pageContents.find((content) => content.dataset.pageContent === pageName));
        }

        function openMobileMenu() {
            mobileMenuHome.style.display = "block";
            pageContents.forEach((content) => content.classList.remove("is-active"));
            pageOverlay.classList.add("is-open");
            work.classList.add("page-open");
            pageOverlay.setAttribute("aria-hidden", "false");
            mobileMenuButton.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
            animateOverlayIn(mobileMenuHome);
            pageCloseButton.focus();
        }

        function closePage() {
            if (!pageOverlay.classList.contains("is-open")) {
                return;
            }

            if (overlayAnimation) {
                overlayAnimation.kill();
            }

            if (!window.gsap) {
                finishClosePage();
                return;
            }

            overlayAnimation = window.gsap.timeline({
                onComplete: finishClosePage
            }).to(pageOverlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
        }

        function finishClosePage() {
            mobileMenuHome.style.display = "none";
            pageContents.forEach((content) => content.classList.remove("is-active"));
            pageOverlay.classList.remove("is-open");
            work.classList.remove("page-open");
            pageOverlay.setAttribute("aria-hidden", "true");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
            pageOverlay.style.opacity = "";
        }

        pageLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                if (link.dataset.page === "projects") {
                    closePage();
                    return;
                }

                openPage(link.dataset.page);
            });
        });

        pageCloseButton.addEventListener("click", closePage);
        pageOverlay.addEventListener("click", (event) => {
            event.stopPropagation();

            if (event.target === pageOverlay) {
                closePage();
            }
        });
        mobileMenuButton.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        document.addEventListener("click", (event) => {
            const target = event.target instanceof Element ? event.target : null;

            if (
                pageOverlay.classList.contains("is-open") &&
                target &&
                !pageOverlay.contains(target) &&
                !mobileMenuButton.contains(target) &&
                !target.closest("[data-page]")
            ) {
                closePage();
            }
        });
        if (mobileViewport.matches) {
            mobileMenuButton.addEventListener("click", openMobileMenu);
        }

        function getLightboxImageRect() {
            const width = lightboxImage.getBoundingClientRect().width;
            const height = lightboxImage.getBoundingClientRect().height;

            return {
                left: (window.innerWidth - width) / 2,
                top: (window.innerHeight - height) / 2,
                width,
                height
            };
        }

        function getMediaType(item) {
            return item.dataset.mediaType || "image";
        }

        function stopVideo() {
            lightboxVideo.pause();
            lightboxVideo.removeAttribute("src");
            lightboxVideo.load();
        }

        function hideLightboxMedia() {
            lightboxImage.hidden = true;
            lightboxVideo.hidden = true;
            lightboxModel.hidden = true;
            stopVideo();
        }

        hideLightboxMedia();

        function showMedia(index) {
            if (swipeAnimationTimeout) {
                window.clearTimeout(swipeAnimationTimeout);
                swipeAnimationTimeout = null;
            }

            lightboxStage.style.transition = "";
            lightboxStage.style.transform = "";
            lightboxStage.classList.remove("is-dragging");
            activeImage = (index + galleryItems.length) % galleryItems.length;
            const item = galleryItems[activeImage];
            const type = getMediaType(item);

            activeMediaType = type;
            hideLightboxMedia();

            if (type === "video") {
                const video = item.querySelector("video");
                if (!video) {
                    throw new Error("A video media item must contain a video element.");
                }

                lightboxVideo.src = video.currentSrc || video.src || video.querySelector("source")?.src;
                lightboxVideo.poster = video.poster;
                lightboxVideo.hidden = false;
                lightboxVideo.play().catch(() => {});
                return;
            }

            if (type === "model") {
                const model = item.querySelector("model-viewer");
                if (!model || !model.src) {
                    throw new Error("A model media item must contain a model-viewer with a src.");
                }

                lightboxModel.src = model.src;
                lightboxModel.poster = model.poster;
                lightboxModel.alt = model.alt || "";
                lightboxModel.hidden = false;
                return;
            }

            const image = item.querySelector("img");
            if (!image) {
                throw new Error("An image media item must contain an image element.");
            }

            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            lightboxImage.hidden = false;
        }

        function openLightbox(index) {
            openingImage = galleryItems[index];
            showMedia(index);
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeButton.focus();

            requestAnimationFrame(() => {
                const sourceRect = openingImage.getBoundingClientRect();
                const targetRect = lightboxStage.getBoundingClientRect();
                const sourceCenterX = sourceRect.left + sourceRect.width / 2;
                const sourceCenterY = sourceRect.top + sourceRect.height / 2;
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const scale = sourceRect.width / targetRect.width;
                const translateX = sourceCenterX - targetCenterX;
                const translateY = sourceCenterY - targetCenterY;

                imageAnimation = activeMediaType === "image" ? lightboxImage.animate([
                    {
                        opacity: 0,
                        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
                    },
                    {
                        opacity: 1,
                        transform: "translate(0, 0) scale(1)"
                    }
                ], {
                    duration: 500,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "forwards"
                }) : null;
            });
        }

        function closeLightbox() {
            if (openingImage && activeMediaType === "image") {
                const sourceRect = openingImage.getBoundingClientRect();
                const targetRect = lightboxStage.getBoundingClientRect();
                const sourceCenterX = sourceRect.left + sourceRect.width / 2;
                const sourceCenterY = sourceRect.top + sourceRect.height / 2;
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const scale = sourceRect.width / targetRect.width;
                const translateX = sourceCenterX - targetCenterX;
                const translateY = sourceCenterY - targetCenterY;

                if (imageAnimation) {
                    imageAnimation.cancel();
                }

                imageAnimation = lightboxImage.animate([
                    {
                        opacity: 1,
                        transform: "translate(0, 0) scale(1)"
                    },
                    {
                        opacity: 0,
                        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
                    }
                ], {
                    duration: 400,
                    easing: "cubic-bezier(0.64, 0, 0.78, 0)",
                    fill: "forwards"
                });

                imageAnimation.finished.then(() => {
                    lightbox.classList.remove("is-open");
                    lightboxImage.style.transform = "";
                    lightboxImage.style.opacity = "";
                }).catch(() => {});
            } else {
                lightbox.classList.remove("is-open");
            }

            stopVideo();
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }

        galleryItems.forEach((item, index) => {
            item.querySelector("button").addEventListener("click", () => openLightbox(index));
        });

        closeButton.addEventListener("click", closeLightbox);
        previousButton.addEventListener("click", () => showMedia(activeImage - 1));
        nextButton.addEventListener("click", () => showMedia(activeImage + 1));

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        lightboxImage.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });

        lightboxStage.addEventListener("pointerdown", (event) => {
            if (!event.isPrimary || event.button !== 0 || activeMediaType === "model") {
                return;
            }

            if (imageAnimation) {
                imageAnimation.cancel();
            }

            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            pointerDragging = false;
            pointerAxisLocked = false;
            lightboxStage.style.transition = "none";
            lightboxStage.classList.add("is-dragging");
            lightboxStage.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        lightboxStage.addEventListener("pointermove", (event) => {
            if (!event.isPrimary || !lightboxStage.hasPointerCapture(event.pointerId)) {
                return;
            }

            const distanceX = event.clientX - pointerStartX;
            const distanceY = event.clientY - pointerStartY;

            if (!pointerAxisLocked) {
                if (Math.abs(distanceX) < 8 && Math.abs(distanceY) < 8) {
                    return;
                }

                if (Math.abs(distanceY) > Math.abs(distanceX)) {
                    lightboxStage.releasePointerCapture(event.pointerId);
                    lightboxStage.classList.remove("is-dragging");
                    lightboxStage.style.transition = "";
                    pointerStartX = 0;
                    pointerStartY = 0;
                    pointerDragging = false;
                    pointerAxisLocked = false;
                    return;
                }

                pointerAxisLocked = true;
            }

            pointerDragging = true;
            event.preventDefault();
            lightboxStage.style.transform = `translateX(${distanceX}px)`;
        });

        function finishPointerDrag(event) {
            if (!event.isPrimary || !lightboxStage.hasPointerCapture(event.pointerId)) {
                return;
            }

            const distanceX = event.clientX - pointerStartX;
            const minimumDragDistance = 70;
            const shouldNavigate = pointerDragging && Math.abs(distanceX) >= minimumDragDistance;
            const direction = distanceX < 0 ? 1 : -1;

            lightboxStage.releasePointerCapture(event.pointerId);
            lightboxStage.classList.remove("is-dragging");
            lightboxStage.style.transition = "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";

            if (!shouldNavigate) {
                lightboxStage.style.transform = "translateX(0)";
            } else {
                lightboxStage.style.transform = `translateX(${direction * -window.innerWidth}px)`;
                swipeAnimationTimeout = window.setTimeout(() => {
                    showMedia(activeImage + direction);
                    lightboxStage.style.transition = "none";
                    lightboxStage.style.transform = `translateX(${direction * window.innerWidth}px)`;
                    requestAnimationFrame(() => {
                        lightboxStage.style.transition = "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";
                        lightboxStage.style.transform = "translateX(0)";
                    });
                    swipeAnimationTimeout = null;
                }, 300);
            }

            pointerStartX = 0;
            pointerStartY = 0;
            pointerDragging = false;
            pointerAxisLocked = false;
        }

        lightboxStage.addEventListener("pointerup", finishPointerDrag);
        lightboxStage.addEventListener("pointercancel", finishPointerDrag);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                if (lightbox.classList.contains("is-open")) {
                    closeLightbox();
                } else if (pageOverlay.classList.contains("is-open")) {
                    closePage();
                }
            } else if (lightbox.classList.contains("is-open") && event.key === "ArrowLeft") {
                showMedia(activeImage - 1);
            } else if (lightbox.classList.contains("is-open") && event.key === "ArrowRight") {
                showMedia(activeImage + 1);
            }
        });
