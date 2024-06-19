
window.addEventListener('DOMContentLoaded', () => {
    mapInit();
})

// fetch json
const mapData = async () => {
    const response = await fetch('./assets/data.json')
    const data = await response.json();
    return data
}

//initialisation de la map
const mapInit = async () => {
const data = await mapData();

    const map = L.map('map').setView([data.chantiers[0].coord.lat, data.chantiers[0].coord.long], 8);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        minZoom:5,
        scrollWheelZoom: false,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.scrollWheelZoom.disable();

    const markers = L.markerClusterGroup();
    
    data.chantiers.forEach((chantier) => {
        const greenIcon = L.icon({
            iconUrl: './assets/marker.svg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        const marker = L.marker([chantier.coord.lat, chantier.coord.long], { icon: greenIcon });
        marker.bindPopup(mapPopupTemplate(chantier));
        markers.addLayer(marker);
    });

    map.addLayer(markers);
}

// template popup
const mapPopupTemplate = (chantier) => {
    const dateString = chantier.date;
    const [day, month, year] = dateString.split('/');
    const newDate = `${day}.${month}.${year}`;

    const template = `
    <div class="popup-content-inner">
        <div class="img-popup-container">
            <img src='${chantier.image}'/>
        </div>
        <div class="text-popup-container">
            <div class="title-popup">
                ${chantier.produit}
            </div>
            <div class="subtitle-popup">
                ${chantier.emplacement}
            </div>
            <div class="bottom-popup">
                <div class="puissance">x${chantier.nbr} &nbsp; &nbsp; ${chantier.puissance}Wc</div>
                <div class="date">Posé le ${newDate}</div>
            </div>
        </div>
    </div>
    `
    return template;
}