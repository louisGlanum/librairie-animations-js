window.addEventListener("DOMContentLoaded", () => {
    vmPopup_animation();
    vmPopup_interaction();
    
  });
  
  const vmPopup_animation = () => {
    const background_transition = document.querySelector(".bg_white_transition");
    const popupWrapper = document.querySelector(".vm_popup_wrapper");
  
    const closeButton = popupWrapper.querySelector(".close");
    const vmGrids = document.querySelectorAll(".vm_grid");
    const storyVmButtons = document.querySelectorAll('.story_grid button');

    const popup = document.querySelector(".vm_popup_wrapper");
    const popupImg = popup.querySelector(".vm_popup_img");
    const popupImgCache = popup.querySelector(".vm_popup_img_cache");
    const popupTitle = popup.querySelector(".title");
  
    const tl = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });
  
    tl
      .to(background_transition, { opacity: 1, duration: 0.6, ease: "power3.inOut" })
      .to(popupWrapper,{ opacity: 1, duration: 0.3, ease: "power3.inOut" },"<0.3");
  
    tl2
      .to(popupImgCache, { y: "-100%", duration: 1, ease: "power3.inOut" })
      .to(popupImg, { scale: 1, duration: 1, ease: "power3.inOut" }, "<")
      .to(popupTitle, { y: 0, duration: 0.8, ease: "power3.inOut" }, "<");

      // vm
      vmGrids.forEach((grid) => {
          const vmButtons = grid.querySelectorAll(".vm_button");
  
      vmButtons.forEach((button, i) => {
          button.animation = tl;
          button.animation2 = tl2;
          button.index = i;
          button.popup = popupWrapper;
  
          closeButton.animation = tl;
          closeButton.animation2 = tl2;
          closeButton.popup = popupWrapper;
  
          button.addEventListener("click", vmPopupIn);
          closeButton.addEventListener("click", vmPopupOut);
      });
    });

    // story 
    storyVmButtons.forEach((button) => {
      button.vm = button.dataset.vm
      button.addEventListener('click', storyToPopup);
    })

  };

  // simule un click vers une popup vm
  function storyToPopup() {
    const data = this.vm
    const vmRedirection = document.querySelector(`.vm_grid button[data-vm="${data}"]`)
    vmRedirection.click();
  }
  
  const vmPopup_interaction = () => {
    const popupItems = document.querySelectorAll(".gallery_item");

    popupItems.forEach((item) => {
        item.addEventListener('click', vmPopupSwitch)
    })
  };
  
  function vmPopupSwitch() {
    const popup = document.querySelector(".vm_popup_wrapper");
    const popupImg = popup.querySelector(".vm_popup_img");
    const popupImgCache = popup.querySelector(".vm_popup_img_cache");
    const new_popupImg = this.querySelector("img");
    const popupTitle = popup.querySelector(".title");
  
    setTimeout(() => (popupImg.src = new_popupImg.src), 500);
  
    const tl = gsap.timeline();
  
    tl.to(popupImg, { opacity: 0, duration: 0.5 })
      .to(popupTitle, { opacity: 0, duration: 0.5 }, "<")
  
      .to(popupImgCache, { y: 0, duration: 0 })
      .to(popupTitle, { opacity: 1, y: "100%", duration: 0 }, "<")
      .to(popupImg, { opacity: 1, scale: 1.15, duration: 0 }, "<")
  
      .to(popupImgCache, { y: "-100%", duration: 1, ease: "power3.inOut" })
      .to(popupImg, { scale: 1, duration: 1, ease: "power3.inOut" }, "<")
      .to(popupTitle, { y: 0, duration: 0.8, ease: "power3.inOut" }, "<");
  
    //switch cadre select
    popup.querySelector(".gallery_item.active").classList.remove("active");
    this.classList.add("active");
  }
  
  function vmPopupIn() {
      this.popup.style.pointerEvents = "all";
      this.animation.play();

      const body = document.querySelector('body')
      const vm = this.closest(".vm_grid");
      const container = this.closest(".vm_container");
      const thumbnail = container.querySelector("img");
      const imgGallery = vm.querySelectorAll("img");
      const title = container.querySelector(".vm_title");
    
      const popup = document.querySelector(".vm_popup_wrapper");
      const popupImg = popup.querySelector(".vm_popup_img");
      const popupItem = popup.querySelectorAll(".gallery_item");
      const popupTitle = popup.querySelector(".title");


      body.style.overflow="hidden"
      popupImg.src = thumbnail.src;
      popupTitle.innerHTML = title.innerHTML;
    
      this.animation2.play();
    
      popupItem.forEach((item, i) => {
        const img = item.querySelector("img");
        item.style.display = "block";
        img.src = imgGallery[i] ? imgGallery[i].src : (item.style.display = "none");
        this.index === i && item.classList.add("active");
      });
    }
    
    function vmPopupOut() {
      const body = document.querySelector('body')
      body.style.overflow="visible"
      this.popup.style.pointerEvents = "none";
      this.animation.restart().pause();
      this.animation2.restart().pause();
      document.querySelector(".gallery_item.active").classList.remove("active");
    }