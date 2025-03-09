let currentIndex = 1;
let totalSlides = 7;

//array to store path for images of top box
const topImages = [
  "",
  "./images/dndmap.jpeg",
  "./images/dndtoken.jpeg",
  "./images/search.webp",
  "./images/play.jpeg",
  "./images/cmsoon.jpeg",
  "./images/cmsoon.jpeg",
];

//array to store the texts for each slide
const slideTexts = [
  "",
  "You have the ability to upload personal maps with or without grids and a ruler feature",
  "The ability to add tokens to the map allows your game to be taken from the mind right to the screen!",
  "Ever not known what a specific rule is? Now you don't need to worry with our built-in Rules Lookup!",
  "Join your friends to play online together on this free Virtual Table Top Website!                        ",
  "Coming Soon",
  "Coming Soon",
];
//changes active slide appearing on screeen
const updateActiveSlide = () => {
  document.querySelectorAll(".title").forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

//updating index in order to advance to the next active slide
const handleSlider = () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 1;
  }
  //animation on the slide titles to move into middle of screen
  gsap.to(".slide-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);

      updateImages(currentIndex + 1);
    },
    x: `-${(currentIndex - 1) * 11.1111}%`,
    duration: 2,
    ease: "power4.out",
  });
};
//changing images and text for each slide
const updateImages = () => {
  const imgSrc = topImages[currentIndex];
  const imgTop = document.createElement("img");
  const imgBottom = document.createElement("img");
  const slideText = document.querySelector(".slide-text");

  imgTop.src = imgSrc;
  imgBottom.src = "./images/scrollpic.jpeg";
  slideText.textContent = slideTexts[currentIndex];

  imgTop.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  imgBottom.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  imgTop.style.transform = "scale(2)";
  imgBottom.style.transform = "scale(2)";

  const imgTopContainer = document.querySelector(".img-top");
  const imgBottomContainer = document.querySelector(".img-bottom");
  imgTopContainer.appendChild(imgTop);
  imgBottomContainer.appendChild(imgBottom);


  gsap.to([imgTop, imgBottom], {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transform: "scale(1)",
    duration: 2,
    ease: "power4.out",
    stagger: 0.15,
    onComplete:trimExcessImages()
    
  });
};

//removing the images at the end in order to repeat images
const trimExcessImages = () => {
  const container = document.querySelector(".img-top");

  const images = Array.from(container.querySelectorAll("img"));
  const exessCount = images.length - 5;

  if (exessCount > 0) {
    images
      .slice(0, exessCount)
      .forEach((image) => container.removeChild(image));
  }
};
//Click event to move slides
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleSlider);

  updateImages(2);
  updateActiveSlide();
});
