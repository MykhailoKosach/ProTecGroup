document.addEventListener('DOMContentLoaded', () => {
  const gallery     = document.getElementById('gallery');
  const prevBtn     = gallery.querySelector('.gallery-control.prev');
  const nextBtn     = gallery.querySelector('.gallery-control.next');
  const indicators  = Array.from(gallery.querySelectorAll('.gallery-indicators button'));

  /* slide backgrounds */
  const backgrounds = [
    'https://picsum.photos/id/1025/1440/800',
    'https://picsum.photos/id/1026/1440/800',
    'https://picsum.photos/id/1039/1440/800'
  ];

  /* state */
  let current  = 0;
  let progress = 0;
  let timerId  = null;
  const TICK_MS = 80;        // match your earlier slider

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

  /* events ------------------------------------------------------------- */
  nextBtn.addEventListener('click',e=>{e.preventDefault();nextSlide();});
  prevBtn.addEventListener('click',e=>{e.preventDefault();prevSlide();});
  indicators.forEach((btn,i)=>btn.addEventListener('click',()=>goTo(i)));

  /* init --------------------------------------------------------------- */
  showSlide(current);
  resetTimer();
});