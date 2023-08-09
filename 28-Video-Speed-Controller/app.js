const speedEl = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector("video");
const controllerHeight = speedEl.clientHeight;

function mouseMove(e) {
  const curHeight = e.offsetY;
  //   const curHeight = e.pageY - this.offsetTop;
  const percent = (curHeight * 100) / controllerHeight;
  const min = 0.5;
  const max = 3;
  const percentage = Math.round(percent);
  const rate = ((percentage * (max - min)) / 100 + min).toFixed(2);
  bar.style.height = percentage + "%";
  bar.innerText = rate + "×";
  video.playbackRate = rate;
}

speedEl.addEventListener("mousemove", mouseMove);
