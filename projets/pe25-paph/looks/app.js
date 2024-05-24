window.addEventListener('DOMContentLoaded', () => {
    lookAnimation();
    lookZoom();
    lookVideoButton();
})
let currentLookIndex = 1;

const lookInjection = (look) => {
    const wrapperLook = document.querySelector('.wrapper-look')
    const infosDetails = wrapperLook.querySelectorAll('.infos-details')
    const nameIndex = wrapperLook.querySelector('.look-name span')
    const image = wrapperLook.querySelector('img')
    
    image.src = look.dataset.imagefull
    nameIndex.textContent = look.dataset.index

    const player = videojs('#my-video4',{})
    const newSource = {
        src: look.dataset.video,
        type: "video/mp4",
    }
    player.src(newSource)
    player.load()
    
    for(let i = 1; i <= infosDetails.length; i++){
        const bloc = infosDetails[i -1]
        const ref = bloc.querySelector('.ref')
        const elementTitle = bloc.querySelector('.element-title')
        const type = bloc.querySelector('.type')
        const wholesale = bloc.querySelector('.wholesale-price')
        const retail = bloc.querySelector('.retail-price')

        const refLook = look.dataset['ref' + (i)];
        const elementLook = look.dataset['element' + (i)];
        const typeLook = look.dataset['type' + (i)];
        const wholesaleLook = look.dataset['wholesale' + (i)];
        const retailLook = look.dataset['retail' + (i)];

        ref.textContent = refLook ? refLook : ""
        elementTitle.textContent = elementLook ? elementLook : ""
        type.textContent = typeLook ? typeLook : ""
        wholesale.textContent = wholesaleLook ? wholesaleLook : ""
        retail.textContent = retailLook ? retailLook : ""
    }
}

const lookSelected = (look) => {
    const lookActive = document.querySelector('.container_looks.active')
    lookActive.classList.remove('active')
    look.classList.add('active')
}

const lookAnimation = () => {
    const looks = document.querySelectorAll('.section-look .container_looks')
    const wrapperLook = document.querySelector('.wrapper-look')
    const name = wrapperLook.querySelector('.look-name')
    const button = wrapperLook.querySelector('.look-video-button')
    const image = wrapperLook.querySelector('img')
    const refs = wrapperLook.querySelectorAll('.ref')
    const elementsTitle = wrapperLook.querySelectorAll('.element-title')
    const types = wrapperLook.querySelectorAll('.type')
    const wholesales = wrapperLook.querySelectorAll('.wholesale-price')
    const retails = wrapperLook.querySelectorAll('.retail-price')

    lookInjection(looks[0])

    const tl_in = gsap.timeline({paused: true});
    const tl_out = gsap.timeline({paused:true});

    tl_in
    .to(wrapperLook, {opacity:1})
    .to(wrapperLook,{"--translateBefore":"100%", duration: 1, ease:"power4.in"},"<")
    .to(image, {scale:1, duration:1,ease:"power3.inOut"}, "-=0.6")
    .to(name, {y:0, opacity:1, duration:1}, "<")
    .to(button, {y:0, opacity:1, duration:1}, "<")
    .to(refs, {stagger:{each:0.1}, y:0, opacity:1, duration:1}, "<")
    .to(elementsTitle, {stagger:{each:0.1}, y:0, opacity:1, duration:1}, "<")
    .to(types, {stagger:{each:0.1}, y:0, opacity:1, duration:1}, "<")
    .to(wholesales, {stagger:{each:0.1}, y:0, opacity:1, duration:1}, "<")
    .to(retails, {stagger:{each:0.1}, y:0, opacity:1, duration:1}, "<")

    tl_out.to(wrapperLook, {opacity:0, duration:0.3})
    
    window.addEventListener('load',() => tl_in.play())

    looks.forEach((element, i) => {
        element.addEventListener('click',function(){
            if(currentLookIndex !== i + 1){
                currentLookIndex = i + 1
                lookSelected(element)
                tl_out.restart().play()
                setTimeout(() => {
                    lookInjection(element)
                    tl_in.restart().play()
                },100)
            }
        })
    })
}

const lookZoom = () => {
    const imageContainer = document.querySelector('.wrapper-look .image_container')
    const image = imageContainer.querySelector('img');

    image.addEventListener('mousemove', (e) => {
        const containerWidth = imageContainer.offsetWidth;
	    const containerHeight = imageContainer.offsetHeight;

        const rec = imageContainer.getBoundingClientRect()
        const imageLeft = rec.left;
        const imageTop = rec.top;
        const x = e.pageX - imageLeft;
        const y = e.pageY - imageTop;
        const translateX = (containerWidth / 2 - x) * 2;
        const translateY = (containerHeight / 2 - y) * 2;
        const scale = 3;
    
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    })
    image.addEventListener("mouseleave", (e) => {
        image.style.transform = "translate(0%, 0%) scale(1)";
    });
}

const lookVideoButton = () => {
    const wrapper = document.querySelector('.wrapper-video');
    const openButton = document.querySelector('.wrapper-look button')
    const closeButton = wrapper.querySelector('.close-button')
    const player = videojs('#my-video4',{})

    const tl = gsap.timeline({paused: true})
    .to(wrapper, { opacity: 1, duration: 0.5, ease: "power3.inOut" })

    openButton.addEventListener('click', function (){
        player.currentTime(0)
        player.play()
        tl.play()
        wrapper.style.pointerEvents = 'all'
    })

    closeButton.addEventListener('click', function(){
        player.pause()
        tl.reverse()
        wrapper.style.pointerEvents = 'none'
    })
}


