/**
 * Created by Enol Vallina on 12/10/2016.
 */


var data;
/*
var data = [
    { "name" : "ABC", "parent":"DEF", "relation": "ghi", "depth": 1 },
    { "name" : "DEF", "parent":"null", "relation": "null", "depth": 0 },
    { "name" : "new_name", "parent":"ABC", "relation": "rel", "depth": 2 },
    { "name" : "new_name2", "parent":"ABC", "relation": "foo", "depth": 2 },
    { "name" : "Foo", "parent":"DEF", "relation": "rel", "depth": 2 }
];
*/
var workingJSON;
var newJSON=[];
function loadInitialData(){
    workingJSON= myArtistJSON;

}

function loadDataTree() {
    loadInitialData();
    //var workingJSON= myArtistJSON;
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", workingJSON);
    var treeLength = workingJSON.artistAlbums.length;
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", treeLength);

    newJSON.push({
        "name": workingJSON.artistName,
        "parent": "null",
        "relation": "null",
        "depth": 0
    })

    newJSON.push({
        "name": "Albums",
        "parent": workingJSON.artistName,
        "relation": "null",
        "depth": 1
    })

    newJSON.push({
        "name": "Gigography",
        "parent": workingJSON.artistName,
        "relation": "null",
        "depth": 1
    })


    console.log("testtttttttt", workingJSON.artistAlbums.length);
    for (var i = 0; i < workingJSON.artistAlbums.length; i++) {
        newJSON.push({
            "name": workingJSON.artistAlbums[i].albumName,
            "parent": "Albums",
            "relation": "null",
            "depth": 2
        })
        newJSON.push({
            "name": "Songs",
            "parent": workingJSON.artistAlbums[i].albumName,
            "relation": i,
            "depth": 3
        })
        newJSON.push({
            "name": workingJSON.artistAlbums[i].year,
            "parent": workingJSON.artistAlbums[i].albumName,
            "relation": "null",
            "depth": 3
        })

        for (var j = 0; j < workingJSON.artistAlbums[i].albumSongs.length; j++) {
            newJSON.push({
                "name": workingJSON.artistAlbums[i].albumSongs[j].songTitle,
                "parent": "Songs",
                "relation": i,
                "depth": 4
            })
        }
    }
    newJSON.push({
        "name": "60's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    newJSON.push({
        "name": "70's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    newJSON.push({
        "name": "80's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    newJSON.push({
        "name": "90's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    newJSON.push({
        "name": "00's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    newJSON.push({
        "name": "10's",
        "parent": "Gigography",
        "relation": "null",
        "depth": 2
    })
    console.log("hhhhhhhhhhhhhhhhh",workingJSON.artistPastGigs.length);

    for (var i = 0; i < /*workingJSON.artistPastGigs.length*/1600; j++) {
        //var dateTemp;
        var dateTemp = (parseInt(workingJSON.artistPastGigs[i].date.substr(0, 4)));

        console.log("dataTemp",dateTemp);
        if (dateTemp >= 1960 && dateTemp < 1970) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "60's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
        if (dateTemp >= 1960 && dateTemp < 1970) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "70's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
        if (dateTemp >= 1970 && dateTemp < 1980) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "80's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
        if (dateTemp >= 1980 && dateTemp < 1990) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "90's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
        if (dateTemp >= 1990 && dateTemp < 2000) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "00's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
        if (dateTemp >= 2010) {
            for (var i = 0; i < workingJSON.artistPastGigs.length; i++) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].date,
                    "parent": "10's",
                    "relation": "null",
                    "depth": 3
                })
                dateTemp = 0;
            }
        }
    }


    /*
    for(var i=0; i<workingJSON.artistPastGigs.length; i++){
        newJSON.push({
            "name": workingJSON.artistPastGigs[i].date,
            "parent": "Gigography",
            "relation":"null",
            "depth": 2
        })
        newJSON.push({
            "name": workingJSON.artistPastGigs[i].venueLocation,
            "parent": workingJSON.artistPastGigs[i].date,
            "relation":"null",
            "depth": 3
        })
        newJSON.push({
            "name": workingJSON.artistPastGigs[i].venueName,
            "parent": workingJSON.artistPastGigs[i].date,
            "relation":"null",
            "depth": 3
        })
        newJSON.push({
            "name": workingJSON.artistPastGigs[i].popularity,
            "parent": workingJSON.artistPastGigs[i].date,
            "relation":"null",
            "depth": 3
        })
    }
*/


data=newJSON;
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh",data);
    treeVizUpdate();
}

function treeVizUpdate(){
var dataMap = data.reduce(function(map, node) {
    map[node.name] = node;
    return map;
}, {});

// create the tree array
var treeData = [];
data.forEach(function(node) {
    // add to parent
    var parent = dataMap[node.parent];
    if (parent) {
        // create child array if it doesn't exist
        (parent.children || (parent.children = []))
        // add node to child array
            .push(node);
    } else {
        // parent is null or missing
        treeData.push(node);
    }
});
//////////////////////
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

var svg = d3.select("#tree-viz").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
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

/*
d3.json("flare.json", function(error, flare) {
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
*/





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
}

