if (import.meta.env.VITE_IS_DEV) {
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });
  })();
}
