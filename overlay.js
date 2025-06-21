document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openPartnersOverlay");
  const overlay = document.getElementById("partnersOverlay");
  const closeBtn = document.querySelector(".btn-close");

  // Відкрити оверлей
  openBtn.addEventListener("click", function () {
    overlay.classList.add("active");
  });

  // Закрити оверлей
  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
  });

  // Закрити по кліку на фон
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay || e.target.classList.contains('overlay-layer')) {
      overlay.classList.remove("active");
    }
  });
});