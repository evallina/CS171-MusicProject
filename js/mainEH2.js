
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

//
// GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4



// var basic = new Datamap({
//     element: document.getElementById("container")
// });

// var map = new Datamap({
//     scope: 'world',
//     element: document.getElementById('container1'),
//     projection: 'mercator',
//     height: 500,
//     fills: {
//         defaultFill: '#f0af0a',
//         lt50: 'rgba(0,244,244,0.9)',
//         gt50: 'red'
//     },
//
//     data: {
//         USA: {fillKey: 'lt50' },
//         RUS: {fillKey: 'lt50' },
//         CAN: {fillKey: 'lt50' },
//         BRA: {fillKey: 'gt50' },
//         ARG: {fillKey: 'gt50'},
//         COL: {fillKey: 'gt50' },
//         AUS: {fillKey: 'gt50' },
//         ZAF: {fillKey: 'gt50' },
//         MAD: {fillKey: 'gt50' }
//     }
// })
//
//
// //sample of the arc plugin
// map.arc([
//     {
//         origin: {
//             latitude: 40.639722,
//             longitude: 73.778889
//         },
//         destination: {
//             latitude: 37.618889,
//             longitude: -122.375
//         }
//     },
//     {
//         origin: {
//             latitude: 30.194444,
//             longitude: -97.67
//         },
//         destination: {
//             latitude: 25.793333,
//             longitude: -0.290556
//         }
//     }
// ], {strokeWidth: 2});
//
//
// //bubbles, custom popup on hover template
// map.bubbles([
//     {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'gt50'},
//     {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 18, fillKey: 'lt50'},
//     {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 8, fillKey: 'gt50'},
//
// ], {
//     popupTemplate: function(geo, data) {
//         return "<div class='hoverinfo'>It is " + data.name + "</div>";
//     }
// });


// how do i feed it an id / name of band?
var allGigs = [];

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
    bubbleData = bubbleData["resultsPage"]["results"]["event"]

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

//
// function createTour() {
//
//     var TourTravel = new Datamap({
//         scope: 'world',
//         element: document.getElementById('arcs'),
//         projection: 'mercator',
//         fills: {
//             // test: '#f0af0a',
//             // color of background map
//             defaultFill: '#f0af0a',
//             // color of bubble
//             bubbleColor: 'rgba(0,244,244,0.9)'
//         }
//         // fills: {
//         //     defaultFill: '#EDDC4E'
//         // }
//         // geographyConfig: {
//         //     popupOnHover: false,
//         //     highlightOnHover: false
//         // },
//     });
//
//     var gigRoute = coords;
//     // bubble is list of events
//     var bubble = bubbleInfo;
//     var gigRoute = coords;
//     console.log("coords" + coords);
// //     TourTravel.bubbles([
// //     {
// //         name: 'Not a bomb, but centered on Brazil',
// //         radius: 23,
// //         centered: 'BRA',
// //         country: 'USA',
// //         yeild: 0,
// //         fillKey: 'USA',
// //         date: '1954-03-01'
// //     },
// //     {
// //         name: 'Not a bomb',
// //         radius: 15,
// //         yeild: 0,
// //         country: 'USA',
// //         centered: 'USA',
// //         date: '1986-06-05',
// //         significance: 'Centered on US',
// //         fillKey: 'USA'
// //     },
// //     {
// //         name: 'Castle Bravo',
// //         radius: 25,
// //         yeild: 15000,
// //         country: 'USA',
// //         significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
// //         fillKey: 'USA',
// //         date: '1954-03-01',
// //         latitude: 11.415,
// //         longitude: 165.1619
// //     },{
// //         name: 'Tsar Bomba',
// //         radius: 70,
// //         yeild: 50000,
// //         country: 'USSR',
// //         fillKey: 'RUS',
// //         significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
// //         date: '1961-10-31',
// //         latitude: 73.482,
// //         longitude: 54.5854
// //     }
// // ]);
//     //draw bubbles for bombs
//     // TourTravel.bubbles(bubble, {
//     //     popupTemplate: function (bubble) {
//     //         return ['<div class="hoverinfo">' +  bubble.name + '',
//     //             '<br/>Payload: ' +  bubble.city + ' kilotons',
//     //             '<br/>Country: ' +  bubble.country + '',
//     //             '<br/>Date: ' +  bubble.date + '',
//     //             '</div>'].join('');
//     //     }
//     // });
//     TourTravel.bubbles(bubble, {
//         popupTemplate: function (geography, data) {
//             return ['<div class="hoverinfo"><strong>' + data.name + '</strong>',
//                 '<br/>Location: ' + data.city + '',
//                 // '<br/>Date: ' + data.date + '',
//                 '</div>'].join('');
//         }
//     });
// //     {
// //     popupTemplate: function(geo, data) {
// //         return '<div class="hoverinfo">Yield:' + data.yeild + '
// //         Exploded on ' + data.date + ' by the '  + data.country + ''
// //     }
// // });
//     TourTravel.arc(gigRoute, {arcSharpness: .9, strokeWidth: 1.5});
// };


function createTour() {

    var TourTravel = new Datamap({
        scope: 'world',
        element: document.getElementById('arcs'),
        projection: 'mercator',
        fills: {
            // color of background map
            defaultFill: '#f0af0a',
            // color of bubble
            bubbleColor: 'rgba(0,244,244,0.9)'
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
    TourTravel.arc(gigRoute, {arcSharpness: .9, strokeWidth: 1.5});

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
    TimeKnots.draw("#timeline1", timeknotInfo, {
        dateFormat: "%B %Y",
        color: "#696",
        width: 800,
        radius: 5,
        showLabels: true,
        labelFormat: "%d-%b-%Y"
    });
}


//
// var bubble_map = new Datamap({
//     element: document.getElementById("bubbles"),
//     geographyConfig: {
//         popupOnHover: false,
//         highlightOnHover: false
//     },
//     fills: {
//         defaultFill: '#ABDDA4',
//         USA: 'blue',
//         RUS: 'red'
//     }
// });
// bubble_map.bubbles([
//     {
//         name: 'Not a bomb, but centered on Brazil',
//         radius: 23,
//         centered: 'BRA',
//         country: 'USA',
//         yeild: 0,
//         fillKey: 'USA',
//         date: '1954-03-01'
//     },
//     {
//         name: 'Not a bomb',
//         radius: 15,
//         yeild: 0,
//         country: 'USA',
//         centered: 'USA',
//         date: '1986-06-05',
//         significance: 'Centered on US',
//         fillKey: 'USA'
//     },
//     {
//         name: 'Castle Bravo',
//         radius: 25,
//         yeild: 15000,
//         country: 'USA',
//         significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
//         fillKey: 'USA',
//         date: '1954-03-01',
//         latitude: 11.415,
//         longitude: 165.1619
//     },{
//         name: 'Tsar Bomba',
//         radius: 70,
//         yeild: 50000,
//         country: 'USSR',
//         fillKey: 'RUS',
//         significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
//         date: '1961-10-31',
//         latitude: 73.482,
//         longitude: 54.5854
//     }
// ], {
//     popupTemplate: function(geo, data) {
//         return '<div class="hoverinfo">Yield:' + data.yeild + '
//         Exploded on ' + data.date + ' by the '  + data.country + ''
//     }
// });


//
// function initiatlize() {
//
//     var election = new Datamap({
//         scope: 'world',
//         element: document.getElementById('arcs'),
//         projection: 'mercator'
//     });
//
//
//     var presidentialTrips = [
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 32.066667,
//                 longitude: 34.783333
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 19.433333,
//                 longitude: -99.133333
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 9.933333,
//                 longitude: -84.083333
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 54.597,
//                 longitude: -5.93
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 52.516667,
//                 longitude: 13.383333
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 14.692778,
//                 longitude: -17.446667
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: -26.204444,
//                 longitude: 28.045556
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: -6.8,
//                 longitude: 39.283333
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 59.329444,
//                 longitude: 18.068611
//             }
//         },
//         {
//             origin: {
//                 latitude: 38.895111,
//                 longitude: -77.036667
//             },
//             destination: {
//                 latitude: 59.95,
//                 longitude: 30.3
//             }
//         }
//     ];
//
//     election.arc(presidentialTrips, {strokeWidth: 2});
// }

// $.getJSON("http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=ME5jCBPTyD3l4BW8&jsoncallback=?",
//     function(data){
//         createVisualization(data);
//         var gigs = get_gigs_by_id(8283233);
//         get_coordinate_tour(gigs);
//         createTour();
//         // initiatlize();
//
//
//
// // data is JSON response object
//     });
//
// $.getJSON("http://api.songkick.com/api/3.0/search/artists.json?query={Radiohead}&apikey=ME5jCBPTyD3l4BW8",
//     function(data){
//         // createVisualization(data);
//         console.log(data);
//         // var gigs = get_gigs_by_id(28442744);
//         // console.log(gigs);
//         // get_coordinate_tour(gigs);
//         // console.log(coords);
//         // createTour();
//         // initiatlize();
//
//
// // data is JSON response object
//     });

//
// function createVisualization(data) {
//     allGigs = data;
//     var events = data["resultsPage"]["results"]["event"];
//     // for (var i = 0; i < events.length; i++) {
//     for (var i = 0; i < 5; i++) {
//         $("#data").append("<p>" + events[i]["displayName"] + "</p>");
//         $("#data").append("<p><b>Popularity: </b>" + events[i]["popularity"] + "</p>");
//     }
// }
//
// //data
// var data = (2014, 5, 3);
// //     new MockData(0.1, 0.1, 100, 50, function (moment) {
// //     return !(moment.day() === 0 || moment.day() === 6);
// // })
// //     .generateOHLC(new Date(2014, 1, 1), new Date(2014, 8, 1));
//

// var data = d3.csv("data/zaatari-refugee-camp-population.csv", function(data) {
//     initVis(data)
//     console.log(data)
//     console.log(data.date)
// });
// //
//
// function initVis() {
//     var formatDate = d3.time.format("%Y-%m-%d");
//     // population and date into number and time date objects
//     data.forEach(function(d){
//         d.population = parseFloat(d.population);
//         d.date = formatDate.parse(d.date);
//     });
//
// };
//
// var minN = d3.min(data, function (d) { return d.date; }).getTime(),
//     maxN = d3.max(data, function (d) { return d.date; }).getTime();
// var minDate = new Date(minN - 8.64e7),
//     maxDate = new Date(maxN + 8.64e7);
// var yMin = d3.min(data, function (d) { return d.low; }),
//     yMax = d3.max(data, function (d) { return d.high; });
//
// //
// // upper chart
// var margin = {top: 20, right: 20, bottom: 30, left: 35},
//     width = 660 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;
//
// var plotChart = d3.select('#chart').classed('chart', true).append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
// var plotArea = plotChart.append('g')
//     .attr('clip-path', 'url(#plotAreaClip)');
//
// plotArea.append('clipPath')
//     .attr('id', 'plotAreaClip')
//     .append('rect')
//     .attr({ width: width, height: height });
// //
//
// var xScale = d3.time.scale()
//         .domain([minDate, maxDate])
//         .range([0, width]),
//     yScale = d3.scale.linear()
//         .domain([yMin, yMax]).nice()
//         .range([height, 0]);
// //
// var xAxis = d3.svg.axis()
//         .scale(xScale)
//         .orient('bottom')
//         .ticks(5),
//     yAxis = d3.svg.axis()
//         .scale(yScale)
//         .orient('left');
//
// plotChart.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis);
//
// plotChart.append('g')
//     .attr('class', 'y axis')
//     .call(yAxis);
// //
// var series = sl.series.candlestick()
//     .xScale(xScale)
//     .yScale(yScale);
//
// var dataSeries = plotArea.append('g')
//     .attr('class', 'series')
//     .datum(data)
//     .call(series);
//
// //
// // Lower chart
// var navWidth = width,
//     navHeight = 100 - margin.top - margin.bottom;
//
// var navChart = d3.select('#chart').classed('chart', true).append('svg')
//     .classed('navigator', true)
//     .attr('width', navWidth + margin.left + margin.right)
//     .attr('height', navHeight + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
// var navXScale = d3.time.scale()
//         .domain([minDate, maxDate])
//         .range([0, navWidth]),
//     navYScale = d3.scale.linear()
//         .domain([yMin, yMax])
//         .range([navHeight, 0]);
//
// var navXAxis = d3.svg.axis()
//     .scale(navXScale)
//     .orient('bottom');
//
// navChart.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + navHeight + ')')
//     .call(navXAxis);
//
// var navData = d3.svg.area()
//     .x(function (d) { return navXScale(d.date); })
//     .y0(navHeight)
//     .y1(function (d) { return navYScale(d.close); });
//
// var navLine = d3.svg.line()
//     .x(function (d) { return navXScale(d.date); })
//     .y(function (d) { return navYScale(d.close); });
//
// navChart.append('path')
//     .attr('class', 'data')
//     .attr('d', navData(data));
//
// navChart.append('path')
//     .attr('class', 'line')
//     .attr('d', navLine(data));
//
//
// var viewport = d3.svg.brush()
//     .x(navXScale)
//     .on("brush", function () {
//         xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
//         redrawChart();
//     });
//
// function redrawChart() {
//
//     dataSeries.call(series);
//     plotChart.select('.x.axis').call(xAxis);
// }
//
// navChart.append("g")
//     .attr("class", "viewport")
//     .call(viewport)
//     .selectAll("rect")
//     .attr("height", navHeight);
//
// var zoom = d3.behavior.zoom()
//     .x(xScale)
//     .on('zoom', function() {
//         if (xScale.domain()[0] < minDate) {
//             var x = zoom.translate()[0] - xScale(minDate) + xScale.range()[0];
//             zoom.translate([x, 0]);
//         } else if (xScale.domain()[1] > maxDate) {
//             var x = zoom.translate()[0] - xScale(maxDate) + xScale.range()[1];
//             zoom.translate([x, 0]);
//         }
//         redrawChart();
//         updateViewportFromChart();
//     });
//
// function updateViewportFromChart() {
//
//     if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {
//
//         viewport.clear();
//     }
//     else {
//
//         viewport.extent(xScale.domain());
//     }
//
//     navChart.select('.viewport').call(viewport);
// }
//
// var overlay = d3.svg.area()
//     .x(function (d) { return xScale(d.date); })
//     .y0(0)
//     .y1(height);
//
// plotArea.append('path')
//     .attr('class', 'overlay')
//     .attr('d', overlay(data))
//     .call(zoom);
//
// viewport.on("brushend", function () {
//     updateZoomFromChart();
// });
//
// function updateZoomFromChart() {
//
//     zoom.x(xScale);
//
//     var fullDomain = maxDate - minDate,
//         currentDomain = xScale.domain()[1] - xScale.domain()[0];
//
//     var minScale = currentDomain / fullDomain,
//         maxScale = minScale * 20;
//
//     zoom.scaleExtent([minScale, maxScale]);
// }
//
// var daysShown = 30;
//
// xScale.domain([
//     data[data.length - daysShown - 1].date,
//     data[data.length - 1].date
// ]);
//
// redrawChart();
// updateViewpointFromChart();
// updateZoomFromChart();

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("json/flare.json", function(error, flare) {
    if (error) throw error;

    root = flare;
    root.x0 = height / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    root.children.forEach(collapse);
    update(root);
});

d3.select(self.frameElement).style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

//
//
//
//

var margin = { top: 10, right: 10, bottom: 100, left: 40 },
    margin2 = { top: 430, right: 10, bottom: 20, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%b %Y").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);


// for the chart...what do i need a chart for?
// what can i replace with? the map?
var area = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) { return x(d.date); })
    .y0(height)
    .y1(function (d) { return y(d.price); });

var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) { return x2(d.date); })
    .y0(height2)
    .y1(function (d) { return y2(d.price); });



// make some buttons to drive our zoom
d3.select("body").append("div")
    .attr("id","btnDiv")
    .style('font-size','75%')
    .style("width","250px")
    .style("position","absolute")
    .style("left","5%")
    .style("top","200px")

d3.select("#btnDiv")[0][0].innerHTML = [
].join('\n')


var btns = d3.select("#btnDiv").selectAll("button").data([2001, 2002, 2003, 2004])

btns = btns.enter().append("button").style("display","inline-block")

// fill the buttons with the year from the data assigned to them
btns.each(function (d) {
    this.innerText = d;
})

btns.on("click", drawBrush);

function drawBrush() {
    // our year will this.innerText
    console.log(this.innerText)

    // define our brush extent to be begin and end of the year
    brush.extent([new Date(this.innerText + '-01-01'), new Date(this.innerText + '-12-31')])

    // now draw the brush to match our extent
    // use transition to slow it down so we can see what is happening
    // remove transition so just d3.select(".brush") to just draw
    brush(d3.select(".brush").transition());

    // now fire the brushstart, brushmove, and brushend events
    // remove transition so just d3.select(".brush") to just draw
    brush.event(d3.select(".brush").transition().delay(1000))
}


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// change to d3.json, convert the return types so that d.date etc will work on this
// what exactly do i want to display? scrubber should work and look good, maybe sync with map if can? if not, then
// connect to the spiral thing
d3.csv("data/sp500.csv", type, function (error, data) {
    x.domain(d3.extent(data.map(function (d) { return d.date; })));
    y.domain([0, d3.max(data.map(function (d) { return d.price; }))]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    focus.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);
});

function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.select(".area").attr("d", area);
    focus.select(".x.axis").call(xAxis);
}

function type(d) {
    d.date = parseDate(d.date);
    d.price = +d.price;
    return d;
}


// testing with radiohead
$.getJSON("http://api.songkick.com/api/3.0/search/artists.json?query=Chainsmokers&apikey=ME5jCBPTyD3l4BW8",
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


//
// data.resultsPage.results.event
// data["resultsPage"]["results"]["event"]




