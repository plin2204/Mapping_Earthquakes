// Create the map object with center at SFO, zoom level 5.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Coordinates for each point to be used in the polyline.
let line = [
	[33.9416, -118.4085], // LAX
	[37.6213, -122.3790], // SFO
	[40.7899, -111.9791], // SLC
	[47.4502, -122.3088]  // SEA
  ];
  
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
	color: "yellow"
}).addTo(map);
  

// Create the tile layer (a street level map) that will be the background of our map.
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// for dar map view, use dark-v10 instead of streets-v11
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// Satellite level map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


