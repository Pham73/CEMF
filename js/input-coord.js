document.getElementById('coord-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const input = document.getElementById('coord').value.trim();
    const parts = input.replace(',', ' ').split(/\s+/);

    if (parts.length !== 2) {
        alert('Ingresa latitud y longitud separadas por coma o espacio.');
        return;
    }

    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);

    if (isNaN(lat) || isNaN(lon)) {
        alert('Coordenadas inválidas.');
        return;
    }

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`Lat: ${lat}, Lon: ${lon}`).openPopup();
    map.setView([lat, lon], 13);

    document.getElementById('coord').value = '';
});
