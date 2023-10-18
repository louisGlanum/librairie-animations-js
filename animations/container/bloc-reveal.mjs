/*
* PARAMS 1 (string) target du html => privilégier un id
* PARAMS 2 (string) style d'animation
* PARAMS 3 (number) duration pour gsap
LISTE d'animation disponible :
"fade-up"
"fade-down"
*/

export const trigger_bloc_reveal = (target_element, animation, duration) => {
    const target = document.querySelector(target_element);
    const targetHeight = target.offsetHeight;
  
    if (animation === "fade-up") {
      target.style.opacity = 0;
      target.style.transform = `translateY(${targetHeight}px)`;
      //animations
      gsap.to(target, {
        y: 0,
        duration: duration,
        opacity: 1,
  
        ease: "power4.Out",
        delay: 0,
        scrollTrigger: {
          start: "top bottom",
          trigger: target,
          toggleActions: "play none none none",
        },
      });
    }
    if (animation === "fade-down") {
      target.style.opacity = 0;
      target.style.transform = `translateY(-${targetHeight}px)`;
      //animations
      gsap.to(target, {
        y: 0,
        duration: duration,
        opacity: 1,
        ease: "power4.Out",
        delay: 0,
        scrollTrigger: {
          start: "top bottom", // param 1 : elements param 2 : viewport
          // traduction : quand le top de l'élement touche le bottom du viewport : l'animation start
          trigger: target,
          toggleActions: "play none none none",
        },
      });
    }
    // a faire pour "fade-left", fade-right", "fade-down"
  };
  