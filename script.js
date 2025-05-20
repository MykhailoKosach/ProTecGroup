document.querySelectorAll('.marquee-track').forEach(track => {
  const container = track.closest('.marquee-container');
  const content = track.children[0].cloneNode(true);

  while (track.scrollWidth < container.offsetWidth * 2) {
    track.appendChild(content.cloneNode(true));
  }
});
