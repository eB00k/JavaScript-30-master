const textEl = document.querySelector("h1");
console.log(textEl);

function moveShadow(e) {
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  let [playerX, playerY] = [e.clientX, e.clientY];
  let [shadowX, shadowY] = [width - playerX, height - playerY];
  textEl.style.textShadow = `${shadowX}px ${shadowY}px 0 rgba(255, 0, 80),
  ${-shadowX}px ${-shadowY}px 0 rgba(0, 242, 234)
  `;
}

window.addEventListener("mousemove", moveShadow);
