/*
*PROPS:
* Param 1 (elemHTML) : parent => la div parente directe de l'image, l'image doit être la seule dans le parent
* Param 2 (elemHTML) : image => la balise img
* Param 3 (Boolean) : Premier cache d'animation d'ouverture
* Param 4 (Boolean) : Deuxième cache d'animation d'ouverture
*
*HTML : 
        <div class="container-image">
            <img class="image" src="./image.jpg" alt="">
        </div>
*
*CSS:
    *.container-image{
        height:600px;
        width:700px;
        overflow:hidden;
        position:relative;
    }

    .cache1-image{
        position:absolute;
        top:0;
        height:100%;
        width:100%;
        background-color:white;
        z-index:10;
    }
    .cache2-image{
        position:absolute;
        top:0;
        height:100%;
        width:100%;
        background-color:#f4f3f1;
        z-index:9;
    }
*/


export const ImageOpener = (containerImage, image, cache1 = false, cache2 = false) => {
    if(cache1){
        const divElem = document.createElement('div');
        divElem.classList.add('cache1-image')
        containerImage.appendChild(divElem)
    }
    if(cache2){
        const divElem = document.createElement('div');
        divElem.classList.add('cache2-image')
        containerImage.appendChild(divElem)
    }

    const newCache1 = document.querySelector('.cache1-image');
    const newCache2 = document.querySelector('.cache2-image');

    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    const tl3 = gsap.timeline();

    if(newCache1){
        tl.to(newCache1, {y:"-500px", duration:1.5, ease: "power4.inOut"} );
        tl.to(image, {scale:1, duration:1.5, filter: "blur(0px)", ease: "power2.inOut"},"=-1");
    }else{
        tl.to(image, {scale:1, duration:1.5, filter: "blur(0px)", ease: "power2.inOut"});
    }
    if(newCache2){
        tl2.to(newCache2, {y:"-500px", duration:1.5, ease: "power2.inOut",});
    }
    tl3.to(containerImage, {height:"500px", duration:2, ease: "power2.inOut"})

}
