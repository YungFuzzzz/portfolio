(() => {
    const section = document.querySelector("#about");
    const title = section?.querySelector(".about-title");
    const imageWrap = section?.querySelector(".about-image-wrap");
    const copy = section?.querySelector(".about-copy");
    const skillsCarousel = section?.querySelector(".skills-carousel-section");

    if (!section || !title || !imageWrap || typeof window.gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        return;
    }

    const revealTargets = [title, imageWrap, copy, skillsCarousel].filter(Boolean);

    window.gsap.set(revealTargets, {
        autoAlpha: 0
    });

    window.gsap.set(title, {
        yPercent: 20
    });

    window.gsap.set(imageWrap, {
        y: 96,
        scale: 0.96
    });

    if (copy) {
        window.gsap.set(copy, {
            y: 48
        });
    }

    if (skillsCarousel) {
        window.gsap.set(skillsCarousel, {
            y: 56
        });
    }

    const revealAbout = () => {
        const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(title, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1.05
        }).to(
            imageWrap,
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1.1
            },
            "-=0.55"
        );

        if (copy) {
            tl.to(
                copy,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9
                },
                "-=0.42"
            );
        }

        if (skillsCarousel) {
            tl.to(
                skillsCarousel,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9
                },
                "-=0.52"
            );
        }
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            const [entry] = entries;

            if (!entry.isIntersecting) {
                return;
            }

            revealAbout();
            obs.disconnect();
        },
        {
            threshold: 0.28
        }
    );

    observer.observe(section);
})();
