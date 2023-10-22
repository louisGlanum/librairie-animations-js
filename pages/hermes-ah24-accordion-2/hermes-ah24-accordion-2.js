window.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".container .card img");
  const cards = document.querySelectorAll(".card");
  const caches = document.querySelectorAll(".cache");
  const btnClose = document.querySelector(".modal-close button")
  cards.forEach((card) => {
    card.classList.add("init");
  });
  images.forEach((img, key) => {
    img.src = `https://source.unsplash.com/random?sig=${key}`;
  });

  caches.forEach((cache) => {
    cache.addEventListener("click", () => {
      const img = cache.previousElementSibling;

      setTimeout(() => {
        img.style.position = "absolute";
        img.style.zIndex = "99";
      }, 500);

      const rect = img.getBoundingClientRect();
      const positionX = rect.left;
      const positionY = rect.top;

      const cardFocus = img.closest(".card");
      const cardAttribute = cardFocus.dataset.card;
      console.log(cardAttribute);

      cards.forEach((card) => {
        cardFocus.style.height = "70vh";
        cardFocus.style.flex = "1.8";
        img.style.transform = "scale(1)";

        card.classList.remove("init");

        if (card !== cardFocus) {
          card.classList.add("hidden");
        }
      });

      const hiddenCards = document.querySelectorAll(".card.hidden");
      const fondBlanc = document.querySelector(".fond-blanc");
      const lineUp = document.querySelectorAll(".line-up");
    
      lineUp.forEach((line) => {
        if (cardAttribute === line.dataset.line) {
          console.log("ici");
          line.classList.add("focus");
        }
      });
      const lineUpFocus = document.querySelector(".line-up.focus");
      const tl = gsap.timeline();
      tl.to(hiddenCards, {
        opacity: 0,
        duration: 0.2,
        stagger: { amount: 0.1 },
      });
      tl.to(img, {
        delay: 1.3,
        left: `-${positionX}px`,
        top: `-${positionY}px`,
        delay: 0.5,
        width: "100vw",
        height: "100vh",
      });
      tl.to(
        fondBlanc,
        {
          opacity: 1,
          duration: 0.5,
        },
        "=-.3"
      );
      tl.to(
        lineUpFocus,
        {
          opacity: 1,
          duration: .5,
        },
        "=-.3"
      );
      tl.to(btnClose,{
        opacity:1,
        duration:.5,
      },"=-.5")

      btnClose.addEventListener('click', () => {
        
        tl.reverse();

        cards.forEach((card) => {
            card.classList.remove("hidden");
            card.classList.add('init')
        });
        setTimeout(() => {
      
            cardFocus.removeAttribute('style')
            img.removeAttribute('style');
            lineUpFocus.classList.remove('focus')
        },1370)
    })
    });
  });
});
