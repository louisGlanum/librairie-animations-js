window.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Bloquer le scroll du navigateur au refresh
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // SCROLLSMOOTHER
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
  });

  // TIMELINE INTRO (scale + fade)
  const tlIntro = gsap.timeline({
    onComplete: () => {
      // Supprime les styles inline après animation
      gsap.set([".page-wrapper-inner", ".site-header"], { clearProps: "all" });
      ScrollTrigger.refresh(); // recalcul positions après scale
    }
  });

  // Animate page-wrapper-inner + header ensemble
  tlIntro.from([".page-wrapper-inner"], {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  })
  .from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  }, "-=0.5");

  // HERO TITLES
  const title1 = document.querySelector(".hero-title-1");
  const title2 = document.querySelector(".hero-title-2");

  gsap.set(title2, { opacity: 0, y: 50 });

  // ScrollTrigger pour pin + fade des titres
  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      markers: true,
    },
  })
  .to(title1, { opacity: 0, y: -50, duration: 1, ease: "power2.out" })
  .to(title2, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "<");

           const header = document.getElementById('siteHeader');
    const pageWrapper = document.querySelector('.page-wrapper-inner');

    if (!header || !pageWrapper) return;


    setTimeout(() => {
        // Ajouter la classe fixed
        header.classList.add('fixed');

        // Déplacer le header directement dans le body
        document.body.insertBefore(header, document.body.firstChild);
    }, 1000); // 1000ms = durée de ton animation
});
