(() => {
  const section      = document.getElementById('value');
  const startAnchor  = document.getElementById('timelineStart');
  const lastBlock    = section.querySelector('.value-wrapper .value:last-child .block-middle-reverse')
                       ?? section.querySelector('.value-wrapper .value:last-child');   // fallback
  const progress     = section.querySelector('.progress-line');
  const milestones   = [...section.querySelectorAll('.value')];

  /* these two numbers are recalculated on resize so it all stays in sync */
  let railStartAbs   = 0;   // absolute Y-coord of rail’s start (px from top of page)
  let railLength     = 0;   // total drawable length (px)

  function setRailBounds () {
    /* distances *inside* the section (relative to its top) */
    const startInSection = startAnchor.offsetTop + startAnchor.offsetHeight / 2;
    const endInSection   = lastBlock.offsetTop   + lastBlock.offsetHeight   / 2;

    railStartAbs = section.offsetTop + startInSection;
    railLength   = endInSection - startInSection;

    /* feed the pseudo-element */
    section.style.setProperty('--rail-start', `${startInSection}px`);
    section.style.setProperty('--rail-end',   `${section.offsetHeight - endInSection}px`);
  }

  function updateProgress () {
    const viewportCentre = window.scrollY + window.innerHeight / 2;
    const filled         = Math.min(Math.max(viewportCentre - railStartAbs, 0), railLength);
    progress.style.height = `${filled}px`;

    /* milestone highlight */
    const centreLine = window.innerHeight / 2;
    milestones.forEach(el => {
      const mid = el.getBoundingClientRect().top + el.offsetHeight / 2;
      el.classList.toggle('active', mid < centreLine);
    });
  }

  /* initialise and keep synced */
  setRailBounds();
  updateProgress();
  window.addEventListener('resize', () => { setRailBounds(); updateProgress(); });
  window.addEventListener('scroll',  updateProgress, { passive: true });
})();
