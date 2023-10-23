window.addEventListener("DOMContentLoaded", () => {
  const line_ups = document.querySelectorAll(".container-lineup li");
  const content_looks = document.querySelectorAll(".container-panels .content-look");
  const start_content_look = document.querySelector(".content-look.visible");
  const start_cache_img = start_content_look.querySelector(".content-look.visible .cache-image");
  const start_cache_title = start_content_look.querySelector(".content-look.visible .cache-title");
  const start_cache_details = start_content_look.querySelectorAll(".content-look.visible .cache-detail");

  let isAnimating = false;
  let index_look = 1;

  const tl = gsap.timeline();

  tl.to(start_content_look, { x: -80, duration: 0, opacity: 0 });
  tl.to(start_content_look, { display: "block", opacity: 1, duration: 1, x: 0});
  tl.to(start_cache_img, { x: "100%", duration: 0.5 }, "=-1");
  tl.to(start_cache_title, { x: "100%", duration: 0.5 }, "=-1");
  tl.to(start_cache_details, { x: "100%", duration: 0.5, stagger: { amount: 0.2 } },"=-1");

  line_ups.forEach((line) => {
    line.addEventListener("click", () => {
        const line_attr = line.dataset.line;

      if (isAnimating || Number(line.dataset.line) === index_look) return;
 
      isAnimating = true;
      index_look = line.dataset.line;

      const current_look = document.querySelector(".content-look.visible");

      content_looks.forEach((look) => {
        const look_attr = look.dataset.content;
        const cache_img = look.querySelector(".cache-image");
        const cache_title = look.querySelector(".cache-title");
        const cache_details = look.querySelectorAll(".cache-detail");

        const current_cache_img = current_look.querySelector(".content-look.visible .cache-image");
        const current_cache_title = current_look.querySelector(".content-look.visible .cache-title");
        const current_cache_details = current_look.querySelectorAll(".content-look.visible .cache-detail");

        if (line_attr === look_attr) {
          const tl = gsap.timeline({
            onStart: function () {
              console.log("play");
            },
            onComplete: function () {
              look.classList.add("visible");
              current_look.classList.remove("visible");
              isAnimating = false;
            },
          });

          tl.to(current_look, { opacity: 1, duration: 0 });
          tl.to(current_look, { opacity: 0, duration: 0.5 });
          tl.to(current_look, { display: "none", duration: 0 });

          tl.to(look, { x: -80, duration: 0 });
          tl.to(look, {display: "block", opacity: 1, duration: 1, x: 0});
          tl.to(cache_img, { x: "100%", duration: 0.5 }, "=-1");
          tl.to(cache_title, { x: "100%", duration: 0.5 }, "=-1");
          tl.to(cache_details, { x: "100%", duration: 0.5, stagger: { amount: 0.2 }},"=-1");

          tl.to(current_cache_img, { x: "0%", duration: 0 });
          tl.to(current_cache_title, { x: "0%", duration: 0 });
          tl.to(current_cache_details, { x: "0%", duration: 0 });
        }
      });
    });
  });
});
