document.querySelectorAll('.marquee-track').forEach(track => {
  const container = track.closest('.marquee-container');
  const content = track.children[0].cloneNode(true);

  while (track.scrollWidth < container.offsetWidth * 2) {
    track.appendChild(content.cloneNode(true));
  }
});

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
