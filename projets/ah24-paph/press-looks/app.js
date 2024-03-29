window.addEventListener('DOMContentLoaded', () => {
  (function () {
    const blurProperty = gsap.utils.checkPrefix("filter"),
      blurExp = /blur\((.+)?px\)/,
      getBlurMatch = (target) =>
        (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

    gsap.registerPlugin({
      name: "blur",
      get(target) {
        return +getBlurMatch(target)[1] || 0;
      },
      init(target, endValue) {
        let data = this,
          filter = gsap.getProperty(target, blurProperty),
          endBlur = "blur(" + endValue + "px)",
          match = getBlurMatch(target)[0],
          index;
        if (filter === "none") {
          filter = "";
        }
        if (match) {
          index = filter.indexOf(match);
          endValue =
            filter.substr(0, index) +
            endBlur +
            filter.substr(index + match.length);
        } else {
          endValue = filter + endBlur;
          filter += filter ? " blur(0px)" : "blur(0px)";
        }
        data.target = target;
        data.interp = gsap.utils.interpolate(filter, endValue);
      },
      render(progress, data) {
        data.target.style[blurProperty] = data.interp(progress);
      },
    });
  })();
    menuScript();
    onEnterLookView()
    swiperInitLooks()
    EventClickLook()
})

//menu
function menuScript() {
    const menu = document.querySelector(".menu-wrapper");
    const blurBg = document.querySelector(".blur-bg-menu");
    const dropdownWrapper = document.querySelector(".dropdown-wrapper");
    const dropdownContent = document.querySelector(".dropdown-content");
  
    menu.addEventListener("mouseover", () => {
      blurBg.classList.add("active");
    });
    menu.addEventListener("mouseout", () => {
      blurBg.classList.remove("active");
    });
  
    dropdownWrapper.addEventListener("mouseover", () => {
      dropdownContent.classList.add("active");
    });
    dropdownWrapper.addEventListener("mouseout", () => {
      dropdownContent.classList.remove("active");
    });
}

function swiperInitLooks(){
    const swiper = new Swiper(".swiper-container", {
        
        slidesPerView: "auto",
        spaceBetween: 5,
        freeMode: true,
        mousewheel: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: false
          },
          speed: 10000,
          freeModeFluid: true
      });
}


function EventClickLook() {
  const sliderLook =  document.querySelectorAll(".thumbContainer")
  const mosaiqueLook = document.querySelectorAll(".mosaique-content .img-container")
  const hightlightLook = document.querySelectorAll(".look")

  const btnCloseMosaique = document.querySelectorAll('.btn-mosaique-close')
  const btnOpenMosaique = document.querySelector('.btn-mosaique-open')

  const mosaique = document.querySelector('.mosaique-content')
  const slider = document.querySelector('.slider-wrapper')

  const tl = gsap.timeline()

  //events toggle mosaique
  btnOpenMosaique.addEventListener('click',() => {
    const tlSlide = gsap.timeline()

    mosaique.classList.add('mosaique-open')
    document.querySelector('.look.active').classList.add('mosaique-open')

    console.log(tlSlide);
    tlSlide.to(slider,{
      opacity:0,
      height:0,
      duration:0.5
    })

    btnCloseMosaique.forEach((btn) => btn.classList.add('visible'))
  })

  btnCloseMosaique.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tlSlideClose = gsap.timeline()
      mosaique.classList.remove('mosaique-open')
      document.querySelector('.look.active.mosaique-open').classList.remove('mosaique-open')

      tlSlideClose.to(slider,{
        height:"133px", // valeur arbitraire
        opacity:1,
        duration:.5
      })

      btnCloseMosaique.forEach((btn) => btn.classList.remove('visible'))
    })

  })

  //event slider
  sliderLook.forEach((look) => {
    look.addEventListener('click',() => {
      const value = look.dataset.target
      //afficher le bon look
      

      displayCurrentLook(value, tl)
    })
    look.addEventListener('mouseover',() => {
      const value = look.dataset.target
      //flooter les looks non hover
      // blurNotCurrentLook(value)
    })
  })

  //event mosaique 
  mosaiqueLook.forEach((look) => {
    look.addEventListener('click',() => {
      const value = look.dataset.target
      //afficher le bon look
      displayCurrentLook(value, tl)
    })
  })

  //event video sur look
  hightlightLook.forEach((look) => {

  const btn = look.querySelector('.video-btn')

  if(btn){

    btn.addEventListener('click' , () => {
      const containerVideo = look.querySelector('.video-container')
      containerVideo.classList.add('visible')
      const closeBtn = look.querySelector('.close-btn')
      console.log(closeBtn);
      closeBtn.addEventListener('click',()=> {
        containerVideo.classList.remove('visible')
      })
    })
  }
})

}

function displayCurrentLook(value, tl){
  if(value){
    //reset class
    document.querySelector('.mosaique-content .active').classList.remove('active')
    document.querySelector('.thumbContainer.active').classList.remove('active')

    const oldLook = document.querySelector('.look.active')
    // document.querySelector('.look.active')?.classList.remove('active')
    // add class for current targets
    // look
    const targetLook = document.querySelector(`.look[data-target="${value}"]`)
    // mosaique encadrement
    const targetMosaique = document.querySelector(`.mosaique-content .img-container[data-target="${value}"]`)
    // slide encadrement
    const targetSlide = document.querySelector(`.thumbContainer[data-target="${value}"]`)

    targetMosaique.classList.add('active')
    targetSlide.classList.add('active')

    oldLook.classList.remove('active')
    targetLook.classList.add('active')
    
    tl.clear();
    tl.to(oldLook,{
      opacity:0,
      blur:20,
      duration:0.5,
      ease: "power2.inOut"
    })
    tl.to(targetLook,{
      opacity:1,
      blur:0,
      duration:1,
      ease: "power2.inOut",
    })

    setTimeout(() => {
      document.querySelector('.look.mosaique-open')?.classList.remove('mosaique-open')
      if(document.querySelector('.mosaique-content').classList.contains('mosaique-open')){
        targetLook.classList.add('mosaique-open')
      }
    }, 500)
  }
}


function onEnterLookView() {
  const sliderLook =  document.querySelectorAll(".thumbContainer")
  const mosaiqueLook = document.querySelectorAll(".mosaique-content .img-container")
  const hightlightLook = document.querySelectorAll(".look")
  const tl = gsap.timeline()


  tl.fromTo(sliderLook,{
    opacity:0,
  },{
    opacity:1,
    duration:1,
    stagger:0.04,
    ease: "power2.inOut"
  })
  tl.fromTo(hightlightLook[0],{
    opacity:0
  },{
    opacity:1,
    duration:1,
    ease: "power2.inOut"
  }, "-=3.2")
}



// function blurNotCurrentLook(value){
//   const sliderLook =  document.querySelectorAll(".thumbContainer")

//   sliderLook.forEach((slide) => {
//     slide.classList.remove('blur')
//     console.log();
//     if(Number(slide.dataset.target) !== Number(value)){

//       slide.classList.add('blur')
//     }else{
//       console.log("egal");
//     }
//     slide.addEventListener('mouseout', () => {
//       sliderLook.forEach((slide) => slide.classList.remove('blur'))
//     })
//   })
// }