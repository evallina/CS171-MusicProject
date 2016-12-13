

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
        "</br></br></br><img class='img-circle' src="+d.image+" alt="+d.name+" style=width:600px;height:600px;>"+
        "</br><h4>a visualization about music without music? let's play!</h4> "    +
        "<iframe src=https://embed.spotify.com/?uri="+ bandListenMusic.app_url +" width=400 height=80 frameborder=0 allowtransparency=true></iframe>"
    ;
    document.getElementById("message03").innerHTML=
        "Now that we have an overall picture of " + d.name +" and their performance history, </br>let’s see what parts of the world they’ve toured"
    ;
/*    Now that we have an overall picture of U2 and their performance history,
        let’s see what parts of the world they’ve toured*/
/*
    document.getElementById("messagePlay").innerHTML=
        //<iframe src="https://embed.spotify.com/?uri=spotify:artist:4Z8W4fKeB5YxbusRsdQVPb" width="640" height="80" frameborder="0" allowtransparency="true"></iframe>
        /!*"<iframe src=https://embed.spotify.com/?uri="+ bandListenMusic.app_url +" width=640 height=80 frameborder=0 allowtransparency=true></iframe>"*!/
        //<iframe src="https://embed.spotify.com/?uri="+XXXX+" width="640" height="80" frameborder="0" allowtransparency="true"></iframe>
    ;*/




}

function textNYBand() {
    var testNY;

    if (LastGigNewyork != null) {
        var justTheYear=LastGigNewyork.start.date.substr(0,4);
        if (LastGigNewyork.venue.displayName != null && LastGigNewyork.start.date != null) {
            testNY = "In our records, the last time " + bandInfo.name + " played in New York was in " + justTheYear + " at " + LastGigNewyork.venue.displayName
            ;
        }
        else if (LastGigNewyork.venue.displayName != null) {
            testNY = "Do you know that the last time " + bandInfo.name + " played in New York was in " + LastGigNewyork.start.date + "?"
        }
        else if (LastGigNewyork.start.date != null) {
            testNY = "Do you know that the last time " + bandInfo.name + " played in New York was at " + LastGigNewyork.start.date + "?"
        }
    }

    else {
        testNY = "New York is considered one of the most important cities to perform";
    }
    document.getElementById("message04").innerHTML = testNY
}

function checkNull(d,endVar){
    if(d==null){return "n/a"}
    else{return d.endVar}

}