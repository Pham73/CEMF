// === CONTROL DE CAPAS ===
var inceMaps = {}; // Aquí se almacenan las capas vectoriales (GeoJSON, etc.)
var layerControl = L.control.layers(baseMaps, overlayMaps, inceMaps).addTo(map);

// === FUNCIÓN DE ENLACE DE POPUP ===
function bind_ince_Label(feature, layer) {
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

// === FUNCIÓN GENÉRICA PARA CARGAR GEOJSON ===
function addGeoJSON(url, name, style, featureBindingFunction, visible = true) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const layer = L.geoJSON(data, {
                style: style,
                onEachFeature: featureBindingFunction
            });

            if (visible) {
                layer.addTo(map);
            }

            // Agregar la capa al control de capas
            inceMaps[name] = layer;
            layerControl.addOverlay(layer, name);
        })
        .catch(err => console.error("Error cargando GeoJSON:", err));
}

// === CAPA: AQ_INCE ===
addGeoJSON(
    'data/aq_ince.geojson',          // Ruta al archivo
    'Áreas de Quemadas',             // Nombre visible en el control
    { 
        color: '#FFFF00',            // Borde amarillo
        weight: 2,                   // Grosor del borde
        fillColor: '#FF0000',        // Relleno rojo
        fillOpacity: 0.50            // Transparencia %
    },
    bind_ince_Label,        	     // Popup con datos del GeoJSON
    true                             // Visible al inicio
);

// === FUNCIÓN DE ENLACE PARA AQ_INCE ===
function bind_ince_Label(feature, layer) {
    const properties = feature.properties;

    if (properties.NOM_NUC) {
        // Formatear AQ_ha con separador de miles
        const superficie = properties.AQ_ha != null 
            ? Number(properties.AQ_ha).toLocaleString('en-US') 
            : 'N/A';

        const labelContent = `
            <b>Superficie Afectada (ha.):</b> ${superficie}<br>
            <b>Núcleo Agrario:</b> ${properties.NOM_NUC || 'N/A'}<br>
            <b>Municipio:</b> ${properties.NOM_MUN || 'N/A'}<br>
            <b>Entidad Federativa:</b> ${properties.NOM_EST || 'N/A'}
        `;
        layer.bindPopup(labelContent);
    }
}



