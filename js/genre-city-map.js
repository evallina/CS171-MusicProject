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
    L.Icon.Default.imagePath = 'css/imageicons/';

    vis.wrangleData();

}


/*
 *  Data wrangling
 */

VenueMap.prototype.wrangleData = function() {
    var vis = this;

    // Currently no data wrangling/filtering needed
    vis.displayData = vis.data;



    //console.log("wrangleData", vis.displayData);
    // Update the visualization
    vis.updateVis();
}


/*
 *  The drawing function
 *
 skNYresults_time.push(jsonDataSK2.resultsPage.results.event[j].start.date);

 //Artist Data
 skNYresults_ArtistName.push(jsonDataSK2.resultsPage.results.event[j].performance[0].artist.displayName);
 skNYresults_artistId.push(jsonDataSK2.resultsPage.results.event[j].performance[0].artist.id);

 //Venue Data
 skNYresults_venueId.push(jsonDataSK2.resultsPage.results.event[j].venue.id);
 skNYresults_location_lat.push(jsonDataSK2.resultsPage.results.event[j].location.lat);
 skNYresults_location_lng.push(jsonDataSK2.resultsPage.results.event[j].location.lng);
 skNYresults_VenueName.push(jsonDataSK2.resultsPage.results.event[j].venue.displayName)
 */

VenueMap.prototype.updateVis = function() {
    var vis = this;

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
        var marker = L.marker([d.location.lat, d.location.lng])
        //var marker = L.marker([40.732226,-74.001304])
            .bindPopup(popupContent);
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
}