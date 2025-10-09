// === CONTROL DE CAPAS ===
var overlayMaps = {};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// === FUNCIÓN DE ENLACE PARA LÍMITES MUNICIPALES ===
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
        layer.bindPopup(labelContent, { className: 'popup-municipio' });
    }
}

// === FUNCIÓN DE ENLACE PARA NÚCLEOS AGRARIOS ===
function bindNucleoAgrarioLabel(feature, layer) {
    const properties = feature.properties;

    if (properties.NOM_NUC) {
        const labelContent = `
            <b>Núcleo Agrario:</b> ${properties.NOM_NUC || 'N/A'}<br>
            <b>Tipo:</b> ${properties.tipo || 'N/A'}<br>
            <b>Municipio:</b> ${properties.NOM_MUN || 'N/A'}<br>
            <b>Entidad Federativa:</b> ${properties.NOM_EST || 'N/A'}
        `;
        layer.bindPopup(labelContent);
    }
}

// === FUNCIÓN GENÉRICA PARA AGREGAR GEOJSON ===
function addGeoJSON(url, name, style, featureBindingFunction) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            var layer = L.geoJSON(data, { 
                style: style,
                onEachFeature: featureBindingFunction 
            }); 
            
            layer.addTo(map);
            layerControl.addOverlay(layer, name); // ✅ Aquí se mantiene correctamente
        })
        .catch(err => console.error("Error cargando GeoJSON:", err));
}

// === CAPAS ===

// 1️⃣ Límite Municipal: línea blanca, fondo blanco transparente
addGeoJSON(
    'data/dgo.geojson', 
    'Límite Municipal', 
    { 
        color: '#333333',     // línea blanca
        weight: 2,            // grosor del borde
        fillColor: '#FFFFFF', // relleno blanco
        fillOpacity: 0     // transparencia del 35%
    },
    bindMunicipalLabel
);

// 2️⃣ Núcleos Agrarios: verde translúcido
addGeoJSON(
    'data/ran.geojson', 
    'Núcleos Agrarios', 
    { 
        color: '#00FF00', 
        weight: 1, 
        fillOpacity: 0.15 
    },
    bindNucleoAgrarioLabel
);




