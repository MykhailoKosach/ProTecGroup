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

// Спостерігаємо всі елементи з fadeInDown класом
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

// ТЕСТУВАННЯ АНІМАЦІЙ

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

// const width = 1499;
// const height = 1000;
// const latMin = 44.3;
// const latMax = 52.5;
// const lonMin = 22.0;
// const lonMax = 40.2;

// const cities = [
//   { name: "Київ", lat: 50.2700, lon: 30.3125 },
//   { name: "Львів", lat: 49.8397, lon: 24.0297 },
//   { name: "Ковель", lat: 51.2151, lon: 24.7096 },
//   { name: "Луцьк", lat: 50.7472, lon: 25.3254 },
//   { name: "Рівне", lat: 50.6199, lon: 26.2516 },
//   { name: "Сокаль", lat: 50.4846, lon: 24.2818 },
//   { name: "Дрогобич", lat: 49.3535, lon: 23.5055 },
//   { name: "Ужгород", lat: 48.6208, lon: 22.2879 },
//   { name: "Тернопіль", lat: 49.5535, lon: 25.5948 },
//   { name: "Кременець", lat: 50.1026, lon: 25.7283 },
//   { name: "Чортків", lat: 49.0170, lon: 25.8001 },
//   { name: "Чернівці", lat: 48.2915, lon: 25.9358 },
//   { name: "Хмельницький", lat: 49.4229, lon: 26.9871 },
//   { name: "Житомир", lat: 50.2547, lon: 28.6587 },
//   { name: "Біла Церква", lat: 49.8094, lon: 30.1121 },
//   { name: "Старі Петрівці", lat: 50.6902, lon: 30.4304 }
// ];

// function geoToPixel(lat, lon) {
//   const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
//   const y = ((latMax - lat) / (latMax - latMin)) * height;
//   return { x: Math.round(x), y: Math.round(y) };
// }

// const svg = document.getElementById("map-svg");

// cities.forEach(city => {
//   const { x, y } = geoToPixel(city.lat, city.lon);
//   const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//   circle.setAttribute("class", "city-marker");
//   circle.setAttribute("data-name", city.name);
//   circle.setAttribute("cx", x);
//   circle.setAttribute("cy", y);
//   circle.setAttribute("r", 6);
//   circle.setAttribute("fill", "red"); // або будь-який колір
//   svg.appendChild(circle);
// });

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














