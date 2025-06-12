
(() => {
  const section     = document.getElementById('value');
  const startAnchor = document.getElementById('timelineStart');
  const progress    = document.querySelector('.progress-line');
  const dots        = [...document.querySelectorAll('.value')];

  function measure () {
    const startY  = startAnchor.offsetTop + startAnchor.offsetHeight / 2;
    const endY    = dots.at(-1).offsetTop + dots.at(-1).offsetHeight / 2;
    const maxFill = endY - startY;

    section.style.setProperty('--rail-start', `${startY}px`);
    section.style.setProperty('--rail-end',   `${section.offsetHeight - endY}px`);

    return { startY, maxFill };
  }

  const { startY, maxFill } = measure();

  function tick () {
    const centreY = window.scrollY + innerHeight / 2;
    const filled  = Math.min(Math.max(centreY - (section.offsetTop + startY), 0), maxFill);
    progress.style.top    = `${startY}px`;
    progress.style.height = `${filled}px`;

    dots.forEach(el => {
      const dotMid = el.offsetTop + el.offsetHeight / 2;
      el.classList.toggle('active', (section.offsetTop + dotMid) < centreY);
    });
  }

  tick();
  addEventListener('scroll',  tick, { passive:true });
  addEventListener('resize',  () => location.reload());  /* quickest resize fix */
})();
