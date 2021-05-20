// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Adding layers to baseMap
var baseMaps = {
    Light: light,
    Dark: dark
  };
  
// Create map object and set default layers
var myMap = L.map("mapid", {
    center: [38.500000, -98.000000],
    zoom: 4,
    layers: [light]
  });

let geojson_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
L.control.layers(baseMaps).addTo(myMap);

function setcolors(){

} 

d3.json(geojson_url).then(data => {
    console.log(data);
});
  // Pass our map layers into our layer control -  Add the layer control to the map

