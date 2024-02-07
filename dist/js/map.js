/* step_2 map */

/* feelings */
function updateFeelings(){
$.get(url_feelings, function(data_f,status){
  console.log("refreshed feelings");
  feelings= new L.MarkerClusterGroup();
  
  var happyMarker = L.ExtraMarkers.icon({
    icon:'fa-smile',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
  });

  var angryMarker = L.ExtraMarkers.icon({
    icon:'fa-angry',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
  });

  var neutralMarker = L.ExtraMarkers.icon({
    icon:'fa-meh',
    markerColor: 'orange',
    shape: 'circle',
    prefix: 'fa'
  });

  
  for (i=0;i<data_f.length;i++)
  {
    if(data_f[i].issue=="happy")
    {
        feelings.addLayer(L.marker(data_f[i].loc.coordinates.reverse(),{icon: happyMarker}).bindPopup(data_f[i].issue));
    }
    else if(data_f[i].issue=="neutral")
    {
        feelings.addLayer(L.marker(data_f[i].loc.coordinates.reverse(),{icon: neutralMarker}).bindPopup(data_f[i].issue));
    }
    else if(data_f[i].issue=="angry")
    {
        feelings.addLayer(L.marker(data_f[i].loc.coordinates.reverse(),{icon: angryMarker}).bindPopup(data_f[i].issue));
    }
  }

  feelings_lay=L.layerGroup(feelings);
  
  
});
}

updateMap();
updateFeelings();
setInterval(() => {
  updateMap();
  updateFeelings();
}, 20000);


function updateMap() {
$.get(url, function(data, status){
  console.log("refreshed issues");
  issues=[];
  garbage_issues= new L.MarkerClusterGroup();
  light_issues=new L.MarkerClusterGroup();
  road_issues=new L.MarkerClusterGroup();
  civil_prot=new L.MarkerClusterGroup();
  green_issues=new L.MarkerClusterGroup();
  enviroment_issues=new L.MarkerClusterGroup();
  

  var redMarker = L.ExtraMarkers.icon({
    icon:'fa-trash',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
  });

  var yellowMarker = L.ExtraMarkers.icon({
    icon:'fa-lightbulb',
    markerColor: 'yellow',
    shape: 'circle',
    prefix: 'fa'
  });

  var greenMarker = L.ExtraMarkers.icon({
    icon:'fa-tree',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
  });

  var blackMarker = L.ExtraMarkers.icon({
    icon:'fa-road',
    markerColor: 'black',
    shape: 'circle',
    prefix: 'fa'
  });

  var blackMarker = L.ExtraMarkers.icon({
    icon:'fa-road',
    markerColor: 'black',
    shape: 'circle',
    prefix: 'fa'
  });

  var purpleMarker = L.ExtraMarkers.icon({
    icon:'fa-exclamation-triangle',
    markerColor: 'purple',
    shape: 'circle',
    prefix: 'fa'
  });

  var lightgreenMarker = L.ExtraMarkers.icon({
    icon:'fa-envira',
    markerColor: 'lightgreen',
    shape: 'circle',
    prefix: 'fa'
  });

  for (i=0;i<data.length;i++){
    
    
    if (data[i].issue=="garbage")
    {
      garbage_issues.addLayer(L.marker(data[i].loc.coordinates.reverse(), {icon: redMarker}).bindPopup(data[i].value_desc));
      
    }
    else if (data[i].issue=="lighting")
    {
      light_issues.addLayer(L.marker(data[i].loc.coordinates.reverse(), {icon: yellowMarker}).bindPopup(data[i].value_desc));
    }
    else if (data[i].issue=="road-constructor")
    {
      road_issues.addLayer(L.marker(data[i].loc.coordinates.reverse(), {icon: blackMarker}).bindPopup(data[i].value_desc));
    }
    else if (data[i].issue=="protection-policy")
    {
      civil_prot.addLayer(L.marker(data[i].loc.coordinates.reverse(), {icon: purpleMarker}).bindPopup(data[i].value_desc));
    }
    else if (data[i].issue=="green")
    {
      green_issues.addLayer(L.marker(data[i].loc.coordinates.reverse(), {icon: greenMarker}).bindPopup(data[i].value_desc));
    }
    else if (data[i].issue=="enviroment")
    {
      enviroment_issues.addLayer(L.marker(data[i].loc.coordinates.reverse()).bindPopup(data[i].value_desc));
    }
    else (console.log("uncategorized"));
  }

  

 /*var issues_lay= L.layerGroup(issues);
  garbage_lay= L.layerGroup(garbage_issues);
  light_lay= L.layerGroup(light_issues);
  road_lay= L.layerGroup(road_issues);
  civilprot_lay= L.layerGroup(civil_prot);
  green_lay= L.layerGroup(green_issues);
  enviroment_lay= L.layerGroup(enviroment_issues); */

  var heatmap_data=[];
  for(i=0;i<data.length;i++)
  {
    var my_data={
      lat: (data[i].loc.coordinates[0]),
      lng: (data[i].loc.coordinates[1]),
      count:1
    }
    
    heatmap_data.push(my_data);

  }
   var testData = {
    max: 8,
    data: heatmap_data
  }; 

  var cfg={
    "radius": 100,
    "maxOpacity": .8,
    "scaleRadius": false,
    "useLocalExtrema": false,
    latField:'lat',
    lngField: 'lng',
    valueField: 'count'
  };

  heatmapLayer= new HeatmapOverlay(cfg);

  heatmapLayer.setData(testData);

});
}

$.get(url, function(data, status){
  param= new L.MarkerClusterGroup();
  mymap = L.map('mapid',{layers:[heatmapLayer]}).setView([38.246,21.734], 13);
  
  var layer1=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNrbnZqZnEwczBuY3YybnJtb250bjdvYWwifQ.RLOM5H5mL7XgTxU-e5S2Iw'
  }).addTo(mymap);

  var layer2=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(mymap);

  var layer3=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2RzdGVyZ2lvcG91bG9zIiwiYSI6ImNrbnZqZnEwczBuY3YybnJtb250bjdvYWwifQ.RLOM5H5mL7XgTxU-e5S2Iw'
  }).addTo(mymap); 
  
  

  var baseMap={"Open Street Map": layer2,
              "Mapbox Satelite Map": layer3,
              "Mapbox Street Map": layer1,
            };

  var overlayMap= {
   // "All issues": issues_lay,
    "Garbage": garbage_issues,
    "Lighting": light_issues,
    "Road Construction": road_issues,
    "Civil Protection": civil_prot,
    "Green": green_issues,
    "Enviroment": enviroment_issues,
    "Feelings": feelings,
    "Heatmap": heatmapLayer,
    "Your Parameters":param
  };

  L.control.layers(baseMap,overlayMap).addTo(mymap);
});

/* issues */
$(document).ready(function(){
  $("#btn1").click(function(){
$.get(url, function(data_custom, status){
  
  param.clearLayers();

  var customMarker = L.ExtraMarkers.icon({
    icon:'fa-user-cog',
    markerColor: 'blue',
    shape: 'penta',
    prefix: 'fa'
  });

  for(i=0;i<data_custom.length;i++)
  {
    param.addLayer(L.marker(data_custom[i].loc.coordinates.reverse(), {icon: customMarker}).bindPopup("Parametric:\n"+data_custom[i].value_desc));
  }

});
});
}); 