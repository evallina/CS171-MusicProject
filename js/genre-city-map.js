/**
 * Created by Enol Vallina on 12/3/2016.
 */
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

VenueMap = function(_parentElement, _data, _mapCenter) {

    this.parentElement = _parentElement;
    this.data = _data;
    this.mapCenter = _mapCenter;

    this.initVis();
}


/*
 *  Initialize station map
 */
//ICON VARIABLES
var alternativeIcon;
var alternativeIcon2;
var rockIcon;

var venueCapacityScale;
var venuePopularityScale;

venueCapacityScale= d3.scale.linear().range([ 50,7000]);
venueCapacityScale.domain([10,25000]);
venuePopularityScale= d3.scale.linear().range([ 0,255]);
venuePopularityScale.domain([0,0.001]);


/*console.log("LENGTH for scales!!!!!!!!!",myEventJSON.length)
//SCALES
if(myEventJSON.length >= 1500){
    venueCapacityScale= d3.scale.linear().range([ 50,10000]);
    venueCapacityScale.domain([10,25000]);
    venuePopularityScale= d3.scale.linear().range([ 0,255]);
    venuePopularityScale.domain([0,0.001]);

}
else if(myEventJSON.length<1500 &&myEventJSON.length>900){
    venueCapacityScale= d3.scale.linear().range([ 50,7000]);
    venueCapacityScale.domain([10,25000]);
    venuePopularityScale= d3.scale.linear().range([ 0,255]);
    venuePopularityScale.domain([0,0.001]);

}
else if(myEventJSON.length<1500 &&myEventJSON.length>900){
    venueCapacityScale= d3.scale.linear().range([ 50,4000]);
    venueCapacityScale.domain([10,25000]);
    venuePopularityScale= d3.scale.linear().range([ 0,255]);
    venuePopularityScale.domain([0,0.001]);

}
else{
    venueCapacityScale= d3.scale.linear().range([ 50,2000]);
    venueCapacityScale.domain([10,25000]);
    venuePopularityScale= d3.scale.linear().range([ 0,255]);
    venuePopularityScale.domain([0,0.001]);

}*/
/*
var venueCapacityScale= d3.scale.linear().range([ 50,10000]);
    venueCapacityScale.domain([10,25000]);
var venuePopularityScale= d3.scale.linear().range([ 0,255]);
venuePopularityScale.domain([0,0.001]);
*/



VenueMap.prototype.initVis = function() {
    var vis = this;

    // set up leaflet
    vis.map = L.map(vis.parentElement)
        .setView(vis.mapCenter, 13);

    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    })

        .addTo(vis.map);

    // add link to images
    L.Icon.Default.imagePath = 'css/imageicons/genres';

    alternativeIcon = L.icon({
        iconUrl: 'css/imageicons/genres/marker-icon.png',
        //iconUrl: 'css/imageicons/genres/marker-icon_alternative.png',
        shadowUrl: 'css/imageicons/genres/marker-shadow.png',

        iconSize:     [12, 20], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [7, 20], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    alternativeIcon2 = L.icon({
        iconUrl: 'css/imageicons/genres/marker-icon2.png',
        //iconUrl: 'css/imageicons/genres/marker-icon_jazz.png',
        shadowUrl: 'css/imageicons/genres/marker-shadow.png',

        iconSize:     [12, 20], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [7, 20], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });


    rockIcon = L.icon({
        //
        iconUrl: 'css/imageicons/genres/marker-icon.png',
        //iconUrl: 'css/imageicons/genres/marker-icon_rock.png',
        shadowUrl: 'css/imageicons/genres/marker-shadow.png',

        iconSize:     [25, 41], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });




    //Updates
    vis.wrangleData();
    //document.getElementById("update-map").onclick=function(){ultimateRemove()};
    document.getElementById("update-map").onclick=function(){vis.wrangleData()};

}


/*
 *  Data wrangling
 */
var newData=[];
VenueMap.prototype.wrangleData = function() {
    var vis = this;

    // Currently no data wrangling/filtering needed
    //vis.displayData = vis.data;

    newData=[];
    for(var i=0; i<vis.data.length;i++){
        // Date parser to convert strings to date objects
        var skDate=parseDate(vis.data[i].date);

        var dataStart=parseDate(minDate);
        var dataEnd=parseDate(maxDate);
        //console.log("parsed date", skDate);
        if (skDate> dataStart && skDate < dataEnd){
            newData.push(vis.data[i]);
        }
    }

    vis.displayData=newData;

    // Update the visualization
    vis.updateVis();
    //document.getElementById("update-map").onclick=function(){vis.updateVis()};


}

var markers = new L.FeatureGroup();

VenueMap.prototype.updateVis = function() {
    var vis = this;

    //console.log("updateVis",newData);
    console.log("updateVis",vis.displayData);

    // write # of stations
    /*$('#station-count')
        .html(vis.displayData.length);*/



    // create layer group for pins

    vis.pinGroup = L.layerGroup()
        .addTo(vis.map);

    vis.pinGroup2 = L.layerGroup()
        .addTo(vis.map);


    // draw 1 pin per station
    vis.displayData.forEach(function(d) {
        //console.log("foreach", d.displayName);
        var lat = +d.venueLat;
        var lng = +d.venueLng;
        var cap2= d.venueCapacity;
        var pop2=d.popularity;
        var cap = +d.venueCapacity;
        var pop = +d.popularity;

        var popupContent = "<strong>" + d.bandName + "</strong></br>" + d.venueName +"</br><b>Capacity: </b></strong>"+cap;
        //console.log("foreach", popupContent);
        var marker;
        var circle;


        if(pop2 != null && cap2 !=null){
            marker = L.marker([lat, lng],
                {icon: alternativeIcon2})
                .bindPopup(popupContent);
            circle = L.circle([lat, lng], {
                color: 'black',
                stroke: 0,
                fillColor: 'rgb('+(Math.round(venuePopularityScale(pop)))+',57,72)', //red
                fillOpacity: 0.1,
                radius: venueCapacityScale(cap)
            })
                .bindPopup(popupContent);
        }

        else{
            marker = L.marker([lat, lng],
                {icon: alternativeIcon})
                .bindPopup(popupContent);

            circle = L.circle([lat, lng], {
                color: 'black',
                stroke: 0.0,
                fillColor: 'rgb(180,180,180)',
                fillOpacity: 0.5,
                radius: 0
            })
                //.bindPopup(popupContent);
        }


        vis.pinGroup.addLayer(marker);

        vis.pinGroup2.addLayer(circle);
    });


    //document.getElementById("update-map").onclick=function(){ultimateRemove()};
    document.getElementById("update-map2").onclick=function(){removeAllMarkers(vis)};
}

function ultimateRemove(){
    removeAllMarkers(vis);

    vis.wrangleData();

}


function removeAllMarkers(hey){
    //map.removeLayer(markers);
    hey.map.removeLayer((hey.pinGroup2));
    hey.map.removeLayer((hey.pinGroup));
}
