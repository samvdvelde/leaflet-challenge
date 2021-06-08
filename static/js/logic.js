

function createMap(quakeMap) {


  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

    var baseMaps = {
        "Light Map": lightmap
      };

    var overlayMaps = {
        "Quake sites": quakeMap
      };

    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [lightmap, quakeMap]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

console.log(API_KEY)

function createCircles(response) {

    var events = response.features;
  


    var circles = [];

    console.log(events);



    for (var i = 0; i < events.length; i++) {

        var lon = events[i].geometry.coordinates[0];

        var lat = events[i].geometry.coordinates[1];

        var depths = events[i].geometry.coordinates[2];

        var mag = events[i].properties.mag;

        var place = events[i].properties.place;

    

    
    

        var fillcolor = "";
        if (depths > 90) {
          fillcolor = "red";
        }
        else if (depths <= 90 && depths >= 70) {
          fillcolor = "brown";
        }
        else if (depths < 70 && depths >= 50) {
            fillcolor = "orange";
        }
        else if (depths < 50 && depths >= 30) {
            fillcolor = "yellow";
          }
          else if (depths < 30 && depths >= 10) {
            fillcolor = "green";
          }
        else {
          fillcolor = "blue";
        }

        
        var quakeCircles = L.circleMarker([lat, lon], {
            fillOpacity: 0.75,
            color: "gray",
            weight: 0.5,
            fillColor: fillcolor,
            radius: mag * 2
        }).bindPopup("<h3>" + place + "<h3><h3>Magnitude: " + mag + "</h3>");

        circles.push(quakeCircles);
        
        }
    console.log(circles);
    createMap(L.layerGroup(circles));
};       


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson").then(createCircles);

