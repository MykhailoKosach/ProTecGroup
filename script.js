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

    btnDistribution.addEventListener('click', () => filterLogos('distribution'));
    btnLogistic.addEventListener('click', () => filterLogos('logistic'));

    function filterLogos(type) {
        const allLogos = document.querySelectorAll('.logo-item');

        allLogos.forEach(logo => {
            if (type === 'distribution') {
                logo.classList.contains('logo-distribution')
                    ? logo.style.display = 'flex'
                    : logo.style.display = 'none';
            } else if (type === 'logistic') {
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
//   document.addEventListener('DOMContentLoaded', function () {
//     const openBtn = document.getElementById('openPartnersOverlay');
//     const overlay = document.getElementById('partnersOverlay');
//     if (openBtn && overlay) {
//       openBtn.addEventListener('click', () => {
//         overlay.classList.add('active');
//       });

//       // Додатково: закривати по кліку на фон
//       overlay.addEventListener('click', (e) => {
//         if (e.target === overlay) {
//           overlay.classList.remove('active');
//         }
//       });

//       // Закриття по Esc
//       document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//           overlay.classList.remove('active');
//         }
//       });
//     } else {
//       console.error('Не знайдено openPartnersOverlay або partnersOverlay');
//     }
//   });

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





