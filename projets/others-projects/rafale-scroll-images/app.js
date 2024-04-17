console.clear();
const title = document.querySelector('.title')
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

// Nombre de frames voulu
const frameCount = 147;

// Création des urls 
const currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
    index + 1
  )
    .toString()
    .padStart(4, "0")}.jpg`;

const images = [];
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);

  images.push(img);
}
const tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".canvas-container",
        start: "top top",
        end: "+=2500",
        markers: true,
        pin: true,
        scrub: 0.5
    }
})
console.log(frameCount - 1);
tl.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  onUpdate: render
}).to(title,{opacity:1},"<").to(title, {opacity:0})

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0);
}