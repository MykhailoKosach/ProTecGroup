// Marquee
/* ---------- JS ---------- */
(() => {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const container = track.closest('.marquee-container');
    if (!container) return;

    // Якщо немає wrapper'а — створюємо і переміщаємо в нього всі початкові діти
    let content = track.querySelector('.marquee-content:not(.clone)');
    if (!content) {
      content = document.createElement('div');
      content.className = 'marquee-content';
      // переміщаємо всі поточні дочірні вузли в content
      while (track.firstChild) content.appendChild(track.firstChild);
      track.appendChild(content);
    }

    const removeClones = () => {
      track.querySelectorAll('.marquee-content.clone').forEach(n => n.remove());
    };

    const setup = () => {
      removeClones();

      // даємо браузеру зробити layout
      requestAnimationFrame(() => {
        const contentWidth = Math.round(content.getBoundingClientRect().width);
        if (!contentWidth) return;

        // дублюємо саме повний блок content
        const clone = content.cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);

        // Встановлюємо css-змінну для зсуву (в пікселях)
        track.style.setProperty('--marquee-shift', `${contentWidth}px`);

        // Опціонально: автоматично підбираємо тривалість, щоб швидкість була приблизно однакова
        // (наприклад, 100 px/сек). Ви можете задати фіксовану 30s в CSS або змінити тут.
        const pxPerSecond = 100; // регулюйте швидкість
        const durationSec = Math.max(6, contentWidth / pxPerSecond);
        track.style.setProperty('--marquee-duration', `${durationSec}s`);

        // Для діагностики: розкоментуйте
        // console.log('marquee setup:', { contentWidth, durationSec, trackScroll: track.scrollWidth });
      });
    };

    // Якщо вміст містить зображення — чекаємо на їхнє завантаження
    const imgs = Array.from(content.querySelectorAll('img'));
    if (imgs.length === 0) {
      setup();
    } else {
      let remaining = imgs.length;
      const done = () => { if (--remaining <= 0) setup(); };

      imgs.forEach(img => {
        if (img.complete) {
          remaining--;
        } else {
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }
      });
      if (remaining <= 0) setup();
    }

    // Перерахунок при зміні розміру (debounced)
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(setup, 120);
    };
    window.addEventListener('resize', onResize);
  });
})();





