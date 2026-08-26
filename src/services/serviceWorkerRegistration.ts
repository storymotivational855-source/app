// Service Worker Registration and Offline Management

export interface ServiceWorkerStatus {
  isRegistered: boolean;
  isCached: boolean;
  isOnline: boolean;
}

export function registerServiceWorker(onSuccess?: () => void, onError?: (err: any) => void) {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Registered successfully with scope:", registration.scope);
          if (onSuccess) onSuccess();

          // Check if updated service worker is found
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("[SW] New content is available and will be used when all tabs are closed.");
                } else {
                  console.log("[SW] Content is cached for offline use.");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.warn("[SW] Registration error:", error);
          if (onError) onError(error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
