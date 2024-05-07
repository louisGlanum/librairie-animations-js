window.addEventListener("DOMContentLoaded", () => {
  imagesInit();
});

const imagesInit = () => {
  const imgPath = ["./img1.png", "./img2.png", "./img3.png", "./img4.png"];
  const section = document.querySelector(".hero_section");

  let signeRotate = true;
  let index = 0;

  section.addEventListener("click", (e) => {
    // config for new img
    const cursorY = e.clientY;
    const cursorX = e.clientX;

    if (index >= imgPath.length - 1) {
      index = 0;
    } else {
      index++;
    }
    const rotateZ = signeRotate ? Math.random() * 50 : -(Math.random() * 50);
    signeRotate = !signeRotate;
    
    // create img
    const imageElement = document.createElement("img");
    imageElement.classList.add("image-flottante");
    imageElement.style.top = `${cursorY}px`;
    imageElement.style.left = `${cursorX}px`;
    imageElement.src = imgPath[index];
    section.appendChild(imageElement);

    // animation
    const tl = gsap.timeline();
    tl.to(imageElement, { scale: 1, opacity: 1, duration: 0.5, ease: "Power3.inOut" }).to(
      imageElement,
      { y: "-200vh", duration: 15, rotate: rotateZ },
      "-=0.5"
    )

    //remove img
    setTimeout(() => {
      section.removeChild(imageElement);
    }, 15000);
  });
};
