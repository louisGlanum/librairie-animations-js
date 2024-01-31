gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {

    const h1 = document.querySelectorAll('.text-animation');
    console.log(h1);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll",
            start: "center center",
            end: "+=2000",
            markers: true,
            scrub: 1,
            pin: true,
            toggleActions: "restart none reverse none",
        },
    });

    tl.to(h1, {
        opacity: 1,
        duration: 10,
        padding:40,
        scale: 3,
        delay:4,
        stagger: { each: 1 },
        y: -(window.innerHeight / 2.5),
    });
});
