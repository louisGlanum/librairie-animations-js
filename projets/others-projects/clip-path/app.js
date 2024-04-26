window.addEventListener('DOMContentLoaded',() =>{
    gsap.registerPlugin(ScrollTrigger);
    const backgroundBlack = document.querySelector('.background-black');
    const backgroundLeft = document.querySelector('.container-left');
    const backgroundRight = document.querySelector('.container-right');
    // const img = document.querySelector('img')
    const video = document.querySelector('.video_container')
    const tl = gsap.timeline();
    
    tl
    .to(backgroundLeft,{y:100, duration:1,ease:"power2.in"})
    .to(backgroundRight,{y:-100, duration:1,ease:"power2.in"},"<")
    .to(backgroundLeft,{y:0, duration:0.2,ease:"power2.out"})
    .to(backgroundRight,{y:0, duration:0.2,ease:"power2.out"},"<")
    .to(backgroundLeft,{ clipPath:"polygon( 0% 0%,0% 100%,100% 100%,100% 0%,0% 0%,100.929% 101.984%,-1.747% 102.229%,-1.641% 44.665%,-1.641% 44.665%,-1.668% 44.364%,-1.747% 44.079%,-1.873% 43.814%,-2.043% 43.571%,-2.251% 43.355%,-2.494% 43.17%,-2.767% 43.02%,-3.066% 42.907%,-3.386% 42.837%,-3.724% 42.813%,-13.243% 42.813%,-13.215% -12.854%,87.526% -13.098%,101.064% -1.064%,100.929% 101.984% )", duration:1, ease:"power2.in"})
    .to(backgroundRight,{ clipPath:"polygon( 0% 0%,0% 100%,100% 100%,100% 0%,0% 0%,100.929% 101.984%,-1.747% 102.229%,-1.641% 44.665%,-1.641% 44.665%,-1.668% 44.364%,-1.747% 44.079%,-1.873% 43.814%,-2.043% 43.571%,-2.251% 43.355%,-2.494% 43.17%,-2.767% 43.02%,-3.066% 42.907%,-3.386% 42.837%,-3.724% 42.813%,-13.243% 42.813%,-13.215% -12.854%,87.526% -13.098%,101.064% -1.064%,100.929% 101.984% )", duration:1, ease:"power2.in"},"<")
    .to(backgroundBlack, {opacity:0, duration:1, ease:"power2.out"},"<")
    // .to(img, {scale:1, duration:1.5, ease:"power1.out"},"<")
    .to(video, {opacity:1, duration:1, ease:"power2.out" },"<")
})