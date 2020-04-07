// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// approximate geographical center of the United States, wz zoom level of “4” 
let map = L.map('mapid').setView([40.7, -94.5], 4);

//  Add a marker or circle to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// Option1: L.circle 
//L.circle([34.0522, -118.2437], {
//	radius: 100
// }).addTo(map);
// Option2: L.circleMarker
L.circleMarker([34.0522, -118.2437],{
	radius: 300,
	// black line
	color: "black",
	// light yellow circle
	fillColor: '#ffffa1'
}).addTo(map);


// We create the tile layer (a street level map) that will be the background of our map.
// for dar map view, use dark-v10 instead of streets-v11
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
