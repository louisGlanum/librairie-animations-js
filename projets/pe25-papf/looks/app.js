// h pour highlight
// query params :
// mode = vm 
// vm = 1 (index  de la vm désirée)

window.addEventListener('DOMContentLoaded', () => {
    const {vmMode, vmIndex} = getParams();
    global_init(vmMode, vmIndex);
    look_actions();
    switch_view();
    vm_gallery_switch();
})

// =========== initialisation =================
const getParams = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const vmIndex = Number(params.get('vm')) ? Number(params.get('vm')) : 1;
    const mode = Boolean(params.get('mode') === 'vm');
    return {vmMode:mode, vmIndex:vmIndex}
};

const global_init = (vmMode, vmIndex) => {
    const vm_wrapper = document.querySelector('.vm_wrapper')
    const look_wrapper = document.querySelector('.look_wrapper')

    if(vmMode){
        vm_wrapper.classList.add('visible')
        vm_init(vmIndex) 
    }else{
        look_wrapper.classList.add('visible')
        look_init(1)
    }
}

const look_init = (lookIndex=1) => {
    const looks_miniature = document.querySelectorAll(`.look_miniature`);
    const look_miniature = document.querySelector(`.look_miniature[data-index="${lookIndex}"]`);
    const look_h_wrapper = document.querySelector('.look_wrapper');
    const look_h_image = look_h_wrapper.querySelector('img');
    const look_h_content = look_h_wrapper.querySelector('.text_content');

    looks_miniature.forEach((look) => look.classList.remove('active'))
    look_miniature.classList.add('active');
    // injection de la première vue avec la miniature n°1
    look_injection(look_miniature);
    // animation
    const tl = gsap.timeline();
    tl.fromTo(look_h_image, {opacity:0},{opacity:1, duration:2})
    .fromTo(look_h_content,{x:800}, {x:0, duration:1, ease:"power3.inOut"},"<");
    
}

// ========== actions sur la grille =============
const look_actions = () => {
    const look_miniature = document.querySelectorAll('.look_miniature');
    const look_h_wrapper = document.querySelector('.look_wrapper');
    const look_h_image = look_h_wrapper.querySelector('img');
    const look_h_content = look_h_wrapper.querySelector('.text_content');

    // timeline du switch
    const tl = gsap.timeline({paused:true});
    tl.to(look_h_image, {opacity:0, duration:0.5})
    .to(look_h_content,{opacity:0, duration:0.5},"<")
    .to(look_h_content,{x:800, duration:0})
    .to(look_h_image, {opacity:1, duration:0.5})
    .to(look_h_content, {opacity:1, x:0, duration:0.5}, "<")

    look_miniature.forEach((look) => {
    look.index = look.dataset.index;
    look.animation = tl;
    look.addEventListener('click', look_switch);
   })
}

// ============== gestion de la timeline ========== 
function look_switch(){
    const looks_miniature = document.querySelectorAll(`.look_miniature`);
    const lookView = document.querySelector(".look_wrapper");
    const vmView = document.querySelector(".vm_wrapper");
    lookView.classList.add('visible');
    vmView.classList.remove('visible');
    //active class sur la grille
    looks_miniature.forEach((look) => look.classList.remove('active'))
    this.classList.add('active');
    this.animation.restart().play();

    setTimeout(() => {
        look_injection(this)
    },500);
}

//============ injection ==================
const look_injection = (look) => {
    const look_h_wrapper = document.querySelector('.look_wrapper');
    const look_h_image = look_h_wrapper.querySelector('img');
    const look_h_title = look_h_wrapper.querySelector('.title');
    const look_h_subtitle = look_h_wrapper.querySelector('.subtitle');
    const look_h_details_bloc = look_h_wrapper.querySelectorAll('.details-bloc');

    look_h_image.src = look.querySelector('img').src;
    look_h_title.innerHTML = `Look ${look.dataset.index}`;
    look_h_subtitle.innerHTML = look.dataset.subtitle;

    look_h_details_bloc.forEach((detail_bloc,i) => {
        const ref = detail_bloc.querySelector('.ref');
        const type = detail_bloc.querySelector('.type');
        const categorie = detail_bloc.querySelector('.categorie');
        const color = detail_bloc.querySelector('.color');
        
        ref.innerHTML = look.dataset['ref' + (i + 1)] ? 
            look.dataset['ref' + (i + 1)]: "";
        type.innerHTML = look.dataset['type' + (i + 1)] ? 
            look.dataset['type' + (i + 1)]: "";
        categorie.innerHTML = look.dataset['categorie' + (i + 1)] ? 
            look.dataset['categorie' + (i + 1)]: "";
        color.innerHTML = look.dataset['color' + (i + 1)] ? 
            look.dataset['color' + (i + 1)] : "";
    });
}

//=========== switch entre les vues ===================

const switch_view = () => {
    const vmButton = document.querySelector(".switch-vm");
    const lookButton = document.querySelector(".switch-look");
    vmButton.addEventListener('click', lookToVm)
    lookButton.addEventListener('click', vmToLook);

}
// switch des panneaux
const vmToLook = () => {
    const lookView = document.querySelector(".look_wrapper");
    const vmView = document.querySelector(".vm_wrapper");
    lookView.classList.add('visible');
    vmView.classList.remove('visible');
    look_init(2);
}
const lookToVm = () => {
    const vmView = document.querySelector(".vm_wrapper");
    const lookView = document.querySelector(".look_wrapper");
    vmView.classList.add('visible');
    lookView.classList.remove('visible');
    vm_init(1);
}


const vm_gallery_switch = () => {
    const galleries_item = document.querySelectorAll('.gallery_item');
    galleries_item.forEach((gallery) =>{
        gallery.addEventListener('click', () => {
            vm_init(gallery.dataset.index)
        })
    })
}

// initialise la vue vm 
// vmIndex = peut prendre soit une query params , soit la valeur injectée , soit par défaut 1
const vm_init = (vmIndex) => {
    const galleries_item = document.querySelectorAll('.gallery_item');
    const looks_miniature = document.querySelectorAll('.look_miniature');
    const vm_img = document.querySelector('.vm_content img');

    const gallery_item = document.querySelector(`.gallery_item[data-index="${vmIndex}"]`);
    const gallery_item_img = gallery_item.querySelector('img');

    galleries_item.forEach((gallery) => gallery.classList.remove('active'))
    gallery_item.classList.add('active');

    const data_looks = gallery_item.dataset.vm.split(',');
    vm_img.src = gallery_item_img.src;
    console.log(data_looks)

    looks_miniature.forEach((look) => {
        look.classList.remove('active');
        const index = look.dataset.index;
        if(data_looks.includes(index)){
            look.classList.add('active');
        }
    })
}



