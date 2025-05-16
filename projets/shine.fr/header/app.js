window.addEventListener('DOMContentLoaded', function() {
    menuMobile();
});


const menuMobile = () => {
    const openButton = document.querySelector('#burger');
    const closeButton = document.querySelector('#close-menu');
    const navMobile = document.querySelector('.nav-menu-mobile');

    openButton.addEventListener('click', () => {
        navMobile.classList.toggle('active');
    })
    closeButton.addEventListener('click', () => {
        navMobile.classList.toggle('active');
    })

    //buttons du menu mobile
    const buttons = navMobile.querySelectorAll('.nav-button')

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const currentElem = button.closest('.nav-elem');
            const currentDropdown = currentElem.querySelector('.dropdown-content');
            const isOpen = currentDropdown.classList.contains('active');
        
            // Étape 1 : Fermer tous les autres dropdowns
            document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
              if (dropdown !== currentDropdown) {
                dropdown.style.height = dropdown.scrollHeight + 'px'; // Fixe la hauteur actuelle
                requestAnimationFrame(() => {
                  dropdown.style.height = '0px';
                  dropdown.addEventListener('transitionend', function handler() {
                    dropdown.classList.remove('active');
                    dropdown.removeEventListener('transitionend', handler);
                  });
                });
              }
            });
        
            // Étape 2 : Basculer l’état du dropdown cliqué
            if (isOpen) {
              // Fermer le dropdown actuel
              currentDropdown.style.height = currentDropdown.scrollHeight + 'px';
              requestAnimationFrame(() => {
                currentDropdown.style.height = '0px';
                currentDropdown.addEventListener('transitionend', function handler() {
                  currentDropdown.classList.remove('active');
                  currentDropdown.removeEventListener('transitionend', handler);
                });
              });
            } else {
              // Ouvrir le dropdown actuel
              currentDropdown.classList.add('active');
              currentDropdown.style.height = currentDropdown.scrollHeight + 'px';
              currentDropdown.addEventListener('transitionend', function handler() {
                currentDropdown.style.height = 'auto';
                currentDropdown.removeEventListener('transitionend', handler);
              });
            }
          });
    })
}