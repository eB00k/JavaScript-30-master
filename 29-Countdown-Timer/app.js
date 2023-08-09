const displayTimeEl = document.querySelector(".display__time-left");
const displayEndTimeEl = document.querySelector(".display__end-time");
const timerButtons = document.querySelectorAll(".timer__button");
const progress = document.querySelector(".progress")
const progressBar = document.querySelector(".progress-bar")

let countdown;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  clearTimeout(countdown);
  displayEndTime(then);
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    const timePassed = seconds - secondsLeft;

    // check if we should stop it
    if (secondsLeft < 0) {
      var audio = new Audio("./mixkit-cartoon-door-melodic-bell-110.wav");
      audio.play();
      clearInterval(countdown);
      return;
    }

    // display it
    displayTimeLeft(secondsLeft);
    progressBar.style.width = `${500 * (timePassed / seconds)}px`
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}
  `;
  displayTimeEl.innerText = display;
  document.title = display;
 
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  displayEndTimeEl.innerText = `Be Back at ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const time = parseInt(this.dataset.time);
  timer(time);
}

timerButtons.forEach((timerButton) =>
  timerButton.addEventListener("click", startTimer)
);

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
