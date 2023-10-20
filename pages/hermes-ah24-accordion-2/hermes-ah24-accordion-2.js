


window.addEventListener('DOMContentLoaded', ()=>{
    const images = document.querySelectorAll(".container .card img")

    images.forEach((img, key) =>{
        img.src =`https://source.unsplash.com/random?sig=${key}`;
    })
    console.log(images);
    images.forEach((img) => {
        console.log(img);
        img.addEventListener('click', () => {
            console.log('coucou');
            const card = img.closest('.card');
            console.log(card);
            img.style.position = "absolute";
            
            const viewY = window.innerHeight;
            const viewX = window.innerWidth;

            const rect = img.getBoundingClientRect();

            // Les propriétés rect.left et rect.top contiennent la position par rapport au viewport
            const positionX = rect.left;
            const positionY = rect.top;
            img.style.zIndex = "999"
        
            console.log("viewport", viewX, viewY);
            console.log('element', positionX,positionY)
          
            gsap.to(img,{
              left:`-${positionX}px`,
              top:`-${positionY}px`, 
              width:"100vw",
              height:"100vh",
            })
        })
    })
})