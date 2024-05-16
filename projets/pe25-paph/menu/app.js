window.addEventListener('DOMContentLoaded', () => {
    introHome();
    submenuPosition();


    managePanel('.link-menu.look', '.submenu--look');
    // managePanel('.link-menu.subclasses', '.submenu--subclasses');
})

const introHome = () => {
    const wrapper_menu = document.querySelector('.wrapper_menu');
    const cmTop = wrapper_menu.querySelector('.cm--top');
    const cmBottom = wrapper_menu.querySelector('.cm--bottom');
    const cmLeft = wrapper_menu.querySelector('.cm--left');
    const cmRight = wrapper_menu.querySelector('.cm--right');

    const linkTop = cmTop.querySelectorAll('li .link-menu');
    const linkBottom = cmBottom.querySelectorAll('li .link-menu');
    const linkLeft = cmLeft.querySelectorAll('li .link-menu');
    const linkRight = cmRight.querySelectorAll('li .link-menu');
    const wrapper_global = document.querySelector('.wrapper_global');

    const tl = gsap.timeline();
    tl.to(cmTop, {y:0, duration:1, ease:"power3.inOut"})
    .to(cmBottom, {y:0, duration:1, ease:"power3.inOut"},"<")
    .to(cmLeft, {x:0, duration:1, ease:"power3.inOut"},"<")
    .to(cmRight, {x:0, duration:1, ease:"power3.inOut"},"<")
    .to(wrapper_global, {"--thickness-content":"40px", duration:1, ease:"power3.inOut"},"<")
    .to(linkTop, {y:0, duration:1, ease:"power3.inOut"},"-=0.9")
    .to(linkBottom, {y:0, duration:1, ease:"power3.inOut"},"<")
    .to(linkLeft, {y:0, duration:1, ease:"power3.inOut"},"<")
    .to(linkRight, {y:0, duration:1, ease:"power3.inOut"},"<")
}

const submenuPosition = () => {
    const submenuLook = document.querySelector('.submenu--look');
    const submenuSubclasses = document.querySelector('.submenu--subclasses')
    const distanceLook = getPositionFromLeft('.look')
    const distanceSubclasses = getPositionFromLeft('.subclasses');

    submenuLook.style.marginLeft = `${distanceLook}`
    submenuSubclasses.style.marginLeft = `${distanceSubclasses}`

    window.addEventListener('resize' , () => {
        const distanceLook = getPositionFromLeft('.look')
        const distanceSubclasses = getPositionFromLeft('.subclasses');
        submenuLook.style.marginLeft = `${distanceLook}`
        submenuSubclasses.style.marginLeft = `${distanceSubclasses}`
    })
}

const getPositionFromLeft = (className) => {
    const element = document.querySelector(className);
    const elementRect = element.getBoundingClientRect();
    // 40 = --thickness-content
    const distanceLeft = elementRect.left - 40;
    return  `${distanceLeft}px`
}


const managePanel = () => {
    const panel = document.querySelector('.panel');
    const linksMenu = document.querySelectorAll('.link-menu-top');

    linksMenu.forEach((link) =>{
       const data = link.dataset.panel;
       const submenu = document.querySelector(`.submenu--${data}`)
       const tl = gsap.timeline({paused:true});
       tl.to(submenu, {opacity:1, duration:1, delay:0.2})
        

        link.submenu = submenu;
        link.panel = panel;
        link.tl = tl;
        submenu.panel = panel;
        submenu.tl = tl;
        
        link.addEventListener('mouseenter', openPanel);
        submenu.addEventListener('mouseleave', closePanel);
    })
    
    function openPanel(){
        linksMenu.forEach((link) => {
            link.tl.restart().pause()
            link.submenu.style.pointerEvents ='none';
        });
        const height = this.submenu.offsetHeight;
        panel.style.height = `${height}px`;
        panel.style.borderBottom = `1px solid black`
        this.submenu.style.pointerEvents = 'all';
        this.tl.play();
        setTimeout(() => {
            panel.style.borderBottom = `1px solid black`
        }, 300)
    }
    
    function closePanel(){
        panel.style.height = `0px`;

        this.style.pointerEvents = 'none';
        this.tl.restart().pause();
        setTimeout(() => {
            panel.style.borderBottom = `0px solid black`
        }, 300)
    }
};