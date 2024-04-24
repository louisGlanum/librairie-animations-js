window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    matrixSection_video();
    matrixSection_image();

})

const matrixSection_video = () => {
    const section = document.querySelector('section.matrixSection-video')
    const container = section.querySelector('.container');
    const videoContainer = section.querySelector('.video_container');

    const tl = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            markers: true
        }
    })
    tl.to(container, {scaleX: 1, scaleY: 1, rotate: 0})
    .to(videoContainer, {scaleX: 1, scaleY: 1, rotate: 0}, "<")
    .to(videoContainer, {scaleX: 1, scaleY: 1})
}

const matrixSection_image = () => {
    const sections = document.querySelectorAll('section.matrixSection-image')
    sections.forEach((section) => {
        const container = section.querySelector('.container');
        const imgContainer = section.querySelector('.img_container');
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: section,  // Utilisez le conteneur comme déclencheur
                start: "top top",
                end: `+=${section.offsetHeight}`,
                pin: true,
                scrub: true,
                markers: true
            }
        })
        if(imgContainer){

            tl.to(container, {scaleX: 1, scaleY: 1, rotate: 0})
            .to(imgContainer, {scaleX: 1, scaleY: 1, rotate: 0}, "<")
   
     
        }
    })
}
