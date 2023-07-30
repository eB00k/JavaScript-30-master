// start with strings, numbers and booleans
// let age = 100;
// let age2 = age;
// console.log(age, age2)
// age = 200;
// console.log(age, age2)

// Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
const team = players;

// You might think we can just do something like this:

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2 = players.slice();
const team3 = [].concat(players);
const team4 = [...players];
const team5 = Array.from(players);

team2[0] = "Dastan";
team3[0] = "Dastan";
team4[0] = "Dastan";
team5[0] = "Dastan";

console.log(team2);
console.log(team3);
console.log(team4);
console.log(team5);
console.log(players);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: "Wes Bos",
  age: 80,
};

// and think we make a copy:
// const captain = person;
// captain.number = 99;

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
const cap3 = { ...person, number: 99, age: 33 };
console.log(person, cap2, cap3);

// We will hopefully soon see the object ...spread

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

const wes = {
  name: "Wes",
  age: 100,
  social: {
    twitter: "@wasbos",
    facebook: "wesbos.developer",
  },
};

console.clear();
const clone = structuredClone(wes);
console.log(clone);
