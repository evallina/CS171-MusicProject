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
var artistMKid2;

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
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
;

//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var yBandYearsActive    = d3.scale.linear().range([height2,0]);
var yBandPopularity     = d3.scale.linear().range([height2,0]);
var yBandSongsProduced  = d3.scale.linear().range([height2,0]);
var yBandAlbumsProduced = d3.scale.linear().range([100,0]);
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
    d3.json("https://music-api.musikki.com/v1/artists?q=[artist-name:"+/*searchBox*/bandToSearch+"]&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId,
        function(error,jsonData){
            //Find the MKID For the Band
            artistMKid2= jsonData.results[0].mkid;

            //LOAD SPECIFIC DATA FOR VISUALIZATION ABOUT THE BAND
            queue()
                //.defer(d3.json, "https://music-api.musikki.com/v1/artists?q=[artist-name:"+/*searchBox*/bandToSearch+"]&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId)
                //Info Request
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/"+artistMKid2+"?&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId)
                //Releases Request
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/"+artistMKid2+"/releases/summary?&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId)
                //Songs
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/"+artistMKid2+"/songs?&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId)

                .await(function (error, dataBandInfo, dataBandReleases, dataBandSongs) {
                    //Test Data on Console
                    console.log("Band Musikki ID"); console.log(artistMKid);
                    console.log("Band Info"); console.log(dataBandInfo);
                    console.log("Band Releases"); console.log(dataBandReleases);
                    console.log("Band Songs"); console.log(dataBandSongs);

                    // PROCESS DATA
                    dataBandAbums=dataBandReleases;

                    //DRAW VISUALIZATION FOR THE FIRST TIME
                    updateBandBadge();
                });
        });}



//BAND BADGE//////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateBandBadge(){
    console.log("updateBandBadge //////////////////////////////////// "+dataBandAbums);

    //SCALES & VALUES/////////////////////////////////////////////////////////////////////////////////////////////////

    // VALUES
    MaxValueAlbumsBand= (dataBandAbums.album.compilation)+
        (dataBandAbums.album.live)+
        (dataBandAbums.album.soundtrack)+
        (dataBandAbums.album.studio);

    // SCALES
    yBandAlbumsProduced.domain([MaxValueAlbumsBand,1]);


    //BARS TEST///////////////////////////////////////////////////////////////////////////////////////////////////////
    var barAlbums = svgBandBadge.selectAll(".barAlbums")
        .data(dataBandAbums)

    barAlbums.enter()
        .append("rect")
        .attr("class", "barAlbums")
        .attr("x",  100)
        .attr("y",100/*function(d){return height/2;}*/)

    barAlbums.transition().duration(1500)

        .attr("width", 300)
        .attr("height", 600/*function(d){ return yBandAlbumsProduced(MaxValueAlbumsBand);}*/)
    ;

    barAlbums.exit().remove();










}