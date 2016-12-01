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
var rotBadge=60;
var rotBadgeRemain=90-rotBadge;
var barBadgeWidth= 100;
var xCrdYearsActive = Math.sin(MathRadians(rotBadgeRemain))*(barBadgeWidth/2);
var yCrdYearsActive = Math.cos(MathRadians(rotBadgeRemain))*(barBadgeWidth/2);

//Styling
var fillGenre="rgb(20,20,20)";
var fillBackground="rgb(220,220,220)";
var strokeWidth="1.5";

var textFont="Roboto";
var textSize=25;
var textColor="rgb(20,20,20)";
var textWeigth=900;

var textSize2=10;
var textWeigth2=900;





//SVGs............
var barAlbums2=  svg2.append("rect");
var barSongs= svg2.append("rect");
var barMembers= svg2.append("rect");
var barYearsActive= svg2.append("rect");
var barConcertsYear= svg2.append("rect");

var barAlbums2_txt=  svg2.append("text");
var barAlbums2_txt2=  svg2.append("text");

var barSongs_txt= svg2.append("text");
var barSongs_txt2= svg2.append("text");

var barMembers_txt= svg2.append("text");
var barMembers_txt2= svg2.append("text");

var barYearsActive_txt= svg2.append("text");
var barYearsActive_txt2= svg2.append("text");

var txtTest;
var barConcertsYear_txt= svg2.append("text");
var barConcertsYear_txt2= svg2.append("text");

// VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var BandYearsActive;
var BandPopularity;
var BandSongsProduced;
var BandAlbumsProduced;
var BandGroupMembers;


//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var yBandYearsActive = d3.scale.linear().range([ 0,heighthalf/1.5]);
var yBandPopularity = d3.scale.linear().range([ 0,heighthalf/1.5]);
var yBandSongsProduced = d3.scale.linear().range([ 0,heighthalf/1.5]);
var yBandAlbumsProduced = d3.scale.linear().range([ 0,heighthalf/1.5]);
var yBandGroupMembers = d3.scale.linear().range([ 0,heighthalf/1.5]);
var yBandConcertsYear = d3.scale.linear().range([ 10,heighthalf/1.5]);


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
var dataplace = [
    {totalalbums: 20, totalmembers: 5, yearsactive: 20}
];


var updateBandBadge= function() {
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
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+rotBadge+")")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barAlbums2.transition().duration(1500)
        .attr("height",yBandAlbumsProduced(bandAlbumsTotal))
    ;
    //text..............................................................................

    txtTest=textBadgeGenerator(barAlbums2_txt,barAlbums2_txt2,0,yBandAlbumsProduced(bandAlbumsTotal),bandAlbumsTotal,"Total Albums");


    //BARS SONGS//////////////////////////////////////////////////
    barSongs.remove();
    barSongs = svg2.append("rect");

    barSongs
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+90)+")")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barSongs.transition().duration(1500)
        .attr("height",yBandSongsProduced(dataBandSongs))
    ;
    //text..............................................................................
    textBadgeGenerator(barSongs_txt,barSongs_txt2,90,yBandSongsProduced(dataBandSongs),dataBandSongs,"Total Songs");



    //BARS MEMBERS////////////////////////////////////////////////// bandMembersTotal
    barMembers.remove();
    barMembers = svg2.append("rect");

    barMembers
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth/2)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+180)+")")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barMembers.transition().duration(1500)
        .attr("height",yBandGroupMembers(bandMembersTotal))
    ;
    //text..............................................................................
    textBadgeGeneratorSplit(barMembers_txt,barMembers_txt2,180,yBandGroupMembers(bandMembersTotal),bandMembersTotal,"Members",0);


    //BARS YEARS////////////////////////////////////////////////// bandMembersTotal
    barYearsActive.remove();
    barYearsActive = svg2.append("rect");


    barYearsActive
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth/2)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive))+","+((heighthalf)-(yCrdYearsActive))+") rotate("+(rotBadge+180)+")")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barYearsActive.transition().duration(1500)
        .attr("height",yBandYearsActive(bandYearsActiveTotal))
    ;
    //text..............................................................................
    textBadgeGeneratorSplit(barYearsActive_txt,barYearsActive_txt2,180,yBandYearsActive(bandYearsActiveTotal),bandYearsActiveTotal,"Years Active",1);

    //BARS CONCERTS YEAR//////////////////////////////////////////////////
    barConcertsYear.remove();
    barConcertsYear= svg2.append("rect");

    barConcertsYear
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barBadgeWidth)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+270)+")")
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;

    barConcertsYear.transition().duration(1500)
        .attr("height",yBandConcertsYear(bandConcertsLastYear))
    ;
    //text..............................................................................
    textBadgeGenerator(barConcertsYear_txt,barConcertsYear_txt2,270,yBandConcertsYear(bandConcertsLastYear),bandConcertsLastYear,"Concerts Last Year");


    //CENTER CIRCLE////////////////////////////////////////////////
    /*
    var circleCenter= svg2.append("circle");

    circleCenter
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r",20)
        .attr("fill",fillGenre)
        .attr("stroke",fillBackground)
        .attr("stroke-width",strokeWidth)
    ;
    */

    console.log("updateBandBadge End ////////////////////////////////////////////// ");
}


//TEXT FUNCTION
function textBadgeGenerator(svgVariable,svgVariable2,rot,scaleData,dataValue,textBadge){

    //svgVariable.remove();
    svgVariable=svg2.append("text");
    svgVariable
        .attr("class", "textBadge1")
        .attr("x",0)
        .attr("y",scaleData+30)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+rot)+")")
        .text(dataValue)
    ;

    //svgVariable2.remove();
    svgVariable2=svg2.append("text");
    svgVariable2
        .attr("class", "textBadge2")
        .attr("x",0)
        .attr("y",scaleData+(20+textSize))
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+rot)+")")
        .text(textBadge)
    ;
}

function textBadgeGeneratorSplit(svgVariable,svgVariable2,rot,scaleData,dataValue,textBadge,split){

    svgVariable.remove();
    svgVariable=svg2.append("text");

    svgVariable
        .attr("class", "textBadge12")
        .attr("x",0)
        .attr("y",scaleData+15)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*split))+","+((heighthalf)-(yCrdYearsActive*split))+") rotate("+(rotBadge+rot)+")")
        .text(dataValue)
    ;

    //barAlbums2_txt.transition().duration(5500);
    svgVariable2.remove();
    svgVariable2=svg2.append("text");

    svgVariable2
        .attr("class", "textBadge22")
        .attr("x",0)
        .attr("y",scaleData+(20+(textSize/5)))
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*split))+","+((heighthalf)-(yCrdYearsActive*split))+") rotate("+(rotBadge+rot)+")")
        .text(textBadge)
    ;
}



//CONVERT DEGREES TO RADIANS
function MathRadians(degrees) {
    return degrees * Math.PI / 180;
};