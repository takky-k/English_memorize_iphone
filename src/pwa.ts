export function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // The app still works online if service worker registration fails.
    });
  });
}
