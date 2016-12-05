/**
 * Created by Enol Vallina on 11/23/2016.
 */

//API CREDENTIALS /////////////////////////////////////////////////////////////////////////////////////////////
var Musikki_AppId="c1e2711f8daf4c2ecaf1290bd66130e6";
var Musikki_AppKey="c748d725e8b3391af04d45896c196e8d";

var Songkick_APIkey="ME5jCBPTyD3l4BW8";

var Spotify_APIid="e2822ff9f87548d585c8f4e0784b206b";
var Spotify_APIclient="0670b8e616044845ac7905baac575a4d";

//Info Request
// https://music-api.musikki.com/v1/artists/100377879?&appkey=c748d725e8b3391af04d45896c196e8d&appid=c1e2711f8daf4c2ecaf1290bd66130e6



// DATA VARIABLES
var dataArtist2;
var artistMKid2;
var artistSKid;

var dataBandAlbums;
var dataBandYearsActive;
var dataBandGroupMembers;
var dataBandSongs;
var dataBandPopularity;
var songkickdata;

//DATA VARIABLES VALUES
var bandAlbumsTotal;
var bandMembersTotal;
var bandSongsTotal;
var bandConcertsLastYear;

var bandYearsActiveTotal;
var bandStartYear;
var bandEndYear;

//VISUALIZATION VARIABLES
var test;

//GEO VARIABLES CITY
//City 1 -> 40°43'26.9"N 73°59'05.9"W / 40.724126, -73.984972
var city1_lat= 40.724126;
var city1_lng= -73.984972;

var metroAreaIDNY=7644;
var dataCityVenues;
var dataCityVenues2;

var nResults;
var skNYresults=[];
var skNYresults_dates=[];

var skNYresults_startDate="2016-12-06";
var skNYresults_endDate="2016-12-08";


var skNYresults_time=[];

var skNYresults_VenueName=[];
var skNYresults_location_lat=[];
var skNYresults_location_lng=[];
var skNYresults_venueId=[];

var skNYresults_ArtistName=[];
var skNYresults_artistId=[];

var skNYvenue=[];

var events = [];

/////////////////////////////////////////////////////////////////////////////////

var parseDate = d3.time.format("%Y-%m-%d").parse;

/////////////////////////////////////////////////////////////////////////////////

loadDataSKVenues();




function loadDataSKVenues() {
    d3.json("http://api.songkick.com/api/3.0/metro_areas/"+metroAreaIDNY+"/calendar.json?apikey="+Songkick_APIkey, function(error, jsonDataSK){
        nResults= Math.round((jsonDataSK.resultsPage.totalEntries)/(jsonDataSK.resultsPage.perPage));
        console.log("Songkick Request ////////////////////////// VENUES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(nResults);

        for(var i=1;i<nResults;i++){
            d3.json("http://api.songkick.com/api/3.0/metro_areas/"+metroAreaIDNY+"/calendar.json?apikey="+Songkick_APIkey+"&page="+i, function(error, jsonDataSK2){
                //console.log(jsonDataSK2);
                var nArrayResults=jsonDataSK2.resultsPage.results.event.length;
                for(var j=0;j<nArrayResults;j++){

                    var xx=jsonDataSK2.resultsPage.results.event[j].performance[0];

                    if(xx != null){
                        skNYresults.push(jsonDataSK2.resultsPage.results.event[j]);
                        skNYresults_time.push(jsonDataSK2.resultsPage.results.event[j].start.date);

                        //Artist Data
                        skNYresults_ArtistName.push(jsonDataSK2.resultsPage.results.event[j].performance[0].artist.displayName);
                        skNYresults_artistId.push(jsonDataSK2.resultsPage.results.event[j].performance[0].artist.id);

                        //Venue Data
                        skNYresults_venueId.push(jsonDataSK2.resultsPage.results.event[j].venue.id);
                        skNYresults_location_lat.push(jsonDataSK2.resultsPage.results.event[j].location.lat);
                        skNYresults_location_lng.push(jsonDataSK2.resultsPage.results.event[j].location.lng);
                        skNYresults_VenueName.push(jsonDataSK2.resultsPage.results.event[j].venue.displayName)

                    }
                }
            })
        }
        console.log("Compilation Results///////////////////////////////////////////////////////////////");
        console.log(skNYresults);

        //console.log(skNYresultsXML);
        console.log("Artist Playing Name");
        console.log(skNYresults_ArtistName);

        console.log("VenueLocation");
        console.log(skNYresults_venueId);

        console.log("VenueLocation: LAT/LNG");
        console.log(skNYresults_location_lat);
        console.log(skNYresults_location_lng);

        //CREATE VIZs


        // create a map of boston

        //var venueMap = new VenueMap("venue-map", skNYresults, [40.724126, -73.984972]);
        //createVis2();
        })
}


//LOAD DATA ///////////////////////////////////////////////////////////////////////////////////////////
function loadDataMK() {
    //LOAD JSON FROM SPOTIFY ////////////////////////////////////////////////////////////////////////



    //LOAD JSON FROM SONGKICK ////////////////////////////////////////////////////////////////////////
    d3.json("http://api.songkick.com/api/3.0/search/artists.json?query="+searchBox+"&apikey="+Songkick_APIkey,function (error, jsonDataSongkick) {
        console.log("////////////////////////NEW REQUEST//////////////////////////////////////////////////////////////")
        console.log("Songkick Request")
        console.log(jsonDataSongkick);
        songkickdata=jsonDataSongkick.resultsPage.results.artist[0];
        artistSKid=songkickdata.id;
        queue()
            //Request Artist Gigography
            .defer(d3.json,"http://api.songkick.com/api/3.0/artists/"+artistSKid+"/gigography.json?apikey="+Songkick_APIkey)
            //Filter In the last Year
            .defer(d3.json,"http://api.songkick.com/api/3.0/artists/"+artistSKid+"/gigography.json?apikey="+Songkick_APIkey+"&min_date=2015-10-01&max_date=2016-10-01")
            //Search Events in Metro Area
            //.defer(d3.json,"http://api.songkick.com/api/3.0/search/locations.json?location=geo:"+city1_lat+","+city1_long+"&apikey="+Songkick_APIkey)
            .defer(d3.json,"http://api.songkick.com/api/3.0/metro_areas/"+metroAreaIDNY+"/calendar.json?apikey="+Songkick_APIkey+"&page=1")

            .await(function(error,SKdataArtistGigo, SKdataLastYear, SKdataVenuesCity){
                console.log("SK Artist Gigography");
                console.log(SKdataArtistGigo);
                console.log("SK Concerts Last Year");
                console.log(SKdataLastYear);
                console.log("SK Concerts in Metro");
                console.log(SKdataVenuesCity.resultsPage);

                dataCityVenues=SKdataVenuesCity.resultsPage;
                dataCityVenues2=SKdataVenuesCity;
                bandConcertsLastYear=SKdataLastYear.resultsPage.totalEntries;




            })
    });


    //LOAD JSON FROM MUSIKKI/////////////////////////////////////////////////////////////////////////
    d3.json("https://music-api.musikki.com/v1/artists?q=[artist-name:" + searchBox/*bandToSearch*/ + "]&appkey=" + Musikki_AppKey + "&appid=" + Musikki_AppId,
        function (error, jsonData) {
            //Find the MKID For the Band
            artistMKid2 = jsonData.results[0].mkid;
            test=jsonData;
            //LOAD SPECIFIC DATA FOR VISUALIZATION ABOUT THE BAND
            queue()
            //.defer(d3.json, "https://music-api.musikki.com/v1/artists?q=[artist-name:"+/*searchBox*/bandToSearch+"]&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId)
                //Info Request
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/" + artistMKid2 + "?&appkey=" + Musikki_AppKey + "&appid=" + Musikki_AppId)
                //Releases Request
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/" + artistMKid2 + "/releases/summary?&appkey=" + Musikki_AppKey + "&appid=" + Musikki_AppId)
                //Songs
                .defer(d3.json, "https://music-api.musikki.com/v1/artists/" + artistMKid2 + "/songs?&appkey=" + Musikki_AppKey + "&appid=" + Musikki_AppId)
                //Songkick
                //.defer(d3.json,"http://api.songkick.com/api/3.0/events.json?location=clientip&apikey="+Songkick_apikey+"&jsoncallback=?")

                .await(function (error, dataBandInfo, dataBandReleases, dataBandSongs1) {
                    //Test Data on Console
                    console.log("Band Musikki ID");
                    console.log(artistMKid2);
                    console.log("Band Info");
                    console.log(dataBandInfo);
                    console.log("Band Releases");
                    console.log(dataBandReleases);
                    console.log("Band Songs");
                    console.log(dataBandSongs1);
                    console.log("Songkick");
                    //console.log(dataSongkick);

                    // PROCESS DATA////////////////////////////////////////////////////////////////////////////////////
                    // Band Info
                    bandInfo=dataBandInfo.result;

                    // Albums
                    dataBandAlbums = dataBandReleases;
                    bandAlbumsTotal=parseInt(dataBandAlbums.album.studio);

                    // Songs
                    dataBandSongs=parseInt(dataBandSongs1.summary.result_count);

                    //Band Members
                    bandMembersTotal= bandInfo.current_members.length;

                    //Band Years Active
                    bandStartYear= bandInfo.dates.start.year;
                    var bandEndYear_check=bandInfo.dates.end;

                    if(bandEndYear_check==null){bandEndYear=2016;}
                    else{bandEndYear=bandEndYear_check.year;}

                    bandYearsActiveTotal=bandEndYear-bandStartYear;

                    //Band Popularity



                    //DRAW VISUALIZATION FOR THE FIRST TIME ///////////////////////////////////////////////////////////
                    createVis();

                    createVisMap();
                    //var venueMap = new VenueMap("venue-map", skNYresults, [40.724126, -73.984972]);

                });
        });
}

function createVis() {

    showBandInfo();
    updateBandBadge();


}
function createVisMap(){
    //DATA MANIPULATING
    for(var i=0; i<skNYresults.length;i++){
        // Date parser to convert strings to date objects
        var skDate=parseDate(skNYresults[i].start.date);
        var dataStart=parseDate(skNYresults_startDate);
        var dataEnd=parseDate(skNYresults_endDate);
        //console.log("parsed date", skDate);
        if (skDate> dataStart && skDate < dataEnd){
            skNYresults_dates.push(skNYresults[i]);
        }
    }


    //DRAW MAP
    var venueMap = new VenueMap("venue-map", skNYresults_dates, [40.724126, -73.984972]);

}


//PROCESSING DATA ///////////////////////////////////////////////////////////////////////////////////////////
