if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("js/sw.js").catch((error) => {
        console.error("Service worker registration failed.", error);
    });
}
