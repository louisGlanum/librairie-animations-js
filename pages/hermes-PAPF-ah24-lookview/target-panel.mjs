


export const targetPanels = () => {
    const buttonLook = document.querySelector('.look-view-btn');
    const buttonVM = document.querySelector('.VM-view-btn');
    const contentVM = document.querySelector('.content-vm');

    let previousLook = 1;

    buttonVM.addEventListener('click', () => {
        console.log('VM click');
        const currentLook = document.querySelector('.content-look.visible')
        previousLook = Number(currentLook.dataset.content)
        contentVM.classList.add('visible');
    });


    buttonLook.addEventListener('click', () => {
        const currentLook = document.querySelector(`[data-content ="${previousLook}"]`)

        console.log('look click', currentLook)
        console.log("previousLook", previousLook);
        contentVM.classList.remove('visible')
    }) 
}