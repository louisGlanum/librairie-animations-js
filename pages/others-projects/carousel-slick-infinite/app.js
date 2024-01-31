
document.addEventListener('DOMContentLoaded', () => {

    const splide = new Splide( '.splide', {
        type   : 'loop',
        drag   : 'free',
        focus  : 'center',
        arrows : false,
        perPage: 5,
        autoScroll: {
          speed: -1,
        },
      } );
      
    //   splide.mount( );
      splide.mount( window.splide.Extensions);
})




  