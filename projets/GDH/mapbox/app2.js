window.addEventListener("DOMContentLoaded", function () {
  initMap();
  initPanel();
});

let map;
let splideInstance;
let propertiesList = [];
let currentIndex = 0;

// ----------------- init map ----------------
function initMap() {
  const panel = document.querySelector("#panel");
  const overlay = document.querySelector(".overlay");

  mapboxgl.accessToken =
    "pk.eyJ1IjoibG91bG91Y2FzdCIsImEiOiJjandiMDR4cjkwZWRjNDNzNnJ2NTJkMzhuIn0.N0FdIoyG8CClDBYPc1Vo0g";

  map = new mapboxgl.Map({
    container: "map",
    center: [4.805864, 43.95139],
    zoom: 16.15,
    pitch: 75,
    bearing: 0,
    hash: true,
    style: "mapbox://styles/louloucast/cmaw7hfrh004d01s9a4uqd86g",
    projection: "globe",
  });

  // Ajouter contrôle de zoom et boussole
  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", () => {
    fetch("./data.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        propertiesList = geojson.features.map((feature) => ({
          id: feature.properties.id,
          name: feature.properties.name,
          type: feature.properties.type,
          city: feature.properties.city,
          description: feature.properties.description,
          images: feature.properties.images,
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        }));

        map.addSource("properties", {
          type: "geojson",
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        initSearch(map, geojson);

        // Layers clusters (inchangés)
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "properties",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#ad007c",
            "circle-radius": 20,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "properties",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 14,
          },
          paint: {
            "text-color": "#FFF",
          },
        });

        // SVG simple en base64, ici un rond magenta avec contour blanc
        const svgBase64 =
          "data:image/svg+xml;base64," +
          btoa(`
            <svg width="40" height="30" viewBox="0 0 103 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_119_237)">
                <path d="M83.9925 77.8825H91.3353C89.772 76.706 88.7298 75.0589 88.7298 73.2237C88.7298 70.9178 90.151 69.6001 92.9934 69.6001H99.7677C100.241 69.6001 100.431 69.3648 100.431 69.0354V68.2354C100.573 68.1413 100.715 68.0942 101.047 68.0942C101.568 68.0942 101.947 68.7531 101.947 69.9766C101.947 71.0119 101.426 71.6237 99.9572 71.6237H93.4671C91.6196 71.6237 90.7668 72.3295 90.7668 73.8354C90.7668 75.2942 91.7617 76.8942 93.2776 77.8825H101.71C101.852 78.0707 101.947 78.4472 101.947 78.9178C101.947 79.3884 101.805 79.8589 100.952 79.8589H83.3766C83.2345 79.6237 83.1398 79.2942 83.1398 78.7766C83.1398 78.2589 83.3766 77.8825 83.9925 77.8825Z" fill="#AD007C"/>
                <path d="M90.7194 65.4119C89.4403 65.4119 88.7297 62.8707 88.7297 60.9884C88.7297 58.5884 89.7246 56.5178 92.6617 56.5178H99.5782C100.241 56.5178 100.526 56.2825 100.526 55.859V55.106C100.62 55.0119 100.857 54.9648 101.236 54.9648C101.757 54.9648 102.042 55.4825 102.042 56.659C102.042 57.6943 101.284 58.306 100.194 58.306H100.099C101.378 59.6237 102.326 61.2237 102.326 62.9178C102.326 65.3178 100.668 66.4472 98.2991 66.4472C96.2147 66.4472 94.7935 65.2237 94.6514 62.8237L94.3671 58.306H93.2302C91.2405 58.306 90.672 59.6237 90.672 61.0825C90.672 62.6825 91.1458 64.3295 91.6195 65.0354C91.3826 65.2707 91.051 65.4119 90.7194 65.4119ZM98.3938 58.306H95.8357L96.2621 62.7295C96.4042 64.0943 97.1148 64.6119 98.2517 64.6119C99.4361 64.6119 100.478 63.9531 100.478 62.6354C100.526 61.1766 99.815 59.8119 98.3938 58.306Z" fill="#AD007C"/>
                <path d="M90.4352 50.4472C89.4404 49.506 88.7298 48.1883 88.7298 46.7295C88.7298 43.906 90.8616 41.8824 95.2199 41.8824C100.147 41.8824 102.278 44.3295 102.278 47.5766C102.278 49.3648 101.805 50.7295 101.047 51.7648C100.763 52.1413 100.336 52.4236 99.9572 52.4236H83.424C83.2819 52.1883 83.1398 51.8589 83.1398 51.3883C83.1398 50.8707 83.3766 50.4472 83.9451 50.4472H90.4352ZM92.4249 50.4472H99.4361C99.9098 49.8824 100.384 48.8472 100.384 47.4824C100.384 45.2236 98.7729 43.8119 95.4094 43.8119C92.2354 43.8119 90.8142 45.2707 90.8142 47.2001C90.8142 48.5648 91.3827 49.6001 92.4249 50.4472Z" fill="#AD007C"/>
                <path d="M83.9924 36.9884C83.9924 36.1413 84.4662 35.6707 85.3189 35.6707C86.219 35.6707 86.598 36.1413 86.598 36.9884C86.598 37.8354 86.1716 38.306 85.3189 38.306C84.4188 38.306 83.9924 37.8825 83.9924 36.9884ZM91.1458 35.7649H99.6729C100.194 35.7649 100.384 35.5296 100.384 35.1531V34.3531C100.526 34.259 100.715 34.2119 101.047 34.2119C101.663 34.2119 102.042 34.7296 102.042 36.0002C102.042 37.0825 101.568 37.7413 100.194 37.7413H91.7142C91.0984 37.7413 90.9563 38.0237 90.9563 38.4002V39.1531C90.7668 39.2472 90.4825 39.2943 90.1509 39.2943C89.393 39.2943 89.0613 38.5884 89.0613 37.6002C89.014 36.4707 89.4403 35.7649 91.1458 35.7649Z" fill="#AD007C"/>
                <path d="M90.7668 28.1412H98.2043C99.815 28.1412 100.241 27.5765 100.241 26.4942V23.9059C100.431 23.8118 100.573 23.7648 100.857 23.7648C101.568 23.7648 102.089 24.3765 102.089 27.0118C102.089 28.753 101.378 30.0707 98.7254 30.0707H90.8141V31.6236C90.6246 31.7648 90.3878 31.8589 90.0562 31.8589C89.4403 31.8589 89.0613 31.6707 89.0613 30.9648V30.1177H85.5083C85.4136 29.9295 85.2715 29.5059 85.2715 29.0824C85.2715 28.5648 85.5557 28.1883 86.1716 28.1883H89.014V24.0942C89.1561 23.953 89.3456 23.9059 89.7246 23.9059C90.1509 23.9059 90.7668 24.0471 90.7668 24.9412V28.1412Z" fill="#AD007C"/>
                <path d="M90.7194 21.0354C89.4403 21.0354 88.7297 18.4943 88.7297 16.6119C88.7297 14.2119 89.7246 12.1413 92.6617 12.1413H99.5782C100.241 12.1413 100.526 11.906 100.526 11.4825V10.7296C100.62 10.6354 100.857 10.5884 101.236 10.5884C101.757 10.5884 102.042 11.106 102.042 12.2825C102.042 13.3178 101.284 13.9296 100.194 13.9296H100.099C101.378 15.2472 102.326 16.8472 102.326 18.5413C102.326 20.9413 100.668 22.0707 98.2991 22.0707C96.2147 22.0707 94.7935 20.8472 94.6514 18.4472L94.3671 13.9296H93.2302C91.2405 13.9296 90.672 15.2472 90.672 16.706C90.672 18.306 91.1458 19.9531 91.6195 20.659C91.3826 20.8943 91.051 21.0354 90.7194 21.0354ZM98.3938 13.9296H95.8357L96.2621 18.3531C96.4042 19.7178 97.1148 20.2354 98.2517 20.2354C99.4361 20.2354 100.478 19.5766 100.478 18.259C100.526 16.8001 99.815 15.4354 98.3938 13.9296Z" fill="#AD007C"/>
                <path d="M90.7668 5.03547H98.2043C99.815 5.03547 100.241 4.47076 100.241 3.38841V0.847231C100.431 0.753113 100.573 0.706055 100.857 0.706055C101.568 0.706055 102.089 1.31782 102.089 3.95311C102.089 5.69429 101.378 7.01194 98.7254 7.01194H90.8141V8.61194C90.6246 8.75311 90.3878 8.84723 90.0562 8.84723C89.4403 8.84723 89.0613 8.659 89.0613 7.95311V7.059H85.5083C85.4136 6.87076 85.2715 6.44723 85.2715 6.0237C85.2715 5.50605 85.5557 5.12958 86.1716 5.12958H89.014V0.941349C89.1561 0.800172 89.3456 0.753114 89.7246 0.753114C90.1509 0.753114 90.7668 0.89429 90.7668 1.78841V5.03547Z" fill="#AD007C"/>
                <path d="M0 80H81.008V0L0 15.7647V80Z" fill="#525161"/>
                <path d="M71.865 0H0V13.7412L71.865 0Z" fill="#AD007C"/>
                <path d="M15.5858 73.6C14.0225 74.9647 12.1749 75.8588 9.901 75.8588C5.87429 75.8588 2.22656 73.0824 2.22656 66.0235C2.22656 58.9177 6.39539 56 10.3274 56C12.6486 56 14.212 56.7059 15.3963 57.8824V48.9412C15.3963 48.2353 15.8226 47.8118 16.628 47.8118C17.5281 47.8118 18.0018 48 18.2387 48.1882V71.8118C18.2387 72.8471 18.7598 73.1765 19.4704 73.1765H20.7494C20.8916 73.5059 20.9863 73.7412 20.9863 74.2118C20.9863 74.9177 20.2757 75.5294 18.665 75.5294C17.3386 75.4824 16.1069 74.8706 15.5858 73.6ZM15.3489 71.2471V61.0353C14.1646 59.6706 12.9803 59.0588 10.659 59.0588C8.1482 59.0588 5.16369 60.8941 5.16369 65.8824C5.16369 70.9177 7.4376 73.0824 10.3274 73.0824C12.6013 73.0824 14.1646 72.3294 15.3489 71.2471Z" fill="white"/>
                <path d="M25.4868 66.2589C25.5816 70.7765 27.9502 73.0824 31.3137 73.0824C34.1561 73.0824 36.6195 72.0001 37.5196 71.2942C37.8986 71.5295 38.1828 71.9059 38.1828 72.6118C38.1828 73.3177 37.8986 73.7412 37.5196 73.9765C36.43 74.7765 34.5351 75.8118 31.0768 75.8118C25.9605 75.8118 22.5497 71.9059 22.5497 65.9765C22.5497 59.2942 26.7659 55.953 31.219 55.953C36.051 55.953 38.3723 59.5295 38.3723 64.1883C38.3723 64.9412 38.2775 65.6942 38.0881 66.2118H25.4868V66.2589ZM25.6289 64.0942H35.672C35.672 60.9412 34.2982 58.7295 31.1242 58.7295C28.5661 58.6824 26.2448 60.4236 25.6289 64.0942Z" fill="white"/>
                <path d="M44.2465 69.8825C44.2465 72.2354 44.9571 72.8942 46.8994 72.8942H49.5996C49.6944 73.1295 49.7417 73.3648 49.7417 73.7884C49.7417 74.6354 48.6522 75.4354 45.9045 75.4354C42.6358 75.4354 41.262 73.9766 41.262 70.5884V48.1413C41.6409 47.859 41.9252 47.7178 42.7305 47.7178C43.8675 47.7648 44.2465 48.3295 44.2465 49.0825V69.8825Z" fill="white"/>
                <path d="M55.3792 58.9647V69.8353C55.3792 72.1882 56.2319 72.8 57.7952 72.8H61.6325C61.7746 73.0824 61.822 73.2706 61.822 73.6471C61.822 74.6824 60.9219 75.4353 56.9899 75.4353C54.3844 75.4353 52.4421 74.353 52.4421 70.5412V58.9647H50.0734C49.8839 58.6824 49.7418 58.353 49.7418 57.8353C49.7418 56.9412 50.0261 56.3765 51.0683 56.3765H52.4421V51.2C52.7263 51.0588 53.3422 50.8706 54.0054 50.8706C54.8107 50.8706 55.3792 51.2471 55.3792 52.1883V56.3765H61.4903C61.6798 56.5647 61.7746 56.8941 61.7746 57.4118C61.7746 58.0235 61.5851 58.9647 60.2586 58.9647H55.3792Z" fill="white"/>
                <path d="M64.0011 58.8707C64.0011 56.9884 67.7909 56.0001 70.5859 56.0001C74.1863 56.0001 77.2655 57.4589 77.2655 61.7413V71.906C77.2655 72.8942 77.6445 73.2707 78.2603 73.2707H79.3973C79.5394 73.4119 79.6342 73.7884 79.6342 74.306C79.6342 75.0589 78.8288 75.4354 77.076 75.4354C75.5601 75.4354 74.6126 74.306 74.6126 72.706V72.5648C72.6703 74.4472 70.2543 75.8589 67.7435 75.8589C64.1905 75.8589 62.4851 73.4119 62.4851 69.9766C62.4851 66.8707 64.2853 64.8472 67.8856 64.6589L74.6126 64.2825V62.5884C74.6126 59.6707 72.6703 58.8237 70.4912 58.8237C68.1225 58.8237 65.6117 59.5295 64.6169 60.1884C64.2379 59.8589 64.0011 59.3884 64.0011 58.8707ZM74.5652 70.1648V66.4472L67.9804 67.0589C65.9433 67.2472 65.138 68.2825 65.138 69.9766C65.138 71.7178 66.0855 73.2237 68.0751 73.2237C70.349 73.2707 72.3387 72.2354 74.5652 70.1648Z" fill="white"/>
                <path d="M36.1456 37.2705C36.4772 37.8352 36.6667 38.5882 36.6667 39.4823C36.6667 42.0705 35.2455 43.0117 33.2559 43.0117C32.64 43.0117 32.1189 42.9176 31.6452 42.7294C31.5031 43.1058 31.4083 43.4352 31.4083 43.7646C31.4083 44.4235 31.7399 44.7999 32.8769 44.7999H35.814C37.2826 44.7999 37.9458 45.5999 37.9458 46.8235C37.9458 48.8941 36.2404 50.2117 33.4454 50.2117C31.1715 50.2117 29.6555 49.1764 29.6555 48.3293C29.6555 48.047 29.845 47.7176 30.1292 47.5294C30.7451 48.3294 31.7873 48.9411 33.398 48.9411C35.435 48.9411 36.6667 48.1882 36.6667 47.0117C36.6667 46.4941 36.3825 46.0705 35.5298 46.0705H32.64C30.7925 46.0705 30.1292 45.3646 30.1292 44.2352C30.1292 43.4823 30.5082 42.7293 30.8872 42.2117C30.3187 41.647 29.9871 40.7529 29.9871 39.5294C29.9871 37.0823 31.4557 35.9529 33.4454 35.9529C34.2507 35.9529 34.9139 36.1411 35.4824 36.5176C35.5772 36.3294 35.814 36.1411 36.193 36.1411H37.7563C37.8511 36.2352 37.8984 36.4235 37.8984 36.6588C37.8984 36.9882 37.8037 37.3176 37.1878 37.3176H36.1456V37.2705ZM33.2559 41.8823C34.3928 41.8823 35.1508 41.2705 35.1508 39.5764C35.1508 37.9294 34.4402 37.1764 33.3032 37.1764C32.1189 37.1764 31.3136 37.9294 31.3136 39.5764C31.3609 41.2705 32.1189 41.8823 33.2559 41.8823Z" fill="white"/>
                <path d="M41.9726 37.694V37.7881C42.778 36.7528 43.9149 35.9058 45.0045 35.9058C46.0467 35.9058 46.6626 36.4234 46.6626 37.5058C46.6626 38.3058 46.3309 38.5411 45.8098 38.5411C45.573 38.5411 45.3835 38.4469 45.2414 38.3058C45.2414 37.7881 45.0519 37.4587 44.3886 37.4587C43.5359 37.4587 42.6358 38.1175 41.9726 39.1528V45.1763C41.8305 45.2705 41.5463 45.3646 41.1673 45.3646C40.7883 45.3646 40.4567 45.2705 40.4567 44.6587V38.0705C40.4567 37.6469 40.2672 37.4587 39.983 37.4587H39.2724C39.1776 37.2705 39.1776 37.0822 39.1776 36.8469C39.1776 36.4234 39.6987 36.094 40.5041 36.094C41.4515 36.094 41.9726 36.5175 41.9726 37.694Z" fill="white"/>
                <path d="M47.9889 37.3175C47.9889 36.3763 49.8365 35.9058 51.1629 35.9058C52.9157 35.9058 54.4317 36.6116 54.4317 38.6822V43.6234C54.4317 44.094 54.6212 44.2822 54.9054 44.2822H55.4265C55.4739 44.3763 55.5213 44.5175 55.5213 44.7999C55.5213 45.1763 55.1423 45.3646 54.2896 45.3646C53.579 45.3646 53.1052 44.8469 53.1052 44.0469V43.9528C52.1578 44.894 50.9734 45.5528 49.7417 45.5528C48.0363 45.5528 47.1836 44.3763 47.1836 42.6822C47.1836 41.1763 48.0363 40.1881 49.7891 40.094L53.0579 39.9058V39.0587C53.0579 37.6469 52.1104 37.2234 51.0682 37.2234C49.9312 37.2234 48.6995 37.5528 48.2258 37.8822C48.1311 37.7881 47.9889 37.5999 47.9889 37.3175ZM53.1526 42.8234V41.0352L49.9786 41.3646C48.9838 41.4587 48.6048 41.9763 48.6048 42.7763C48.6048 43.6234 49.0785 44.3763 50.026 44.3763C51.0682 44.3293 52.063 43.8116 53.1526 42.8234Z" fill="white"/>
                <path d="M59.7374 37.5999V37.8822C60.6375 36.7058 61.7271 35.9058 63.1483 35.9058C64.759 35.9058 65.8012 36.9411 65.8012 39.0587V43.7646C65.8012 44.094 65.8959 44.2822 66.1802 44.2822H66.9381C66.9855 44.3763 67.0329 44.4705 67.0329 44.7058C67.0329 45.1293 66.6065 45.3646 65.6117 45.3646C64.759 45.3646 64.3326 44.9881 64.3326 43.9999V39.3881C64.3326 38.0705 63.7168 37.3646 62.6745 37.3646C61.4428 37.3646 60.4954 38.1646 59.7374 39.2469V45.1763C59.5479 45.2705 59.3111 45.3646 58.8847 45.3646C58.5057 45.3646 58.1741 45.2234 58.1741 44.6116V38.0234C58.1741 37.5999 57.9846 37.5058 57.7004 37.5058H56.9898C56.895 37.3175 56.8477 37.1763 56.8477 36.894C56.8477 36.4234 57.274 36.1411 58.2215 36.1411C59.1689 36.094 59.7374 36.6116 59.7374 37.5999Z" fill="white"/>
                <path d="M75.1811 44.4705C74.4232 45.1293 73.5231 45.5528 72.4335 45.5528C70.4912 45.5528 68.691 44.1881 68.691 40.7528C68.691 37.2705 70.7281 35.9058 72.623 35.9058C73.76 35.9058 74.5179 36.2352 75.0864 36.8469V32.4705C75.0864 32.1411 75.2759 31.9058 75.7023 31.9058C76.1286 31.9058 76.3655 31.9999 76.5076 32.094V43.5763C76.5076 44.094 76.7445 44.2352 77.1234 44.2352H77.7393C77.834 44.3763 77.834 44.5175 77.834 44.7528C77.834 45.0822 77.5024 45.3646 76.6971 45.3646C75.9865 45.4116 75.418 45.0822 75.1811 44.4705ZM75.039 43.3411V38.3999C74.4706 37.7411 73.9021 37.4587 72.7651 37.4587C71.5334 37.4587 70.1122 38.3528 70.1122 40.7528C70.1122 43.1999 71.2018 44.2352 72.623 44.2352C73.7126 44.2352 74.4706 43.8587 75.039 43.3411Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_119_237">
                <rect width="102.278" height="80" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            `);

        // Créer une image à partir du SVG base64
        const img = new Image();
        img.onload = () => {
          if (!map.hasImage("custom-marker")) {
            map.addImage("custom-marker", img);
          }

          // Layer points non clusterisés avec symbole SVG
          map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "properties",
            filter: ["!", ["has", "point_count"]],
            layout: {
              "icon-image": "custom-marker",
              "icon-size": 1,
              "icon-anchor": "center",
              "icon-allow-overlap": true,
            },
          });

          // Labels sous les points
          map.addLayer({
            id: "unclustered-point-labels",
            type: "symbol",
            source: "properties",
            filter: ["!", ["has", "point_count"]],
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 18,
              "text-offset": [0, 1.2],
              "text-anchor": "top",
            },
            paint: {
              "text-color": "#AD007C",
            },
          });
        };
        img.src = svgBase64;

        // Gérer les clics clusters et points non clusterisés (inchangé)
        map.on("click", "clusters", function (e) {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource("properties").getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err) return;
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
        });

        map.on("click", "unclustered-point", (e) => {
          console.log(e.features[0]);
          const props = e.features[0].properties;
          const id = parseInt(props.id);

          currentIndex = propertiesList.findIndex((p) => p.id === id);
          // injectionPanel(propertiesList[currentIndex]);
          // panel.classList.add("active");
          // overlay.classList.add("active");
        });

        map.on("mouseenter", "unclustered-point", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "unclustered-point", () => {
          map.getCanvas().style.cursor = "";
        });
        map.on("zoom", () => {
          const currentZoom = map.getZoom();
          if (currentZoom >= 16 && map.getPitch() !== 75) {
            map.easeTo({ pitch: 75, duration: 1000 });
          } else if (currentZoom < 16 && map.getPitch() !== 0) {
            map.easeTo({ pitch: 0, duration: 1000 });
          }
        });
        map.on("moveend", () => {
          const currentZoom = map.getZoom();

          if (currentZoom >= 16 && map.getPitch() !== 75) {
            map.easeTo({ pitch: 75, duration: 1000 });
          } else if (currentZoom < 16 && map.getPitch() !== 0) {
            map.easeTo({ pitch: 0, duration: 1000 });
          }
        });
      });
  });
}

// ----------------- init panel ----------------
function initPanel() {
  const panel = document.querySelector("#panel");
  const closeButton = panel.querySelector(".close-button");
  const overlay = document.querySelector(".overlay");
  const nextButton = panel.querySelector(".next-button");
  const prevButton = panel.querySelector(".prev-button");

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % propertiesList.length;
    injectionPanel(propertiesList[currentIndex]);
  });

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + propertiesList.length) % propertiesList.length;
    injectionPanel(propertiesList[currentIndex]);
  });

  closeButton.addEventListener("click", function () {
    panel.classList.remove("active");
    overlay.classList.remove("active");
  });

  document.addEventListener("mousedown", function (event) {
    if (panel.classList.contains("active") && !panel.contains(event.target)) {
      panel.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
}

// ----------------- inject panel content ----------------
function injectionPanel(data) {
  const panel = document.querySelector("#panel");
  const h2 = panel.querySelector("h2");
  const h3 = panel.querySelector("h3");
  const description = panel.querySelector(".description");

  h2.textContent = data.name;
  h3.textContent = `${data.type} – ${data.city}`;
  description.innerHTML  = data.description;

  injectionCarousel(data);
}

// ----------------- inject images ----------------
function injectionCarousel(data) {
  const listEl = document.getElementById("carousel-list");
  listEl.innerHTML = "";

  data.images.forEach((img) => {
    const li = document.createElement("li");
    li.className = "splide__slide";
    li.innerHTML = `<img src="${img}" alt="${data.name}">`;
    listEl.appendChild(li);
  });

  if (splideInstance) {
    splideInstance.destroy(true);
  }

  splideInstance = new Splide("#property-carousel", {
    type: "loop",
    direction: 'ttb',
    height   : '100%',
    perPage: 1.5,
    autoplay: true,
    pauseOnHover: true,
    heightRatio: 0.5,
    rewind: false,
    speed: 600,
    easing: "ease",
    drag: true,
    gap: "1rem",
    arrows: true,
    pagination: true,
  });

  splideInstance.mount();
}

// ----------------- search function ----------------
function initSearch(map, geojson) {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (!map.getSource("properties")) return;

    const filteredFeatures = query
      ? geojson.features.filter((feature) => {
          const { name, city } = feature.properties;
          return name.toLowerCase().includes(query) || city.toLowerCase().includes(query);
        })
      : geojson.features;

    const filteredGeoJson = {
      type: "FeatureCollection",
      features: filteredFeatures,
    };

    map.getSource("properties").setData(filteredGeoJson);
  });
}

// ----------------- custom marker ----------------
function addMarkersWithLabels(properties) {
  properties.forEach((property) => {
    // Créer un élément DOM personnalisé pour le marker
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.background = "#ad007c";
    el.style.color = "#fff";
    el.style.padding = "4px 8px";
    el.style.borderRadius = "4px";
    el.style.fontSize = "12px";
    el.style.fontWeight = "bold";
    el.style.whiteSpace = "nowrap";
    el.textContent = property.name;

    // Créer le marker Mapbox et l'ajouter à la carte
    new mapboxgl.Marker(el).setLngLat([property.lng, property.lat]).addTo(map);
  });
}
