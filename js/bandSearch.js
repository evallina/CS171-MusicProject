

//VARIABLES*//////////////////////////////////////////////////////////////////////////////////////////////////////////
var dataArtist;

var artistMKid; //id to identify other Band related searches.
var bandInfo;

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
    loadDataSK();
    loadDataMK();
    // make sure the click doesn't reload the page!!
    return false;
};

//VISUALIZATION01/////////////////////////////////////////////////////////////////////////////////////////////////////



//INITIATE DATA///////////////////////////////////////////////////////////////////////////////////////
//loadData2();




//UPDATE VISUALIZATION FUNCTION///////////////////////////////////////////////////////////////////////////////////////
function updateVisualization() {

    //Update Search Text
    //searchResult = d3.select("#band-search").property("text");

    //showBandInfo(dataArtist);
    //showBandInfo()
}



//UPDATE VISUALIZATION FUNCTION///////////////////////////////////////////////////////////////////////////////////////
function showBandInfo(){
    //VARIABLES
    var d=bandInfo;
    var foundationyear2;
    var bandMusicGenre2;
    var bandCurrentLabel;

    //CHECK IF NULL LABEL
    if(d.current_labels == null){bandCurrentLabel="n/a"}
    else{ bandCurrentLabel=d.current_labels[0].name};

    //CHECK IF NULL FOUNDATION YEAR
    if(d.dates == null){foundationyear2="n/a"}
    else{ foundationyear2=d.dates.start.year};

    //CHECK IF NULL MUSIC GENRE
    if(d.genres == null){bandMusicGenre2="n/a"}
    else{
        if(d.genres.length > 3){bandMusicGenre2= d.genres[0].name +"/"+d.genres[1].name+"/"+d.genres[2].name;}

        //else{bandMusicGenre2=d.results[0].genres[0].name;}
    }

    document.getElementById("info-band").innerHTML=
        "<h2><b>" + d.name +"</h2>" +
            "<p><b>"+"- Foundation: </b>"+ foundationyear2 +"</p>"+
            "<p><b>"+"- Music Genre: </b>"+bandMusicGenre2 +"</p>"+
            "<p><b>"+"- Current Label: </b>"+bandCurrentLabel +"</p>"+
            "<img src="+d.image+" alt="+d.name+" style=width:200px;height:200px;>"
    ;

}

function checkNull(d,endVar){
    if(d==null){return "n/a"}
    else{return d.endVar}

}