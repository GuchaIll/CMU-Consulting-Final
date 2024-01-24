var currentImageIndex = 0;
var totalImages = document.querySelectorAll('.image-card').length;

function openModal() {
  var mod = document.getElementById('myModal');
  updateCarousel();

  mod.style.display = 'flex';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  updateCarousel();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  updateCarousel();
}

function updateCarousel() {
  var carousel = document.querySelector('.carousel-images');
  var cardWidth = document.querySelector('.image-card').offsetWidth + 0.018 * window.innerWidth;
  carousel.style.transform = 'translateX(' + (-currentImageIndex * cardWidth) + 'px)';
}