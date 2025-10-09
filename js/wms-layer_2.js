var overlayMaps = {};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// 1️⃣ FUNCIÓN DE ENLACE PARA LÍMITES MUNICIPALES (corregida)
function bindMunicipalLabel(feature, layer) {
    const properties = feature.properties;

    if (properties.NOMGEO) {
        const labelContent = `
            <div class="popup-municipio">
                <b>Municipio:</b> ${properties.NOMGEO || 'N/A'}<br>
                <b>Clave INEGI:</b> ${properties.CVE_MUN || 'N/A'}<br>
                <b>Entidad Federativa:</b> ${properties.NOM_ENT || 'N/A'}
            </div>
        `;
        // 🔹 Se había repetido el "layer.bindPopup"; se deja solo una línea correcta
        layer.bindPopup(labelContent, { className: 'popup-municipio' });
    }
}

// 2️⃣ FUNCIÓN DE ENLACE PARA NÚCLEOS AGRARIOS
function bindNucleoAgrarioLabel(feature, layer) {
    const properties = feature.properties;

    if (properties.NOM_NUC) {
        const labelContent = `
            <b>Núcleo Agrario:</b> ${properties.NOM_NUC || 'N/A'}<br>
            <b>Tipo:</b> ${properties.tipo || 'N/A'}<br>
            <b>Municipio:</b> ${properties.NOM_MUN || 'N/A'}<br>
            <b>Entidad Federativa:</b> ${properties.NOM_EST || 'N/A'}
        `;
        layer.bindPopup(labelContent, { className: 'popup-nucleo' });
    }
}

// Función genérica para agregar GeoJSON al mapa
function addGeoJSON(url, name, style, featureBindingFunction) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const layer = L.geoJSON(data, { 
                style: style,
                onEachFeature: featureBindingFunction
            }); 
            
            layer.addTo(map);
            layerControl.addOverlay(layer, name);
        })
        .catch(err => console.error("Error cargando GeoJSON:", err));
}

// -------------------------------------------------------------
// USO DE LAS FUNCIONES
// -------------------------------------------------------------

addGeoJSON(
    'data/dgo.geojson', 
    'Límite Municipal', 
    { color: '#FF0000', weight: 2, fillOpacity: 0.5 },
    bindMunicipalLabel
);

addGeoJSON(
    'data/ran.geojson', 
    'Núcleos Agrarios', 
    { color: '#00FF00', weight: 1, fillOpacity: 0.3 },
    bindNucleoAgrarioLabel
);



