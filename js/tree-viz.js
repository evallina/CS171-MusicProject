/**
 * Created by Enol Vallina on 12/10/2016.
 */


var data=[];
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
    workingJSON=[];
    workingJSON= myArtistJSON;

}

function loadDataTree() {
    loadInitialData();
    var emptyArray=[];
    newJSON=[];
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
        "name": "Gigography (Last Concerts)",
        "parent": workingJSON.artistName,
        "relation": "null",
        "depth": 1
    })

    newJSON.push({
        "name": "Genres",
        "parent": workingJSON.artistName,
        "relation": "null",
        "depth": 1
    })

    //GENRES BRANCH
    for (var i = 0; i < workingJSON.artistGenres.length; i++) {
        newJSON.push({
            "name": workingJSON.artistGenres[i].name,
            "parent": "Genres",
            "relation": "null",
            "depth": 2
        })
    }

    //ALBUMS BRANCH
    console.log("testtttttttt", workingJSON.artistAlbums.length);
    for (var i = 0; i < workingJSON.artistAlbums.length; i++) {
        newJSON.push({
            "name": workingJSON.artistAlbums[i].albumName,
            "parent": "Albums",
            "relation": "null",
            "depth": 2
        })
        //type
        if(workingJSON.artistAlbums[i].type!=null) {
            newJSON.push({
                "name": "TYPE: " + workingJSON.artistAlbums[i].type,
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
        else{
            newJSON.push({
                "name": "TYPE: "+"n/a",
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
        //label
        if(workingJSON.artistAlbums[i].label!=null){
            newJSON.push({
                "name": "LABEL: "+ workingJSON.artistAlbums[i].label.name,
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
        else{
            newJSON.push({
                "name": "LABEL:"+"n/a",
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
        //year
        if(workingJSON.artistAlbums[i].year!=null) {
            newJSON.push({
                "name": "YEAR: " + workingJSON.artistAlbums[i].year,
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
        else{
            newJSON.push({
                "name": "YEAR: " +"n/a",
                "parent": workingJSON.artistAlbums[i].albumName,
                "relation": "null",
                "depth": 3
            })
        }
    }

    //GIGOGRAPHY BRANCH
    var GigsRun=50;
    var GigsIndex= workingJSON.artistPastGigs.length-(GigsRun+1);

    console.log("DATA of GIGS TO ANALIZE",GigsIndex);
    console.log("*******************", workingJSON.artistPastGigs);


    for (var i = GigsIndex; i < (GigsIndex+GigsRun); i++) {

        if (workingJSON.artistPastGigs[i] != null) {
            if (workingJSON.artistPastGigs[i].venueLocation != null) {
                newJSON.push({
                    "name": workingJSON.artistPastGigs[i].venueLocation,
                    "parent": "Gigography (Last Concerts)",
                    "relation": "null",
                    "depth": 2
                })
            }

            else {
                newJSON.push({
                    "name": "n/a",
                    "parent": "Gigography (Last Concerts)",
                    "relation": "null",
                    "depth": 2
                })
            }

            if (workingJSON.artistPastGigs[i].date != null) {
                newJSON.push({
                    "name": "DATE: " + workingJSON.artistPastGigs[i].date,
                    "parent": workingJSON.artistPastGigs[i].venueLocation,
                    "relation": "null",
                    "depth": 3
                })
            }

            else {
                newJSON.push({
                    "name": "DATE: " + "n/a",
                    "parent": workingJSON.artistPastGigs[i].venueLocation,
                    "relation": "null",
                    "depth": 3
                })
            }

            if (workingJSON.artistPastGigs[i].venueName != null) {
                newJSON.push({
                    "name": "VENUE: " + workingJSON.artistPastGigs[i].venueName,
                    "parent": workingJSON.artistPastGigs[i].venueLocation,
                    "relation": "null",
                    "depth": 3
                })
            }

            else {
                newJSON.push({
                    "name": "VENUE: " + "n/a",
                    "parent": workingJSON.artistPastGigs[i].venueLocation,
                    "relation": "null",
                    "depth": 3
                })
            }
        }

        else {
            newJSON.push({
                "name": "n/a",
                "parent": "Gigography (Last Concerts)",
                "relation": "null",
                "depth": 2
            })
        }




    }

data=newJSON;
//console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh",data);
    treeVizUpdate();
}

function treeVizUpdate() {
    var dataMap = data.reduce(function (map, node) {
        map[node.name] = node;
        return map;
    }, {});

// create the tree array
    var treeData = [];
    data.forEach(function (node) {
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
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#tree-viz").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


   /* var jsonConvert=JSON.parse(treeData[0]);

    d3.json(jsonConvert, function(error, flare) {
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
    });*/



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

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
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
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
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

} //Tree viz Update

