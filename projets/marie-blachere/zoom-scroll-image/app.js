
window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    scroll_zoom_image()
})

const scroll_zoom_image = () => {
    const section = document.querySelector('section');
    const image = document.querySelector('img');

    const tl = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start:"top 80%",
            end:"top top",
            markers: true,
            scrub: true,
        }
    })
    tl.to(image, {scale:1.30 })
}