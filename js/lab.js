(() => {
    const section = document.querySelector("#lab");
    const blobField = section?.querySelector(".lab-blob-field");
    const shell = section?.querySelector(".lab-shell");
    const kicker = shell?.querySelector(".lab-kicker");
    const title = shell?.querySelector(".lab-title");
    const copy = shell?.querySelector(".lab-copy");
    const actions = shell?.querySelector(".lab-actions");

    if (!section || !shell || typeof window.gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        return;
    }

    const revealTargets = [kicker, title, copy, actions].filter(Boolean);

    if (blobField) {
        window.gsap.set(blobField, {
            autoAlpha: 0
        });
    }

    window.gsap.set(revealTargets, {
        autoAlpha: 0
    });

    if (kicker) {
        window.gsap.set(kicker, { y: 24 });
    }

    if (title) {
        window.gsap.set(title, { y: 52 });
    }

    if (copy) {
        window.gsap.set(copy, { y: 44 });
    }

    if (actions) {
        window.gsap.set(actions, { y: 36 });
    }

    const revealLab = () => {
        const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });

        if (blobField) {
            tl.to(blobField, {
                autoAlpha: 1,
                duration: 0.9
            });
        }

        if (kicker) {
            tl.to(
                kicker,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.72
                },
                blobField ? "-=0.45" : ""
            );
        }

        if (title) {
            tl.to(
                title,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.92
                },
                "-=0.42"
            );
        }

        if (copy) {
            tl.to(
                copy,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.82
                },
                "-=0.5"
            );
        }

        if (actions) {
            tl.to(
                actions,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.75
                },
                "-=0.45"
            );
        }
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            const [entry] = entries;

            if (!entry.isIntersecting) {
                return;
            }

            revealLab();
            obs.disconnect();
        },
        {
            threshold: 0.28
        }
    );

    observer.observe(section);
})();