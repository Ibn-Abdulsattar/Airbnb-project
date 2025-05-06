const mapDiv = document.querySelector("#map");
const mapToken = mapDiv.dataset.token;
const center = JSON.parse(mapDiv.dataset.center);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: center, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
console.log(center);

const marker1 = new mapboxgl.Marker({color: "red"})
        .setLngLat(center)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML("<P>Exact location will be provided after booking</p>")
        // .setMaxWidth("300px")
    )
        .addTo(map);
