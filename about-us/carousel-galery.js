document.addEventListener('DOMContentLoaded', () => {
  const gallery     = document.getElementById('gallery');
  const prevBtn     = gallery.querySelector('.gallery-control.prev');
  const nextBtn     = gallery.querySelector('.gallery-control.next');
  const indicators  = Array.from(gallery.querySelectorAll('.gallery-indicators button'));

  /* slide backgrounds */
  const backgrounds = [
    '../back1.jpg',
    '../back2.jpg',
    '../back3.jpg',
  ];

  /* state */
  let current  = 0;
  let progress = 0;
  let timerId  = null;
  const TICK_MS = 80;        // match your earlier slider

  // Touch control variables
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const minSwipeDistance = 50;

  /* helpers ------------------------------------------------------------ */
  function showSlide(idx){
    gallery.style.backgroundImage = `url(${backgrounds[idx]})`;
    indicators.forEach((btn,i)=>btn.classList.toggle('active',i===idx));
  }

  function updateBars(){
    indicators.forEach((btn,i)=>{
      const span = btn.querySelector('span');
      span.style.width = i===current ? (35+progress*0.55)+'%' : '35%';
    });
  }

  function resetTimer(){
    clearInterval(timerId);
    progress = 0;
    timerId = setInterval(()=>{
      progress += 1;
      updateBars();
      if(progress>=100){
        progress = 0;
        nextSlide();
      }
    },TICK_MS);
  }

  /* nav actions -------------------------------------------------------- */
  function goTo(idx){
    current = (idx + backgrounds.length) % backgrounds.length;
    showSlide(current);
    resetTimer();
  }
  const nextSlide = ()=>goTo(current+1);
  const prevSlide = ()=>goTo(current-1);

  function handleSwipe() {
    const swipeDistanceX = Math.abs(touchEndX - touchStartX);
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    if (swipeDistanceX > minSwipeDistance && swipeDistanceX > swipeDistanceY) {
      if (touchEndX < touchStartX) {
        // Swipe left - next slide
        nextSlide();
      } else if (touchEndX > touchStartX) {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  }

  /* events ------------------------------------------------------------- */
  nextBtn.addEventListener('click',e=>{e.preventDefault();nextSlide();});
  prevBtn.addEventListener('click',e=>{e.preventDefault();prevSlide();});
  indicators.forEach((btn,i)=>btn.addEventListener('click',()=>goTo(i)));

  // Touch event listeners
  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  gallery.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  // Prevent default touch behavior during horizontal swipes
  gallery.addEventListener('touchmove', (e) => {
    const swipeDistanceX = Math.abs(e.changedTouches[0].screenX - touchStartX);
    const swipeDistanceY = Math.abs(e.changedTouches[0].screenY - touchStartY);
    
    // If horizontal swipe is detected, prevent vertical scrolling
    if (swipeDistanceX > swipeDistanceY && swipeDistanceX > 10) {
      e.preventDefault();
    }
  });

  /* init --------------------------------------------------------------- */
  showSlide(current);
  resetTimer();
});