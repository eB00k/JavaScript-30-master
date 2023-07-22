# 05 - Flex Panel Gallery

## :pencil2: Takeaways

### 1. Change `flex` property to expand an image

```css
.panel {
  flex: 1;
}
/* apply 'open' class so the image will expand */
.panel.open {
  font-size: 40px;
  flex: 5;
}
```

### 2. Use `this` keyword in functions to reduce unnecessary parameters

In the example solution, he uses `this` keyword in the function because the function will be later called on `panel` element. Therefore, the `panel` parameter in my solution is totally unnecessary.

```javascript
// example solution
function toggleOpen() {
  this.classList.toggle("open");
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
```

### 3. Use `transitioned` event to avoid wrong `setTimeOut` calculation

In the example solution, the `open-active` class (transform the smaller texts to be visible) is added after the `open` class (change the image size). Since there are some CSS animation settings, it's hard to know how long time the first animation will end. Thus using `transitionend` event can make sure all the animations are done before the next action starts.

```javascript
// example solution
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
```
