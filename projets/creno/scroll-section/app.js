

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    heroScroll()
});

const heroScroll = () => {
  const textContainers = document.querySelectorAll(".text-container");
  const nav = document.querySelector("nav");
  const navY = nav.getBoundingClientRect().height; // à remplacer par la hauteur du menu du wordpress

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-container",
      pin: true,
      end: "+=4000", // pour gérer la rapidité de l'animation globale
      scrub: 1.5, // à augmenter pour l'effet smooth scroll

      // optionnel / controls ( à enlever si non utilisé)
      toggleClass: "active",
      onEnter: () => console.log("enter"),
      onLeave: () => console.log("leave"),
      onUpdate: (self) => console.log("update", self.progress.toFixed(3))
    },
  });

  textContainers.forEach((container, i) => {
    const lines = container.querySelectorAll(".text");

    tl.to(container, {})
      .to(lines,{
          y: -(window.innerHeight - navY * 2), // à ajuster pour que le texte s'efface avant de toucher le menu
          stagger: { each: 0.02 },
          opacity: 1,
          scale: 1.5,
        },"<")
      .to(container,{
          opacity: 0,
        },"-=0.4")
      .to( lines,{
          paddingBottom: 20,
          stagger: { each: 0.02 },
          opacity: 0,
        },"<");
  });
};
