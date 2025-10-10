// 1️⃣ Definir capas base primero
var googleTileLayer = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
    attribution: 'Google Satellite'
});

var osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
});

// 2️⃣ Crear el mapa con la capa por defecto (OSM en este caso)
var map = L.map('map', {
    center: [24.61429, -104.51686],
    zoom: 7,
    layers: [osmTileLayer] // Capa que aparece al cargar
});

var stamenToner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
    maxZoom: 20
});

// 3️⃣ Agrupar capas base en un control
var baseMaps = {
    "Google Satellite": googleTileLayer,
    "OpenStreetMap": osmTileLayer
};

// Escala
L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

// Localización
L.control.locate({ position: 'topleft', flyTo: true, showPopup: true }).addTo(map);

// Medición de distancia y área
var measureControl = new L.Control.Measure({
    primaryLengthUnit: 'meters',  // unidad principal para distancia
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',  // unidad principal para área
    secondaryAreaUnit: 'hectares',
    position: 'topleft',
    activeColor: '#FF0000',      // color de líneas activas
    completedColor: '#00FF00',   // color de líneas completadas
    popupOptions: { className: 'leaflet-measure-resultpopup' }
});
measureControl.addTo(map);

// === LOGO PERSONALIZADO ===
var logoControl = L.control({ position: 'bottomright' }); // puedes usar: 'topleft', 'topright', 'bottomleft', 'bottomright'

logoControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-control-logo');
    div.innerHTML = '<img src="img/logo.png" style="width: 160px; opacity: 0.85;">';
    return div;
};

logoControl.addTo(map);

div.innerHTML = '<a href="https://tu-sitio.com" target="_blank"><img src="img/logo.png" style="width: 100px; opacity: 0.9;"></a>';




// Evento que escucha el formulario para ingresar coordenadas manualmente
document.getElementById('coord-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Previene que el formulario recargue la página

    const input = document.getElementById('coord').value.trim(); // Obtiene el valor del input y elimina espacios
    const parts = input.replace(',', ' ').split(/\s+/); // Reemplaza comas por espacios y divide en partes

    if (parts.length !== 2) {
        alert('Ingresa latitud y longitud separadas por coma o espacio.'); // Valida que haya dos valores
        return;
    }

    const lat = parseFloat(parts[0]); // Convierte el primer valor a número (latitud)
    const lon = parseFloat(parts[1]); // Convierte el segundo valor a número (longitud)

    if (isNaN(lat) || isNaN(lon)) {
        alert('Coordenadas inválidas.'); // Verifica que ambos sean números válidos
        return;
    }

    // Crea un marcador en las coordenadas dadas
    const marker = L.marker([lat, lon]).addTo(map);

    // Muestra un popup con las coordenadas
    marker.bindPopup(`Lat: ${lat}, Lon: ${lon}`).openPopup();

    // Centra el mapa en la ubicación con zoom nivel 13
    map.setView([lat, lon], 13);

    // Limpia el input después de procesar
    document.getElementById('coord').value = '';
});








