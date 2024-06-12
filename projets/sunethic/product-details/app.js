window.addEventListener('DOMContentLoaded', () => {
    productDetailsAnimation();
    detectWidth();
})

const detectWidth = () => {
    const section = document.querySelector('section.product-details') 
    let windowWidth = window.innerWidth;
    window.innerWidth < 800 ? section.classList.add('mobile') : section.classList.remove('mobile')
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth
        window.innerWidth < 800 ? section.classList.add('mobile') : section.classList.remove('mobile')
    })
}
const productDetailsAnimation = () => {
    const section = document.querySelector('section.product-details')
    const bulletCpt_1 = section.querySelector('.bullet-cpt-1')
    const bulletCpt_2 = section.querySelector('.bullet-cpt-2')
    const bulletCpt_3 = section.querySelector('.bullet-cpt-3')
    const bulletCpt_4 = section.querySelector('.bullet-cpt-4')
    const bulletCpt_5 = section.querySelector('.bullet-cpt-5')
    const bulletCpt_6 = section.querySelector('.bullet-cpt-6')

    const image =section.querySelector(".product-details-wrapper img")
    const bullets = document.querySelectorAll('.bullet-cpt .bullet')
    const contents = document.querySelectorAll('.content-cpt')

    // setup animation
    gsap.timeline()
    .set(image, {opacity:0})
    .set(bullets, {scale:0})
    .set(bulletCpt_1, {"--line-horizontal":'0cqw', "--line-vertical":'0cqw', "--line-vertical-translate":'0cqw'})
    .set(bulletCpt_2, {"--line-horizontal":'0cqw', "--line-vertical":'0cqw', "--line-vertical-translate":'0cqw'})
    .set(bulletCpt_3, {"--line-vertical":'0cqw'})
    .set(bulletCpt_4, {"--line-vertical":'0cqw'})
    .set(bulletCpt_5, {"--line-horizontal":'0cqw', "--line-horizontal-translate":"0cqw"})
    .set(bulletCpt_6, {"--line-vertical":'0cqw', "--line-vertical-translate":"0cqw"})
    .set(contents, {opacity:0})

    // images + pulsar bullet
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
            onEnter: () => {
                bullets.forEach((bullet, i) => {
                    setTimeout(() => {
                        bullet.classList.add('pulsar')
                    },200 * i)
                }) 
            }
        }
    })
    .to(image, {opacity:1, duration:0.5})
    .to(bullets, {stagger:{each:0.15}, scale:1, duration:1})

    // line 1ere part
    gsap.timeline( {
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(bulletCpt_1,{"--line-horizontal":"12.9cqw", delay:1.3, duration:1})
    .to(bulletCpt_2,{"--line-horizontal":"13cqw", duration:1},"-=0.7")
    .to(bulletCpt_3,{"--line-vertical":"9.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_4,{"--line-vertical":"9.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_5,{"--line-horizontal":"14.3cqw","--line-horizontal-translate":"-14.3cqw", duration:1},"-=0.7")
    .to(bulletCpt_6,{"--line-vertical":"9.3cqw","--line-vertical-translate":"-9.3cqw", duration:1},"-=0.7")

    // line second part
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(bulletCpt_1,{"--line-vertical":"3.3cqw", "--line-vertical-translate":"-3.3cqw",duration:1, delay:1.9})
    .to(bulletCpt_2,{"--line-vertical":"3.3cqw", "--line-vertical-translate":"0cqw",duration:1},"-=0.7")

    //content
    gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start:"top 70%",
            toggleActions: "play pause resume reset",
        }
    })
    .to(contents,{stagger:{each:0.3},opacity:1, duration:1, delay:2.5})
}