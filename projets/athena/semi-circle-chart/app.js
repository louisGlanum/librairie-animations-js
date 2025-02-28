window.addEventListener("DOMContentLoaded", () => {
    feedbackAnimation();
});

function feedbackAnimation() {
    const segments = document.querySelectorAll(".segment");
    const valueDisplay = document.querySelector("#value-display");
  
    segments.forEach((arc) => {
      arc.addEventListener("click", function () {
        segments.forEach((segment) => segment.classList.remove("active"));
        arc.classList.add("active");
        let angle = this.getAttribute("data-angle");
        let value = this.getAttribute("data-value");
        let color = this.getAttribute("data-color");
  
        mobileDetect((size) => {
          if (size === "isMobile") {
            document.querySelector(
              "#aiguille"
            ).style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg) scale(0.8)`;
          } else {
            document.querySelector(
              "#aiguille"
            ).style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg) scale(1)`;
          }
        });
        valueDisplay.textContent = value;
        valueDisplay.style.color = color;
      });
    });
  }
  

const mobileDetect = (callback) => {
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


