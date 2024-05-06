

window.addEventListener('DOMContentLoaded', () => {
gsap.registerPlugin(ScrollTrigger);
animationScrollCards();

})

const animationScrollCards = () => {
    const wrapper = document.querySelector('.cards-engagement_wrapper');
    const cards = wrapper.querySelectorAll('.card');
    
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger:wrapper,
            start:"top bottom",
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