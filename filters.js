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