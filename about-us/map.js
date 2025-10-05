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

// // ========== Допоміжні функції ==========
// function geoToPixel(lat, lon) {
//   const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
//   const y = ((latMax - lat) / (latMax - latMin)) * height;
//   return { x: Math.round(x), y: Math.round(y) };
// }

// // ========== Ініціалізація SVG ==========
// function initMap() {
//   const svg = document.getElementById("map-svg");
//   if (!svg) {
//     console.error("SVG map element not found!");
//     return;
//   }

//   cities.forEach(city => {
//     let { x, y } = geoToPixel(city.lat, city.lon);

//     // Зміщення для окремих міст
//     let offsetX = 0, offsetY = 0;
//     if (city.name === "Київ") {
//       offsetY = -25;
//       offsetX = 10;
//     } else if (city.name === "Старі Петрівці") {
//       offsetY = -10;
//       offsetX = -10;
//     }

//     // === Великі міста (іконка + текст) ===
//     if (["Київ", "Львів"].includes(city.name)) {
//       const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
//       group.classList.add("city-group");
//       group.setAttribute("data-name", city.name);
//       group.style.pointerEvents = "auto";
//       group.style.cursor = "pointer";
//       group.setAttribute("transform", `translate(${x + offsetX}, ${y + offsetY})`);

//       const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
//       icon.setAttribute("d", "M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5");
//       icon.setAttribute("fill", "var(--red, #e63946)");
//       icon.setAttribute("transform", "translate(-12, -24) scale(1.5)");
//       group.appendChild(icon);

//       const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//       text.setAttribute("x", 15);
//       text.setAttribute("y", -5);
//       text.setAttribute("fill", "var(--red, #e63946)");
//       text.setAttribute("font-size", "18px");
//       text.setAttribute("font-family", "Lato-SemiBold, sans-serif");
//       text.setAttribute("font-weight", "bold");
//       text.textContent = city.name;
//       group.appendChild(text);

//       svg.appendChild(group);
//     } else {
//       // === Інші міста (круг) ===
//       const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//       circle.classList.add("city-marker");
//       circle.setAttribute("data-name", city.name);
//       circle.setAttribute("cx", x + offsetX);
//       circle.setAttribute("cy", y + offsetY);
//       circle.setAttribute("r", 7);
//       circle.setAttribute("fill", "var(--red, #e63946)");
//       circle.style.pointerEvents = "auto";
//       circle.style.cursor = "pointer";
//       svg.appendChild(circle);
//     }
//   });

//   document.querySelectorAll(".city-marker, g.city-group").forEach(addPointerHandler);
// }

// // ========== Overlay Logic ==========
// let currentOverlay = null;

// function hideOverlay(overlay, callback) {
//   overlay.classList.add('fade-out');
//   overlay.classList.remove('visible');
//   overlay.addEventListener('transitionend', function handler() {
//     overlay.style.display = 'none';
//     overlay.classList.remove('fade-out');
//     overlay.removeEventListener('transitionend', handler);
//     if (typeof callback === 'function') callback();
//   }, { once: true });
// }

// function showOverlay(overlay) {
//   overlay.style.display = 'flex';
//   requestAnimationFrame(() => overlay.classList.add('visible'));
// }

// function showOverlayForCity(cityName) {
//   const safeName = CSS.escape(cityName);
//   const newOverlay = document.querySelector(`.map-overlay[data-city="${safeName}"]`);
//   if (!newOverlay || currentOverlay === newOverlay) return;

//   document.querySelectorAll(".pointer-group").forEach(p => p.remove());

//   if (currentOverlay && currentOverlay !== newOverlay) {
//     hideOverlay(currentOverlay, () => {
//       showOverlay(newOverlay);
//       currentOverlay = newOverlay;
//     });
//   } else if (!currentOverlay) {
//     showOverlay(newOverlay);
//     currentOverlay = newOverlay;
//   }
// }

// // ========== iOS-friendly Pointer Handler ==========
// function addPointerHandler(el) {
//   const handler = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const cityName = el.getAttribute("data-name");
//     if (!cityName) return;
//     showOverlayForCity(cityName);
//   };

//   // Універсальна підтримка
//   el.addEventListener("pointerup", handler);
//   el.addEventListener("touchend", handler);
//   el.addEventListener("click", handler);
// }

// document.addEventListener("pointerup", (event) => {
//   const isClickInsideOverlay = event.target.closest('.map-overlay');
//   const isClickOnMarker = event.target.closest('.city-marker, .city-icon, .city-label, g.city-group');
//   if (!isClickInsideOverlay && !isClickOnMarker && currentOverlay) {
//     hideOverlay(currentOverlay, () => currentOverlay = null);
//   }
// });

// // Додаємо кнопку "Закрити" з підтримкою iOS tap
// document.querySelectorAll('.map-overlay').forEach(overlay => {
//   if (!overlay.querySelector('.overlay-close')) {
//     const closeButton = document.createElement('button');
//     closeButton.classList.add('overlay-close');
//     closeButton.setAttribute('aria-label', 'Закрити');
//     closeButton.innerHTML = '&times;';
//     Object.assign(closeButton.style, {
//       position: 'absolute',
//       top: '10px',
//       right: '12px',
//       fontSize: '32px',
//       background: 'none',
//       border: 'none',
//       color: 'var(--white, #fff)',
//       cursor: 'pointer',
//       zIndex: '10',
//       WebkitTapHighlightColor: 'transparent'
//     });

//     const onClose = (e) => {
//       e.stopPropagation();
//       e.preventDefault();
//       hideOverlay(overlay, () => {
//         if (overlay === currentOverlay) currentOverlay = null;
//       });
//     };

//     closeButton.addEventListener('pointerup', onClose);
//     closeButton.addEventListener('touchend', onClose);
//     closeButton.addEventListener('click', onClose);

//     overlay.appendChild(closeButton);
//   }
// });

// function isOverlayVisible() {
//   return !!document.querySelector('.map-overlay.visible');
// }

// // ========== Анімація Pointer ==========
// let pointerAnimationId = null;

// function animatePointerToCity(cityName) {
//   cancelAnimationFrame(pointerAnimationId);

//   const safeName = CSS.escape(cityName);
//   const target = document.querySelector(`.city-marker[data-name="${safeName}"]`);
//   if (!target) return;

//   const svg = document.getElementById("map-svg");
//   if (!svg) return;

//   const cx = parseFloat(target.getAttribute("cx"));
//   const cy = parseFloat(target.getAttribute("cy"));

//   svg.querySelectorAll(".pointer-group").forEach(p => p.remove());

//   const pointerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
//   pointerGroup.classList.add("pointer-group");
//   pointerGroup.setAttribute("data-city", cityName);

//   const handPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//   handPath.setAttribute("d", "M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0");
//   handPath.setAttribute("fill", "var(--black-mid-tone, #333)");
//   handPath.setAttribute("transform", "scale(1.3) rotate(45 8 8)");
//   pointerGroup.appendChild(handPath);
//   svg.appendChild(pointerGroup);

//   const duration = 800;
//   const startX = cx - 10;
//   const startY = cy - 45;
//   const endX = cx + 16;
//   const endY = cy - 85;

//   function startAnimation() {
//     const startTime = performance.now();
//     function animate(time) {
//       const elapsed = time - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const ease = 1 - Math.pow(1 - progress, 3);
//       const currentX = startX + (endX - startX) * ease;
//       const currentY = startY + (endY - startY) * ease;
//       pointerGroup.setAttribute("transform", `translate(${currentX}, ${currentY}) scale(1.3) rotate(45)`);
//       if (progress < 1) {
//         pointerAnimationId = requestAnimationFrame(animate);
//       } else {
//         setTimeout(startAnimation, 800);
//       }
//     }
//     pointerAnimationId = requestAnimationFrame(animate);
//   }

//   pointerGroup.setAttribute("transform", `translate(${startX}, ${startY}) scale(1.3) rotate(45)`);
//   startAnimation();
// }

// // 🎯 Ініціалізація
// document.addEventListener("DOMContentLoaded", () => {
//   initMap();
//   animatePointerToCity("Дрогобич");
// });

// // ========== CSS для кращої підтримки iOS (додати у стилі) ==========
// const style = document.createElement('style');
// style.textContent = `
// .city-group, .city-marker {
//   pointer-events: all !important;
//   cursor: pointer !important;
//   -webkit-tap-highlight-color: transparent;
// }
// svg#map-svg {
//   touch-action: manipulation;
// }
// `;
// document.head.appendChild(style);
// ========== Конфігурація мапи ==========
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

// ========== Допоміжні функції ==========
function geoToPixel(lat, lon) {
  const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
  const y = ((latMax - lat) / (latMax - latMin)) * height;
  return { x: Math.round(x), y: Math.round(y) };
}

// ========== Overlay Logic ==========
let currentOverlay = null;

function hideOverlay(overlay, callback) {
  overlay.classList.add('fade-out');
  overlay.classList.remove('visible');
  overlay.addEventListener('transitionend', function handler() {
    overlay.style.display = 'none';
    overlay.classList.remove('fade-out');
    overlay.removeEventListener('transitionend', handler);
    if (callback) callback();
  }, { once: true });
}

function showOverlay(overlay) {
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('visible'));
}

function showOverlayForCity(cityName) {
  const safeName = CSS.escape(cityName);
  const overlay = document.querySelector(`.map-overlay[data-city="${safeName}"]`);
  if (!overlay) return;

  if (currentOverlay && currentOverlay !== overlay) {
    hideOverlay(currentOverlay, () => {
      showOverlay(overlay);
      currentOverlay = overlay;
    });
  } else if (!currentOverlay) {
    showOverlay(overlay);
    currentOverlay = overlay;
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest('.map-overlay') && !e.target.closest('.city-hitbox, .city-group')) {
    if (currentOverlay) hideOverlay(currentOverlay, () => currentOverlay = null);
  }
});

// ========== Pointer Handler ==========
function addPointerHandler(el) {
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cityName = el.getAttribute("data-name");
    if (cityName) showOverlayForCity(cityName);
  };
  el.addEventListener("click", handler);
  el.addEventListener("touchend", handler);
  el.addEventListener("touchstart", handler); // миттєвий tap для iOS
}

// ========== Ініціалізація мапи ==========
function initMap() {
  const svg = document.getElementById("map-svg");
  if (!svg) return console.error("SVG map element not found!");

  cities.forEach(city => {
    let { x, y } = geoToPixel(city.lat, city.lon);
    let offsetX = 0, offsetY = 0;

    if (city.name === "Київ") { offsetY = -25; offsetX = 10; }
    if (city.name === "Старі Петрівці") { offsetY = -10; offsetX = -10; }

    if (["Київ", "Львів"].includes(city.name)) {
      // Великі міста – група з іконкою та текстом
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.classList.add("city-group");
      group.setAttribute("data-name", city.name);
      group.setAttribute("transform", `translate(${x + offsetX}, ${y + offsetY})`);
      group.style.cursor = "pointer";

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
      icon.setAttribute("d", "M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"); // твій SVG path
      icon.setAttribute("fill", "var(--red, #e63946)");
      icon.setAttribute("transform", "translate(-12, -24) scale(1.5)");
      group.appendChild(icon);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", 15);
      text.setAttribute("y", -5);
      text.setAttribute("fill", "var(--red, #e63946)");
      text.setAttribute("font-size", "18px");
      text.setAttribute("font-family", "Lato-SemiBold, sans-serif");
      text.setAttribute("font-weight", "bold");
      text.textContent = city.name;
      group.appendChild(text);

      svg.appendChild(group);
      addPointerHandler(group);
    } else {
      // Маленькі міста – hitbox великий, прозорий
      const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      hit.classList.add("city-hitbox");
      hit.setAttribute("data-name", city.name);
      hit.setAttribute("cx", x + offsetX);
      hit.setAttribute("cy", y + offsetY);
      hit.setAttribute("r", 20);
      hit.setAttribute("fill", "transparent");
      hit.setAttribute("fill-opacity", "0");
      hit.setAttribute("stroke", "none");
      svg.appendChild(hit);
      addPointerHandler(hit);

      // Видима маленька крапка
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x + offsetX);
      circle.setAttribute("cy", y + offsetY);
      circle.setAttribute("r", 7);
      circle.setAttribute("fill", "var(--red, #e63946)");
      circle.style.pointerEvents = "none";
      svg.appendChild(circle);
    }
  });
}

// Додаємо кнопку "Закрити" з підтримкою iOS tap
document.querySelectorAll('.map-overlay').forEach(overlay => {
  if (!overlay.querySelector('.overlay-close')) {
    const closeButton = document.createElement('button');
    closeButton.classList.add('overlay-close');
    closeButton.setAttribute('aria-label', 'Закрити');
    closeButton.innerHTML = '&times;';
    Object.assign(closeButton.style, {
      position: 'absolute',
      top: '10px',
      right: '12px',
      fontSize: '32px',
      background: 'none',
      border: 'none',
      color: 'var(--white, #fff)',
      cursor: 'pointer',
      zIndex: '10',
      WebkitTapHighlightColor: 'transparent'
    });

    const onClose = (e) => {
      e.stopPropagation();
      e.preventDefault();
      hideOverlay(overlay, () => {
        if (overlay === currentOverlay) currentOverlay = null;
      });
    };

    closeButton.addEventListener('pointerup', onClose);
    closeButton.addEventListener('touchend', onClose);
    closeButton.addEventListener('click', onClose);

    overlay.appendChild(closeButton);
  }
});

// function isOverlayVisible() {
//   return !!document.querySelector('.map-overlay.visible');
 
// }



// ========== Анімація Pointer ==========
let pointerAnimationId = null;
function animatePointerToCity(cityName) {
  cancelAnimationFrame(pointerAnimationId);
  const svg = document.getElementById("map-svg");
  const target = document.querySelector(`.city-hitbox[data-name="${cityName}"], .city-group[data-name="${cityName}"]`);
  if (!target) return;

  const cx = parseFloat(target.getAttribute("cx") || 0);
  const cy = parseFloat(target.getAttribute("cy") || 0);

  let pointerGroup = svg.querySelector(`.pointer-group[data-city="${cityName}"]`);
  if (!pointerGroup) {
    pointerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    pointerGroup.classList.add("pointer-group");
    pointerGroup.setAttribute("data-city", cityName);

    const handPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    handPath.setAttribute("d", "M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0");
    handPath.setAttribute("fill", "var(--black-mid-tone, #333)");
    handPath.setAttribute("transform", "scale(1.3) rotate(45 8 8)");

    pointerGroup.appendChild(handPath);
    svg.appendChild(pointerGroup);
  }

  const duration = 800;
  const startX = cx - 10;
  const startY = cy - 45;
  const endX = cx + 15;
  const endY = cy - 85;

  function startAnimation() {
    const startTime = performance.now();
    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentX = startX + (endX - startX) * ease;
      const currentY = startY + (endY - startY) * ease;
      pointerGroup.setAttribute("transform", `translate(${currentX}, ${currentY}) scale(1.3) rotate(45)`);
      if (progress < 1) pointerAnimationId = requestAnimationFrame(animate);
      else setTimeout(startAnimation, 800);
    }
    pointerAnimationId = requestAnimationFrame(animate);
  }

  pointerGroup.setAttribute("transform", `translate(${startX}, ${startY}) scale(1.3) rotate(45)`);
  startAnimation();
}

// ========== CSS ==========
const style = document.createElement('style');
style.textContent = `
.city-hitbox {
  cursor: pointer !important;
  -webkit-tap-highlight-color: transparent;
  pointer-events: all;
  touch-action: manipulation;
}
svg#map-svg {
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
}
`;
document.head.appendChild(style);

// ========== Запуск ==========
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  animatePointerToCity("Дрогобич");
});
