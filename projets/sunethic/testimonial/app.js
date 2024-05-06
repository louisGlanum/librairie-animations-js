window.addEventListener('DOMContentLoaded', ()=> {
    gsap.registerPlugin(ScrollTrigger);
    testimonialAnimation();
})

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