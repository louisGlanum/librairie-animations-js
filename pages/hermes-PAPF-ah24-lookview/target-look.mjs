



export const targetLooks = (target) => {

    const targetLines = document.querySelectorAll('.container-lineup li.target');

    if(targetLines.length){
        targetLines.forEach((line) => {
            line.classList.remove('target')
        })
    }
    const lineFocus = document.querySelector(`[data-line ="${target}"]`)
    lineFocus.classList.add('target')
}