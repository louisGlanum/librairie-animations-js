window.addEventListener("DOMContentLoaded", () => {
  universeGallery();
});

const universeGallery = () => {
  const buttons = document.querySelectorAll(".universe-filter button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btn_data = btn.dataset.target;
      console.log(btn_data);
      currentView(btn_data);
    });
  });
};

const currentView = (btn_data) => {
    
const row  = document.querySelector('.universe-row')
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
  const newContainerImg =  Array.from(document.querySelectorAll('.img-container'));
  console.log(newContainerImg)

  newContainerImg.sort((a,b) => {
    const aHidden = a.classList.contains('hidden');
    const bHidden = b.classList.contains('hidden');
    if (aHidden && !bHidden) {
        return 1;
      } else if (!aHidden && bHidden) {
        return -1;
      } else {
        return 0;
      }
  })
  console.log(newContainerImg)

  containerImg.forEach((container) => {
    row.removeChild(container);
  });
  newContainerImg.forEach((container) => {
    row.appendChild(container);
  });
};
