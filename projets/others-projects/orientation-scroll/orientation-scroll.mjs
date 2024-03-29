gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", (e) => {
  initialiseGSAPScrollTriggerPinningHorizontal();
  // initialiseLenisScroll();
});

function initialiseGSAPScrollTriggerPinningHorizontal() {
  let sectionPin = document.querySelector("#section_pin");
  let sectionPin2 = document.querySelector("#section_pin2");
  let sectionPin3 = document.querySelector("#section_pin3");

  const imageWrappers = sectionPin.querySelectorAll(".image_wrapper");



  let imgVisible = new Array(imageWrappers.length).fill(false);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section_to-pin",
      start: "center center",
      end: () => "+=" + sectionPin.offsetWidth,
      pin: true,
      scrub: true,
      onUpdate: () => {
        updateAnimations();
      },
      // onLeave:() => {
      //   console.log('leave')
      //   imgVisible.fill(false)
      // },
      // onLeaveBack: () => {
      //   console.log('leave back')
      //   imgVisible.fill(false)
      // },
      // onEnter:() => console.log('enter'),
      // onEnterBack:()=> {
      //   console.log('enter back') 
      // },
    },
  });
  tl.to(sectionPin, {
    x: () => -(sectionPin.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
  });

  function updateAnimations() {
    imageWrappers.forEach((imageWrapper, index) => {
      if (isVisible(imageWrapper) && !imgVisible[index]) {
        imgVisible[index] = true;
        animateImage(imageWrapper);
      }
    });
  }

  function animateImage(imageWrapper) {
    const imageTimeline = gsap.timeline({ paused: true }); 
  
    imageTimeline.to(imageWrapper, { scale: 1 }); 
    tl.add(imageTimeline.play(), "<");
  }


  function animateImage2(imageWrapper) {
    const tl2 = gsap.timeline()

    console.log('création tl');
    tl2.to(imageWrapper,{
      scale:1.15,
      duration:1
    })

    tl.eventCallback("onComplete", function() {
        console.log('La timeline 2 est terminée, fais quelque chose maintenant !');
        tl2.reverse();
    });
  }













  function isVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    return rect.right >= 0 && rect.left <= windowWidth;
  }


















  let containerAnimation2 = gsap.to(sectionPin2, {
    scrollTrigger: {
      trigger: "#section_to-pin2",
      start: "center center",
      end: () => "+=" + sectionPin2.offsetWidth,
      pin: true,
      scrub: true,
    },
    x: () => -(sectionPin2.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
  });

  let containerAnimation3 = gsap.to(sectionPin3, {
    scrollTrigger: {
      trigger: "#section_to-pin3",
      start: "center center",
      end: () => "+=" + sectionPin3.offsetWidth,
      pin: true,
      scrub: true,
    },
    x: () => -(sectionPin3.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
  });

  // imageWrappers.forEach(imageWrapper => {
  //   var imageWrapperID = imageWrapper.id;
  //   gsap.to(imageWrapper, {
  //     scrollTrigger: {
  //       trigger: imageWrapper,
  //       start: 'left center',
  //       end: 'right center',
  //       containerAnimation: containerAnimation,
  //       toggleClass: {
  //         targets: '.' + imageWrapperID,
  //         className: 'active'
  //       }
  //     }
  //   });
  // });
}

function initialiseLenisScroll() {
  const lenis = new Lenis({
    smoothWheel: true,
    duration: 2.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
initialiseLenisScroll();
