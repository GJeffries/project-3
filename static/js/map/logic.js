var MaleLayer = L.geoJson(male_results);
var FemaleLayer = L.geoJson(female_results);
var BothLayer = L.geoJson(both_results);

  
  // Adding a tile layer to our map:
var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var myMap = L.map("map", {
    center: [40,-20],
    zoom: 3,
    layers: [map]
  });
  
  // specify the basemap and overlays to put in the layers control
var baseMaps = {
    "World Map": map,
};

var overlayMaps = {
    "Both Sexes": BothLayer,
    "Males": MaleLayer,
    "Females": FemaleLayer
};

// initialize up the L.control.layers
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  //console.log(both_results);

  var BothSexesLayer = L.geoJSON(both_results, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<h3>'+feature.properties.cntry_name+'</h3><p>Obesity(%): '+feature.properties.Obs_pct+'</p>');
      }
    }).addTo(BothLayer);


  var MaleLayer = L.geoJson(male_results,{
      style: function(feature) {
          return {
              color: "#red"
          };
      },
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>'+feature.properties.cntry_name+'</h3><p>Obesity(%) for Males: '+feature.properties.Obs_pct+'</p>');
      }
    }).addTo(MaleLayer);

  var FemaleLayer = L.geoJson(female_results,{
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>'+feature.properties.cntry_name+'</h3><p>Obesity(%) for Females: '+feature.properties.Obs_pct+'</p>');
      }
    }).addTo(FemaleLayer);


