// document.addEventListener("DOMContentLoaded", function () {
//   const openBtn = document.getElementById("openPartnersOverlay");
//   const overlay = document.getElementById("partnersOverlay");
//   const closeBtn = document.querySelector(".btn-close");

//   // Відкрити оверлей
//   openBtn.addEventListener("click", function () {
//     overlay.classList.add("active");
//   });

//   // Закрити оверлей
//   closeBtn.addEventListener("click", function () {
//     overlay.classList.remove("active");
//   });

//   // Закрити по кліку на фон
//   overlay.addEventListener("click", function (e) {
//     if (e.target === overlay || e.target.classList.contains('overlay-layer')) {
//       overlay.classList.remove("active");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const logoItems = document.querySelectorAll(".logo-item[id^='open-']");
  const overlays = document.querySelectorAll(".partners-overlay");

  // Відкрити потрібний overlay
  logoItems.forEach(item => {
    item.addEventListener("click", function () {
      const id = item.id.replace("open-", ""); // наприклад open-ricard → ricard
      const overlay = document.getElementById(`partnersOverlay-${id}-overlay`);
      if (overlay) {
        overlay.classList.add("active");
      }
    });
  });

  // Закрити overlay
  overlays.forEach(overlay => {
    const closeBtn = overlay.querySelector(".btn-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        overlay.classList.remove("active");
      });
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("overlay-layer")) {
        overlay.classList.remove("active");
      }
    });
  });
});
