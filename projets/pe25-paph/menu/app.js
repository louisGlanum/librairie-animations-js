window.addEventListener("DOMContentLoaded", () => {
  toggleTheme();

  introHome();
  submenuPosition();

  managePanel();
  managePanelSide();

  hoverMensUniverseLink();
});

const introHome = () => {
  const wrapper_menu = document.querySelector(".wrapper_menu");
  const cmTop = wrapper_menu.querySelector(".cm--top");
  const cmBottom = wrapper_menu.querySelector(".cm--bottom");
  const cmLeft = wrapper_menu.querySelector(".cm--left");
  const cmRight = wrapper_menu.querySelector(".cm--right");

  const linkTop = cmTop.querySelectorAll("li .link-menu");
  const linkBottom = cmBottom.querySelectorAll("li .link-menu");
  const linkLeft = cmLeft.querySelectorAll("li .link-menu");
  const linkRight = cmRight.querySelectorAll("li .link-menu");
  const wrapper_global = document.querySelector(".wrapper_global");

  const tl = gsap.timeline();
  tl.to(cmTop, { y: 0, duration: 1, ease: "power3.inOut" })
    .to(cmBottom, { y: 0, duration: 1, ease: "power3.inOut" }, "<")
    .to(cmLeft, { x: 0, duration: 1, ease: "power3.inOut" }, "<")
    .to(cmRight, { x: 0, duration: 1, ease: "power3.inOut" }, "<")
    .to(wrapper_global, { "--thickness-content": "40px", duration: 1, ease: "power3.inOut" }, "<")
    .to(linkTop, { y: 0, duration: 1, ease: "power3.inOut" }, "-=0.9")
    .to(linkBottom, { y: 0, duration: 1, ease: "power3.inOut" }, "<")
    .to(linkLeft, { y: 0, duration: 1, ease: "power3.inOut" }, "<")
    .to(linkRight, { y: 0, duration: 1, ease: "power3.inOut" }, "<");
};

const submenuPosition = () => {
  const submenuLook = document.querySelector(".submenu--look");
  const submenuSubclasses = document.querySelector(".submenu--subclasses");
  const submenuMensUniverse = document.querySelector('.submenu--mens-universe')
  const distanceLook = getPositionFromLeft(".look");
  const distanceSubclasses = getPositionFromLeft(".subclasses");
  const distanceMensUniverse = getPositionFromLeft(".mens-universe");

  submenuLook.style.marginLeft = `${distanceLook}`;
  submenuSubclasses.style.marginLeft = `${distanceSubclasses}`;
  submenuMensUniverse.style.marginLeft = `${distanceMensUniverse}`

  window.addEventListener("resize", () => {
    const distanceLook = getPositionFromLeft(".look");
    const distanceSubclasses = getPositionFromLeft(".subclasses");
    submenuLook.style.marginLeft = `${distanceLook}`;
    submenuSubclasses.style.marginLeft = `${distanceSubclasses}`;
  });
};

const getPositionFromLeft = (className) => {
  const element = document.querySelector(className);
  const elementRect = element.getBoundingClientRect();
  // 40 = --thickness-content
  const distanceLeft = elementRect.left - 40 -20;
  return `${distanceLeft}px`;
};

const managePanelSide = () => {
  const panel = document.querySelector(".panel-side");
  const link = document.querySelector(".link-menu-right");
  const data = link.dataset.panel;
  const submenu = document.querySelector(`.submenu--${data}`);

  const tl = gsap.timeline({ paused: true });
  tl.to(submenu, { opacity: 1, duration: 0.5, delay: 0.2 });

  link.submenu = submenu;
  link.panel = panel;
  link.tl = tl;
  panel.tl = tl;

  link.addEventListener("mouseenter", openSidePanel);
  panel.addEventListener("mouseleave", closeSidePanel);

  function openSidePanel() {
    const theme = document.body.classList.contains('dark');
    panel.style.width = `300px`;
    panel.style.borderLeft =  theme ? `1px solid white` : `1px solid #292c35`;
    this.panel.style.pointerEvents = "all";
    this.tl.play();
    setTimeout(() => {
      panel.style.borderLeft =  theme ? `1px solid white` : `1px solid #292c35`;
    }, 300);
  }
  function closeSidePanel() {
    const theme = document.body.classList.contains('dark');
    this.style.width = `0px`;

    this.style.pointerEvents = "none";
    this.tl.restart().pause();
    setTimeout(() => {
      panel.style.borderLeft = theme ? `1px solid white` : `1px solid #292c35`;
    }, 300);
  }
};

const managePanel = () => {
  const panel = document.querySelector(".panel");
  const linksMenu = document.querySelectorAll(".link-menu-top");

  linksMenu.forEach((link) => {

    const data = link.dataset.panel;
    const submenu = document.querySelector(`.submenu--${data}`);
    let links = submenu.querySelectorAll('.link-submenu');

    if(submenu.classList.contains('submenu--color-stories')){
      links = submenu.querySelectorAll('.cs_link')
    }
    if(submenu.classList.contains('submenu--mens-universe')){
      links = submenu.querySelectorAll('.mu_link')
    }

    const tl = gsap.timeline({ paused: true });
    
    tl
    .to(submenu, { opacity: 1, duration: 0.5})
    .to(links, { stagger:{each:0.09}, opacity: 1, y:0, duration: 0.7 },"-=0.5");

    link.submenu = submenu;
    link.panel = panel;
    link.tl = tl;
    submenu.panel = panel;
    submenu.tl = tl;

    link.addEventListener("mouseenter", openPanel);
    submenu.addEventListener("mouseleave", closePanel);
  });

  function openPanel() {
    const theme = document.body.classList.contains('dark');
    linksMenu.forEach((link) => {
      link.tl.restart().pause();
      link.submenu.style.pointerEvents = "none";
    });
    const height = this.submenu.offsetHeight;
    // panel.style.height = `${height}px`;

    panel.style.height = `319px`;
    panel.style.borderBottom = theme ? `1px solid white` : `1px solid #292c35`;
    this.submenu.style.pointerEvents = "all";

    this.tl.play();
    setTimeout(() => {
      panel.style.borderBottom = theme ? `1px solid white` : `1px solid #292c35`;
    }, 300);
  }

  function closePanel(e) {

 

      const theme = document.body.classList.contains('dark');
      panel.style.height = `0px`;
      console.log(e.target);
      this.style.pointerEvents = "none";
   
      this.tl.restart().pause();
      
      setTimeout(() => {
        panel.style.borderBottom = theme ? `0px solid white` : `0px solid #292c35`;
      }, 300);
  }
};

const toggleTheme = () => {
  const checkbox = document.getElementById("checkbox");

  if (!localStorage.getItem("dark")) {
    localStorage.setItem("dark", JSON.stringify(false));
  } else {
    console.log("localStorage déja set");

    if (JSON.parse(localStorage.getItem("dark")) === true) {
      document.body.classList.add("dark");
    }
  }

  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    const switchTheme = !JSON.parse(localStorage.getItem("dark"));
    localStorage.setItem("dark", JSON.stringify(switchTheme));
  });
};

const hoverMensUniverseLink = () => {
  const links = document.querySelectorAll('.submenu--mens-universe .mu_elem');
  const imgOfWrapper = document.querySelector('.submenu--mens-universe .mu_image_wrapper img');
  const container = document.querySelector('.submenu--mens-universe .mu_container')
  imgOfWrapper.style.opacity = 0;
  links.forEach((link) => {
    const imgSrc = link.dataset.img;
    
    link.imgSrc = imgSrc;
    link.addEventListener('mouseenter', inLink)
    container.addEventListener('mouseleave', outLink)
  })

  function inLink() {
    imgOfWrapper.src = this.imgSrc;
    imgOfWrapper.style.opacity = 1;
  }
  function outLink() {
    imgOfWrapper.src = '#';
    imgOfWrapper.style.opacity = 0;
  }
}