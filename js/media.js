const galleryVideos = [...document.querySelectorAll(".work figure")]
    .filter((item) => item.dataset.mediaType === "video")
    .map((item) => ({
        item,
        video: item.querySelector("video")
    }));

function getVideoSource(video) {
    const source = video.querySelector("source");
    return video.dataset.videoSrc || video.src || source?.src || source?.dataset.src || "";
}

function activateVideo(video) {
    if (video.dataset.videoLoaded === "true") {
        return getVideoSource(video);
    }

    const source = video.querySelector("source");
    const videoSource = video.dataset.videoSrc || source?.dataset.src;

    if (!videoSource) {
        return "";
    }

    video.dataset.videoLoaded = "true";
    video.src = videoSource;
    if (source) {
        source.removeAttribute("data-src");
    }
    video.load();
    video.play().catch(() => {});
    return videoSource;
}

galleryVideos.forEach(({ item, video }) => {
    if (!video) {
        throw new Error("A video media item must contain a video element.");
    }

    video.addEventListener("playing", () => {
        item.classList.add("video-playing");
    });
    video.addEventListener("error", () => {
        item.classList.remove("video-playing");
    });
});

const mediaWork = document.querySelector(".work");

if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const videoData = galleryVideos.find(({ item }) => item === entry.target);
            if (videoData) {
                activateVideo(videoData.video);
            }
            observer.unobserve(entry.target);
        });
    }, {
        root: mediaWork,
        rootMargin: "300px 0px"
    });

    galleryVideos.forEach(({ item }) => videoObserver.observe(item));
} else {
    galleryVideos.forEach(({ video }) => activateVideo(video));
}

window.portfolioMedia = {
    activateVideo
};
