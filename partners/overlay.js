document.addEventListener("DOMContentLoaded", function () {
  const logoItems = document.querySelectorAll(".logo-item[id^='open-']");
  let scrollTop = 0;

  // Блокування/розблокування скролу
  function lockScroll() {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    document.body.style.top = `-${scrollTop}px`;
    document.body.classList.add('no-scroll');
  }
  function unlockScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollTop);
  }

  // Ініціалізація слайдера/обробників для конкретного overlay
  function initSlider(overlay) {
    if (!overlay) return;

    // Якщо вже ініціалізовано — просто скидаємо на перший слайд (якщо є) і не ре-додаємо слухачі
    if (overlay.dataset.sliderInitialized === 'true') {
      const slides = overlay.querySelectorAll('.overlay-slide');
      const dots = overlay.querySelectorAll('.slider-dots .dot');
      if (slides.length) {
        slides.forEach((s, i) => s.classList.toggle('active', i === 0));
      }
      if (dots.length) {
        dots.forEach((d, i) => d.classList.toggle('active', i === 0));
      }
      return;
    }

    const slides = overlay.querySelectorAll('.overlay-slide');
    const dots = overlay.querySelectorAll('.slider-dots .dot');
    const container = overlay.querySelector('.overlay-container') || overlay;
    const closeBtn = overlay.querySelector('.btn-close');
    let current = 0;

    function showSlide(index) {
      if (!slides.length) return;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }

    // dots — тільки якщо вони є
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation(); // не даємо пробігтися до контейнера/оверлею
          showSlide(i);
        });
      });
    }

    // Swipe / drag & кліки по container для перемикання слайдів — тільки якщо є слайди
    if (slides.length) {
      let startX = 0, isDown = false;
      function onStart(e) {
        isDown = true;
        startX = e.touches ? e.touches[0].clientX : e.clientX;
      }
      function onEnd(e) {
        if (!isDown) return;
        isDown = false;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) showSlide(current + 1);
          else showSlide(current - 1);
        }
      }
      container.addEventListener('touchstart', onStart, { passive: true });
      container.addEventListener('touchend', onEnd, { passive: true });
      container.addEventListener('mousedown', onStart);
      container.addEventListener('mouseup', onEnd);

      container.addEventListener('click', function (e) {
        // Якщо клік по інтерактивним елементам — ігноруємо (хрестик/dots)
        if (e.target.closest('.btn-close') || e.target.closest('.slider-dots') || e.target.closest('.dot')) return;
        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) showSlide(current - 1);
        else showSlide(current + 1);
      });
    }

    window.addEventListener('load', () => {
      document.querySelectorAll('.overlay img').forEach(img => {
        const src = img.getAttribute('src');
        if (src) new Image().src = src; // передзавантаження
      });
    });

    // Закриття по хрестику — додаємо завжди (навіть якщо немає слайдів)
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // важливо — щоб контейнер/оверлей не перехопили клік
        overlay.classList.remove('active');
        unlockScroll();
      });
    }

    // Закриття по кліку на фон (тобто — коли клікнули поза .overlay-container)
    overlay.addEventListener('click', function (e) {
      // Якщо клік всередині контейнера — нічого не робимо
      if (e.target.closest('.overlay-container')) return;
      // Інакше — закриваємо
      overlay.classList.remove('active');
      unlockScroll();
    });

    // Позначаємо як ініціалізоване, щоб не додавати слухачі повторно
    overlay.dataset.sliderInitialized = 'true';

    // Показати перший слайд (якщо є)
    showSlide(0);
  }

  // Відкриття overlay по кліку на логотип
  logoItems.forEach(item => {
    item.addEventListener('click', function () {
      const id = item.id.replace("open-", ""); // наприклад, "ricard"
      const overlay = document.getElementById(`partnersOverlay-${id}-overlay`);
      if (!overlay) return;

      overlay.classList.add("active");
      lockScroll();
      initSlider(overlay);
    });
  });
});
