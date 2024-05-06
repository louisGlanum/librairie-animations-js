

window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    animationScrollTitles();
    
    })
    
    const animationScrollTitles = () => {
        const wrappers = document.querySelectorAll('.title_wrapper');
        
        wrappers.forEach((wrapper) => {


            const tl = gsap.timeline({
                scrollTrigger:{
                    trigger:wrapper,
                    start:"top bottom",
                    end:"top 30%",
                    scrub:true,
                    markers: true
                }
            })
            tl.to(wrapper, {opacity:1})
        })
    }