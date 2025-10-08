// Inicializa el mapa centrado en unas coordenadas específicas y con un zoom de nivel 7
var map = L.map('map').setView([24.61429, -104.51686], 7);

// Define la capa base de Google Satellite
var googleTileLayer = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
    attribution: 'Google Satellite',
}).addTo(map); // Agrega la capa al mapa por defecto

// Define la capa base de OpenStreetMap
var osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
});

// Agrupa las capas base en un objeto para mostrarlas en un control
var baseMaps = {
    "Google Satellite": googleTileLayer,
    "OpenStreetMap": osmTileLayer,
};

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








