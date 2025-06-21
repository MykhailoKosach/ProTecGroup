  document.addEventListener("DOMContentLoaded", function () {
    const DELAY_MS = 600;
    const MAX_WIDTH = 1023;

    document.querySelectorAll('a.link-delay').forEach(link => {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= MAX_WIDTH) {
          e.preventDefault(); // Зупиняємо миттєвий перехід

          const href = this.getAttribute('href');
          this.classList.add('clicked'); // Додати клас для анімації

          setTimeout(() => {
            window.location.href = href;
          }, DELAY_MS);
        }
        // для великих екранів перехід без затримки
      });
    });
  });