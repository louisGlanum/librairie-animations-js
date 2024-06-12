window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    // global
    LenisInit();
    detectWidth();

    // component (in order)
    heroAnimation();
    titlesAnimation();
    cardsAnimation();
    videoMaskAnimation();
    testimonialAnimation();
    productsHomeAnimation();
    productDetailsAnimation();
})
const LenisInit = () => {
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
}

const detectWidth = () => {
    const section = document.querySelector('section.product-details') 
    let windowWidth = window.innerWidth;
    window.innerWidth < 800 ? section.classList.add('mobile') : section.classList.remove('mobile')
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth
        window.innerWidth < 800 ? section.classList.add('mobile') : section.classList.remove('mobile')
    })
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

const productDetailsAnimation = () => {
    const section = document.querySelector('section.product-details')
    const bulletCpt_1 = section.querySelector('.bullet-cpt-1')
    const bulletCpt_2 = section.querySelector('.bullet-cpt-2')
    const bulletCpt_3 = section.querySelector('.bullet-cpt-3')
    const bulletCpt_4 = section.querySelector('.bullet-cpt-4')
    const bulletCpt_5 = section.querySelector('.bullet-cpt-5')
    const bulletCpt_6 = section.querySelector('.bullet-cpt-6')

    const image =section.querySelector(".product-details-wrapper img")
    const bullets = document.querySelectorAll('.bullet-cpt .bullet')
    const contents = document.querySelectorAll('.content-cpt')

    // setup animation
    gsap.timeline()
    .set(image, {opacity:0})
    .set(bullets, {scale:0})
    .set(bulletCpt_1, {"--line-horizontal":'0cqw', "--line-vertical":'0cqw', "--line-vertical-translate":'0cqw'})
    .set(bulletCpt_2, {"--line-horizontal":'0cqw', "--line-vertical":'0cqw', "--line-vertical-translate":'0cqw'})
    .set(bulletCpt_3, {"--line-vertical":'0cqw'})
    .set(bulletCpt_4, {"--line-vertical":'0cqw'})
    .set(bulletCpt_5, {"--line-horizontal":'0cqw', "--line-horizontal-translate":"0cqw"})
    .set(bulletCpt_6, {"--line-vertical":'0cqw', "--line-vertical-translate":"0cqw"})
    .set(contents, {opacity:0})

    // images + pulsar bullet
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
            onEnter: () => {
                bullets.forEach((bullet, i) => {
                    setTimeout(() => {
                        bullet.classList.add('pulsar')
                    },200 * i)
                }) 
            }
        }
    })
    .to(image, {opacity:1, duration:0.5})
    .to(bullets, {stagger:{each:0.15}, scale:1, duration:1})

    // line 1ere part
    gsap.timeline( {
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(bulletCpt_1,{"--line-horizontal":"12.9cqw", delay:1.3, duration:1})
    .to(bulletCpt_2,{"--line-horizontal":"13cqw", duration:1},"-=0.7")
    .to(bulletCpt_3,{"--line-vertical":"9.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_4,{"--line-vertical":"9.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_5,{"--line-horizontal":"14.3cqw","--line-horizontal-translate":"-14.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_6,{"--line-vertical":"9.3cqw","--line-vertical-translate":"-9.3cqw", duration:1},"-=0.7")

    // line second part
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(bulletCpt_1,{"--line-vertical":"3.3cqw", "--line-vertical-translate":"-3.3cqw",duration:1, delay:1.9})
    .to(bulletCpt_2,{"--line-vertical":"3.3cqw", "--line-vertical-translate":"0cqw",duration:1},"-=0.7")

    //content
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(contents,{stagger:{each:0.3},opacity:1, duration:1, delay:2.5})
}