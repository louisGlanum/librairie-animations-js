 
export const cacheCard = () => {
  const tout_les_caches = document.querySelectorAll(".cache");
  const container_accordion = document.querySelector(".container");

  tout_les_caches.forEach((cache, i) => {
    cache.addEventListener("mouseover", () => {

      tout_les_caches.forEach((c, j) => {

        if (i < j) {
          c.style.background = `rgba(20,20,20,${((j - i) / 10) * 1.7})`;
          c.style.transition = "background .5s ease-in-out";
        }
        if (i > j) {
          c.style.background = `rgba(20,20,20,${((i - j) / 10) * 1.7})`;
          c.style.transition = "background .5s ease-in-out";
        }
        if (i === j) {
          c.style.background = "rgba(20,20,20,0)";
          c.style.transition = "background .5s ease-in-out";
        }
      });

      let mouse_inside_accordion = false;

      document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const container = container_accordion.getBoundingClientRect();

        const is_inside_container =
          mouseX >= container.left &&
          mouseX <= container.right &&
          mouseY >= container.top &&
          mouseY <= container.bottom;

        if (is_inside_container && !mouse_inside_accordion) {
          mouse_inside_accordion = true;
        } else if (!is_inside_container && mouse_inside_accordion) {
          mouse_inside_accordion = false;

          tout_les_caches.forEach((cache) => {
            cache.style.background = "rgba(20,20,20,.4)";
          });
        }
      });
    });
  });
}
cacheCard();