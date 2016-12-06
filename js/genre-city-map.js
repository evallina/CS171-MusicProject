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
var alternativeIcon;
var rockIcon;
VenueMap.prototype.initVis = function() {
    var vis = this;

    // set up leaflet
    vis.map = L.map(vis.parentElement)
        .setView(vis.mapCenter, 13);
    /*
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })*/
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
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
        iconUrl: 'css/imageicons/genres/marker-icon_alternative.png',
        shadowUrl: 'css/imageicons/genres/marker-shadow.png',

        iconSize:     [25, 41], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    rockIcon = L.icon({
        iconUrl: 'css/imageicons/genres/marker-icon_rock.png',
        shadowUrl: 'css/imageicons/genres/marker-shadow.png',

        iconSize:     [25, 41], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });




    //Updates
    vis.wrangleData();
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
        var skDate=parseDate(vis.data[i].start.date);

        var dataStart=parseDate(minDate);
        var dataEnd=parseDate(maxDate);
        //console.log("parsed date", skDate);
        if (skDate> dataStart && skDate < dataEnd){
            newData.push(vis.data[i]);
        }
    }
    vis.displayData=newData;
    //vis.displayData=newData;
    //console.log("wrangleData", vis.displayData);
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

    //for( var i=0; )


    // draw 1 pin per station
    vis.displayData.forEach(function(d) {
        //console.log("foreach", d.displayName);
        var lat = +d.location.lat;
        var lng = +d.location.lng;

        var popupContent = "<strong>" + d.displayName + "</strong><br>" + d.venue.displayName;
        //console.log("foreach", popupContent);
        var marker;
        if(d.popularity>0.001){
            marker = L.marker([d.location.lat, d.location.lng],
                {icon: rockIcon})
                .bindPopup(popupContent);
        }
        else{
            marker = L.marker([d.location.lat, d.location.lng],
                {icon: alternativeIcon})
                .bindPopup(popupContent);
        }


        vis.pinGroup.addLayer(marker);
    });

/*
    // draw MBTA lines
    $.getJSON("data/MBTA-Lines.json", function(mbtaData) {
        console.log(mbtaData);

        L.geoJson(mbtaData, {
            weight: 5,
            // opacity: 0.6,
            style: function(feature) {
                // T line: red, green, etc.
                // note that these are capitalized
                var line = feature.properties.LINE;
                // color based off line
                return {
                    color: line
                };
            }
        })
            .addTo(vis.map);
    });
*/


    document.getElementById("update-map2").onclick=function(){removeAllMarkers(vis)};
}




function removeAllMarkers(hey){
    //map.removeLayer(markers);
    hey.map.removeLayer((hey.pinGroup))
}
