/**
 * Created by Enol Vallina on 11/17/2016.
 */

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svgBandMapHistory = d3.select("#band-history").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;