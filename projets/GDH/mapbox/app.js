
window.addEventListener('DOMContentLoaded', function() {
    initMap();
});


function initMap() {
    const panel = document.querySelector('#panel');

    // enlever le panneau au clic outside 
    document.addEventListener('mousedown', function(event) {
        if (panel.classList.contains('active') && !panel.contains(event.target)) {
            panel.classList.remove('active');
        }
    });
    let splideInstance;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG91bG91Y2FzdCIsImEiOiJjbWFxam5mc3YwMHFlMmlxcjN1dGw2bTNoIn0.HzZycVHdgJDgAPBpjh34OQ';
    const map = new mapboxgl.Map({
        container: 'map',
        center: [4.805864,43.951390], 
        zoom: 15,
        // pitch: 74,
        // bearing: 12.8,
        // hash: true,
        style: 'mapbox://styles/louloucast/ckszwrkwo06ep17mnjbmngpio?fresh=true' ,
        projection: 'globe'
    });

        map.on('style.load', () => {
            map.setConfigProperty('basemap', 'lightPreset', 'dawn');

            // use an expression to transition some properties between zoom levels 11 and 13, preventing visibility when zoomed out
            // const zoomBasedReveal = (value) => {
            //     return [
            //         'interpolate',
            //         ['linear'],
            //         ['zoom'],
            //         11,
            //         0.0,
            //         13,
            //         value
            //     ];
            // };
        fetch('./data.json')
        .then((response) => response.json())
        .then((properties) => {
            console.log(properties)
            properties.forEach((property) => {
                const marker = new mapboxgl.Marker({
                    color: '#ad007c'
                })
                .setLngLat([property.lng, property.lat])
                .addTo(map);
                marker.getElement().addEventListener('click', () => {
                    console.log('Marker cliqué !');
                    panel.classList.add('active');

                    const h2 = panel.querySelector('h2');
                    h2.textContent = property.name;

                        const listEl = document.getElementById('carousel-list');
                        listEl.innerHTML = ''; // 🧼 Vide les anciennes slides

                        property.images.forEach((imgUrl) => {
                            const li = document.createElement('li');
                            li.className = 'splide__slide';
                            li.innerHTML = `<img src="${imgUrl}" alt="${property.name}">`;
                            listEl.appendChild(li);
                        });

                        // Démonte l’ancienne instance si elle existe
                        if (splideInstance) {
                            splideInstance.destroy(true); // true = détruit DOM + listeners
                        }

                        // Crée et monte une nouvelle instance
                        splideInstance = new Splide('#property-carousel', {
                            type: 'loop',
                            perPage: 1,
                            autoplay: true,
                            pauseOnHover: true,
                            heightRatio: 0.5,
                            rewind: false,
                            speed: 600,
                            easing: 'ease',
                            drag: true,
                            arrows: true,
                            pagination: true,
                        });

                        splideInstance.mount();
            });
            })
        })





















    });
}