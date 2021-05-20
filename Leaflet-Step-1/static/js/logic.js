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

function setcolors(depth){
    var circleColor = "green";
    if (depth > 90) {
        circleColor = "red";
    }
    else if (depth > 70) {
        circleColor = "#eb5e34";
    }
    else if (depth > 50) {
        circleColor = "#eb9f34";
    }
    else if (depth > 30) {
        circleColor = "#ebd334";
    }   
    else if (depth > 10) {
        circleColor = "#e2eb34";
    }
    return circleColor;
} 

d3.json(geojson_url).then(data => {
    console.log(data);
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag*3,
                fillColor: setcolors(feature.geometry.coordinates[2]),
                color: "black",
                weight: 1
            });
        },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(`${feature.properties.place}<br>Magnitude: ${feature.properties.mag}<br>${new Date(feature.properties.time)}`);
            }
    }).addTo(myMap)
});
  // Pass our map layers into our layer control -  Add the layer control to the map

