// Custom Carousel Implementation
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('customCarousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const allIndicators = carousel.querySelectorAll('.carousel-indicators button');
    const allPrevBtns = carousel.querySelectorAll('.carousel-control.prev');
    const allNextBtns = carousel.querySelectorAll('.carousel-control.next');
    let current = 0;
    let intervalID;
    let progress = 0;
    
    const backgrounds = [
        'https://picsum.photos/id/1025/1440/800',
        'https://picsum.photos/id/1026/1440/800',
        'https://picsum.photos/id/1039/1440/800'
    ];

    function showSlide(index) {
        carousel.style.backgroundImage = `url(${backgrounds[index]})`;
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        allIndicators.forEach((btn, i) => {
            const indicatorIndex = i % 3;
            btn.classList.toggle('active', indicatorIndex === index);
        });
    }

    function goToSlide(index) {
        progress = 0;
        current = (index + items.length) % items.length;
        showSlide(current);
        resetInterval();
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    function updateProgressBars() {
        allIndicators.forEach((btn, i) => {
            const indicatorIndex = i % 3;
            const span = btn.querySelector('span');
            if (indicatorIndex === current) {
                span.style.width = (35 + progress * 0.55) + '%';
            } else {
                span.style.width = '35%';
            }
        });
    }

    function resetInterval() {
        clearInterval(intervalID);
        progress = 0;
        
        intervalID = setInterval(() => {
            progress += 1;
            updateProgressBars();
            
            if (progress >= 100) {
                progress = 0;
                current = (current + 1) % items.length;
                showSlide(current);
            }
        }, 80);
    }

    allIndicators.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const slideIndex = i % 3;
            goToSlide(slideIndex);
        });
    });
    
    allNextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    });
    
    allPrevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    });

    // Start carousel on load
    showSlide(current);
    resetInterval();
});