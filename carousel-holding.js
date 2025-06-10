
document.addEventListener('DOMContentLoaded', () => {
  /* === grab DOM elements ================================================= */
  const section   = document.getElementById('holding');
  const wrapper   = section.querySelector('.holding-wrapper');
  const blocks    = Array.from(wrapper.children);          // 6 blocks
  const indicators= Array.from(section.querySelectorAll('.holding-indicators button'));
  const prevBtn   = section.querySelector('.holding-control.prev');
  const nextBtn   = section.querySelector('.holding-control.next');

  /* === CONFIG ============================================================ */
  const VISIBLE   = 3;           // show 3 cards at a time
  const TICK_MS   = 80;          // 80 ms per progress tick  (≈ same as main slider)
  let   current   = 0;           // first visible block’s index
  let   progress  = 0;
  let   timerId   = null;

  /* === HELPERS =========================================================== */
  function showWindow(idx){
  blocks.forEach((blk,i)=>{
    const inWindow = (i >= idx && i < idx+VISIBLE) ||
                     (idx+VISIBLE > blocks.length && i < (idx+VISIBLE)%blocks.length);

    /* —— if the card is entering the window, add the animation class —— */
    if (inWindow && blk.classList.contains('hidden')) {
      blk.classList.remove('hidden');
      blk.classList.add('animate-in');
      blk.addEventListener('animationend', ()=>blk.classList.remove('animate-in'), {once:true});
    }

    /* —— if the card is leaving the window, just hide it —— */
    if (!inWindow && !blk.classList.contains('hidden')) {
      blk.classList.add('hidden');
    }
  });

  indicators.forEach((btn,i)=>btn.classList.toggle('active', i===idx));
}

  function updateProgressPills(){
    indicators.forEach((btn,i)=>{
      const span = btn.querySelector('span');
      span.style.width = (i===current) ? (35 + progress*0.55)+'%' : '35%';
    });
  }

  function resetTimer(){
    clearInterval(timerId);
    progress = 0;
    timerId = setInterval(()=>{
      progress += 1;
      updateProgressPills();
      if(progress>=100){
        progress=0;
        nextWindow();
      }
    },TICK_MS);
  }

  const nextWindow = () => { current = (current+1)%blocks.length; showWindow(current); resetTimer(); };
  const prevWindow = () => { current = (current-1+blocks.length)%blocks.length; showWindow(current); resetTimer(); };

  /* === WIRE EVENTS ======================================================= */
  nextBtn.addEventListener('click', e=>{e.preventDefault();nextWindow();});
  prevBtn.addEventListener('click', e=>{e.preventDefault();prevWindow();});
  indicators.forEach((btn,i)=>btn.addEventListener('click',()=>{current=i;showWindow(current);resetTimer();}));

  /* === INITIALISE ======================================================== */
  showWindow(current);
  resetTimer();
});