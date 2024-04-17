
window.addEventListener('DOMContentLoaded', () => {
    parralaxImg('img', 0.3);
})


const parralaxImg = (target, speedDefault = 0.5, vertical = true) => {
    const images = document.querySelectorAll(target)
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() =>{
            images.forEach((image) => {
                const scrolled = window.scrollY
                const speed = Number(image.dataset.speed) || speedDefault
                if(vertical){
                    image.style.transform = `translate3d(0, ${scrolled * -speed}px, 0)`
                    image.style.height = `${100 + ((speed * 10) * 30)}%`
                }else{
                    image.style.transform = `translate3d(${scrolled * -speed}px, 0, 0)`
                    image.style.width = `${100 + ((speed * 10) * 30)}%`
                }
            })
        })
    })
}

const lenis = new Lenis({
    wheelMultiplier:1,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)