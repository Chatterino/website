// Testimonial carousel: slide animation, arrows, dots, autoplay.
(() => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) {
    return;
  }
  const track = carousel.querySelector(".carousel-track");
  const dots = [...carousel.querySelectorAll(".carousel-dot")];
  const count = track.children.length;
  let index = 0;

  function goTo(i) {
    index = (i + count) % count;
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
    dots.forEach((dot, d) => dot.classList.toggle("selected", d === index));
  }

  carousel
    .querySelector(".carousel-prev")
    .addEventListener("click", () => goTo(index - 1));
  carousel
    .querySelector(".carousel-next")
    .addEventListener("click", () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  const autoplay = () => setInterval(() => goTo(index + 1), 8000);
  let timer = autoplay();
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", () => {
    timer = autoplay();
  });
})();
