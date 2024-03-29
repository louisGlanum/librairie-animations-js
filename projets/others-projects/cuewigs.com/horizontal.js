gsap.registerPlugin(ScrollTrigger);


window.addEventListener('DOMContentLoaded', (e) =>{
    initialiseGSAPScrollTriggerPinningHorizontal();
    // initialiseLenisScroll();
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
        onEnter: () => {console.log('enter');}
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



  }

