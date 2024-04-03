console.log(gsap);
window.addEventListener("DOMContentLoaded", () => {
    storyPopup_animation();
})

const storyPopup_animation = () => {
    const background_transition = document.querySelector(".bg_white_transition");
    const popupWrapper = document.querySelector(".story_popup_wrapper");
    const closeButton = popupWrapper.querySelector(".close");

    const storyContainers = document.querySelectorAll('.story_container')
    const popupImg = popupWrapper.querySelector(".story_popup_img");
    const popupImgCache = popupWrapper.querySelector(".story_popup_img_cache");

    const tl = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });
  
    tl
      .to(background_transition, { opacity: 1, duration: 0.6, ease: "power3.inOut" })
      .to(popupWrapper,{ opacity: 1, duration: 0.3, ease: "power3.inOut" },"<0.3");
  
    tl2
      .to(popupImgCache, { y: "-100%", duration: 1, ease: "power3.inOut" })
      .to(popupImg, { scale: 1, duration: 1, ease: "power3.inOut" }, "<");

    storyContainers.forEach((container) => {
        const button = container.querySelector('.line-button');

        button.animation = tl;
        button.animation2 = tl2;
        button.lineupImg = container.dataset.lineup;
        button.popup = popupWrapper;
        button.popupImg = popupImg;
        
        closeButton.animation = tl;
        closeButton.animation2 = tl2;
        closeButton.popup = popupWrapper;

        button.addEventListener('click', storyPopupIn);
        closeButton.addEventListener('click', storyPopupOut)
    })
}

function storyPopupIn() {
    const body = document.querySelector('body')
    this.popup.style.pointerEvents = "all";
    this.animation.play();
    body.style.overflow="hidden"
    this.popupImg.src = this.lineupImg;
    this.animation2.play();
}

function storyPopupOut() {
   const body = document.querySelector('body')
    body.style.overflow="visible"
    this.popup.style.pointerEvents = "none";
    this.animation.restart().pause();
    this.animation2.restart().pause();
}