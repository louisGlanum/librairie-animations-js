import {staggerLetter} from './animations/texte/title-stagger-letter.mjs'
import { ImageOpener } from './animations/image/image-opener.mjs';


window.addEventListener('DOMContentLoaded', () => {



    const containerImage = document.querySelector('.container-image')
    const image = document.querySelector('.image')

    ImageOpener(containerImage, image, true, true);

    const containerTitle = document.querySelector('.title-complete');
    staggerLetter(500, containerTitle)
})

const ImageAnimation = () => {
    const image = document.querySelector('.image')
    const cache = document.querySelector('.cache-image')
    const cache2 = document.querySelector('.cache2-image')
    const container = document.querySelector('.container-image')

    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    const tl3 = gsap.timeline();

    tl.to(cache, {y:"-500px", duration:1.5, ease: "power4.inOut"} );
    tl.to(image, {scale:1, duration:1.5, filter: "blur(0px)", ease: "power2.inOut"},"=-1");

    tl2.to(cache2, {y:"-500px", duration:1.5, ease: "power2.inOut",});

    tl3.to(container, {height:"500px", duration:2, ease: "power2.inOut"})

}

