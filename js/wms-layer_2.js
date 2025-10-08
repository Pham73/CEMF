var overlayMaps = {};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// 1. FUNCIÓN DE ENLACE PARA LÍMITES MUNICIPALES
function bindMunicipalLabel(feature, layer) {
    const nombreMunicipio = feature.properties.NOMGEO; // Usamos NOMGEO
    if (nombreMunicipio) {
        const labelContent = "<b>Municipio:</b> " + nombreMunicipio;
        layer.bindTooltip(labelContent, { permanent: false, direction: 'center' });
    }
}

// 2. FUNCIÓN DE ENLACE PARA NÚCLEOS AGRARIOS
function bindNucleoAgrarioLabel(feature, layer) {
    // Definimos las propiedades para facilitar su uso
    const properties = feature.properties;
    
    // Verificamos que al menos la propiedad principal exista para crear el popup
    if (properties.NOM_NUC) {
        
        // Creamos el contenido del popup, usando <br> para saltos de línea y formato HTML
        const labelContent = `
            <b>Núcleo Agrario:</b> ${properties.NOM_NUC || 'N/A'}<br>
            <b>Tipo:</b> ${properties.tipo || 'N/A'}<br>
            <b>No. Municipio:</b> ${properties.NOM_MUN || 'N/A'}<br>
            <b>Entidad Federativa:</b> ${properties.NOM_EST || 'N/A'}
        `;
        
        // Enlazar el popup al polígono (se abre al hacer clic)
        layer.bindPopup(labelContent); 
    }
}


// Función para agregar GeoJSON al mapa y al control (sin cambios)
function addGeoJSON(url, name, style, featureBindingFunction) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            var layer = L.geoJSON(data, { 
                style: style,
                // Aplicamos la función de enlace proporcionada
                onEachFeature: featureBindingFunction 
            }); 
            
            layer.addTo(map);
            layerControl.addOverlay(layer, name);
        })
        .catch(err => console.error("Error cargando GeoJSON:", err));
}

// -------------------------------------------------------------
// USO DE LAS FUNCIONES: Ahora ambas capas tienen una función de enlace
// -------------------------------------------------------------

// 1. Límites Municipales (dgo.geojson): Usando la etiqueta de Tooltip
addGeoJSON(
    'data/dgo.geojson', 
    'Límite Municipal', 
    { color: '#FF0000', weight: 2, fillOpacity: 0.5 },
    bindMunicipalLabel // <- Enlaza el Tooltip municipal
);

// 2. Núcleos Agrarios (ran.geojson): Usando la nueva etiqueta de Popup
addGeoJSON(
    'data/ran.geojson', 
    'Núcleos Agrarios', 
    { color: '#00FF00', weight: 1, fillOpacity: 0.3 },
    bindNucleoAgrarioLabel // <- Enlaza el Popup del núcleo agrario
);




