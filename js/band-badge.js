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

var textSize=25;



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
    barAlbums2_txt.remove();
    barAlbums2_txt=svg2.append("text");
    barAlbums2_txt
        .attr("class", "textBadge1")
        .attr("x",0)
        .attr("y",yBandAlbumsProduced(bandAlbumsTotal)+30)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+0)+")")
        .text(bandAlbumsTotal)
    ;
    barAlbums2_txt2.remove();
    barAlbums2_txt2=svg2.append("text");
    barAlbums2_txt2
        .attr("class", "textBadge2")
        .attr("x",0)
        .attr("y",yBandAlbumsProduced(bandAlbumsTotal)+(20+textSize))
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+0)+")")
        .text("Total Albums")
    ;

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
    //textBadgeGenerator(barSongs_txt,barSongs_txt2,90,yBandSongsProduced(dataBandSongs),dataBandSongs,"Total Songs");
    barSongs_txt.remove();
    barSongs_txt=svg2.append("text");
    barSongs_txt
        .attr("class", "textBadge1")
        .attr("x",0)
        .attr("y",yBandSongsProduced(dataBandSongs)+30)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+90)+")")
        .text(dataBandSongs)
    ;
    barSongs_txt2.remove();
    barSongs_txt2=svg2.append("text");
    barSongs_txt2
        .attr("class", "textBadge2")
        .attr("x",0)
        .attr("y",yBandSongsProduced(dataBandSongs)+(20+textSize))
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+90)+")")
        .text("Total Songs")
    ;


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
    //textBadgeGeneratorSplit(barMembers_txt,barMembers_txt2,180,yBandGroupMembers(bandMembersTotal),bandMembersTotal,"Members",0);
    barMembers_txt.remove();
    barMembers_txt=svg2.append("text");

    barMembers_txt
        .attr("class", "textBadge12")
        .attr("x",0)
        .attr("y",yBandGroupMembers(bandMembersTotal)+15)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*0))+","+((heighthalf)-(yCrdYearsActive*0))+") rotate("+(rotBadge+180)+")")
        .text(bandMembersTotal)
    ;

    barMembers_txt2.remove();
    barMembers_txt2=svg2.append("text");

    barMembers_txt2
        .attr("class", "textBadge22")
        .attr("x",0)
        .attr("y",yBandGroupMembers(bandMembersTotal)+(20+(textSize/5)))
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*0))+","+((heighthalf)-(yCrdYearsActive*0))+") rotate("+(rotBadge+180)+")")
        .text("Members")
    ;
    //svgVariable4.exit().remove();

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
    //textBadgeGeneratorSplit(barYearsActive_txt,barYearsActive_txt2,180,yBandYearsActive(bandYearsActiveTotal),bandYearsActiveTotal,"Years Active",1);
    barYearsActive_txt.remove();
    barYearsActive_txt=svg2.append("text");

    barYearsActive_txt
        .attr("class", "textBadge12")
        .attr("x",0)
        .attr("y",yBandYearsActive(bandYearsActiveTotal)+15)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*1))+","+((heighthalf)-(yCrdYearsActive*1))+") rotate("+(rotBadge+180)+")")
        .text(bandYearsActiveTotal)
    ;

    barYearsActive_txt2.remove();
    barYearsActive_txt2=svg2.append("text");

    barYearsActive_txt2
        .attr("class", "textBadge22")
        .attr("x",0)
        .attr("y",yBandYearsActive(bandYearsActiveTotal)+(20+(textSize/5)))
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*1))+","+((heighthalf)-(yCrdYearsActive*1))+") rotate("+(rotBadge+180)+")")
        .text("Years Active")
    ;


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
    //textBadgeGenerator(barConcertsYear_txt,barConcertsYear_txt2,270,yBandConcertsYear(bandConcertsLastYear),bandConcertsLastYear,"Concerts Last Year");
    barConcertsYear_txt.remove();
    barConcertsYear_txt=svg2.append("text");
    barConcertsYear_txt
        .attr("class", "textBadge1")
        .attr("x",0)
        .attr("y",yBandConcertsYear(bandConcertsLastYear)+30)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+270)+")")
        .text(bandConcertsLastYear)
    ;
    barConcertsYear_txt2.remove();
    barConcertsYear_txt2=svg2.append("text");
    barConcertsYear_txt2
        .attr("class", "textBadge2")
        .attr("x",0)
        .attr("y",yBandConcertsYear(bandConcertsLastYear)+(20+textSize))
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+270)+")")
        .text("Concerts Last Year")
    ;

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
    //$("#data-badge").remove();
    var svgVariable3;
    var svgVariable4;
    //svgVariable3.remove();

    svgVariable3=svg2.append("text");
    svgVariable3
        .attr("class", "textBadge1")
        .attr("x",0)
        .attr("y",scaleData+30)
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+rot)+")")
        .text(dataValue)
    ;
    //svgVariable3.exit().remove();
    //svgVariable4.exit().remove();
    svgVariable4=svg2.append("text");
    svgVariable4
        .attr("class", "textBadge2")
        .attr("x",0)
        .attr("y",scaleData+(20+textSize))
        .attr("transform", "translate("+(widthhalf)+","+heighthalf+") rotate("+(rotBadge+rot)+")")
        .text(textBadge)

    ;
   // svgVariable4.exit().remove();
    //svgVariable2.exit().remove();
}

function textBadgeGeneratorSplit(svgVariable,svgVariable2,rot,scaleData,dataValue,textBadge,split){

    //Data Text

    var svgVariable3;
    var svgVariable4;

    //svgVariable3.remove();
    svgVariable3=svg2.append("text");

    svgVariable3
        .attr("class", "textBadge12")
        .attr("x",0)
        .attr("y",scaleData+15)
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*split))+","+((heighthalf)-(yCrdYearsActive*split))+") rotate("+(rotBadge+rot)+")")
        .text(dataValue)
    ;

    //svgVariable4.remove();
    svgVariable4=svg2.append("text");

    svgVariable4
        .attr("class", "textBadge22")
        .attr("x",0)
        .attr("y",scaleData+(20+(textSize/5)))
        .attr("transform", "translate("+((widthhalf)-(xCrdYearsActive*split))+","+((heighthalf)-(yCrdYearsActive*split))+") rotate("+(rotBadge+rot)+")")
        .text(textBadge)
    ;
    //svgVariable4.exit().remove();
}



//CONVERT DEGREES TO RADIANS
function MathRadians(degrees) {
    return degrees * Math.PI / 180;
};