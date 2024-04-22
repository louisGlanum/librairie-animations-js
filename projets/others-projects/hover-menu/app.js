const hoverMenu = () => {
  const buttons = document.querySelectorAll("header li");
  const ul = document.querySelector("header ul");

  buttons.forEach((button) => {
    const bounding = button.getBoundingClientRect();
    console.log(bounding);
    button.top = bounding.top;
    button.right = bounding.right;
    button.bottom = bounding.bottom;
    button.left = bounding.left;
    button.width = bounding.width;
    button.height = bounding.height;
    button.addEventListener("mouseenter", buttonIn);
  });

  ul.addEventListener('mouseleave', buttonOut)
};

function buttonIn() {
  const indicator = document.querySelector(".indicator");
  indicator.style.inset = `${this.top}px ${this.right}px ${this.bottom}px ${this.left}px`;
  indicator.style.height = `${this.height}px`;
  indicator.style.width = `${this.width}px`;
  indicator.style.opacity = 1;
}

function buttonOut() {
    const indicator = document.querySelector(".indicator");
    indicator.style.opacity = 0;
}
hoverMenu();
