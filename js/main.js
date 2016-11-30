/*
$.getJSON("http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=ME5jCBPTyD3l4BW8&jsoncallback=?",
    function(data){
        createVisualization(data);


// data is JSON response object
    });
//
// data.resultsPage.results.event
// data["resultsPage"]["results"]["event"]

function createVisualization(data) {
    console.log(data);
    var events  = data["resultsPage"]["results"]["event"];
    for (var i = 0; i < events.length; i++) {
        $("#data").append("<p>" + events[i]["displayName"] + "</p>");
        $("#data").append("<p><b>Popularity: </b>" + events[i]["popularity"] + "</p>");
    }
}
*/