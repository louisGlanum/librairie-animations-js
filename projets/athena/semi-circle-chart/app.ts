window.addEventListener("DOMContentLoaded", () => {
    feedbackAnimation();
});

function feedbackAnimationTs() {
  const segments = document.querySelectorAll(".segment");
  const aiguille = document.querySelector("#aiguille");
  const valueDisplay = document.querySelector("#value-display");

  if (aiguille && valueDisplay && segments) {
    segments.forEach((arc) => {
      arc.addEventListener("click", function () {
        segments.forEach((segment) => segment.classList.remove("active"));
        arc.classList.add("active");
        let angle = this.getAttribute("data-angle");
        let value = this.getAttribute("data-value");
        let color = this.getAttribute("data-color");

        mobileDetect((size: "isMobile" | "isDesktop") => {
          if (size === "isMobile") {
            (
              aiguille as HTMLElement
            ).style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg) scale(0.8)`;
          } else {
            (
              aiguille as HTMLElement
            ).style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg) scale(1)`;
          }
        });
        (valueDisplay as HTMLElement).textContent = value;
        (valueDisplay as HTMLElement).style.color = color;
      });
    });
  }
}


const mobileDetectTs = (callback: (size: "isMobile" | "isDesktop") => void) => {
    const checkScreenSize = () => {
      const device = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (device) {
        callback("isMobile");
      } else {
        const screenSize = window.innerWidth < 900 ? "isMobile" : "isDesktop";
        callback(screenSize);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  };