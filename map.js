const width = 1440;
const height = 987;
const latMin = 44.3;
const latMax = 52.5;
const lonMin = 22.0;
const lonMax = 40.2;

const cities = [
  { name: "Київ", lat: 50.2700, lon: 30.3125 },
  { name: "Львів", lat: 49.8397, lon: 24.0297 },
  { name: "Ковель", lat: 51.2151, lon: 24.7096 },
  { name: "Луцьк", lat: 50.7472, lon: 25.3254 },
  { name: "Рівне", lat: 50.6199, lon: 26.2516 },
  { name: "Сокаль", lat: 50.4846, lon: 24.2818 },
  { name: "Дрогобич", lat: 49.3535, lon: 23.5055 },
  { name: "Ужгород", lat: 48.6208, lon: 22.2879 },
  { name: "Тернопіль", lat: 49.5535, lon: 25.5948 },
  { name: "Кременець", lat: 50.1026, lon: 25.7283 },
  { name: "Чортків", lat: 49.0170, lon: 25.8001 },
  { name: "Чернівці", lat: 48.2915, lon: 25.9358 },
  { name: "Хмельницький", lat: 49.4229, lon: 26.9871 },
  { name: "Житомир", lat: 50.2547, lon: 28.6587 },
  { name: "Біла Церква", lat: 49.8094, lon: 30.1121 },
  { name: "Старі Петрівці", lat: 50.6902, lon: 30.4304 }
];

function geoToPixel(lat, lon) {
  const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
  const y = ((latMax - lat) / (latMax - latMin)) * height;
  return { x: Math.round(x), y: Math.round(y) };
}

const svg = document.getElementById("map-svg");

cities.forEach(city => {
  let { x, y } = geoToPixel(city.lat, city.lon);
  if (city.name === "Київ") {
    y -= 35;
    x += 8; // піднімаємо Київ на 20px
  }

  if (city.name === "Старі Петрівці") {
    y += 10;
    x -= 15;
  }

  if (city.name === "Київ" || city.name === "Львів") {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
    icon.setAttribute("d", "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z");
    icon.setAttribute("fill", "var(--red)");
    icon.setAttribute("cursor", "pointer");
    icon.setAttribute("transform", `translate(${x - 12}, ${y - 24}) scale(1.5)`);
    icon.setAttribute("class", "city-icon");
    icon.setAttribute("data-name", city.name);
    svg.appendChild(icon);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x + 25);
    text.setAttribute("y", y);
    text.setAttribute("fill", "var(--red)");
    text.setAttribute("font-size", "18px");
    text.setAttribute("font-family", "Lato-SemiBold, sans-serif");
    text.textContent = city.name;
    svg.appendChild(text);
  } else {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "city-marker");
    circle.setAttribute("data-name", city.name);
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("cursor", "pointer");
    circle.setAttribute("r", 7);
    circle.setAttribute("fill", "var(--red)");
    svg.appendChild(circle);
  }
});

// ==========================
// Плавне перемикання overlay
// ==========================

let currentOverlay = null;

function hideOverlay(overlay, callback) {
  overlay.classList.add('fade-out');
  overlay.classList.remove('visible');

  overlay.addEventListener('transitionend', function handler() {
    overlay.style.display = 'none';
    overlay.classList.remove('fade-out');
    overlay.removeEventListener('transitionend', handler);
    if (typeof callback === 'function') callback();
  }, { once: true });
}

function showOverlay(overlay) {
  overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
}

function showOverlayForCity(cityName) {
  const newOverlay = document.querySelector(`.map-overlay[data-city="${cityName}"]`);
  if (!newOverlay) return;

  if (currentOverlay && currentOverlay !== newOverlay) {
    hideOverlay(currentOverlay, () => {
      showOverlay(newOverlay);
      currentOverlay = newOverlay;
    });
  } else if (!currentOverlay) {
    showOverlay(newOverlay);
    currentOverlay = newOverlay;
  }
}

// Події для маркерів
document.querySelectorAll('.city-marker, .city-icon').forEach(el => {
  el.addEventListener('click', (e) => {
    const cityName = el.getAttribute('data-name');
    showOverlayForCity(cityName);
    e.stopPropagation();
  });
});

// Закриття при кліку поза overlay або маркером
document.addEventListener("click", function (event) {
  const isClickInsideOverlay = event.target.closest('.map-overlay');
  const isClickOnMarker = event.target.closest('.city-marker, .city-icon');

  if (!isClickInsideOverlay && !isClickOnMarker && currentOverlay) {
    hideOverlay(currentOverlay, () => {
      currentOverlay = null;
    });
  }
});

document.querySelectorAll('.map-overlay').forEach(overlay => {
  // Перевірка, чи кнопка вже існує, щоб не додавати повторно
  if (!overlay.querySelector('.overlay-close')) {
    const closeButton = document.createElement('button');
    closeButton.classList.add('overlay-close');
    closeButton.setAttribute('aria-label', 'Закрити');
    closeButton.innerHTML = '&times;';

    // Стилі через JS (можна замість цього зробити в CSS)
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '12px';
    closeButton.style.fontSize = '32px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'var(--white)';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10';
    // closeButton.style.transition = 'transform 0.2s ease';

    // closeButton.addEventListener('mouseenter', () => {
    //   closeButton.style.transform = 'scale(1.2)';
    // });

    // closeButton.addEventListener('mouseleave', () => {
    //   closeButton.style.transform = 'scale(1)';
    // });

    // Подія закриття
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      hideOverlay(overlay, () => {
        if (overlay === currentOverlay) {
          currentOverlay = null;
        }
      });
    });

    overlay.appendChild(closeButton);
  }
});




function isOverlayVisible() {
  const overlay = document.querySelector('.map-overlay.visible');
  return !!overlay;
}
function animatePointerToCity(cityName) {
  const target = document.querySelector(`.city-marker[data-name="${cityName}"]`);
  if (!target) return;

  const svg = document.getElementById("map-svg");
  const cx = parseFloat(target.getAttribute("cx"));
  const cy = parseFloat(target.getAttribute("cy"));

  // Якщо вже є pointer — не додавати ще один
  let pointerGroup = svg.querySelector(`.pointer-group[data-city="${cityName}"]`);
  if (!pointerGroup) {
    pointerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    pointerGroup.classList.add("pointer-group");
    pointerGroup.setAttribute("data-city", cityName);

    const handPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    handPath.setAttribute("d", "M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0");
    handPath.setAttribute("fill", "var(--black-mid-tone)");
    // Rotate the hand 45 degrees and scale it
    handPath.setAttribute("transform", "scale(1.3) rotate(45 8 8)");

    pointerGroup.appendChild(handPath);
    svg.appendChild(pointerGroup);
  }

  const duration = 1200;
  // Start from bottom right (add offset to position it away from the target)
  const startX = cx + 70; // 60px to the right
  const startY = cy + 90; // 60px below
  const endX = cx + 50;   // 20px to the left of the pin
  const endY = cy + 80;   // 20px below the pin

  function startAnimation() {
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      // Calculate current position along the diagonal path
      const currentX = startX + (endX - startX) * ease;
      const currentY = startY + (endY - startY) * ease;

      pointerGroup.setAttribute("transform", `translate(${currentX}, ${currentY}) scale(1.3) rotate(-90)`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          // Reset to start position and restart animation
          pointerGroup.setAttribute("transform", `translate(${startX}, ${startY}) scale(1.3) rotate(-90)`);
          startAnimation();
        }, 800);
      }
    }

    requestAnimationFrame(animate);
  }

  // Set initial position
  pointerGroup.setAttribute("transform", `translate(${startX}, ${startY}) scale(1.3) rotate(45)`);
  startAnimation();
}

animatePointerToCity("Ковель");