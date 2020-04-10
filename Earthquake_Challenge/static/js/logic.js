// Create the street view tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  	maxZoom: 18,
  	accessToken: API_KEY
});

// Create the light view tile layer that will be an option of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	  maxZoom: 18,
	  accessToken: API_KEY
});

// Ccreate the satellite view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets,
  "Light": light
};

// Create the earthquake layer for our map (add Chllng13 tectonicPlate).
let earthquakes = new L.layerGroup();
let tectonicPlate = new L.layerGroup();

// Define an object that contains the overlays.This overlay will be visible all the time.
let overlays = {
   "Earthquakes": earthquakes,
   "Tectonic Plate": tectonicPlate
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// This function returns the style data for each earthquake
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    // Pass the mag of earthquake into getColor() and getRadius() to calculate the fillColor and radius.
    fillColor: getColor(feature.properties.mag),
    color: "#000000", // black
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This func determines the color of the circle based on the mag of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {return "#ea2c2c" ;} // red
  if (magnitude > 4) {return "#ea822c" ;} // light red 
  if (magnitude > 3) {return "#ee9c00" ;} // orange
  if (magnitude > 2) {return "#eecc00" ;} // light orange
  if (magnitude > 1) {return "#d4ee00" ;} // light green
  return "#98ee00"; // green
}

// This func determines the radius of the earthquake marker based on its magnitude.
function getRadius(magnitude) {
  if (magnitude === 0) {return 1 ;} // mag of 0 will be plotted wz a radius of 1.
  return magnitude * 4;
}

// Grabbing earthquakes GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(function(data) {
    // Creating a geoJSON layer wz the retrieved data.
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) { 
        //console.log(data);
        // circleMarker is to circle the points
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      // Create a popup for each circleMarker to display the magnitude and location.
      onEachFeature: function(feature, layer) {
    	  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
      // To have the Earthquakes overlay button “on”; replace the map variable in addTo(map) wz earthquakes
    }).addTo(earthquakes);
    // Add the earthquake layer to the map
    earthquakes.addTo(map);
  });

// Create a legend control object
let legend = L.control({position: "bottomright" });

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  // Add a colors array that holds the colors for our magnitudes
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
  // Looping thru intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      '<i style="background: ' + colors[magnitudes[i]] + '"></i> ' +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(map);


// Challenge13: Grabbing tectonic plate GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(function(data) {
    // Creating a geoJSON layer wz the retrieved data.
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        //console.log(data);     
        // ployLine is to line the points
        return L.polyLine(latlng);
      },
      color: "#ea2c2c", // red color
      weight: 2,
    // Assign to the tectonicPlate overlay 
    }).addTo(tectonicPlate);
    // Add the tectonicPlate layer to the map
    tectonicPlate.addTo(map);
  })

