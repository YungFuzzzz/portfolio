(() => {
    const footer = document.querySelector(".site-footer");
    const inner = footer?.querySelector(".site-footer-inner");
    const footerLinks = footer ? Array.from(footer.querySelectorAll(".site-footer-link")) : [];

    footerLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";

        if (href.startsWith("#")) {
            link.addEventListener("click", (event) => {
                const target = document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    });

    if (!footer || !inner) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        return;
    }

    let raf = 0;

    const render = () => {
        raf = 0;

        const rect = footer.getBoundingClientRect();
        const vh = Math.max(window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, 1 - rect.top / vh));
        const y = (1 - progress) * 42;

        inner.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const requestRender = () => {
        if (raf !== 0) {
            return;
        }

        raf = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    requestRender();
})();