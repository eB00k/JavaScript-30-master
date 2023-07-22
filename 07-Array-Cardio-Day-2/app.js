// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
let isAdult = people.some(({ name, year }) => {
  return new Date().getFullYear() - year >= 19;
});
console.log({ isAdult }); // {isFrom20century: true}

// Array.prototype.every() // is everyone 19 or older?
let allAdult = people.every(
  ({ name, year }) => new Date().getFullYear() - year >= 19
);
console.log(allAdult); // false

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
let comment = comments.find(({ text, id }) => id === 823423);
console.log(comment.text); // Super good

// Array.prototype.findIndex()
// Find the comment with this ID
const idx = comments.findIndex((item) => item.id === 823423);
console.log(idx);
// delete the comment with the ID of 823423
// 1st way
// comments.splice(idx, 1);
// 2nd way not changing original comments
const newComments = comments.toSpliced(idx, 1);
console.log(comments, newComments);


