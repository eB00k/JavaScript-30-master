let keySequence = [];
let word = "dastan";

window.addEventListener("keyup", (e) => {
  keySequence.push(e.key);
  keySequence.splice(-word.length - 1, keySequence.length - word.length);
  console.log(keySequence);

  if (keySequence.join("").toLowerCase().includes(word)) {
    console.log("You Found it !!!");
    cornify_add()
  }
});
