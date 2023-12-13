const swup = new Swup({
  plugins: [
    new SwupJsPlugin({
      animations: [
        {
          from: "index.html", // matches any route
          to: "project.html", // matches any route
          out: (done) => {
            console.log('out')
            const img = document.querySelector(".img-container");
            gsap.to(img, {
              width: "100%",
              height: "100%",
              duration: 1,
              onComplete: done,
            });
          },
          in: (done) => {
            console.log('in')
            const heroSection = document.querySelector('.hero-section')
            const titleProject = document.querySelector('.title-project')
            gsap.to(heroSection,{
              height:'80vh',
              duration:2,
              onComplete: done,
              ease: "power4.out",
          })
          gsap.to(titleProject,{
            opacity:1,
            duration:1,
            delay:1
          })
          },
        },
      ],
    }),
  ],
});


// console.log(gsap);

// const tl = gsap.timeline();
// img.addEventListener("click", () => {
//   tl.to(img, {
//     width: "100%",
//     height: "100%",
//     duration: 2,
//   });
// });
