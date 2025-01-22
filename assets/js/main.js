document.body.style.overflow = 'hidden';
setTimeout(function () {
  document.body.style.overflow = 'auto';
}, 2000);
setTimeout(function () {
  document.querySelectorAll('.slide-right,.slide-left').forEach(el => {
    el.classList.add('slided');  
  })
}, 8000);

setTimeout(function () {
  window.scrollTo(0, 0); // Cuộn lên đầu trang
}, 350);

window.addEventListener('load', function () {
  //CHẠY ANIMATION KHI ĐƯỢC CUỘN TỚI
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
  //----
});