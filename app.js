import {animeLetter_reveal, trigger_animeLetter_reveal} from './animations/texte/animeLetter.mjs'
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



        trigger_ImageOpener(
            containerImage, 
            image, 
            true, 
            true, 
            triggerActions
            );



    //Text
    animeLetter_reveal('.title-split')
    trigger_animeLetter_reveal('.title-split2')

})
