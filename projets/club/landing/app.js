// niv 1 : 11 12 13 14
// niv 2 : 1121 1122 1123 1124
// niv 3 : 11231 11232 11233 11234
// niv 4 : 112341 112342 112343 112344
// niv 5 : 11234151 11234152 11234153 11234154


window.addEventListener('DOMContentLoaded', () => {
    simulateurInjection();
});

function simulateurInjection() {
    const container = document.querySelector('#m-0'); // Conteneur pour le niveau 1
    const template = document.querySelector('#accordion-item-template'); // Modèle

    const niveau1 = 5; // Nombre de niveaux 1
    const niveau2 = 25; // Nombre total de niveaux 2
    const niveau3 = 125; // Nombre total de niveaux 3
    const niveau4 = 625; // Nombre total de niveaux 4
    const niveau5 = 3100; // Nombre total de niveaux 5

    const subItemsPerLevel1 = Math.floor(niveau2 / niveau1); // Nombre de niveaux 2 par niveau 1
    const subItemsPerLevel2 = Math.floor(niveau3 / niveau2); // Nombre de niveaux 2 par niveau 1
    const subItemsPerLevel3 = Math.floor(niveau4 / niveau3); // Nombre de niveaux 2 par niveau 1
    const subItemsPerLevel4 = Math.floor(niveau5 / niveau4); // Nombre de niveaux 2 par niveau 1

    console.log("sub item 1 : ", subItemsPerLevel1);
    console.log("sub item 2 : ", subItemsPerLevel2);
    console.log("sub item 3 : ", subItemsPerLevel3);
    console.log("sub item 4 : ", subItemsPerLevel4);

    for (let i = 1; i <= niveau1; i++) {
        // Clone du niveau 1
        const clone = template.content.cloneNode(true);
        const btn = clone.querySelector('.accordion-button');
        const bodyniv1 = clone.querySelector('.accordion-collapse');
        const members = clone.querySelector('.accordion-info__members');

        // Configurer le contenu et les attributs du niveau 1
        btn.setAttribute('data-bs-target', `#level1-${i}`);
        btn.setAttribute('aria-controls', `level1-${i}`);
        members.textContent = `${subItemsPerLevel1} membres`;
        bodyniv1.setAttribute('id', `level1-${i}`);
        bodyniv1.textContent = `Niveau 2`;
        // Conteneur interne pour le niveau 2
        const containerLevel2 = document.createElement('div');
        containerLevel2.className = 'accordion-level-2'; // Ajout d'une classe pour organiser les niveaux 2

        // NIVEAU 2
        for (let j = 1; j <= subItemsPerLevel1; j++) {
            const subClone = template.content.cloneNode(true);
            const subBtn = subClone.querySelector('.accordion-button');
            const members = subClone.querySelector('.accordion-info__members');
            const bodyniv2 = subClone.querySelector('.accordion-collapse');

            // Configurer le contenu et les attributs du niveau 2
            subBtn.setAttribute('data-bs-target', `#level2-${i}-${j}`);
            subBtn.setAttribute('aria-controls', `level2-${i}-${j}`);
            members.textContent = `${subItemsPerLevel2} membres`;
            bodyniv2.setAttribute('id', `level2-${i}-${j}`);
            bodyniv2.textContent = `Niveau 3`;
            containerLevel2.appendChild(subClone); // Ajouter le niveau 2 au conteneur

            // NIVEAU 3
            const containerLevel3 = document.createElement('div');
            containerLevel3.className = 'accordion-level-3';
            for (let k = 1; k <= subItemsPerLevel2; k++) {
                const subClone = template.content.cloneNode(true);
                const subBtn = subClone.querySelector('.accordion-button');
                const bodyniv3 = subClone.querySelector('.accordion-collapse');
    
                // Configurer le contenu et les attributs du niveau 2
                subBtn.setAttribute('data-bs-target', `#level3-${i}-${k}`);
                subBtn.setAttribute('aria-controls', `level3-${i}-${k}`);
                bodyniv3.setAttribute('id', `level3-${i}-${k}`);
                bodyniv3.textContent = `Niveau 4 `;

                bodyniv2.appendChild(containerLevel3); 
                containerLevel3.appendChild(subClone); // Ajouter le niveau 3 au conteneur 2

                // NIVEAU 4
                const containerLevel4 = document.createElement('div');
                containerLevel4.className = 'accordion-level-4';
                for (let l = 1; l <= subItemsPerLevel3; l++) {
                    const subClone = template.content.cloneNode(true);
                    const subBtn = subClone.querySelector('.accordion-button');
                    const bodyniv4 = subClone.querySelector('.accordion-collapse');
        
                    // Configurer le contenu et les attributs du niveau 2
                    subBtn.setAttribute('data-bs-target', `#level4-${i}-${l}`);
                    subBtn.setAttribute('aria-controls', `level4-${i}-${l}`);
                    bodyniv4.setAttribute('id', `level4-${i}-${l}`);
                    bodyniv4.textContent = `Niveau 5 `;

                    bodyniv3.appendChild(containerLevel4);
                    containerLevel4.appendChild(subClone); // Ajouter le niveau 2 au conteneur


                    // NIVEAU 5
                    const containerLevel5 = document.createElement('div');
                    containerLevel5.className = 'accordion-level-5';
                    for (let m = 1; m <= subItemsPerLevel4; m++) {
                        const subClone = template.content.cloneNode(true);
                        const subBtn = subClone.querySelector('.accordion-button');
                        const bodyniv5 = subClone.querySelector('.accordion-collapse');
            
                        // Configurer le contenu et les attributs du niveau 2
                        subBtn.setAttribute('data-bs-target', `#level5-${i}-${m}`);
                        subBtn.setAttribute('aria-controls', `level5-${i}-${m}`);
                        bodyniv5.setAttribute('id', `level5-${i}-${m}`);
    
                        bodyniv4.appendChild(containerLevel5);
                        containerLevel5.appendChild(subClone); // Ajouter le niveau 2 au conteneur
                    }
                }
            }

        }
        bodyniv1.appendChild(containerLevel2); // Ajouter les niveaux 2 dans le niveau 1
        container.appendChild(clone); // Ajouter le niveau 1 au conteneur principal
    }
}

