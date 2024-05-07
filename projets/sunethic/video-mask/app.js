window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    matrixSection_video();
})

const matrixSection_video = () => {
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