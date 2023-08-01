const videos = Array.from(document.querySelectorAll("[data-time]"));
const totalVideoLengthInSeconds = videos
  .map((video) => {
    const [minStr, secStr] = video.dataset.time.split(":");
    return parseInt(secStr) + parseInt(minStr) * 60;
  })
  .reduce((curTotal, sec) => curTotal + sec, 0);

let secondsLeft = totalVideoLengthInSeconds;
console.log(secondsLeft);
const hour = Math.floor(secondsLeft / 3600)
secondsLeft = secondsLeft % 3600;
const min = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
console.log(hour, min, secondsLeft);
