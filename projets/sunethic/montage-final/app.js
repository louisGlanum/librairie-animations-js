window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    LenisInit();
    heroAnimation();
    titlesAnimation();
    cardsAnimation();
    videoMaskAnimation();
    testimonialAnimation();
    productsHomeAnimation();
})
const LenisInit = () => {
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
}
const heroAnimation = () => {
    const section = document.querySelector('.hero_section')
    const title = section.querySelector('h1');
    const para = section.querySelector('.para_box p');
    const buttonsWrapper = section.querySelector('.button_wrapper')

    const player = videojs("#my-video1", {}).ready(function(){
        this.controls(false)
    })
    const tl = gsap.timeline();
    tl
    .to(title, {y:0, opacity:1, duration:2, delay:3, ease:"power3.inOut"})
    .to(para, {y:0,opacity:1, duration:2, ease:"power3.inOut"},"<")
    .to(buttonsWrapper, {opacity:1, duration:2, ease:"power3.inOut"},"<")
}

const titlesAnimation = () => {
    const wrappers = document.querySelectorAll(".title_wrapper");
    if (wrappers.length) {
      wrappers.forEach((wrapper) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });
        tl.to(wrapper, { opacity: 1 });
      });
    }
  };

  const cardsAnimation = () => {
    const wrapper = document.querySelector('.cards-engagement_wrapper');
    const cards = wrapper.querySelectorAll('.card');
    
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger:wrapper,
            start:"top 80%",
            end:"top 30%",

            scrub:true,
            markers: true
        }
    })
    tl
    .to(cards[0],{y:0 })
    .to(cards[1],{y:0 },"<")
    .to(cards[2],{y:0 },"<")
    .to(cards[3],{y:0 },"<")
}

const videoMaskAnimation = () => {
    const section = document.querySelector('.video-clip-section')
    const container = section.querySelector('.video-clip-container');
    const videoContainer = section.querySelector('.video_container');
    const player = videojs("#my-video",{}).ready(function(){
        this.controls(false)
    })
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start: "top 70%",
            end: "top top",
            scrub: true,
            markers: true
        }
    })
    tl.to(container, {scale: 1}).to(videoContainer, {scale: 1}, "<")
}

const testimonialAnimation = () => {
    const section = document.querySelector('.testimonial_section');
    const image = section.querySelector('.testimonial_img');
    if(section){
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: section,
                start:"top bottom",
                end:"bottom top",
                scrub: true,
            }
        })
        tl.to(image, {scale:1})
    }
}
const productsHomeAnimation = () => {
    const section = document.querySelector('section.product-section');
    const subtitle = section.querySelector('.subtitle');
    const title = section.querySelector('.title');
    const productContainers = section.querySelectorAll('.product-container');
    console.log(productContainers);
    const box = section.querySelectorAll('.box');
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 80%",
            end:"top top",
            markers:true,
            scrub:true
        }
    });

    tl.to(subtitle, {y:0})
    .to(title, {y:0},"<")
    .to(box, {overflow:"visible"})
    .to(title, {"--underline-width":"100%"})
    .to(productContainers[0], {y:0, opacity:1},"<")
    .to(productContainers[1], {y:0, opacity:1},"<")
}