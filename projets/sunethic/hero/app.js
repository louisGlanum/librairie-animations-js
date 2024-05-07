window.addEventListener('DOMContentLoaded',()=>{
    heroAnimation();
})

const heroAnimation = () => {
    const section = document.querySelector('.hero_section')
    const title = section.querySelector('h1');
    const para = section.querySelector('.para_box p');
    const buttonsWrapper = section.querySelector('.button_wrapper')

    const player = videojs("#my-video", {}).ready(function(){
        this.controls(false)
    })
    const tl = gsap.timeline();
    tl
    .to(title, {y:0, opacity:1, duration:2, delay:3, ease:"power3.inOut"})
    .to(para, {y:0,opacity:1, duration:2, ease:"power3.inOut"},"<")
    .to(buttonsWrapper, {opacity:1, duration:2, ease:"power3.inOut"},"<")
}