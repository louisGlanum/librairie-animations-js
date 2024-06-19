window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    matrixSection_video();
    matrixSection_video_popup();
    customMouseCursor()
    cursorEvent('.video-clip-container', ['active'])
})

const matrixSection_video = () => {
    const section = document.querySelector('.video-clip-section')
    const container = section.querySelector('.video-clip-container');
    const videoContainer = section.querySelector('.video_container');
    const videoLoop = document.querySelector('.video-loop')
    const player = videojs(videoLoop,{}).ready(function(){
        this.controls(false)
    })
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start: "top 20%",
            end: "top top",
            scrub: true,
            markers: true
        }
    })
    tl.to(container, {scale: 1}).to(videoContainer, {scale: 1}, "<")
}

const matrixSection_video_popup = () => {
    const body = document.querySelector('body')
    const containerLoop = document.querySelector('.video-clip-container')
    const popupVideo = document.querySelector('.popup-video-wrapper')
    const containerFull = popupVideo.querySelector('.video_container')
    const closeBtn = popupVideo.querySelector('.close-popup-video')
    const videoFull = document.querySelector('.video-full')

    const tl = gsap.timeline({paused: true})
    .to(popupVideo, {opacity:1, duration:0.5})
    .to(containerFull, {opacity:1, duration:0.5})

    const player = videojs(videoFull,{})

    containerLoop.addEventListener('click', () => {
        popupVideo.style.pointerEvents = 'all'
        body.style.overflow ='hidden'
        tl.play()
        setTimeout(() => player.play(), 500)
    })
    closeBtn.addEventListener('click', () => {
        popupVideo.style.pointerEvents = 'none'
        body.style.overflow ='auto'
        tl.reverse()
        player.pause()
        setTimeout(() => player.currentTime(0), 500)
    })
}

// Ajout du texte à l'intérieur du curseur & ajout d'une classe
 const cursorEvent = (overedElementSelector, actionClasses) => {
    const body = document.querySelector('body')
    const cursor = document.getElementById('cursor')
    if (cursor && overedElementSelector && actionClasses) {
      const overedElement = document.querySelectorAll(overedElementSelector)
      if (overedElement.length) {
        overedElement.forEach((el) => {
          el.addEventListener('mouseenter', (e) => {
            actionClasses.forEach((actionClass) => {
              cursor.classList.add(actionClass)
              body.style.cursor = 'none'
            })
          })
  
          el.addEventListener('mouseleave', () => {
            actionClasses.forEach((actionClass) => {
              cursor.classList.remove(actionClass)
                body.style.cursor = 'auto'
            })
          })
        })
      }
    }
  }
  
  const customMouseCursor = () => {
    const cursor = document.getElementById('cursor')
    if (cursor) {
      // Fait en sorte que le custom cursor suive la souris
      window.addEventListener('pointermove', (e) => {
        cursor.style.left = `${e.clientX - cursor.clientWidth / 2}px`
        cursor.style.top = `${e.clientY - cursor.clientHeight / 2}px`
      })
    }
  }
