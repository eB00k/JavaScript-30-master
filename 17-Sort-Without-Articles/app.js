const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

function strip(bandName) {
  // Regular expression to match articles "a", "an", and "the" with word boundary constraints
  const articleRegex = /\b(?:a|an|the)\b\s*/gi;
  return bandName.replace(articleRegex, "").trim(); // regular expression
}

const sortedBands = bands.sort((x, y) => (strip(x) > strip(y) ? 1 : -1));
console.log(sortedBands);

document.querySelector("#bands").innerHTML = sortedBands
  .map((band) => `<li>${band}</li>`)
  .join("");

