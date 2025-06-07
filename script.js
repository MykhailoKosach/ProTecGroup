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

// Map
// const width = 1440;
// const height = 987;
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

//   if (city.name === "Київ" || city.name === "Львів") {
//     // SVG іконка "pin" замість кружечка
//     const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     icon.setAttribute("d", "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z");
//     icon.setAttribute("fill", "var(--red)");
//     icon.setAttribute("transform", `translate(${x - 12}, ${y - 24}) scale(1.5)`);
//     icon.setAttribute("class", "city-icon");
//     icon.setAttribute("data-name", city.name);
//     svg.appendChild(icon);

//     // Підпис
//     const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//     text.setAttribute("x", x + 25);
//     text.setAttribute("y", y);
//     text.setAttribute("fill", "var(--red)"); // виправлено синтаксис!
//     text.setAttribute("font-size", "18px");
//     text.setAttribute("font-family", "Lato-SemiBold, sans-serif");
//     text.textContent = city.name;
//     svg.appendChild(text);

//   } else {
//     // Звичайний кружечок для решти міст
//     const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle.setAttribute("class", "city-marker");
//     circle.setAttribute("data-name", city.name);
//     circle.setAttribute("cx", x);
//     circle.setAttribute("cy", y);
//     circle.setAttribute("r", 6);
//     circle.setAttribute("fill", "var(--red)");
//     svg.appendChild(circle);
//   }
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














