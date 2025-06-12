// link
document.querySelectorAll('.header-nav-item').forEach(item => {
  item.addEventListener('click', function (e) {
    // Якщо клік був по <a> або вкладених посиланнях, нічого не робимо — браузер сам перейде
    if (e.target.closest('a')) return;

    // Отримаємо головне <a> цього пункту меню
    const link = this.querySelector('a');
    if (link && link.href) {
      window.location.href = link.href;
    }
  });
});

// counting
// function animateCounter(el, duration = 8000) {
//   const target = +el.getAttribute("data-target");
//   const startTime = performance.now();

//   function easeOutQuad(t) {
//     return t * (2 - t); // плавний ефект "ease-out"
//   }

//   function update(currentTime) {
//     const elapsed = currentTime - startTime;
//     const progress = Math.min(elapsed / duration, 1);
//     const easedProgress = easeOutQuad(progress);
//     const value = Math.round(easedProgress * target);
//     el.textContent = value;

//     if (progress < 1) {
//       requestAnimationFrame(update);
//     } else {
//       el.textContent = target;
//       el.classList.add("animate-finish");
//     }
//   }

//   requestAnimationFrame(update);
// }

function animateCounter(el) {
  const target = parseFloat(el.getAttribute("data-target"));
  const useDecimal = el.getAttribute("data-decimal") === "true";
  const duration = parseInt(el.getAttribute("data-duration")) || 8000; // за замовчуванням 8000 мс
  const startTime = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function truncateToOneDecimal(num) {
    return Math.floor(num * 10) / 10;
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const value = easedProgress * target;

    let displayValue;
    if (useDecimal) {
      displayValue = truncateToOneDecimal(value).toString().replace('.', ',');
    } else {
      displayValue = Math.round(value).toString();
    }

    el.textContent = displayValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalValue = useDecimal
        ? target.toFixed(1).replace('.', ',')
        : Math.round(target).toString();
      el.textContent = finalValue;
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
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('.fade-in-down-on-scroll').forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('.fade-in-left').forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('.fade-in-right').forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
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
            }, index * 80);
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

const textarea = document.getElementById("message");
textarea.addEventListener("focus", () => {
  textarea.scrollLeft = 0;
  textarea.style.overflowX = 'hidden';
}); textarea.addEventListener("focus", () => {
  textarea.scrollLeft = 0;
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

  const wrapper = document.querySelector('.partners-wrapper');
  const allLogos = document.querySelectorAll('.logo-item');

  // Запускаємо fade-out
  wrapper.classList.add('fade-out');

  // Чекаємо завершення анімації (300 мс)
  setTimeout(() => {
    // Після того як обгортка зникла — показуємо всі лого
    allLogos.forEach(logo => {
      logo.style.display = 'flex';
    });

    // Видаляємо fade-out і запускаємо fade-in
    wrapper.classList.remove('fade-out');
    wrapper.classList.add('fade-in');

    // Після завершення fade-in очищаємо клас
    setTimeout(() => {
      wrapper.classList.remove('fade-in');
    }, 300);
  }, 300); // час має співпадати з transition-duration
});

function filterLogos(type) {
  const wrapper = document.querySelector('.partners-wrapper');
  const allLogos = document.querySelectorAll('.logo-item');

  wrapper.classList.add('fade-out'); // запуск анімації зникнення

  setTimeout(() => {
    allLogos.forEach(logo => {
      logo.style.display = logo.classList.contains(type) ? 'flex' : 'none';
    });

    wrapper.classList.remove('fade-out');
    wrapper.classList.add('fade-in');

    setTimeout(() => {
      wrapper.classList.remove('fade-in');
    }, 300); // завершення анімації появи
  }, 300); // затримка, поки не завершиться fade-out
}

btnAll.addEventListener('click', () => {
  setActiveButton(btnAll);
  const wrapper = document.querySelector('.partners-wrapper');
  const allLogos = document.querySelectorAll('.logo-item');

  wrapper.classList.add('fade-out');

  setTimeout(() => {
    allLogos.forEach(logo => {
      logo.style.display = 'flex';
    });

    wrapper.classList.remove('fade-out');
    wrapper.classList.add('fade-in');

    setTimeout(() => {
      wrapper.classList.remove('fade-in');
    }, 300);
  }, 300);
});


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

// Map

















