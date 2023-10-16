import { animeLetter_hidden } from "../../animations/texte/animeLetter.mjs";

window.addEventListener("DOMContentLoaded", () => {
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

  const options_para = {
    delay: 0.5
  }
  animeLetter_hidden(".title-split")
  animeLetter_hidden(".subtitle-split")
  animeLetter_hidden(".chapter-split",options_animeLetter)
  animeLetter_hidden(".chapter2-split",options_animeLetter)
  animeLetter_hidden(".para-split",options_para)
  animeLetter_hidden(".para2-split" ,options_para)

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
    gsap.to(newCache1, { y: "-100%", duration: 2, ease: "power4.inOut" });
    gsap.to(
      image,
      { scale: 1, duration: 2.5, filter: "blur(0px)", ease: "power2.inOut" },
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
    gsap.to(newCache2, { y: "-100%", duration: 2, ease: "power2.inOut" });
  }
  gsap.to(containerImage, {
    height: "600px",
    duration: 2,
    ease: "power2.inOut",
  });
};

