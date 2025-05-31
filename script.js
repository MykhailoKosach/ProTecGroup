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

// Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // тільки раз
    }
  });
}, { threshold: 0.1 });

// Обираємо всі елементи з класом fade-in-on-scroll
document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
  observer.observe(el);
});


// ТЕСТУВАННЯ
    document.addEventListener("DOMContentLoaded", function () {
        const elements = document.querySelectorAll('.fade-in-left');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Якщо потрібно лише один раз — відключаємо спостереження
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // коли 10% елемента видно
        });

        elements.forEach(el => observer.observe(el));
    });

     document.addEventListener("DOMContentLoaded", function () {
        const elements = document.querySelectorAll('.fade-in-right');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // виконується один раз
                }
            });
        }, {
            threshold: 0.1 // активується, коли видно 10% елемента
        });

        elements.forEach(el => observer.observe(el));
    });

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('[data-stagger]');

  containers.forEach(container => {
    const items = container.querySelectorAll('[data-item]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 80); // 120ms затримка між кожним
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
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
const btnAll = document.getElementById('filter-all');

const allButtons = document.querySelectorAll('.filter'); // всі елементи з класом .filter

btnDistribution.addEventListener('click', () => {
    setActiveButton(btnDistribution);
    filterLogos('logo-distribution');
});

btnLogistic.addEventListener('click', () => {
    setActiveButton(btnLogistic);
    filterLogos('logo-logistic');
});

btnAll.addEventListener('click', () => {
    setActiveButton(btnAll);
    document.querySelectorAll('.logo-item').forEach(logo => {
        logo.style.display = 'flex';
    });
});

function filterLogos(type) {
    const allLogos = document.querySelectorAll('.logo-item');

    allLogos.forEach(logo => {
        if (logo.classList.contains(type)) {
            logo.style.display = 'flex';
        } else {
            logo.style.display = 'none';
        }
    });
}

function setActiveButton(activeBtn) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Overlay
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














