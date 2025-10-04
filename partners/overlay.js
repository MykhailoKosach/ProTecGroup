document.addEventListener("DOMContentLoaded", function () {
  const logoItems = document.querySelectorAll(".logo-item[id^='open-']");
  const overlay = document.getElementById('partnersOverlay-ricard-overlay');
  if (!overlay) return;

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

  function initSlider() {
    const slides = overlay.querySelectorAll('.overlay-slide');
    const dots = overlay.querySelectorAll('.slider-dots .dot');
    const container = overlay.querySelector('.overlay-container');
    const closeBtn = overlay.querySelector('.btn-close');
    let current = 0;

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }

    // Кліки по dots з stopPropagation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();  // блокуємо "пробігання" до container
        showSlide(i);
      });
    });

    // Swipe / drag
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

    // Клік по container для переходу слайдів
    container.addEventListener('click', function (e) {
      // Не зупиняємо dots, бо stopPropagation вже зроблено на них
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width / 2) showSlide(current - 1);
      else showSlide(current + 1);
    });

    // Закриття overlay
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        unlockScroll();
      });
    }
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains("overlay-layer")) {
        overlay.classList.remove('active');
        unlockScroll();
      }
    });

    // Показати перший слайд
    showSlide(0);
  }

  // Відкриття overlay по кліку на логотип
  logoItems.forEach(item => {
    item.addEventListener('click', function () {
      const id = item.id.replace("open-", "");
      if (id === "ricard") {
        overlay.classList.add("active");
        lockScroll();
        initSlider();
      }
    });
  });
});
