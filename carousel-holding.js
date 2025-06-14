
document.addEventListener('DOMContentLoaded', () => {
  const section     = document.getElementById('holding');
  const wrapper     = section.querySelector('.holding-wrapper');
  const blocks      = Array.from(wrapper.children);          // 6 cards
  const prevBtn     = section.querySelector('.holding-control.prev');
  const nextBtn     = section.querySelector('.holding-control.next');
  const indicators  = Array.from(section.querySelectorAll('.holding-indicators button'));

  /* CONFIG ------------------------------------------------------------ */
  const VISIBLE   = 3;                                        // cards per page
  const PAGES     = Math.ceil(blocks.length / VISIBLE);       // = 2
  const TICK_MS   = 80;                                       // progress speed

  let currentPage = 0;                                        // 0 or 1
  let progress    = 0;
  let timerId;

  /* HELPERS ----------------------------------------------------------- */
  function showPage(page){
  currentPage = (page + PAGES) % PAGES;             // 0 or 1
  const start = currentPage * VISIBLE;              // 0 or 3

  blocks.forEach((blk,i)=>{
    const shouldShow = i >= start && i < start + VISIBLE;

    /* — card ENTERS the window — */
    if (shouldShow && blk.classList.contains('hidden')) {
      blk.classList.remove('hidden');               // reveal
      blk.classList.add('animate-in');              // play anim
      blk.addEventListener('animationend', () =>
        blk.classList.remove('animate-in')
      , { once:true });
    }

    /* — card LEAVES the window — */
    if (!shouldShow && !blk.classList.contains('hidden')) {
      blk.classList.add('hidden');                  // simply hide
    }
  });

  indicators.forEach((btn,i)=>btn.classList.toggle('active', i===currentPage));
}

  function updateBars(){
    indicators.forEach((btn,i)=>{
      const span = btn.querySelector('span');
      span.style.width = i === currentPage ? (35 + progress * 0.55) + '%' : '35%';
    });
  }

  function resetTimer(){
    clearInterval(timerId);
    progress = 0;
    timerId = setInterval(()=>{
      progress += 1;
      updateBars();
      if(progress >= 100){
        progress = 0;
        showPage(currentPage + 1);
      }
    }, TICK_MS);
  }

  /* EVENT WIRING ------------------------------------------------------ */
  nextBtn.addEventListener('click', e => { e.preventDefault(); showPage(currentPage + 1); resetTimer(); });
  prevBtn.addEventListener('click', e => { e.preventDefault(); showPage(currentPage - 1); resetTimer(); });
  indicators.forEach((btn,i)=>btn.addEventListener('click', ()=>{ showPage(i); resetTimer(); }));

  /* INIT -------------------------------------------------------------- */
  showPage(currentPage);
  resetTimer();
});