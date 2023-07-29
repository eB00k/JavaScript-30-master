// function debounce(func, wait = 20, immediate = true) {
//   var timeout;
//   return function () {
//     var context = this,
//       args = arguments;
//     var later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

// const sliderImages = document.querySelectorAll(".slide-in");

// function checkSlide(e) {
//   sliderImages.forEach((sliderImage) => {
//     // half way through the image
//     const sliderInAt =
//       window.scrollY + window.innerHeight - sliderImage.height / 2;

//     // bottom of the image
//     const imageBottom = sliderImage.offsetTop + sliderImage.height;

//     const isHalfShown = sliderInAt > sliderImage.offsetTop;
//     const isNotScrolledPast = window.scrollY < imageBottom;

//     if(isHalfShown && isNotScrolledPast) {
//       sliderImage.classList.add('active');
//     } else {
//       sliderImage.classList.remove('active')
//     }

//   });
// }

// window.addEventListener("scroll", debounce(checkSlide));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
});

const slideInImages = document.querySelectorAll(".slide-in");
slideInImages.forEach((image) => observer.observe(image));
