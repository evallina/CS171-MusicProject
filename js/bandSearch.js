

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
    //loadDataSK();
    loadDataMK();
    //updateBandBadge2();
    // make sure the click doesn't reload the page!!
    return false;
};

//UPDATE VISUALIZATION FUNCTION///////////////////////////////////////////////////////////////////////////////////////
function showBandInfo(){
    //VARIABLES
    var d=bandInfo;
    var foundationyear2;
    var bandMusicGenre2;
    var bandCurrentLabel;
    var bandBioSummary;
    var bandBioSource;

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
    if(d.bio == null || d.bio.summary==null){bandMusicGenre2="n/a"}
    else{ bandBioSummary=d.bio.summary; }

    if(d.bio == null || d.bio.source==null){bandMusicGenre2="n/a"}
    else{ bandBioSource=d.bio.source; }

    document.getElementById("info-band").innerHTML=
        "<h2><b>" + d.name +"</h2>" +
            "<h3><b>FACTS</b></h3>"+
            "<p><b>"+"- Foundation: </b>"+ foundationyear2 +"</p>"+
            "<p><b>"+"- Music Genre: </b>"+bandMusicGenre2 +"</p>"+
            "<p><b>"+"- Current Label: </b>"+bandCurrentLabel +"</p>"+
            "<h3><b>BIO</b></h3>"+
            "<p>"+bandBioSummary +"</p>"+
            "<p><i>(Source: "+bandBioSource +")</i></p>"

    ;
    document.getElementById("message02").innerHTML=
        "...so " + d.name +" it is!"+
        "</br></br></br><img class='img-circle' src="+d.image+" alt="+d.name+" style=width:600px;height:600px;>"
    ;
    document.getElementById("message03").innerHTML=
        "now that we have an overall picture of " + d.name +" and their performance history, </br>but what parts of the world have they travelled?"
    ;
    document.getElementById("message04").innerHTML=
        "Do you know that the last time " + d.name +" played in New York was in"+" {year} "+"?"
    ;

}

function checkNull(d,endVar){
    if(d==null){return "n/a"}
    else{return d.endVar}

}