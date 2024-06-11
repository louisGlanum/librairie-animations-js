window.addEventListener('DOMContentLoaded', () => {
    productDetailsAnimation();
})


const productDetailsAnimation = () => {
    const section = document.querySelector('section.product-details')
    const bulletCpt_1 = section.querySelector('.bullet-cpt-1')
    const bullet_1 = bulletCpt_1.querySelector('.bullet')
    const contentCpt_1 = bulletCpt_1.querySelector('.content-cpt-1')

    gsap.timeline()

    .set(bullet_1,{scale:0})
    .set(bulletCpt_1, {"--line-horizontal":'0cqw'})
    .set(bulletCpt_1, {"--line-vertical":'0cqw'})
    .set(bulletCpt_1, {"--line-vertical-translate":'0cqw'})
    .set(contentCpt_1, {opacity:0})

    .to(bullet_1,{scale:1, duration:1})
    .to(bulletCpt_1,{"--line-horizontal":"13cqw"})
    .to(bulletCpt_1,{"--line-vertical":"3.3cqw"})
    .to(bulletCpt_1,{"--line-vertical-translate":"-3.3cqw"},"<")
    .to(contentCpt_1,{opacity:1, duration:1},"-=0.5")

}