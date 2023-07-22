const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  const panel = document.querySelector(".open");
  if (panel) {
    if (panel === this) {
      this.classList.toggle("open");
    } else {
      panel.classList.remove("open");
      this.classList.add("open");
    }
  } else {
    this.classList.add("open");
  }
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
