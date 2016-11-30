/**
 * Created by Enol Vallina on 11/17/2016.
 */

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svgBandMapHistory = d3.select("#band-historywwww").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;


/*
var updateBandHistory= function() {
    console.log("updateBandBadge //////////////////////////////////// ");
    //console.log(dataBandAlbums);

    //SCALES & VALUES/////////////////////////////////////////////////////////////////////////////////////////////////

    // SCALES
    //yBandAlbumsProduced.domain([0,MaxValueAlbumsBand]);


    //BARS TEST///////////////////////////////////////////////////////////////////////////////////////////////////////
    var barHist = svgBandMapHistory.selectAll("circle")
        .data(dataplace);

    barHist.enter()
        .append("circle")
        .attr("class", "hist")
        .attr("fill", "rgb(20,20,20)")
        .attr("cx", 20)
        .attr("cy", 20)


    barHist.transition().duration(1500)
        .attr("r", function(d){ return d*1.2; })

    ;

    barHist.exit().remove();
}
    */