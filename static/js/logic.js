

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


    
    // function  getColor(s) {
    //     if ( s === '0 - 10') 
    //         return 'blue';
    //     else if ( s === '10 - 30') 
    //         return 'green';
    //     else if ( s === '30 - 50') 
    //         return 'yellow';
    //     else if ( s === '50 - 70') 
    //         return 'orange';
    //     else if ( s === '70 - 90') 
    //         return 'brown';
    //     else
    //         return 'red';
    //     }
    // var legend = L.control({position: 'bottomright'});
    
    
    // legend.onAdd = function (map) {
    //     var legendDiv =  L.DomUtil.create('div', 'info legend'),
    //         levels = ['0 - 10', '10 - 30', '30 - 50', '50 - 70', '70 - 90', '90+'],
    //         title= ['<strong>Depth</strong>'],
    //         labels = [];
    //     for ( var i=0; i < levels.length; i++) {
    //         labels.push( 
    //             '<i class="square" style="background:' + getColor(levels[i]) + '"></i>'+ levels[i] + '')
    //         }
    //         legendDiv.innerHTML = labels.join('<br>');
    
    
    //         return legendDiv;
    //     }
    
    //     legend.addTo(map);

      function getColor(d) {
        return d === '0 - 10'  ? "#de2d26" :
             d === '10 - 30'  ? "#377eb8" :
             d === '30 - 50' ? "#4daf4a" :
             d === '50 - 70' ? "#984ea3" :
             d === '70 - 90' ? "#984ea3" :
                "#984ea3" ;
      };


        // var legend = L.control({position: 'bottomright'});
        // legend.onAdd = function (map) {
    
        // var div = L.DomUtil.create('div', 'info legend');
        // labels = ['<strong>Depth</strong>'],
        // categories = ['0 - 10', '10 - 30', '30 - 50', '50 - 70', '70 - 90', '90+'];
    
        // for (var i = 0; i < categories.length; i++) {
    
        //         div.innerHTML += 
        //         labels.push(
        //             '<i class="square" style="background:' + getColor(categories[i]) + '"></i> ' +
        //         (categories[i] ? categories[i] : '+'));
    
        //     }
        //     div.innerHTML = labels.join('<br>');
        // return div;
        // };
        // legend.addTo(map);

        var legend = L.control({ position: "bottomright" });

        legend.onAdd = function(map) {
          var div = L.DomUtil.create("div", "legend");
          div.innerHTML += "<h4>Depth</h4>";
          div.innerHTML += '<i style="background: blue"></i><span>0 - 10</span><br>';
          div.innerHTML += '<i style="background: green"></i><span>10 - 30</span><br>';
          div.innerHTML += '<i style="background: yellow"></i><span>30 - 50</span><br>';
          div.innerHTML += '<i style="background: orange"></i><span>50 - 70</span><br>';
          div.innerHTML += '<i style="background: brown"></i><span>70 - 90</span><br>';
          div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';

        
          return div;
        };
        
        legend.addTo(map);



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
            fillOpacity: 0.3,
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

