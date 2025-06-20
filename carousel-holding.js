function getVisibleCount() {
  const width = window.innerWidth;
  if (width < 1024) return 1;
  if (width >= 1024 && width <= 1200) return 2;
  return 3;
}

function createIndicators(count) {
  const indicatorsContainer = document.querySelector('.holding-indicators');
  
  // Clear existing indicators
  indicatorsContainer.innerHTML = '';
  
  // Create new indicators based on page count
  for (let i = 0; i < count; i++) {
    const button = document.createElement('button');
    button.innerHTML = '<span></span>';
    indicatorsContainer.appendChild(button);
  }
  
  return Array.from(indicatorsContainer.children);
}

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('holding');
  const wrapper = section.querySelector('.holding-wrapper');
  const blocks = Array.from(wrapper.children); // 6 cards
  const prevBtn = section.querySelector('.holding-control.prev');
  const nextBtn = section.querySelector('.holding-control.next');

  const TICK_MS = 80; // progress speed

  let currentPage = 0;
  let progress = 0;
  let timerId;
  let VISIBLE = getVisibleCount();
  let PAGES = Math.ceil(blocks.length / VISIBLE);
  let indicators = createIndicators(PAGES);

  function showPage(page) {
    VISIBLE = getVisibleCount();
    const newPages = Math.ceil(blocks.length / VISIBLE);
    
    // Recreate indicators if page count changed
    if (newPages !== PAGES) {
      PAGES = newPages;
      indicators = createIndicators(PAGES);
      addIndicatorEvents();
    }
    
    currentPage = (page + PAGES) % PAGES;
    const start = currentPage * VISIBLE;

    blocks.forEach((blk, i) => {
      const shouldShow = i >= start && i < start + VISIBLE;

      if (shouldShow && blk.classList.contains('hidden')) {
        blk.classList.remove('hidden');
        blk.classList.add('animate-in');
        blk.addEventListener('animationend', () =>
          blk.classList.remove('animate-in')
        , { once: true });
      }

      if (!shouldShow && !blk.classList.contains('hidden')) {
        blk.classList.add('hidden');
      }
    });

    indicators.forEach((btn, i) =>
      btn.classList.toggle('active', i === currentPage)
    );
  }

  function updateBars() {
    indicators.forEach((btn, i) => {
      const span = btn.querySelector('span');
      span.style.width = i === currentPage ? (35 + progress * 0.55) + '%' : '35%';
    });
  }

  function resetTimer() {
    clearInterval(timerId);
    progress = 0;
    timerId = setInterval(() => {
      progress += 1;
      updateBars();
      if (progress >= 100) {
        progress = 0;
        showPage(currentPage + 1);
      }
    }, TICK_MS);
  }

  function addIndicatorEvents() {
    indicators.forEach((btn, i) =>
      btn.addEventListener('click', () => {
        showPage(i);
        resetTimer();
      })
    );
  }

  window.addEventListener('resize', () => {
    const newVisible = getVisibleCount();
    if (newVisible !== VISIBLE) {
      VISIBLE = newVisible;
      showPage(currentPage);
      resetTimer();
    }
  });

  nextBtn.addEventListener('click', e => {
    e.preventDefault();
    showPage(currentPage + 1);
    resetTimer();
  });

  prevBtn.addEventListener('click', e => {
    e.preventDefault();
    showPage(currentPage - 1);
    resetTimer();
  });

  addIndicatorEvents();
  showPage(currentPage);
  resetTimer();
});