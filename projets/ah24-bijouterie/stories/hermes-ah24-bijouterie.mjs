import { animeLetter_reveal } from "../../animations/texte/animeLetter.mjs";
import { animeUnderline } from '../../animations/texte/animeUnderline.mjs';
window.addEventListener("DOMContentLoaded", () => {


  document.querySelector('video').addEventListener('loadedmetadata', function() {
    console.log('coucouc');
    this.currentTime = 300;
  }, false);


  const containerVideo = document.querySelector(".container-video");
  const video = document.querySelector("video");
  videoOpener(containerVideo, video, true, true);

  const options_animeLetter = {
    underline : {
      active: true,
      right:0,
      duration:2,
      delay: 1,
    },
    delay:0.5,
  }

  const options_title = {
  
      duration:1,
      stagger:.2
  }
  animeLetter_reveal(".title-split",options_title)
  animeLetter_reveal(".subtitle-split", options_title)
  // animeLetter_reveal(".chapter-split",options_animeLetter)
  // animeLetter_reveal(".chapter2-split",options_animeLetter)

  animeUnderline(".chapter-split", -5, 1, 0)
  animeUnderline(".chapter2-split", -5, 1, 0.1)
  // animeLetter_reveal(".para-split",options_para)
  // animeLetter_reveal(".para2-split" ,options_para)

});

const videoOpener = (containerImage, image, cache1 = false, cache2 = false) => {
  console.log(containerImage.classList.value);
  if (cache1) {
    const divElem = document.createElement("div");
    divElem.classList.add(`cache1-image__${containerImage.classList.value}`);
    console.log(divElem);
    containerImage.appendChild(divElem);
  }
  if (cache2) {
    const divElem = document.createElement("div");
    divElem.classList.add(`cache2-image__${containerImage.classList.value}`);
    containerImage.appendChild(divElem);
  }

  const newCache1 = document.querySelector(
    `.cache1-image__${containerImage.classList.value}`
  );
  const newCache2 = document.querySelector(
    `.cache2-image__${containerImage.classList.value}`
  );
  if (newCache1) {
    gsap.to(newCache1, { y: "-100%", duration: 1, ease: "power4.inOut" });
    gsap.to(
      image,
      { scale: 1, duration: 1.5, filter: "blur(0px)", ease: "power2.inOut" },
      "=-2"
    );
  } else {
    gsap.to(image, {
      scale: 1,
      duration: 2.5,
      filter: "blur(0px)",
      ease: "power2.inOut",
    });
  }
  if (newCache2) {
    gsap.to(newCache2, { y: "-100%", duration: 1, ease: "power2.inOut" });
  }
  gsap.to(containerImage, {
    height: "80vh",
    duration: 1,
    ease: "power2.inOut",
    delay:.2
  });
};

