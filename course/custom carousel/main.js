const carousel = document.querySelector(".carousel");
const bg = document.querySelector(".carousel-bg");

let index = 1; // Start from first "real" slide
let images = [];

// Example API (replace with your own)
const API_URL = "https://picsum.photos/v2/list?page=2&limit=5";

async function initCarousel() {
  const res = await fetch(API_URL);
  images = await res.json();

  // Insert slides
  images.forEach((img) => {
    const el = document.createElement("img");
    el.src = img.download_url;
    carousel.appendChild(el);
  });

  // Clone first & last
  const firstClone = carousel.children[0].cloneNode(true);
  const lastClone = carousel.children[images.length - 1].cloneNode(true);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, carousel.firstChild);

  updateCarousel();
}

function updateCarousel() {
  const slideWidth = carousel.children[0].clientWidth;
  carousel.style.transform = `translateX(-${index * slideWidth}px)`;
  bg.style.backgroundImage = `url(${carousel.children[index].src})`;
}

document.querySelector(".next").addEventListener("click", () => {
  if (index >= images.length) return; // prevent spamming
  index++;
  updateCarousel();

  // Loop fix
  if (index === images.length + 1) {
    setTimeout(() => {
      carousel.style.transition = "none";
      index = 1;
      updateCarousel();
      requestAnimationFrame(
        () => (carousel.style.transition = "transform 0.5s ease")
      );
    }, 500);
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  updateCarousel();

  if (index === 0) {
    setTimeout(() => {
      carousel.style.transition = "none";
      index = images.length;
      updateCarousel();
      requestAnimationFrame(
        () => (carousel.style.transition = "transform 0.5s ease")
      );
    }, 500);
  }
});

initCarousel();
