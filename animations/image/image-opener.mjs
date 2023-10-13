/*
*PROPS:
* Param 1 (elemHTML) : parent => la div parente directe de l'image, l'image doit être la seule dans le parent
* Param 2 (elemHTML) : image => la balise img
* Param 3 (Boolean) : Premier cache d'animation d'ouverture
* Param 4 (Boolean) : Deuxième cache d'animation d'ouverture
*
* Param 5 : toggleActions pour le scrollTrigger si vous utilisez la fonction Trigger_*
*HTML : 
        <div class="container-image">
            <img class="image" src="./image.jpg" alt="">
        </div>
*
*CSS: variable à remplacer !!
    *.${containerImage}{
        height:600px;
        width:700px;
        overflow:hidden;
        position:relative;
    }

    .cache1-image__${containerImage.classList.value}{
        position:absolute;
        top:0;
        height:100%;
        width:100%;
        background-color:white;
        z-index:10;
    }
    .cache2-image__${containerImage.classList.value}{
        position:absolute;
        top:0;
        height:100%;
        width:100%;
        background-color:#f4f3f1;
        z-index:9;
    }
*/

export const imageOpener = (
  containerImage,
  image,
  cache1 = false,
  cache2 = false
) => {

    console.log(containerImage.classList.value)

  if (cache1) {
    const divElem = document.createElement("div");
    divElem.classList.add(`cache1-image__${containerImage.classList.value}`);
    console.log(divElem)
    containerImage.appendChild(divElem);
  }
  if (cache2) {
    const divElem = document.createElement("div");
    divElem.classList.add(`cache2-image__${containerImage.classList.value}`);
    containerImage.appendChild(divElem);
  }

  const newCache1 = document.querySelector(`.cache1-image__${containerImage.classList.value}`);
  const newCache2 = document.querySelector(`.cache2-image__${containerImage.classList.value}`);
  if (newCache1) {
    gsap.to(newCache1, {y: "-500px", duration: 1.5, ease: "power4.inOut"});
    gsap.to(image,{scale: 1, duration: 1.5, filter: "blur(0px)", ease: "power2.inOut"},"=-1");
  } else {
    gsap.to(image, {scale: 1, duration: 1.5, filter: "blur(0px)", ease: "power2.inOut"});
  }
  if (newCache2) {
    gsap.to(newCache2, {y: "-500px", duration: 1.5, ease: "power2.inOut"});
  }
  gsap.to(containerImage, {height: "500px", duration: 2, ease: "power2.inOut"});
};

export const trigger_ImageOpener = (   
    containerImage,
    image,
    cache1 = false,
    cache2 = false,
    actions = "play none none reset"
    ) => {
  
    console.log(ScrollTrigger);
    gsap.registerPlugin(ScrollTrigger);
  
    if (cache1) {
      const divElem = document.createElement("div");
      divElem.classList.add(`cache1-image__${containerImage.classList.value}`);
      console.log(divElem)
      containerImage.appendChild(divElem);
    }
    if (cache2) {
      const divElem = document.createElement("div");
      divElem.classList.add(`cache2-image__${containerImage.classList.value}`);
      containerImage.appendChild(divElem);
    }
  
    const newCache1 = document.querySelector(`.cache1-image__${containerImage.classList.value}`);
    const newCache2 = document.querySelector(`.cache2-image__${containerImage.classList.value}`);

    if (newCache1) {
      gsap.to(newCache1, {
        y: "-500px",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: newCache1,
          toggleActions: actions,
        },
      });
      gsap.to(
        image,
        {
          scale: 1,
          duration: 1.5,
          filter: "blur(0px)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: image,
            toggleActions:actions,
          },
        },
        "=-1"
      );
    } else {
      gsap.to(image, {
        scale: 1,
        duration: 1.5,
        filter: "blur(0px)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: image,
          toggleActions:actions,
        },
      });
    }
    if (newCache2) {
      gsap.to(newCache2, {
        y: "-500px",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: newCache2,
          toggleActions:actions,
        },
      });
    }
    gsap.to(containerImage, {
      height: "500px",
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerImage,
        toggleActions:actions,
      },
    });
}