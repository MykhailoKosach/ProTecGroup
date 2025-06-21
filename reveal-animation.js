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