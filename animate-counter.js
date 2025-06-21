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