/**
 * Created by Enol Vallina on 11/15/2016.
 */

/LAYOUT VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var margin = {top: 40, right: 0, bottom: 10, left: 60};

var width = 1000 - (margin.left + margin.right),
    height = 600 - (margin.top + margin.bottom);

var height2 = height / 2;

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svgBandBadge = d3.select("#band-badge").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;

// VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var BandYearsActive;
var BandPopularity;
var BandSongsProduced;
var BandAlbumsProduced;
var BandGroupMembers;


//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var yBandYearsActive = d3.scale.linear().range([height2, 0]);
var yBandPopularity = d3.scale.linear().range([height2, 0]);
var yBandSongsProduced = d3.scale.linear().range([height2, 0]);
var yBandAlbumsProduced = d3.scale.linear().range([height2, 0]);
var yBandGroupMembers = d3.scale.linear().range([height2, 0]);


//MAX VALUES
var MaxValueAlbumsBand;


//SETUP AXIS///////////////////////////////////////////////////////////////////////////////////////////


// INITIALIZE DATA/////////////////////////////////////////////////////////////////////////////////////
//loadData2();

//BOX SELECTION////////////////////////////////////////////////////////////////////////////////////////




//BAND BADGE//////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateBandBadge() {
    console.log("updateBandBadge //////////////////////////////////// ");
    console.log(dataBandAbums);

    //SCALES & VALUES/////////////////////////////////////////////////////////////////////////////////////////////////

    // VALUES
    BandAlbumsProduced = (dataBandAbums.album.compilation) +
        (dataBandAbums.album.live) +
        (dataBandAbums.album.soundtrack) +
        (dataBandAbums.album.studio)
    ;

    // SCALES
    yBandAlbumsProduced.domain([MaxValueAlbumsBand, 1]);


    //BARS TEST///////////////////////////////////////////////////////////////////////////////////////////////////////
    var barAlbums = svgBandBadge.selectAll(".barAlbums")
        .data(dataBandAbums)

    barAlbums.enter()
        .append("rect")
        .attr("class", "barAlbums")
        .attr("x", width / 2)
        .attr("y", function (d) {
            return height2 - yBandAlbumsProduced(d.album.live);
        })
        .attr("fill", "rgb(20,20,20)")

    barAlbums.transition().duration(1500)
        .attr("width", 200)
        .attr("height", function (d) {
            return yBandAlbumsProduced(d.album.live);
        })
    ;

    barAlbums.exit().remove();

}