window.addEventListener('DOMContentLoaded', ()=> {
    gsap.registerPlugin(ScrollTrigger);
    productsHomeAnimation()
})

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