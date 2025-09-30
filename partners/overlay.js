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
        document.body.classList.add('no-scroll'); // блокуємо скрол
      }
    });
  });

  // Закрити overlay
  overlays.forEach(overlay => {
    const closeBtn = overlay.querySelector(".btn-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        overlay.classList.remove("active");
        document.body.classList.remove('no-scroll'); // розблоковуємо скрол
      });
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("overlay-layer")) {
        overlay.classList.remove("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById('partnersOverlay-ricard-overlay');
  const slides = overlay.querySelectorAll('.overlay-slide');
  const dots = overlay.querySelectorAll('.slider-dots .dot');
  const closeBtn = overlay.querySelector('.btn-close');
  const container = overlay.querySelector('.overlay-container');
  let current = 0;

  // --- показ слайда ---
  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    current = index;
  }

  // --- кліки по крапках ---
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  // --- кнопка закриття ---
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));

  // ===== Свайп та drag =====
  let startX = 0;
  let isDown = false;

  function onStart(e) {
    isDown = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
  }

  function onEnd(e) {
    if (!isDown) return;
    isDown = false;
    const endX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const diff = endX - startX;
    const threshold = 50; // мін. пікселів для свайпу
    if (Math.abs(diff) > threshold) {
      if (diff < 0) showSlide(current + 1); // свайп/drag вліво
      else showSlide(current - 1); // свайп/drag вправо
    }
  }

  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchend', onEnd, { passive: true });
  container.addEventListener('mousedown', onStart);
  container.addEventListener('mouseup', onEnd);

  // ===== Клік по overlay-container справа/зліва =====
  container.addEventListener('click', function (e) {
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const half = rect.width / 2;

    if (clickX < half) {
      showSlide(current - 1); // ліва половина → попередній
    } else {
      showSlide(current + 1); // права половина → наступний
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById('partnersOverlay-ricard-overlay');
  const slides = overlay.querySelectorAll('.overlay-slide');
  const slide1 = slides[0].querySelector(".overlay-logo-content");
  const slide2 = slides[1].querySelector(".overlay-logo-content");
  const slide3 = slides[2].querySelector(".overlay-logo-content");

  // елементи з класами
  const moveTo2 = overlay.querySelectorAll(".move-to-slide2");
  const moveTo3 = overlay.querySelectorAll(".move-to-slide3");

  function rearrangeLogos() {
    const width = window.innerWidth;

    if (width < 992) {
      moveTo2.forEach(el => { if (el.parentElement !== slide2) slide2.appendChild(el); });
      moveTo3.forEach(el => { if (el.parentElement !== slide3) slide3.appendChild(el); });
    } else {
      moveTo2.forEach(el => { if (el.parentElement !== slide1) slide1.appendChild(el); });
      moveTo3.forEach(el => { if (el.parentElement !== slide1) slide1.appendChild(el); });
    }
  }

  rearrangeLogos(); // при старті
  window.addEventListener("resize", rearrangeLogos);
});

