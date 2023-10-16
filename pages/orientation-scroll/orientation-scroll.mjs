gsap.registerPlugin(ScrollTrigger);


window.addEventListener('DOMContentLoaded', (e) =>{
    initialiseGSAPScrollTriggerPinningHorizontal();
    initialiseLenisScroll();
})

function initialiseGSAPScrollTriggerPinningHorizontal() {
    let sectionPin = document.querySelector('#section_pin');
    let sectionPin2 = document.querySelector('#section_pin2');

    console.log("scrollWidth", sectionPin.scrollWidth);
    console.log("offsetWidth", sectionPin.offsetWidth);
    console.log("clientWidth",document.documentElement.clientWidth);

    let containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: '#section_to-pin',
        start:'center center',
        end: () => "+=" + sectionPin.offsetWidth,
        pin: true,
        scrub: true,
      },
      x: () => -(sectionPin.scrollWidth - document.documentElement.clientWidth) + "px",
      ease: 'none'
    });

    var imageWrappers = sectionPin.querySelectorAll('.image_wrapper');

    imageWrappers.forEach(imageWrapper => {
      var imageWrapperID = imageWrapper.id;
      gsap.to(imageWrapper, {
        scrollTrigger: {
          trigger: imageWrapper,
          start: 'left center',
          end: 'right center',
          containerAnimation: containerAnimation,
          toggleClass: {
            targets: '.' + imageWrapperID,
            className: 'active'
          }
        }
      });
    });

    let containerAnimation2 = gsap.to(sectionPin2, {
      scrollTrigger:{
        trigger:'#section_to-pin2',
        start:'center center',
        end: () => "+=" + sectionPin2.offsetWidth,
        pin: true,
        scrub:true,
        onToggle: (self) => console.log("toggled. active?", self.isActive),
        onUpdate: (self) => console.log("progress:", self.progress),
        onUpdate: (self) => console.log("progress:", self.getVelocity()),
      }
    })

  }


  function initialiseLenisScroll() {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 2.5
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }