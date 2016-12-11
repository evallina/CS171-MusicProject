
//API CREDENTIALS MUSIKKI/////////////////////////////////////////////////////////////////////////////////////////////
var Musikki_AppId="c1e2711f8daf4c2ecaf1290bd66130e6";
var Musikki_AppKey="c748d725e8b3391af04d45896c196e8d";

//VARIABLES*//////////////////////////////////////////////////////////////////////////////////////////////////////////
var dataArtist;

var artistMKid; //id to identify other Band related searches.


//SEARCH BOX//////////////////////////////////////////////////////////////////////////////////////////////////////////
var defaultText = "Search...";
var searchBox;
var bandToSearch="Beatles";
//var bandToSearch=searchBox;

// listen to date filter form
$(document).ready(function() {
    $("#filter-submit").click(dateFilter);
});

// filter date range based on input
function dateFilter() {
    // get values from form
    searchBox=document.getElementById("band-search").value;

    // redraw chart
    updateVisualization();
    loadData();
    // make sure the click doesn't reload the page!!
    return false;
};

//VISUALIZATION01/////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////
loadData();

//LOAD DATA///////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadData() {

    //LOAD JSON FROM API//
    //d3.json("https://music-api.musikki.com/v1/artists/100000093?appid="+Musikki_AppId+"&appkey="+Musikki_AppKey+"",
    d3.json("https://music-api.musikki.com/v1/artists?q=[artist-name:"+searchBox/*bandToSearch*/+"]&appkey="+Musikki_AppKey+"&appid="+Musikki_AppId,
        function(error,jsonData){
            console.log(jsonData);
            dataArtist=jsonData;
            artistMKid= dataArtist.results[0].mkid;

            //DRAW VISUALIZATION FOR THE FIRST TIME
            updateVisualization()


        });


}


//UPDATE VISUALIZATION FUNCTION///////////////////////////////////////////////////////////////////////////////////////
function updateVisualization() {

    //Update Search Text
    //searchResult = d3.select("#band-search").property("text");

    showBandInfo(dataArtist);
}



//UPDATE VISUALIZATION FUNCTION///////////////////////////////////////////////////////////////////////////////////////
function showBandInfo(d){
    //VARIABLES
    var foundationyear2;
    var bandMusicGenre2;
    var bandCurrentLabel;

    //CHECK IF NULL LABEL
    if(d.results[0].current_labels == null){bandCurrentLabel="n/a"}
    else{ bandCurrentLabel=d.results[0].current_labels[0].name};

    //CHECK IF NULL FOUNDATION YEAR
    if(d.results[0].dates == null){foundationyear2="n/a"}
    else{ foundationyear2=d.results[0].dates.start.year};

    //CHECK IF NULL MUSIC GENRE
    if(d.results[0].genres == null){bandMusicGenre2="n/a"}
    else{
        if(d.results[0].genres.length > 3){bandMusicGenre2= d.results[0].genres[0].name +"/"+d.results[0].genres[1].name+"/"+d.results[0].genres[2].name;}

        //else{bandMusicGenre2=d.results[0].genres[0].name;}
    }

    document.getElementById("info-band").innerHTML=
        "<h2><b>" + d.results[0].name +/*"</b>/ Test Search: "+ searchBox +*/"</h2>" +
            "<p><b>"+"- Foundation: </b>"+ foundationyear2 +"</p>"+
            "<p><b>"+"- Music Genre: </b>"+bandMusicGenre2 +"</p>"+
            "<p><b>"+"- Current Label: </b>"+bandCurrentLabel +"</p>"+
            "<img class=img-circle src="+d.results[0].image+" alt="+d.results[0].name+" >"
    ;
}

function checkNull(d,endVar){
    if(d==null){return "n/a"}
    else{return d.endVar}

}