



window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    hero_animation();
    videojs('my-player');
    intervalColors();
})

const hero_animation = () => {
    const leftPart = document.querySelector('.content_hero_left');
    const rightPart = document.querySelector('.content_hero_right');
    const tl = gsap.timeline()
    tl
    .fromTo(leftPart, {flex:'100%'}, {flex:'50%', duration:1, delay:1, ease:"power3.inOut"})
    .fromTo(rightPart, {flex:'0%'}, {flex:'50%', duration:1,ease:"power3.inOut"}, "<")


    const titleElem = document.querySelectorAll('.content_hero_left .title span');
    const tl2 = gsap.timeline();
    tl2
    .to(titleElem, {stagger:{each:0.08}, y:0, duration:1, ease:"power3.inOut"})
    .to(titleElem[0], {x:30, duration:1, ease:"power3.inOut"})
    .to(titleElem[1], {x:-30, duration:1, ease:"power3.inOut"},"<")
    .to(titleElem[2], {x:30, duration:1, ease:"power3.inOut"},"<")


    const section = document.querySelector('.hero_section')
    const tl3 = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start:"top top",
            end:'bottom 30%',
            markers: true,
            scrub: true,
        }
    })
    tl3
    .to(titleElem[0], {x:160, ease:"power3.inOut"})
    .to(titleElem[1], {x:-160,  ease:"power3.inOut"},"<")
    .to(titleElem[2], {x:160, ease:"power3.inOut"},"<")
}

const intervalColors = () => {
    const colors = ["#84A7A1","#2E8A99","#A76F6F","#2D4356","#331D2C"];
    const sections = document.querySelectorAll('.dynamic-bg');
    sections.forEach((section) => {
        section.style.transition = `background-color .6s ease-in-out`;
        let index = 0;
        section.style.backgroundColor = `${colors[0]}`
        setInterval(() => {
            console.log('coucou');
            section.style.backgroundColor = `${colors[index]}`
            index++;
            if (index >= colors.length) index = 0;   
        }, 5000)
    })
}
