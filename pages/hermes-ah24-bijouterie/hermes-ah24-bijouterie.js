

window.addEventListener('DOMContentLoaded', ()=>{
    const containerVideo = document.querySelector('.container-video');
    const video = document.querySelector('video');
    videoOpener(containerVideo, video, true, true);

    const text = new SplitType('.splt')


let timeout = false
const delay = 500
window.addEventListener('resize', () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    text.split()
    console.log('ayaya');
  }, delay)
})

console.log(text.lines);
})

const videoOpener = (
    containerImage,
    image,
    cache1 = false,
    cache2 = false
  ) => {
      console.log(containerImage.classList.value)

    if (cache1) {
      const divElem = document.createElement("div");
      divElem.classList.add(`cache1-image__${containerImage.classList.value}`);
      console.log(divElem)
      containerImage.appendChild(divElem);
    }
    if (cache2) {
      const divElem = document.createElement("div");
      divElem.classList.add(`cache2-image__${containerImage.classList.value}`);
      containerImage.appendChild(divElem);
    }
  
    const newCache1 = document.querySelector(`.cache1-image__${containerImage.classList.value}`);
    const newCache2 = document.querySelector(`.cache2-image__${containerImage.classList.value}`);
    if (newCache1) {
      gsap.to(newCache1, {y: "-100%", duration: 2, ease: "power4.inOut"});
      gsap.to(image,{scale: 1, duration: 2.5, filter: "blur(0px)", ease: "power2.inOut"},"=-2");
    } else {
      gsap.to(image, {scale: 1, duration: 2.5, filter: "blur(0px)", ease: "power2.inOut"});
    }
    if (newCache2) {
      gsap.to(newCache2, {y: "-100%", duration: 2, ease: "power2.inOut"});
    }
    gsap.to(containerImage, {height: "600px", duration: 2, ease: "power2.inOut"});
  };
  

