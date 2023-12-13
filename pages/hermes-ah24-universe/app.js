const arrStyle = {
  all: [
    [1, 1, 3, 2],
    [1, 2, 2, 3],
    [2, 2, 3, 3],
    [1, 3, 3, 4],
    [1, 4, 2, 5],
    [2, 4, 3, 5],
    [1, 5, 3, 6],
    [3, 1, 4, 2],
    [4, 1, 5, 2],
    [3, 2, 5, 3],
    [3, 3, 4, 4],
    [4, 3, 5, 4],
    [3, 4, 5, 5],
    [3, 5, 4, 6],
    [4, 5, 5, 6],
  ],
  clothes: [
    [1, 1, 3, 2],
    [1, 2, 3, 3],
    [1, 3, 3, 4],
    [1, 4, 3, 5],
    [1, 5, 3, 6],
    [3, 1, 5, 2],
    [3, 2, 5, 3],
    [3, 3, 5, 4],
    [3, 4, 5, 5],
    [3, 5, 5, 6],
  ],
  shoes: [
    [1, 1, 3, 2],
    [1, 2, 3, 3],
    [1, 3, 3, 4],
    [1, 4, 3, 5],
    [1, 5, 3, 6],
    [3, 1, 5, 2],
    [3, 2, 5, 3],
    [3, 3, 5, 4],
    [3, 4, 5, 5],
    [3, 5, 5, 6],
  ],
  bags: [
    [1, 1, 3, 2],
    [1, 2, 3, 3],
    [1, 3, 3, 4],
    [1, 4, 3, 5],
    [1, 5, 3, 6],
    [3, 1, 5, 2],
    [3, 2, 5, 3],
    [3, 3, 5, 4],
    [3, 4, 5, 5],
    [3, 5, 5, 6],
  ],
  accessories: [
    [1, 1, 3, 2],
    [1, 2, 3, 3],
    [1, 3, 3, 4],
    [1, 4, 3, 5],
    [1, 5, 3, 6],
    [3, 1, 5, 2],
    [3, 2, 5, 3],
    [3, 3, 5, 4],
    [3, 4, 5, 5],
    [3, 5, 5, 6],
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  universeGallery();
});

//init grid gallery functions
const universeGallery = () => {
  const buttons = document.querySelectorAll(".universe-filter button");
  const containerImg = document.querySelectorAll(".img-container");

  createGrid(containerImg);
  animFilter();
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btn_data = btn.dataset.target;
      animExitGallery();
      setTimeout(() => {
        currentView(btn_data);
      }, 200);
    });
  });
};

// display / hide images selected
const currentView = (btn_data) => {
  const containerImg = document.querySelectorAll(".img-container");
  containerImg.forEach((img) => {
    const img_data = img.dataset.category;
    if (btn_data === "all") {
      img.classList.remove("hidden");
    } else {
      if (btn_data !== img_data) {
        img.classList.add("hidden");
      } else {
        img.classList.remove("hidden");
      }
    }
  });
  createGrid(containerImg, btn_data);
};

//constructor grid gallery
const createGrid = (container = [], btn_data = "all") => {
  const ContainerVisible = document.querySelectorAll(".img-container:not(.hidden)");
  const imgs = document.querySelectorAll(".img-container img");

  let cpt = 0,
    j = 0;

  imgs.forEach((img) => {
    img.style.aspectRatio = "1/1";
    if (btn_data === "clothes") {
      img.style.aspectRatio = "1/2";
    }
  });

  const currentArr = arrStyle[btn_data];
  container.forEach((img, i) => {
    img.style.gridArea = "none";
  });

  ContainerVisible.forEach((img, i) => {
    if (i % currentArr.length === 0 && i !== 0) {
      cpt++;
      j = 0;
    }
    img.style.gridArea = `${currentArr[j][0] + cpt * 4} / ${currentArr[j][1]} / ${currentArr[j][2] + cpt * 4} / ${
      currentArr[j][3]
    }`;
    j++;
  });

  animEnterGallery();
};


// animations GSAP
const animFilter = () => {
  const filters = document.querySelectorAll(".universe-filter button");

  const tl = gsap.timeline();
  tl.fromTo(
    filters,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      delay: 1,
      stagger: 0.1,
    }
  );
};

const animExitGallery = () => {
  const ContainerVisible = document.querySelectorAll(".img-container:not(.hidden)");

  const tl = gsap.timeline();
  tl.to(ContainerVisible, {
    y: 30,
    duration: 0.5,
    stagger: 0.01,
    opacity: 0,
  });
};

const animEnterGallery = () => {
  const ContainerVisible = document.querySelectorAll(".img-container:not(.hidden)");
  const ImgVisible = document.querySelectorAll(".img-container:not(.hidden) img");

  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  tl.fromTo(
    ContainerVisible,
    {
      opacity: 0,
      y: 20,
      filter: "blur(30px)",
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0,
      filter: "blur(0px)",
      stagger: 0.07,
      ease: "power4.in",
    }
  );
  tl2.fromTo(
    ImgVisible,
    {
      transform:"scale(1.3)"
    },
    {
      ease: "power4.in",
      transform:"scale(1.1)",
      duration: 0.6,
      delay: 0,
      stagger: 0.07,
      transformOrigin: "center center",
    }
  );
};
