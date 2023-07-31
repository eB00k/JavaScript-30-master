const addItems = document.querySelector(".add-items"); // form
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || []; // if there is no items in LS it sets to empty array
const checkAllBtn = document.querySelector(".check-all");
const clearAllBtn = document.querySelector(".clear-all");

// sets the data to localStorage
const setLocalStorage = () => {
  localStorage.setItem("items", JSON.stringify(items));
};

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
            <label for="item${i}">${plate.text}</label>
            <button class="delete-btn" data-index=${i}>X<buttun>
          </li>
          `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; // skip thsi unless it's a an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  setLocalStorage();
  populateList(items, itemsList);
}

function deleteItem(e) {
  if (!e.target.matches(".delete-btn")) return;
  const index = parseInt(e.target.dataset.index);
  items.splice(index, 1);
  setLocalStorage();
  populateList(items, itemsList);
}

function addItem(e) {
  e.preventDefault(); // stops the page from reloading
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  setLocalStorage();
  this.reset(); // clears the form
}

function toggleCheck(check) {
  items.forEach((item) => {
    item.done = check;
  });
  setLocalStorage();
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
itemsList.addEventListener("click", deleteItem);
checkAllBtn.addEventListener("click", () => toggleCheck(true));
clearAllBtn.addEventListener("click", () => toggleCheck(false));

populateList(items, itemsList); // whenever page reloads populate list works
