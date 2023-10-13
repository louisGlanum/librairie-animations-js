/*
* PROPS :
* param 1 (number): delay : utilisez pour le setTimeout, pour démarrer l'animation
* param 2 (elemHTML): la div parente directe du titre , le titre doit être le seul enfant
* param 3 (number): la puissance du stagger
*  HTML: 
        <div class="title-complete">
            <h2>Hermès 2024</h2>
        </div>

* CSS : 
        .title-complete span {
        display:inline-block;
        transform: translate(0px, 50px);
        position:relative;
        z-index:1;
        font-size:40px;
        font-weight:lighter;
    }
        .cache-title{
        background-color:white;
        height:50px;
        z-index:2;
        position:relative;
    }
*/

export const staggerLetter = (delay = 0, containerTitle, staggerAmount = 0.5) => {
    const title = containerTitle.querySelector('h2').innerHTML
    const upperTitle = title.toUpperCase()

    containerTitle.innerHTML = '';
    const splitText = upperTitle.split('');


    splitText.forEach((letter, i) => splitText[i] = letter === " " ? '&nbsp;' : letter);
    splitText.forEach((letter) => {
        const spanElem = document.createElement('span');
        spanElem.innerHTML = letter; 
        containerTitle.appendChild(spanElem);
    });

    const cacheElement = document.createElement('div')
    cacheElement.classList.add('cache-title')
    containerTitle.appendChild(cacheElement)
    setTimeout(()=> {
        const letters = document.querySelectorAll(`.${containerTitle.classList.value} span`);
        gsap.to(letters, { y: 0, duration: 1, ease: "power4.Out",
         stagger: { amount: staggerAmount },});
    }, delay)
}

export const trigger_StaggerLetter = (delay = 0, containerTitle) => {
    const title = containerTitle.querySelector('h2').innerHTML
    const upperTitle = title.toUpperCase()

    containerTitle.innerHTML = '';
    const splitText = upperTitle.split('');


    splitText.forEach((letter, i) => splitText[i] = letter === " " ? '&nbsp;' : letter);
    splitText.forEach((letter) => {
        const spanElem = document.createElement('span');
        spanElem.innerHTML = letter; 
        containerTitle.appendChild(spanElem);
    });

    const cacheElement = document.createElement('div')
    cacheElement.classList.add('cache-title')
    containerTitle.appendChild(cacheElement)
    setTimeout(()=> {
        const letters = document.querySelectorAll(`.${containerTitle.classList.value} span`);
        gsap.to(letters, { y: 0, duration: 1, ease: "power4.Out",
         stagger: { amount: 0.5 },
         scrollTrigger: {
            trigger: letters,
            toggleActions: "play none none reset"
          } });
    }, delay)
}