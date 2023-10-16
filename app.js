import {staggerLetter, trigger_StaggerLetter} from './animations/texte/title-stagger-letter.mjs'
import { imageOpener, trigger_ImageOpener } from './animations/image/image-opener.mjs';


window.addEventListener('DOMContentLoaded', () => {

    const triggerActions = "play none none reset"

    gsap.registerPlugin(ScrollTrigger)

    //Image
    const containerImage2= document.querySelector('.container-image2')
    const image2 = document.querySelector('.container-image2 .image')
        imageOpener(containerImage2, image2, true, true);

    const containerImage = document.querySelector('.container-image')
    const image = document.querySelector('.container-image .image')
        trigger_ImageOpener(containerImage, image, true, true, triggerActions);


    //Text
    const containerTitle = document.querySelector('.title-complete');
        staggerLetter(500, containerTitle, 1)

    const containerTitle2 = document.querySelector('.title-complete2');
        trigger_StaggerLetter(500, containerTitle2, 1)
})
