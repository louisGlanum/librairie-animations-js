window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    heroAnimation();
    titlesAnimation();
    cardsAnimation();
    videoMaskAnimation();
    testimonialAnimation();
})

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