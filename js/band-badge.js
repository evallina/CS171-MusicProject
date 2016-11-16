/**
 * Created by Enol Vallina on 11/15/2016.
 */

/LAYOUT VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var margin = {top: 40, right: 0, bottom: 10, left: 60};

var width = 1000 - (margin.left + margin.right),
    height = 600 - (margin.top + margin.bottom);

var height2=height/2;

// VARIABLES/////////////////////////////////////////////////////////////////////////////////////
// DATA
var dataArtist2;
var dataBandAbums;
var dataBandYearsActive;
var dataBandGroupMembers;
var dataBandSongs;
var dataBandPopularity;

// VIZ VALUES
var BandYearsActive;
var BandPopularity;
var BandSongsProduced;
var BandAlbumsProduced;
var BandGroupMembers;

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svgBandBadge = d3.select("#band-badge").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var yBandYearsActive    = d3.scale.linear().range([height2,0]);
var yBandPopularity     = d3.scale.linear().range([height2,0]);
var yBandSongsProduced  = d3.scale.linear().range([height2,0]);
var yBandAlbumsProduced = d3.scale.linear().range([height2,0]);
var yBandGroupMembers   = d3.scale.linear().range([height2,0]);

//MAX VALUES
var MaxValueAlbumsBand;

//SETUP AXIS///////////////////////////////////////////////////////////////////////////////////////////



// INITIALIZE DATA/////////////////////////////////////////////////////////////////////////////////////
loadData2();

//BOX SELECTION////////////////////////////////////////////////////////////////////////////////////////



//LOAD DATA ///////////////////////////////////////////////////////////////////////////////////////////
function loadData2() {
//LOAD JSON FROM API//
    //d3.json("https://music-api.musikki.com/v1/artists/100000093?appid="+Musikki_AppId+"&appkey="+Musikki_AppKey+"",
    d3.json("https://music-api.musikki.com/v1/artists?q=[artist-name:"+/*searchBox*/bandToSearch+"]&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId,
        function(error,jsonData) {
            console.log(jsonData);
            dataArtist2 = jsonData;

            dataArtist2.


            //DRAW VISUALIZATION FOR THE FIRST TIME
            updateBandBadge();
        });
}

//BAND BADGE//////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateBandBadge(){

    //SCALES & VALUES
    //MaxValueAlbumsBand=d3.max(dataAlbums, function(d){return /*COUNT OF ALBUMBS OF BAND*/;});

    yBandAlbumsProduced.domain([MaxValueAlbumsBand,0]);



}