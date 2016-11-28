/**
 * Created by Enol Vallina on 11/23/2016.
 */

//API CREDENTIALS MUSIKKI/////////////////////////////////////////////////////////////////////////////////////////////
var Musikki_AppId="c1e2711f8daf4c2ecaf1290bd66130e6";
var Musikki_AppKey="c748d725e8b3391af04d45896c196e8d";

var Songkick_apikey="ME5jCBPTyD3l4BW8";

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

function loadDataSK(){
    d3.json("http://api.songkick.com/api/3.0/search/artists.json?query="+searchBox+"&apikey="+Songkick_apikey,function (error, jsonDataSongkick) {
        console.log("Songkick Request")
        console.log(jsonDataSongkick);
        songkickdata=jsonDataSongkick.resultsPage.results.artist[0];
        artistSKid=songkickdata.id;
        })
}

//LOAD DATA ///////////////////////////////////////////////////////////////////////////////////////////
function loadDataMK() {
    //LOAD JSON FROM API//
    d3.json("https://music-api.musikki.com/v1/artists?q=[artist-name:" + searchBox/*bandToSearch*/ + "]&appkey=" + Musikki_AppKey + "&appid=" + Musikki_AppId,
        function (error, jsonData) {
            //Find the MKID For the Band
            artistMKid2 = jsonData.results[0].mkid;

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
                    console.log(artistMKid);
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

                    //Band Popularity



                    //DRAW VISUALIZATION FOR THE FIRST TIME ///////////////////////////////////////////////////////////
                    showBandInfo();
                    updateBandBadge();
                });
        });
}

//PROCESSING DATA ///////////////////////////////////////////////////////////////////////////////////////////