import { trigger_bloc_reveal } from "../../animations/container/bloc-reveal.mjs";



window.addEventListener('DOMContentLoaded', () => {
    const triggerActions = "play none none reset"
    console.log("coucou");
    gsap.registerPlugin(ScrollTrigger)


    trigger_bloc_reveal('.img-1', "fade", 1, .6)
    trigger_bloc_reveal('.img-2', "fade", 1, .2)
    trigger_bloc_reveal('.img-3', "fade", 1, .4)
    trigger_bloc_reveal('.img-4', "fade", 1, .8)
    trigger_bloc_reveal('.img-5', "fade", 1, .8)

    trigger_bloc_reveal('.title-1',"fade-up", 1, .8)
    trigger_bloc_reveal('.title-2',"fade-down", 1, .8)
    trigger_bloc_reveal('.title-3',"fade-down", 1, .8)
    trigger_bloc_reveal('.title-4',"fade-up", 1, .8)
})