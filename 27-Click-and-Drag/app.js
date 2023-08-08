const slider = document.querySelector(".items");

let isDown = false;
let startX;
let scrollLeft;

function handleMouseDown(e) {
  isDown = true;
  slider.classList.add("active");
  //   startX = e.clientX - slider.offsetLeft;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

function handleMouseLeave(e) {
  isDown = false;
  slider.classList.add("active");
}

function handleMouseUp(e) {
  isDown = false;
  slider.classList.add("active");
}

function handleMouseMove(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
}

slider.addEventListener("mousedown", handleMouseDown);
slider.addEventListener("mouseleave", handleMouseLeave);
slider.addEventListener("mousemove", handleMouseMove);
slider.addEventListener("mouseup", handleMouseUp);
