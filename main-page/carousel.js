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
    let isTransitioning = false;
    let rafId;
    
    // Touch control variables
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 30;
    
    const backgrounds = [
        'image/holdings/protec-logistic.JPG',
        'back2.jpg',
        'image/holdings/overtrans.JPG',
        'image/holdings/logistic-group.JPG',
        'image/holdings/protec-solution.jpg',
        'image/holdings/ice-protec.JPG',
        'image/holdings/babak.jpg',
        'image/holdings/krany.JPG',
    ];

    // Preload background images for smoother transitions
    const preloadImages = () => {
        backgrounds.forEach(bg => {
            const img = new Image();
            img.src = bg;
        });
    };

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        carousel.style.backgroundImage = `url(${backgrounds[index]})`;
        
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        allIndicators.forEach((btn, i) => {
            const indicatorIndex = i % 8;
            btn.classList.toggle('active', indicatorIndex === index);
        });
        
        setTimeout(() => {
            isTransitioning = false;
        }, 50);
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        
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
        // Update all indicators correctly
        allIndicators.forEach((btn, i) => {
            const indicatorIndex = i % 8;
            const span = btn.querySelector('span');
            if (span) {
                if (indicatorIndex === current) {
                    const targetWidth = 35 + progress * 0.55;
                    span.style.width = targetWidth + '%';
                } else {
                    span.style.width = '35%';
                }
            }
        });
    }

    function resetInterval() {
        clearInterval(intervalID);
        if (rafId) cancelAnimationFrame(rafId);
        progress = 0;
        
        // Reset all progress bars when starting a new cycle
        updateProgressBars();
        
        intervalID = setInterval(() => {
            progress += 2; // Faster increment for better mobile performance
            updateProgressBars();
            
            if (progress >= 100) {
                progress = 0;
                current = (current + 1) % items.length;
                showSlide(current);
            }
        }, 80); // Slower interval for better mobile performance
    }

    let swipeStartTime = 0;
    function handleSwipe() {
        const swipeTime = Date.now() - swipeStartTime;
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);
        
        // Only handle quick horizontal swipes
        if (swipeTime < 300 && 
            Math.abs(swipeDistanceX) > minSwipeDistance && 
            Math.abs(swipeDistanceX) > swipeDistanceY * 1.5) {
            
            if (swipeDistanceX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Debounced click handlers for better performance
    let clickTimeout;
    function debouncedGoToSlide(index) {
        if (clickTimeout) clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => goToSlide(index), 50);
    }

    // Button event listeners
    allIndicators.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                const slideIndex = i % 3;
                debouncedGoToSlide(slideIndex);
            }
        }, { passive: false });
    });
    
    allNextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) nextSlide();
        }, { passive: false });
    });
    
    allPrevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) prevSlide();
        }, { passive: false });
    });

    // Touch event listeners
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        swipeStartTime = Date.now();
        
        // Pause auto-advance during touch
        clearInterval(intervalID);
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        handleSwipe();
        
        // Resume auto-advance after touch with delay
        setTimeout(() => resetInterval(), 500);
    }, { passive: true });

    // Throttled touchmove for better performance
    let lastTouchTime = 0;
    carousel.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (now - lastTouchTime < 16) return; // Throttle to ~60fps
        lastTouchTime = now;
        
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const swipeDistanceX = Math.abs(currentX - touchStartX);
        const swipeDistanceY = Math.abs(currentY - touchStartY);
        
        // Only prevent default for clear horizontal swipes
        if (swipeDistanceX > 15 && swipeDistanceX > swipeDistanceY * 1.5) {
            e.preventDefault();
        }
    }, { passive: false });

    // Pause carousel when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(intervalID);
            if (rafId) cancelAnimationFrame(rafId);
        } else {
            resetInterval();
        }
    });

    // Initialize carousel
    preloadImages();
    showSlide(current);
    resetInterval();
});