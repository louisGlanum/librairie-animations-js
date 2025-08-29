let currentStep = null;
let currentPrice = 1000;

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const steps = document.querySelectorAll(".step");
  const info = document.querySelector(".info");

  gsap.utils.toArray(steps).forEach((stepEl, index) => {
    gsap.from(stepEl, {
      opacity: 0,
      y: 100,
      scale: 1.1,
      duration: 0.4,
      scrollTrigger: {
        trigger: stepEl,
        start: "top 90%",
        end: "top 65%",
        scrub: true, // synchronise avec le scroll
        markers: true,
        onUpdate: (self) => {
          if (self.progress > 0.5) {
            handleStepEnter(stepEl, index + 1, info);
          }
        },

        onLeaveBack: () => {
          console.log(currentStep);
          if (currentStep === 1) {
            // Réinitialiser l'état si on revient en arrière
            console.log("leave back");
            currentStep = null;
            info.textContent = "1000"; // Réinitialiser le texte
            currentPrice = 1000; // Réinitialiser le prix
          }
        },
      },
    });
  });
});

function handleStepEnter(element, stepNumber, info) {
  console.log("currentStep", currentStep);
  if (currentStep === stepNumber) return; // déjà active
  console.log("'ici'");
  currentStep = stepNumber;

  // Tu peux aussi changer une variable, ajouter une classe, etc.
  if (stepNumber === 1) {
    console.log("C'est la première étape !");
    timelineContent1(info);
  } else if (stepNumber === 2) {
    console.log("C'est la deuxième étape !");
    timelineContent2(info);
  } else if (stepNumber === 3) {
    console.log("C'est la troisième étape !");
    info.textContent = "Etape 3: Conclusion";
  } else if (stepNumber === 4) {
    console.log("C'est la quatrième étape !");
    info.textContent = "Etape 4: Résumé";
  } else if (stepNumber === 5) {
    console.log("C'est la cinquième étape !");
    info.textContent = "Etape 5: Fin";
  }
}

function timelineContent1(info) {
  let obj = { value: currentPrice };
  console.log("timelineContent1", currentPrice);
  // Texte initial
  info.textContent = Math.floor(obj.value);
  gsap.to(obj, {
    value: -333,
    duration: 0.5,
    ease: "power1.out",
    onUpdate: () => {
      info.textContent = Math.floor(obj.value);
    },
    onStart: () => {
      gsap.fromTo(
        info,
        { scale: 1, opacity: 1 , color: "black" },
        {
          scale: 1.2,
          duration: 0.25,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
          color: "red",
          onComplete: () => {
            gsap.to(info, { scale: 1, color: "black", duration: 0.1 });
            currentPrice = -333; // Mettre à jour le prix actuel
          },
        }
      );
    },
  });
}

function timelineContent2(info) {
  let obj = { value: currentPrice };

  // Texte initial
  info.textContent = Math.floor(obj.value);

  gsap.to(obj, {
    value: 0,
    duration: 0.5,
    ease: "power1.out",
    onUpdate: () => {
      info.textContent = Math.floor(obj.value);
    },
    onStart: () => {
      gsap.fromTo(
        info,
        { scale: 1, opacity: 1 },
        {
          scale: 1.2,
          duration: 0.25,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(info, { scale: 1, duration: 0.1 });
            currentPrice = 0; // Mettre à jour le prix actuel
          },
        }
      );
    },
  });
}
