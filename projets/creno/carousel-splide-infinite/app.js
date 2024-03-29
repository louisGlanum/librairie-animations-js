
document.addEventListener('DOMContentLoaded', () => {
  carouselScroll()
})


const carouselScroll = () => {
  const splide = new Splide( '.splide', {
    type   : 'loop',
    drag   : 'free',
    focus  : 'center',
    arrows : false,
    
    pagination: false,
    perPage: 3,
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      900: {perPage: 2},
      640: {perPage: 1},
    },
    reducedMotion:{
      speed: 0,
      rewindSpeed: 0,
      autoplay: 'pause'
    }
  } );
  splide.mount( window.splide.Extensions);
}