/**
 * Created by Enol Vallina on 12/10/2016.
 */



// how do i feed it an id / name of band?
var allGigs = [];
var TourTravel = null;

//
// if given a specific artistID, it should return a list of all of the objects and their associated events, lat, lng, etc
function get_gigs_by_id(id) {
    var gigs = [];
    for (var i = 0; i < allGigs.resultsPage.results.event.length; i ++) {
        // if (allGigs.resultsPage.results.event[i].id == id) {
        //     gigs[id] = allGigs.resultsPage.results.event[i];
        //     // still need to sort by timestamp
        // }
        gigs.push(allGigs.resultsPage.results.event[i]);
    }
    return gigs;
}

var coords = [];

// the input will be the list that we have gotten from the function above
// it'll be a list of objects, and we want to go to each object
// go to ocation and get the lat and lng
// store each value in new_item, which should then create our new list coords, which should have all the coordinates
function get_coordinate_tour(gigs) {
    coords = [];
    gigs = gigs["resultsPage"]["results"]["event"]
    // console.log("gigs")

    console.log(gigs);
    var nGigs = gigs.length;
    for (var i = 0; i < nGigs; i++) {
        //  push: {start: gigs[i].coords, end: gigs[i+1].coords
        if (i < nGigs - 1) {
            var new_item = {
                origin: {
                    latitude: gigs[i].location.lat,
                    longitude: gigs[i].location.lng
                },
                destination: {
                    latitude: gigs[i+1].location.lat,
                    longitude: gigs[i+1].location.lng
                }
            };
            coords.push(new_item);
        }

    }
    return coords;
}

var bubbleInfo = []
var timeknotInfo = []
function get_bubble_data(bubbleData) {
    bubbleData = bubbleData["resultsPage"]["results"]["event"];
    bubbleInfo = [];
    timeknotInfo = [];

    var nBubble = bubbleData.length;
    for (var i = 0; i<nBubble; i++) {
        if (i < nBubble -1) {
            var new_bubble = {
                name: bubbleData[i].displayName,
                radius: 3,
                city: bubbleData[i].location.city,
                date: bubbleData[i].start.date,
                venue: bubbleData[i].venue.displayName,
                latitude: bubbleData[i].location.lat,
                longitude: bubbleData[i].location.lng,
                fillKey: 'bubbleColor',
                borderWidth: .5
//                 name: 'Not a bomb, but centered on Brazil',
                //         radius: 23,
                //         centered: 'BRA',
                //         country: 'USA',
                //         yeild: 0,
                //         fillKey: 'USA',
                //         date: '1954-03-01'
            };
            bubbleInfo.push(new_bubble);

            var testTimeKnot = {
                name: bubbleData[i].displayName,
                venue: bubbleData[i].venue.displayName,
                city: bubbleData[i].location.city,
                date: bubbleData[i].start.date,
                img: "http://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Day_of_the_Fight_title.jpg/215px-Day_of_the_Fight_title.jpg"
            }

            timeknotInfo.push(testTimeKnot);
        }
    }
    return bubbleInfo;
    return timeknotInfo;
}


function createTour() {
    if (TourTravel) {
        TourTravel.svg.remove();
        TourTravel.svg.selectAll(".arcs").remove();
        // d3.selectAll("#datamaps-bubble").remove();
        // TourTravel.svg.selectAll("")
        // TourTravelbubbles.exit().remove();
    }
    // console.log(d3.selectAll("#datamap"));
    TourTravel = new Datamap({
        scope: 'world',
        element: document.getElementById('arcs'),
        projection: 'mercator',
        height: 800,
        width: 1000,
        fills: {
            // color of background map
            defaultFill: 'rgb(220,220,220)',
            // color of bubble
            bubbleColor: 'rgba(232,185,65,0.9)'
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                alert(geography.properties.name);
            });
        }
    });

    var gigRoute = coords;
    var bubble = bubbleInfo;
    var gigRoute = coords;
    TourTravel.bubbles(bubble, {
        popupTemplate: function (geography, data) {
            return ['<div class="hoverinfo"><strong>' + data.name + '</strong>',
                '<br/>Location: ' + data.city + '',
                // '<br/>Date: ' + data.date + '',
                '</div>'].join('');
        }
    });
    TourTravel.arc(gigRoute, {
        arcSharpness: .9,
        strokeWidth: 0.75,
        strokeColor:'rgba(20,20,20,0.5)',
        animationSpeed:2000
    });

    TourTravel.svg.call(d3.behavior.zoom()
        .on("zoom", redraw));

    function redraw() {
        TourTravel.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    };
};


//
// var kurbickFilms = [{name:"Day of the Fight", date: "1951-04-26", img: "http://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Day_of_the_Fight_title.jpg/215px-Day_of_the_Fight_title.jpg"},
//     {name:"The Seafarers", 	date:"1953-10-15", img: "http://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Seafarers_title.jpg/225px-Seafarers_title.jpg"},
//     {name:"Lolita (1962 film)", 	date:"1962-06-13", img: "http://upload.wikimedia.org/wikipedia/en/thumb/7/72/LolitaPoster.jpg/215px-LolitaPoster.jpg"},
//     {name:"Fear and Desire", date:	"1953-03-31", img: "http://upload.wikimedia.org/wikipedia/en/f/f7/Fear_and_Desire_Poster.jpg"},
//     {name:"Paths of Glory", date:	"1957-12-25", img: "http://upload.wikimedia.org/wikipedia/en/thumb/b/bc/PathsOfGloryPoster.jpg/220px-PathsOfGloryPoster.jpg"},
//     {name:"A Clockwork Orange (film)", date:	"1971-12-19", img: "http://upload.wikimedia.org/wikipedia/en/thumb/4/48/Clockwork_orangeA.jpg/220px-Clockwork_orangeA.jpg"},
//     {name:"Killer's Kiss", date:	"1955-09-28", img: "http://upload.wikimedia.org/wikipedia/en/thumb/a/a6/KillersKissPoster.jpg/220px-KillersKissPoster.jpg"}
// ];

// can get from musikki api?
function drawTimeKnots() {
    // if (TimeKnots) {
    //     TourTravel.svg.remove();
    // }
    d3.selectAll("#timeline1").html("");
    TimeKnots.draw("#timeline1", timeknotInfo, {
        dateFormat: "%B %Y",
        color: "#696",
        width: 800,
        radius: 5,
        showLabels: true,
        labelFormat: "%d-%b-%Y"
    });
}

function loadWorldMap(){
// testing with radiohead
$.getJSON("http://api.songkick.com/api/3.0/search/artists.json?query="+searchBox+"&apikey=ME5jCBPTyD3l4BW8",
    function (songkickData, err) {
        console.log("////////////////////////NEW REQUEST//////////////////////////////////////////////////////////////")
        data = songkickData.resultsPage.results.artist[0];
        artistSKid = data.id;
        console.log(artistSKid);
        //Request Artis Gigography
        queue()
            .defer(d3.json,"http://api.songkick.com/api/3.0/artists/"+artistSKid+"/gigography.json?apikey="+Songkick_APIkey)
            //Filter In the last Year

            .defer(d3.json,"http://api.songkick.com/api/3.0/artists/"+artistSKid+"/gigography.json?apikey="+Songkick_APIkey+"&min_date=2015-10-01&max_date=2016-10-01")

            .await(function(error,SKdataArtistGigo, SKdataLastYear){
                // console.log("SK Artist Gigography");
                // console.log(SKdataArtistGigo);
                // console.log("SK Concerts Last Year");
                // console.log(SKdataLastYear);
                // bandConcertsLastYear=SKdataLastYear.resultsPage.totalEntries;
                get_coordinate_tour(SKdataArtistGigo);
                var x = get_bubble_data(SKdataArtistGigo);
                console.log("bubble info");
                console.log(x);
                // console.log("is this even working");
                // console.log(coords);
                createTour();
                drawTimeKnots()
                // createVisualization();
            })
        // var gigs = get_gigs_by_id(253846);
    });
}

//
// data.resultsPage.results.event
// data["resultsPage"]["results"]["event"]


