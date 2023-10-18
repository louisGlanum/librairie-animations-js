/*
* PARAMS 1 (string) target du html => privilégier un id
* PARAMS 2 (string) style d'animation
*
LISTE d'animation disponible :
"fade-up"
*
*/

export const bloc_reveal = (target_element, animation) => {
    const target = document.querySelector(target_element);
    const targetHeight = target.offsetHeight
    
    if(animation === "fade-up"){
        target.style.opacity = 0;
        target.style.transform = `translateY(${targetHeight}px)`
          //animations
        gsap.to(target, {
            y: 0,
            duration: 1,
            opacity:1,
            ease: "power4.Out",
            delay: 0,
            scrollTrigger: {
            trigger: target,
            toggleActions: "play none none none",
            },
        });
    }
    // a faire pour "fade-left", fade-right", "fade-down"
    }