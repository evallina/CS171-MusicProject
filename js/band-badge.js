/**
 * Created by Enol Vallina on 11/15/2016.
 */

/LAYOUT VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 1000 - (margin.left + margin.right),
    height = 600 - (margin.top + margin.bottom);

var heighthalf = height / 2;
var widthhalf= width / 2;

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svg2 = d3.select("#band-badge").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Drawing Variables
var barBadgeWidth= 80;
var xCrdYearsActive = Math.sin(MathRadians(20))*(barBadgeWidth/2);
var yCrdYearsActive = Math.cos(MathRadians(20))*(barBadgeWidth/2);
var fillGenre="rgb(20,20,20)";
var fillBackground="rgb(220,220,220)";
var strokeWidth="1.5";

//SVGs............
var barAlbums2=  svg2.append("rect");
var barSongs= svg2.append("rect");
var barMembers= svg2.append("rect");
var barYearsActive= svg2.append("rect");
var barConcertsYear= svg2.append("rect");

// VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var BandYearsActive;
var BandPopularity;
var BandSongsProduced;
var BandAlbumsProduced;
var BandGroupMembers;


//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var yBandYearsActive = d3.scale.linear().range([ 0,heighthalf]);
var yBandPopularity = d3.scale.linear().range([ 0,heighthalf]);
var yBandSongsProduced = d3.scale.linear().range([ 0,heighthalf]);
var yBandAlbumsProduced = d3.scale.linear().range([ 0,heighthalf]);
var yBandGroupMembers = d3.scale.linear().range([ 0,heighthalf]);
var yBandConcertsYear = d3.scale.linear().range([ 10,heighthalf]);


//MAX VALUES
var MaxValueAlbumsBand=400;
var MaxValueSongsBand=2000;
var MaxValueMembersBand=25;
var MaxValueYearsBand=80;
var MaxValueConcertsYear=365;


//SETUP AXIS///////////////////////////////////////////////////////////////////////////////////////////

//INITIALIZE DATA/////////////////////////////////////////////////////////////////////////////////////

//BOX SELECTION////////////////////////////////////////////////////////////////////////////////////////

//BAND BADGE//////////////////////////////////////////////////////////////////////////////////////////////////////////
var updateBandBadge= function() {
    console.log("updateBandBadge //////////////////////////////////// ");
    console.log(dataBandAlbums);

    //SCALES & VALUES/////////////////////////////////////////////////////////////////////////////////////////////////

    // VALUES
    /*
    BandAlbumsProduced = (dataBandAlbums.album.compilation) +
        (dataBandAlbums.album.live) +
        (dataBandAlbums.album.soundtrack) +
        (dataBandAlbums.album.studio)
    ;
    */




    //BARS TEST///////////////////////////////////////////////////////////////////////////////////////////////////////
    var barAlbums = svgBandBadge.selectAll(".badge")
        .data(dataBandAlbums);

    barAlbums.enter()
        .append("rect")
        .attr("class", "badge")
        .attr("x", width / 2)
        .attr("y", height/2)
        /*
        .attr("y", function (d) {
            return height2 - yBandAlbumsProduced(bandAlbumsTotal);
        })*/
        .attr("fill", "rgb(20,20,20)")

    barAlbums.transition().duration(1500)
        .attr("width", 200)
        .attr("height", function (d) {
            return yBandAlbumsProduced(bandAlbumsTotal);
        })
    ;

    barAlbums.exit().remove();
}



var dataplace = [
    {totalalbums: 20, totalmembers: 5, yearsactive: 20}
];


var updateBandBadge2= function() {
    console.log("updateBandBadge Loaded ////////////////////////////////////////////// ");


    // SCALES
    yBandAlbumsProduced.domain([0,MaxValueAlbumsBand]);
    yBandSongsProduced.domain([0,MaxValueSongsBand]);
    yBandGroupMembers.domain([0,MaxValueMembersBand]);
    yBandYearsActive.domain([0,MaxValueYearsBand]);
    yBandConcertsYear.domain([0,MaxValueConcertsYear]);

    //BARS TEST///////////////////////////////////////////////////////////////////////////////////////////////////////

    var barAlbums = svg2.selectAll(".badge")
        .data(dataplace);

    //ADD
    barAlbums.enter()
        .append("circle")
        .attr("class", "badge");

    //UPDATE
    barAlbums
        .attr("cx", heighthalf)
        .attr("cy", widthhalf)
        .attr("r", function(d){ return d.totalalbums })
        .attr("fill", "rgb(20,20,20)");

    //REMOVE
    barAlbums.exit().remove();
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //BARS ALBUMS//////////////////////////////////////////////////
    barAlbums2.remove();
    barAlbums2 = svg2.append("rect");

    barAlbums2
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate(70)")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;


    barAlbums2.transition().duration(1500)
        .attr("height",yBandAlbumsProduced(bandAlbumsTotal))

    ;


    //BARS SONGS//////////////////////////////////////////////////
    barSongs.remove();
    barSongs = svg2.append("rect");

    barSongs
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate(160)")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barSongs.transition().duration(1500)
        .attr("height",yBandSongsProduced(dataBandSongs))
    ;
    //BARS MEMBERS////////////////////////////////////////////////// bandMembersTotal
    barMembers.remove();
    barMembers = svg2.append("rect");

    barMembers
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth/2)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate(250)")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barMembers.transition().duration(1500)
        .attr("height",yBandGroupMembers(bandMembersTotal))
    ;

    //BARS YEARS////////////////////////////////////////////////// bandMembersTotal
    barYearsActive.remove();
    barYearsActive = svg2.append("rect");


    barYearsActive
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth/2)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive))+","+((heighthalf)-(yCrdYearsActive))+") rotate(250)")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barYearsActive.transition().duration(1500)
        .attr("height",yBandYearsActive(bandYearsActiveTotal))
    ;

    //BARS CONCERTS YEAR//////////////////////////////////////////////////
    barConcertsYear.remove();
    barConcertsYear= svg2.append("rect");

    barConcertsYear
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate(340)")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barConcertsYear.transition().duration(1500)
        .attr("height",yBandConcertsYear(bandConcertsLastYear))
    ;


    //CENTER CIRCLE////////////////////////////////////////////////
    var circleCenter= svg2.append("circle");

    circleCenter
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r",20)
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;




    console.log("updateBandBadge End ////////////////////////////////////////////// ");
}

function movePolar(x,y){



}


//CONVERT DEGREES TO RADIANS
function MathRadians(degrees) {
    return degrees * Math.PI / 180;
};