// puntos_calor.js

// Crear grupos para puntos de calor
var heat3h = L.layerGroup().addTo(map);
var heat6h = L.layerGroup().addTo(map);
var heat12h = L.layerGroup().addTo(map);
var heat2d = L.layerGroup();
var heat3d = L.layerGroup();
var heat7d = L.layerGroup();
var heatAll = L.layerGroup();

// Cargar GeoJSON de puntos de calor
fetch('data/temp/final2.geojson')
  .then(response => response.json())
  .then(data => {
    var now = new Date();

    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        var fecha_dt = new Date(feature.properties.acq_date_mex);
        var diffHours = (now - fecha_dt) / (1000*60*60);
        var diffDays = (now - fecha_dt) / (1000*60*60*24);

        var circleOptions = {radius:3, fillOpacity:0.6, color:'gray', fillColor:'lightgray'};

        if (diffHours <= 3) circleOptions = {radius:4, fillOpacity:0.9, color:'red', fillColor:'red'};
        else if (diffHours <= 6) circleOptions = {radius:3, fillOpacity:0.6, color:'orange', fillColor:'orange'};
        else if (diffHours <= 12) circleOptions = {radius:3, fillOpacity:0.6, color:'yellow', fillColor:'yellow'};
        else if (diffDays <= 1) circleOptions = {radius:3, fillOpacity:0.6, color:'green', fillColor:'green'};
        else if (diffDays <= 2) circleOptions = {radius:3, fillOpacity:0.6, color:'blue', fillColor:'blue'};
        else if (diffDays <= 7) circleOptions = {radius:3, fillOpacity:0.6, color:'darkblue', fillColor:'darkblue'};

        var marker = L.circleMarker(latlng, circleOptions);

        // Agregar al grupo correspondiente
        if (diffHours <= 3) heat3h.addLayer(marker);
        else if (diffHours <= 6) heat6h.addLayer(marker);
        else if (diffHours <= 12) heat12h.addLayer(marker);
        else if (diffDays <= 1) heat2d.addLayer(marker);
        else if (diffDays <= 2) heat3d.addLayer(marker);
        else if (diffDays <= 7) heat7d.addLayer(marker);
        else heatAll.addLayer(marker);

        return marker;
      }
    });
  })
  .catch(err => console.error("Error cargando GeoJSON:", err));

// Control de capas
var overlayMaps = {
  "3 Hrs": heat3h,
  "6 Hrs": heat6h,
  "12 Hrs": heat12h,
  "2 Días": heat2d,
  "3 Días": heat3d,
  "4-7 Días": heat7d,
  "Enero a la Fecha": heatAll
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


