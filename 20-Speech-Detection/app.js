window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

// Debounce function implementation
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Debounced function to handle speech recognition
const debouncedHandleRecognition = debounce((transcript, isFinal) => {
  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, "💩");
  p.textContent = poopScript;

  if (transcript.toLowerCase().includes("open youtube")) {
    window.open("https://www.youtube.com/", "_blank");
  }

  if (isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
}, 500);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  const isFinal = e.results[0].isFinal; // Define isFinal here

  debouncedHandleRecognition(transcript, isFinal);
});

recognition.addEventListener("end", recognition.start);
recognition.start();
