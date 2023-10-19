export const animeUnderline = (target_element, bottom = 0, duration = 1, delay = 10) => {
    const element = document.querySelector(target_element);
    
    const elementWidth = element.offsetWidth;
    element.style.display = "inline-block";
    element.style.position = "relative";

    const target = new SplitType(target_element);
    const lines = target.lines; 

    lines.forEach((line) => {
        line.style.overflow = "hidden";
    
          const beforeElement = document.createElement("div");
          beforeElement.classList.add("underline");
          Object.assign(beforeElement.style, {
            left: 0,
            right: `${elementWidth}px`,
            bottom: `${bottom}px`,
            position: "absolute",
            content: "",
            opacity: 0,
          });
          line.appendChild(beforeElement);
      });

      const beforeElement = document.querySelector(`${target_element} .line .underline`);
      gsap.to(beforeElement, {
        right: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
      });

}