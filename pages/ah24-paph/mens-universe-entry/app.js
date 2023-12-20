window.addEventListener('DOMContentLoaded', ()=> {
    menuScript()
    hoverStory()
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


function hoverStory(){
    const stories = document.querySelectorAll('.story')

    stories.forEach((story) => {
        story.addEventListener('mouseover', ()=> {
            console.log(story)
            stories.forEach((story2) => {
                console.log(story2)
                if(story !== story2){
                    story2.classList.add('not-focus')
                }
            })
        })
        story.addEventListener('mouseout', ()=> {
            stories.forEach((story) => story.classList.remove('not-focus'))
        })
    })
}