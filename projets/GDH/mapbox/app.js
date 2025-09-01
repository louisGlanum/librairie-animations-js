
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
 



mapboxgl.accessToken = 'pk.eyJ1IjoibG91bG91Y2FzdCIsImEiOiJjandiMDR4cjkwZWRjNDNzNnJ2NTJkMzhuIn0.N0FdIoyG8CClDBYPc1Vo0g';
    const map = new mapboxgl.Map({
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/louloucast/cmaw7hfrh004d01s9a4uqd86g',
        center: [4.805864, 43.95139],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
    });

    map.on('style.load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
    });


















}