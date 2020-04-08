// Create the map object with center and zoom level 2 (using setView() method)
//let map = L.map('mapid').setView([30, 30], 2);

// Ccreate the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    accessToken: API_KEY
});

// Create the light view tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets',
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
})

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };
  
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL from my github
let airportData = "https://raw.githubusercontent.com/plin2204/Mapping_Earthquakes/master/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // line color yellow, line weight 2
    color: "#ffffa1",
    weight: 2,
    // add popup msg when clicking 
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Airline: "+ feature.properties.airline + 
                      "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
});

