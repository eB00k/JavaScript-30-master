const dogs = [
  { name: "Snickers", age: 2 },
  { name: "hugo", age: 8 },
];

function makeGreen() {
  const p = document.querySelector("p");
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

const p = document.querySelector("p");

// Regular
console.log("hello");

// Interpolated
console.log("Hello, My name is %s.", "Dastan");

// Styled
console.log(
  "%c Big Boy",
  "font-size: 2rem; text-shadow: 5px 5px 10px; border: 1px dashed white"
);

// warning!
console.warn("Ohh Noo.. Next time U'll get red card!!");

// Error :|
console.error("There something wrong with YOU");

// Info
console.info("Crocoldiles eat 3-4 people per year");

// Testing
console.assert(1 === 2, "That is wrong!");

// clearing
console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p);

// Grouping together
dogs.forEach((dog) => {
  // console.group(dog.name);
  console.groupCollapsed(dog.name);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(dog.name);
});

// counting
console.count("Wes");
console.count("Wes");
console.count("Sew");
console.count("Wes");
console.count("Sew");
console.count("Sew");
console.count("Sew");

// timing
console.time("fetching data");
fetch("https://api.github.com/users/eB00k")
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd("fetching data");
    console.log(data);
  });

// table
console.table(dogs);
