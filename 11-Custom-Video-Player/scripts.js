// Get our elements
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const speed = document.querySelector(".speed");
const mute = document.querySelector(".mute");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const fullScreen = document.querySelector(".fullScreen");
console.dir(video);

// Build out function
function togglePlay() {
  // if(video.paused) {
  //     video.play()
  // } else {
  //     video.pause()
  // }
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function toggleMute() {
  video.muted = !video.muted;
  const icon = video.muted ? "mute" : "high";
  mute.innerHTML = `<i class="fa-solid fa-volume-${icon}"></i>`;
}

function toggleSpeed() {
  // let current_rate=parseFloat((document.getElementById("speed").textContent).replace('x','
  let currentRate = video.playbackRate;
  speed.textContent = `${currentRate}x`;
}

function updateButton(e) {
  const icon = this.paused ? "play" : "stop";
  toggle.innerHTML = `<i class="fa-solid fa-${icon}"></i>`;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // if(this.name === 'volume') {
  //     video.volume = this.value;
  //     console.log(video.volume);
  // } else {
  //     video.playbackRate = this.value;
  // }
  video[this.name] = this.value;
  if (this.name === "volume") this.title = this.value;
  else toggleSpeed();
}

function handleProgressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

let isOnProgress = false;
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * 100;
  video.currentTime = (scrubTime * video.duration) / 100;
  progressBar.style.flexBasis = `${scrubTime}%`;
}

function openFullScreen(e) {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
}

// hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgressUpdate);

toggle.addEventListener("click", togglePlay);

mute.addEventListener("click", toggleMute);

skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isOnProgress && scrub(e));
progress.addEventListener("mousedown", () => (isOnProgress = true));
progress.addEventListener("mouseup", () => (isOnProgress = false));

fullScreen.addEventListener("click", openFullScreen);
