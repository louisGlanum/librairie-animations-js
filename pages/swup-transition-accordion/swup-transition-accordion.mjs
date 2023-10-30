import {cacheCard} from './cache-card.mjs'
let triggerSrc;
let triggerTitle;

function init() {
  const images = document.querySelectorAll(".container .card img");
  const imagesLineUp = document.querySelectorAll(".line-up img");
  const cards = document.querySelectorAll(".card");
  const caches = document.querySelectorAll(".cache");


    cards.forEach((card) => {
      card.classList.add("init");
    });
    images.forEach((img, key) => {
      img.src = `https://source.unsplash.com/random?sig=${key}`;
    });
    imagesLineUp.forEach((img, key) => {
      img.src = `https://source.unsplash.com/random?sig=${key}`;
    });
  
    caches.forEach((cache) => {
      cache.addEventListener("click", () => {
        console.log("click");
        Animate(cache, cards);
      });
    });
}

const swup = new Swup({
  plugins: [
    new SwupJsPlugin({
      animations: [
        {
          from: "index.html", // matches any route
          to: "project.html", // matches any route
          out: (done) => {
            const heroSection = document.querySelector('.hero-section');
            if(!heroSection){

              setTimeout(()=>{
                done();
              }, 1400)
            }else{
              done()
            }
          },
          in: (done) => {
            console.log("in");
            const heroSection = document.querySelector('.hero-section');
      
            if(heroSection){
              heroSection.style.height="100vh"
              console.log(triggerSrc)
              heroSection.style.backgroundImage= `url('${triggerSrc}')`
              const titleProject = document.querySelector('.title-project')
              titleProject.innerHTML = triggerTitle
              gsap.to(heroSection,{
                height:'80vh',
                duration:2,
                onComplete: done,
                ease: "power4.out",
            })
            gsap.to(titleProject,{
              opacity:1,
              duration:1,
              delay:1
            })
            }
            done();
          },
        },
      ],
    }),
    new SwupHeadPlugin({
      persistAssets: false
    })
  ],
});


if (document.readyState === "complete") {
  init();
  cacheCard();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init()
    cacheCard();
  });
}
swup.hooks.on("page:view", () => {
  init();
  cacheCard();
});




function Animate(cache, cards) {
  const img = cache.previousElementSibling;
  triggerSrc = img.src;
  console.log(triggerSrc)

  setTimeout(() => {
    img.style.position = "absolute";
    img.style.zIndex = "99";
  }, 500);

  const rect = img.getBoundingClientRect();
  const positionX = rect.left;
  const positionY = rect.top;

  const cardFocus = img.closest(".card");
  triggerTitle = cardFocus.querySelector('.title').innerHTML
  console.log(triggerTitle)

  cards.forEach((card) => {
    cardFocus.style.height = "70vh";
    cardFocus.style.flex = "1.8";
    img.style.transform = "scale(1)";

    card.classList.remove("init");

    if (card !== cardFocus) {
      card.classList.add("hidden");
    }
  });

  const hiddenCards = document.querySelectorAll(".card.hidden");

  const tl = gsap.timeline();
  tl.to(hiddenCards, {
    opacity: 0,
    duration: 0.2,
    stagger: { amount: 0.1 },
  });
  tl.to(img, {
    delay: 1.3,
    left: `-${positionX}px`,
    top: `-${positionY}px`,
    delay: 0.5,
    width: "100vw",
    height: "100vh",
  });
}
