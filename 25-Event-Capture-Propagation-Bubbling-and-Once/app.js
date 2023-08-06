const divs = document.querySelectorAll("div");
const btn = document.querySelector(".btn");

function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); 
}

divs.forEach((div) =>
  div.addEventListener("click", logText, {
    capture: true,
  })
); // capturing propogation

btn.addEventListener("click", logText, { once: true });
