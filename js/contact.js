(() => {
    const section = document.querySelector("#contact");
    const head = section?.querySelector(".contact-head");
    const columns = section?.querySelector(".contact-columns");
    const media = section?.querySelector(".contact-media");
    const cards = section ? Array.from(section.querySelectorAll(".contact-card")) : [];

    if (!section || !head || !columns || typeof window.gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        return;
    }

    const revealTargets = media ? [head, columns, media] : [head, columns];

    window.gsap.set(revealTargets, {
        autoAlpha: 0
    });

    window.gsap.set(head, {
        y: 48
    });

    window.gsap.set(columns, {
        y: 58
    });

    if (media) {
        window.gsap.set(media, {
            x: 36,
            y: 28
        });
    }

    if (cards.length > 0) {
        window.gsap.set(cards, {
            autoAlpha: 0,
            y: 36
        });
    }

    const revealContact = () => {
        const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(head, {
            autoAlpha: 1,
            y: 0,
            duration: 1
        });

        tl.to(
            columns,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.95
            },
            "-=0.52"
        );

        if (media) {
            tl.to(
                media,
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 1.05
                },
                "-=0.78"
            );
        }

        if (cards.length > 0) {
            tl.to(
                cards,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.11
                },
                "-=0.6"
            );
        }
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            const [entry] = entries;

            if (!entry.isIntersecting) {
                return;
            }

            revealContact();
            obs.disconnect();
        },
        {
            threshold: 0.24
        }
    );

    observer.observe(section);
})();