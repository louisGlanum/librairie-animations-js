window.addEventListener('DOMContentLoaded', () =>{
    gsap.registerPlugin(ScrollTrigger);
    videoEntryAnimation()

})

const videoEntryAnimation = () => {
    const videoContainer = document.querySelector('.video-container');
    const title = document.querySelector('.title');
    const para = document.querySelector('.para');
    const button = document.querySelector('button');

    const tl = gsap.timeline();

    tl
    .to(videoContainer,{opacity: 1, scale:1.4, duration: 5})
    .to(title, {opacity: 1, scale: 1.2, marginLeft:"8%", duration: 2}, "<")
    .to(para, {opacity:.8, duration: 2}, "<0.5")
    .to(button, {opacity:1, duration: 2}, "<")
    .to(button, {backgroundColor:"#0e4f64", duration:2}, "<0.5")
}