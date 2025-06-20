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
    
    // Touch control variables
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    const backgrounds = [
        'back1.jpg',
        'back2.jpg',
        'back3.jpg',
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

    // Button event listeners
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

    // Touch event listeners
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Prevent default touch behavior during horizontal swipes
    carousel.addEventListener('touchmove', (e) => {
        const swipeDistanceX = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const swipeDistanceY = Math.abs(e.changedTouches[0].screenY - touchStartY);
        
        // If horizontal swipe is detected, prevent vertical scrolling
        if (swipeDistanceX > swipeDistanceY && swipeDistanceX > 10) {
            e.preventDefault();
        }
    });

    // Start carousel on load
    showSlide(current);
    resetInterval();
});