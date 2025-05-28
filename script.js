// counting
function animateCounter(el, duration = 8000) {
  const target = +el.getAttribute("data-target");
  const startTime = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t); // плавний ефект "ease-out"
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const value = Math.round(easedProgress * target);
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
      el.classList.add("animate-finish");
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(counter, 2500);
          obs.unobserve(entry.target); // Запуск лише один раз
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(counter);
  });
});

// Marquee
document.querySelectorAll('.marquee-track').forEach(track => {
  const container = track.closest('.marquee-container');
  const content = track.children[0].cloneNode(true);

  while (track.scrollWidth < container.offsetWidth * 2) {
    track.appendChild(content.cloneNode(true));
  }
});

// Filters
    const btnDistribution = document.getElementById('filter-distribution');
    const btnLogistic = document.getElementById('filter-logistic');

    btnDistribution.addEventListener('click', () => filterLogos('logo-distribution'));
    btnLogistic.addEventListener('click', () => filterLogos('logo-logistic'));

    function filterLogos(type) {
        const allLogos = document.querySelectorAll('.logo-item');

        allLogos.forEach(logo => {
            if (type === 'logo-distribution') {
                logo.classList.contains('logo-distribution')
                    ? logo.style.display = 'flex'
                    : logo.style.display = 'none';
            } else if (type === 'logo-logistic') {
                logo.classList.contains('logo-logistic')
                    ? logo.style.display = 'flex'
                    : logo.style.display = 'none';
            }
        });
    }

    const btnAll = document.getElementById('filter-all');
btnAll.addEventListener('click', () => {
    document.querySelectorAll('.logo-item').forEach(logo => {
        logo.style.display = 'flex';
    });
});

// // Overlay
document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openPartnersOverlay");
    const overlay = document.getElementById("partnersOverlay");
    const closeBtn = document.querySelector(".btn-close");

    // Відкрити оверлей
    openBtn.addEventListener("click", function () {
        overlay.classList.add("active");
    });

    // Закрити оверлей
    closeBtn.addEventListener("click", function () {
        overlay.classList.remove("active");
    });

    // Закрити по кліку на фон
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target.classList.contains('overlay-layer')) {
            overlay.classList.remove("active");
        }
    });
});











