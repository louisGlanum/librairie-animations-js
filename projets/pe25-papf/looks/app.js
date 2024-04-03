window.addEventListener('DOMContentLoaded', () => {
    look_init();
    look_actions();

})

// =========== initialisation =================
const look_init = () => {
    const look_miniature = document.querySelector('.look_miniature');
    const look_h_wrapper = document.querySelector('.look_wrapper');
    const look_h_image = look_h_wrapper.querySelector('img');
    const look_h_content = look_h_wrapper.querySelector('.text_content');

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
    .to(look_h_content,{opacity:1,x:800, duration:0})
    .to(look_h_image, {opacity:1, duration:0.5})
    .to(look_h_content, {x:0, duration:0.5}, "<")

   look_miniature.forEach((look) => {
    look.index = look.dataset.index;
    look.animation = tl;
    look.addEventListener('click', look_switch);
   })
}

// ============== gestion de la timeline ========== 
function look_switch(){
    //active class sur la grille
    document.querySelector('.look_miniature.active').classList.remove('active');
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

