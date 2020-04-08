// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// approximate geographical center of the United States, wz zoom level of “4” 
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker or circle for each city.
cityData.forEach(function(city) {
	console.log(city)
	// marker() is to create a marker for each city
	//L.marker(city.location)
	L.circleMarker(city.location,{
		// radius is based on city.population/100000
		radius: city.population/100000
	})
	// Use Leaflet’s bindPopup() method to bind a Popup to the Marker 
	// toLocaleString() method after city.population create thousands separators (ex. 2,325,502) 
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
	.addTo(map);
});



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


