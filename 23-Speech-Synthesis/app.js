const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  const voiceOptions = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
  voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggleVoice();
}

function toggleVoice(startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOptions() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggleVoice();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOptions));

speakButton.addEventListener("click", toggleVoice);
// stopButton.addEventListener("click", () => toggleVoice.bind(null, false));
stopButton.addEventListener("click", () => toggleVoice(false));
