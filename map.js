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
    handPath.setAttribute("d", "M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025");
    handPath.setAttribute("fill", "var(--red)");
    handPath.setAttribute("transform", "scale(1.3)");

    pointerGroup.appendChild(handPath);
    svg.appendChild(pointerGroup);
  }

  const duration = 1200;
  const startX = -50;
  const endX = cx - 12;

  function startAnimation() {
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const currentX = startX + (endX - startX) * ease;
      pointerGroup.setAttribute("transform", `translate(${currentX}, ${cy + 3}) scale(1.3)`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          pointerGroup.setAttribute("transform", `translate(${startX}, ${cy + 3}) scale(1.3)`);
          startAnimation();
        }, 800);
      }
    }

    requestAnimationFrame(animate);
  }

  pointerGroup.setAttribute("transform", `translate(${startX}, ${cy + 3}) scale(1.3)`);
  startAnimation();
}

animatePointerToCity("Ковель");