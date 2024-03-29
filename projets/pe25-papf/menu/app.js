
window.addEventListener("DOMContentLoaded", () => {
  menulightMode();
  menuAnimation();
  intervalColors();
});

window.addEventListener("scroll", () => {
    menulightMode();
});

const menuAnimation = () => {
  const elements = document.querySelectorAll(".links-dropdown");
  const header = document.querySelector("header");

  elements.forEach((element) => {
    const submenu = element.querySelectorAll(".submenu li a");
    const linkPrincipal = element.querySelector("a");

    if (submenu !== null) {
      const tl = gsap.timeline({ paused: true });
      tl.to(submenu, { stagger: { each: 0.05 }, opacity: 1, y: "0%", duration: 0.4 });

      linkPrincipal.submenu = submenu;
      linkPrincipal.subMenuAnimation = tl;

      element.submenu = submenu;
      element.subMenuAnimation = tl;

      linkPrincipal.addEventListener("mouseenter", menuItemOver);
      element.addEventListener("mouseleave", menuItemOut);
    }
  });

  function menuItemOver() {
    this.subMenuAnimation.play();
    this.submenu.forEach((sub) => (sub.style.pointerEvents = "all"));
    header.classList.add("open");
  }
  function menuItemOut() {
    this.subMenuAnimation.restart().pause();
    this.submenu.forEach((sub) => (sub.style.pointerEvents = "none"));
    header.classList.remove("open");
  }
};

// gestion du bg pour la navigation au scroll
const menulightMode = () => {
    const header = document.querySelector("header");
    if (window.scrollY > 200) {
      !header.classList.contains("light") && header.classList.add("light");
    } else {
      header.classList.remove("light");
    }
  }

// transition color bg 

const intervalColors = () => {
    const colors = ["#017679","#88C7BC","#F4FAFB","#FFE4DB","#E3997E"];
    const sections = document.querySelectorAll('.dynamic-bg');
    sections.forEach((section) => {
        section.style.transition = `background-color .6s ease-in-out`;
        let index = 0;
        section.style.backgroundColor = `${colors[0]}`
        setInterval(() => {
            console.log('coucou');
            section.style.backgroundColor = `${colors[index]}`
            index++;
            if (index >= colors.length) index = 0;   
        }, 5000)
    })
}
