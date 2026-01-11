document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const copyrightEl = document.getElementById("copyright");

  if (copyrightEl) {
    copyrightEl.textContent = `Copyright Pixell River Financial ${year}.`;
  }
});
