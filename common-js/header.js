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























