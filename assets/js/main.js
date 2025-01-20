window.addEventListener('load', function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const { target } = entry;
        const animate = target.getAttribute('animate');
        entry.isIntersecting
          && target.classList.add(`animate-[${animate}]`);
      });
    },
    { threshold: 0.25 } // cuộn được 1/4 thì chạy animate
  );
  const items = document.querySelectorAll('[animate]');
  items.forEach(item => observer.observe(item));
});