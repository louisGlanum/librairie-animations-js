/*
* PROPS :
* param 1 target => (string) : le selecteur de l'élément à animer, ex => ".title-split"
* param 2 underline => (boolean) :  rajouter un underline sous le texte , le css à designer est la height et le background-color
* param 3 duration =>(number) : détermine la durée de l'animation
* param 4 stagger => (number) :  détermine la durée entre chaque stagger
* param 5 delay => (number) :  une fois l'animation trigger, détermine au bout de combien de temps elle se lance

*  HTML: 
  <div class="split">
    <div class="title-split">Lorem Ipsum</div>
  </div>

* CSS : 
    .title-split{
        font-size:42px;
    }
* DEPENDANCE :

* GSAP CORE
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

* GSAP ScrollTrigger 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

* SPLIT-TYPE
   <script src="https://unpkg.com/split-type"></script>
*/

const getConfig_AnimeLetter = (options) => {
  const config = {
    underline: {
      active: String(options?.underline?.active) === "true" ? options.underline.active : false,

      right:
        String(options?.underline?.right) === "0"
          ? options.underline.right
          : options?.underline?.right
          ? `${String(options.underline.right)}px`
          : 0,

      duration: options?.underline?.duration ? Number(options.underline.duration) : 1,
      delay: options?.underline?.delay ? Number(options.underline.delay) : 0,
    },
    duration: options?.duration ? Number(options.duration) : 0.5,
    stagger: options?.stagger ? Number(options.stagger) : 1,
    delay: options?.delay ? Number(options.delay) : 0,
  };
  return { config };
};

export const animeLetter_reveal = (target_element, options) => {
  const { config } = getConfig_AnimeLetter(options);
  //modification de l'élément
  const element = document.querySelector(target_element);
  const elementWidth = element.offsetWidth;
  element.style.display = "inline-block";
  element.style.position = "relative";

  //initialisation de splitType
  const target = new SplitType(target_element);
  const lines = target.lines; //lignes
  const chars = target.chars; //  characters
  const heightLine = lines[0].offsetHeight; //hauteur d'une ligne

  //ajout de styles
  lines.forEach((line) => {
    line.style.overflow = "hidden";

    if (config.underline.active) {
      const beforeElement = document.createElement("div");
      beforeElement.classList.add("underline");
      Object.assign(beforeElement.style, {
        left: 0,
        right: `${elementWidth}px`,
        bottom: 0,
        position: "absolute",
        content: "",
        opacity: 0,
      });
      line.appendChild(beforeElement);
    }
  });
  chars.forEach((char) => {
    char.style.transform = `translateY(${heightLine}px)`;
  });

  //animations
  gsap.to(chars, {
    y: 0,
    duration: config.duration,
    delay: config.delay,
    ease: "power4.Out",
    stagger: { amount: config.stagger },
  });

  if (config.underline.active) {
    const beforeElement = document.querySelector(`${target_element} .line .underline`);
    gsap.to(beforeElement, {
      right: config.underline.right,
      opacity: 1,
      duration: config.underline.duration,
      delay: config.underline.delay,
    });
  }

  //recalcule les lignes au resize
  let timeout = false;
  const delay = 500;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      target.split();
    }, delay);
  });
};

export const trigger_animeLetter_reveal = (target_element, options) => {
  const { config } = getConfig_AnimeLetter(options);

  //modification de l'élément
  const element = document.querySelector(target_element);
  const elementWidth = element.offsetWidth;
  element.style.display = "inline-block";
  element.style.position = "relative";

  const target = new SplitType(target_element);
  const lines = target.lines; //lignes
  const chars = target.chars; //  characters
  const heightLine = lines[0].offsetHeight; //hauteur d'une ligne

  //ajout de styles
  lines.forEach((line) => {
    line.style.overflow = "hidden";
    if (config.underline.active) {
      const beforeElement = document.createElement("div");
      beforeElement.classList.add("underline");
      beforeElement.style.right = `${elementWidth}px`; // taille en fct de la ligne
      beforeElement.style.left = 0;
      beforeElement.style.bottom = 0;
      beforeElement.style.opacity = 0;
      beforeElement.style.position = "absolute";
      beforeElement.style.content = "";

      line.appendChild(beforeElement);
    }
  });
  chars.forEach((char) => {
    char.style.transform = `translateY(${heightLine}px)`;
  });

  //animations
  gsap.to(chars, {
    y: 0,
    duration: config.duration,
    ease: "power4.Out",
    stagger: { amount: config.stagger },
    delay: config.delay,
    scrollTrigger: {
      trigger: chars,
      toggleActions: "play none none reset",
    },
  });
  if (config.underline.active) {
    const beforeElement = document.querySelector(`${target_element} .line .underline`);
    gsap.to(beforeElement, {
      right: config.underline.right,
      opacity: 1,
      duration: config.underline.duration,
      delay: config.underline.delay,
    });
  }
  //recalcule les lignes au resize
  let timeout = false;
  const delay = 500;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      target.split();
    }, delay);
  });
};
