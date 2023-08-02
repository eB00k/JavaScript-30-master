# 20 - Native Speech Recognition

### Main goal

- No need for external libraries or tools for speech recognition! (However this native api is currently only supported in Chrome and it doesn't work offline)

## :pushpin: Solution

### My solution

```javascript
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
```

### Example solution

```javascript
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, "💩");
  p.textContent = poopScript;

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

recognition.addEventListener("end", recognition.start);
recognition.start();
```

## :pencil2: Takeaways

### 1. The `SpeechRecognition` interface and the Web Speech API

The Web Speech API enables us to incorporate voice data into web apps, like text-to-speech (`SpeechSynthesis`) or speech recognition (`SpeechRecognition`). Here we are using the `SpeechRecognition` interface.

To initialize a speed recognition, we can use `new` keyword to create a new `SpeechRecognition` object.

```javascript
const recognition = new SpeechRecognition();
```

#### Instance properties

There are some properties that we can set up before starting.

- `SpeechRecognition.interimResults` controls if the interim results should be returned. If set to `true`, interim results will be returned even the recognition is not yet finished.
- `SpeechRecognition.lang` specifies the language of the current `SpeechRecognition`. If not specified, it defaults to the HTML `lang` attribute value.
- `SpeechRecognition.continuous` controls whether continuous results are returned for each recognition, or only a single result. The default value is `false`.

```javascript
recognition.interimResults = true;
recognition.lang = "en-US";
```

#### Instance events

This API also provides some events to play with. In the example solution, he uses the `result` event and the `end` event. The former fires when the speech recognition service returns a result (either a word or a phrase) and the latter is fired when the speech recognition service has disconnected. There's also a `start` event which fires when the speech recognition service has begun listening.

```javascript
recognition.addEventListener("result", (e) => {
  // ...
});

recognition.addEventListener("end", recognition.start);
```

#### Instance methods

As for the methods, there are three of them. We can use `start()` to start the speech recognition and `stop()` to stop the speech recognition. As for `abort()`, it also stops the speech recognition but it doesn't return any recognition result.

```javascript
recognition.start();
recognition.stop();
recognition.abort();
```

### 2. Replace certain transcript content with... emoji?

After getting the transcripts inside of the result (they are nested very deeply inside of the object, therefore we have to use `map()` to extract them), we can do whatever we want with them.

In the example solution, he replaces all the `poop`, `poo`, `shit`, `dump` in the transcript with a `💩` emoji. Note that he is using a regular expression here.

```javascript
recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, "💩");
  p.textContent = poopScript;

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});
```

### 3. The `contenteditable` global attribute

In the HTML markup of the example solution, he uses the `contenteditable` attribute to make the text area editable. When the user clicks on the text, the cursor changes and the browser outlines the element in which the text can be edited.

The attribute can take one of the two values: `true` or `false`, to indicate if the element is not editable. In the example solution he didn't specify any value to the attribute. In this case its value is treated as an empty string, which is the same as `true`.

```html
<div class="words" contenteditable></div>
```

### 4. The `Debounce Function` 

The debounce function is a utility that helps control the frequency of function executions, particularly in scenarios where rapid and frequent events might occur. It ensures that a function is called only after a certain time has passed since the last invocation, preventing unnecessary or excessive executions.

## How It Works

The debounce function delays the execution of a given function until a specified time period has elapsed since the last call. If the function is invoked again within that time frame, the timer is reset, and the execution is postponed again. This is especially useful for scenarios like user input or events that can trigger multiple times in quick succession.

## Key Takeaways

1. **Optimized Function Calls**: Debouncing helps optimize performance by reducing the number of times a function is called, which can be crucial for resource-intensive tasks or real-time applications.

2. **Responsive User Experience**: When used with user interactions like typing or scrolling, debouncing ensures a smoother and more responsive user experience, as it delays the execution until the user has completed the action.

3. **Controlled Network Requests**: Debouncing can be used to control the frequency of network requests. For example, when implementing search functionality, it prevents sending requests for every keystroke and waits until the user pauses before making the request.

4. **Preventing "Double" Clicks**: In scenarios where a user might accidentally trigger multiple clicks (e.g., submitting a form), debouncing can prevent unintended double-click actions.

5. **Throttling vs. Debouncing**: While similar, debouncing and throttling (limiting the frequency of function calls) have different use cases. Debouncing ensures that a function is executed after a delay since the last call, while throttling limits the function's execution rate to a specified interval.

6. **Adjustable Delay**: The debounce function allows you to specify the delay time according to your needs, balancing between responsiveness and reduction of unnecessary calls.

7. **Implementation Flexibility**: The debounce function can be easily integrated into various applications and event listeners, enhancing the overall usability and responsiveness of your code.

## Example Usage

Here's a simple example of using the debounce function to improve user experience in handling search input:

```javascript
const searchInput = document.querySelector('#search-input');

function performSearch(query) {
  // Perform actual search based on the query
  console.log('Searching for:', query);
}

const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  debouncedSearch(query);
});
```

## :book: References

- [Web Speech API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [SpeechRecognition - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [SpeechRecognition: result event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event)
- [contenteditable - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [[JS30] Day20: Native Speech Recognition (Chinese)](https://pjchender.dev/js30/js30-day20/)
