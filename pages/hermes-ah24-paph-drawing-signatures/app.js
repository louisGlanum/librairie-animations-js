window.addEventListener('DOMContentLoaded', () => {
    const title1 = document.querySelector('.title-1')
    const title2 = document.querySelector('.title-2')

    const container1 = document.querySelector('#video-1')
    const container2 =  document.querySelector('#video-2')
    menuScript();
    animationDSvideos()
    hoveringDSvideos(title1, container1)
    hoveringDSvideos(title2, container2)
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




//video logics
function animationDSvideos() {
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
  
    let viewX = window.innerWidth;
    let viewY = window.innerHeight;
  
    window.addEventListener("resize", () => {
      viewX = window.innerWidth;
      viewY = window.innerHeight;
    });
  
    var options = {
      html5: {
        vhs: {
          withCredentials: true,
        },
        hls: {
          limitRenditionByPlayerDimensions: false,
          smoothQualityChange: true,
          bandwidth: 6194304,
          overrideNative: true,
        },
      },
      smoothQualityChange: true,
      preload: "auto",
  
      userActions: {
        doubleClick: false,
      },
    };
  
    const player3 = videojs("video-3", options, function onPlayerReady() {
      setTimeout(() => {
        player3.play();
        player3.controls();
      }, 100);
    });
  
    const player4 = videojs("video-4", options, function onPlayerReady() {
      setTimeout(() => {
        player4.play();
        player4.controls();
      }, 100);
    });
  
    const player1 = videojs("video-1", options, function onPlayerReady() {
      const videoContainer1 = document.querySelector("#video-1");
      const videoContainer2 = document.querySelector("#video-2");
      const videoContainer3 = document.querySelector("#video-3");
  
      const fondBlanc = document.querySelector(".fond-blanc");
      const closeBtn = document.querySelector(".close-video-1");
      const titles = document.querySelectorAll(".title-video");
  
      setTimeout(() => {
        player1.play();
      }, 100);
  
      videoContainer1.addEventListener("click", () => {
        closeBtn.style.pointerEvents = "all";
        videoContainer3.style.pointerEvents = "all";
  
        const tl = gsap.timeline();
        const tl2 = gsap.timeline();
  
        tl.to(videoContainer1, {
          width: `${viewX}px`,
          height: `${viewY}px`,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in",
          top: 0,
          left: 0,
        });
        tl.to(
          titles,
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.9"
        );
        tl.to(
          fondBlanc,
          {
            opacity: 1,
            duration: 0.4,
          },
          "-=0.1"
        );
        tl.to(
          videoContainer3,
          {
            opacity: 1,
            duration: 0.2,
          },
          "-=0.1"
        );
        tl.to(closeBtn, {
          opacity: 1,
          duration: 0.5,
        });
  
        tl2.fromTo(
          videoContainer2,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.5,
          }
        );
  
        //restart video
        setTimeout(() => {
          player3.currentTime(0);
          player3.play();
        }, 1000);
  
        closeBtn.addEventListener("click", () => {
          closeBtn.style.pointerEvents = "none";
          videoContainer3.style.pointerEvents = "none";
          tl.reverse();
          setTimeout(() => {
            tl2.reverse();
          }, 1000);
        });
      });
    });
  
    const player2 = videojs("video-2", options, function onPlayerReady() {
      const videoContainer1 = document.querySelector("#video-1");
      const videoContainer2 = document.querySelector("#video-2");
      const videoContainer4 = document.querySelector("#video-4");
  
      const fondBlanc = document.querySelector(".fond-blanc");
      const closeBtn = document.querySelector(".close-video-2");
      const titles = document.querySelectorAll(".title-video");
  
      setTimeout(() => {
        player2.play();
      }, 100);
  
      videoContainer2.addEventListener("click", () => {
        closeBtn.style.pointerEvents = "all";
        videoContainer4.style.pointerEvents = "all";
  
        const tl = gsap.timeline();
        const tl2 = gsap.timeline();
  
        tl.to(videoContainer2, {
          width: `${viewX}px`,
          height: `${viewY}px`,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in",
          right: 0,
          bottom: 0,
        });
        tl.to(
          titles,
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.9"
        );
        tl.to(
          fondBlanc,
          {
            opacity: 1,
            duration: 0.4,
          },
          "-=0.1"
        );
        tl.to(
          videoContainer4,
          {
            opacity: 1,
            duration: 0.2,
          },
          "-=0.1"
        );
        tl.to(closeBtn, {
          opacity: 1,
          duration: 0.5,
        });
  
        tl2.fromTo(
          videoContainer1,
          {
           opacity:1
          },
          {
            opacity:0,
            duration: 0.5,
          }
        );
  
        //restart video
        setTimeout(() => {
          player4.currentTime(0);
          player4.play();
        }, 1000);
  
        closeBtn.addEventListener("click", () => {
          closeBtn.style.pointerEvents = "none";
          videoContainer4.style.pointerEvents = "none";
          tl.reverse();
          setTimeout(() => {
            tl2.reverse();
          }, 1000);
        });
      });
    });

}  


//video hovering 
function hoveringDSvideos(title, container) {
    
    container.addEventListener('mouseover', () => {
        container.classList.add('active')
        title.classList.add('active')
    })
    container.addEventListener('mouseout', () => {
        container.classList.remove('active')
        title.classList.remove('active')
    })
}