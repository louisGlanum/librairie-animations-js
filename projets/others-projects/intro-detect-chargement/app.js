document.addEventListener("DOMContentLoaded", () => {
  const loaderContainer = document.querySelector(".loader-container");
  const progressContainer = document.querySelector(".progress");
  const progressText = progressContainer.querySelector(".progress-text span");

  const titleYearWrapper = document.querySelector(".title-year_wrapper");
  const titleYear = titleYearWrapper.querySelector(".title-year");
  const titleYearSpan = titleYear.querySelector("span");

  const rosace1 = document.querySelector(".rosace-1");
  const rosace2 = document.querySelector(".rosace-2");

  dynamicGrid()

  let progress = 0;
  let year = 0;
  let padding = 200;

  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  tl.to(titleYear, { y: 0, duration: 2, ease: "power3.inOut" });

  tl2
    .to(rosace1, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "linear",
    })
    .to(
      rosace2,
      {
        rotation: -360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );



  const interval = setInterval(function () {
    progress !== 100 ? progress++ : 100;
    padding = 135 - progress * 1.35;
    year = Math.floor(progress / 5);
    progressContainer.style.paddingTop = padding + "%";
    progressText.textContent = progress === 100 ? "Veuillez patienter..." : progress;
    titleYearSpan.textContent = year;
  }, 200);

  window.addEventListener("load", () => {
    clearInterval(interval);
    const newInterval = setInterval(() => {
      progress++;
      padding = 135 - progress * 1.35;
      year = Math.floor(progress / 5);

      progressContainer.style.paddingTop = padding + "%";
      progressText.textContent = progress;
      titleYearSpan.textContent = year;

      if (progress >= 100) {
        const tl = gsap.timeline();
        tl.to(loaderContainer, { backgroundColor: "#433f38", duration: 2, ease: "power3.inOut" }).to(
          titleYear,
          { x: "-100%", duration: 1, ease: "power3.inOut" },
          "-=1"
        );

        clearInterval(newInterval);
      }
    }, 50);
  });
});

const dynamicGrid = () => {
    const numberOfElements = 12 * 6;
    const gridContainer = document.querySelector('.loader-grid_wrapper')
    for(let i = 0; i < numberOfElements; i++){
        const element = document.createElement('span')
        gridContainer.appendChild(element)
        randomGrid(element, i)
    }
    setInterval(() =>{
        const gridElement = document.querySelectorAll('.loader-grid_wrapper span')
        for(let i = 0; i < gridElement.length; i++){
         
            randomGrid(gridElement[i], i)
        }
    },5000)
}

const randomGrid = (element, i) => {
    const random = Math.floor(Math.random() * 10)
    setTimeout(() =>{

        const arrayColors = ['#ad9e8e', '#d93b36', '#88c3cd', '#433f38' ]

        console.log(random);
        if(random >= 5){
            console.log('opacity 0');
        
            element.style.opacity = 0
        }else {
            console.log('opacity 1');
            if(random > 0 && random <= 2 ){
                element.style.backgroundColor = arrayColors[0]
                element.style.opacity = random / 1
            }
            if(random >= 2 && random <= 3 ){
                element.style.backgroundColor = arrayColors[1]
                element.style.opacity = random / 1
            }
            if(random >= 3 && random <= 4 ){
                element.style.backgroundColor = arrayColors[2]
                element.style.opacity = random / 1
            }
            if(random >= 4 && random <= 5 ){
                element.style.backgroundColor = arrayColors[3]
                element.style.opacity = random / 1
            }
        }
    }, i)
}