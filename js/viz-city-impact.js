/**
 * Created by Enol Vallina on 12/9/2016.
 */
//LAYOUT VARIABLES////////////////////////////////////////////////////////////////////////////////////
var margin2 = {top: 40, right: 40, bottom: 10, left: 60};

var width2 = 1200 - (margin.left + margin.right),
    height2 = 800 - (margin.top + margin.bottom);

var height22=height/2;

//var height2=height/2;
//VARIABLES///////////////////////////////////////////////////////////////////////////////////////////
var dataImpactViz;
var xSelect2;
var xSelect3;
var colorHighlight= "rgb(200,150,25)";

//SVG AREA/////////////////////////////////////////////////////////////////////////////////////////////
var svg3 = d3.select("#venue-impact").append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//SETUP SCALES/////////////////////////////////////////////////////////////////////////////////////////
var x = d3.scale.ordinal().rangeRoundBands([0, width2], .1);
var y = d3.scale.linear().range([height22, 0]);
var y2 = d3.scale.linear().range([height22, 0]);
var y3 = d3.scale.linear().range([height22-100, 0]);

var data01;
var valueMaxEvents;
var valueMaxPop;
var valueMaxCap;

var sortData01;
var ArrayDates=[];
var myJSONeventsByDate=[];

var dataTest2=[];
var dataTest3=[];

//SETUP SVG OBJECTS////////////////////////////////////////////////////////////////////////////////////
//COLORS////////////////////////////////////////////////////////////////////////////////////////////////////
var colorSanitation="rgb(10,133,150)";
var colorWater="rgb(50,150,200)";
var colorPopulation="rgb(50,50,50)";


//SETUP AXIS///////////////////////////////////////////////////////////////////////////////////////////
var formatNumber = d3.format(".0f");

var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(x)
    ;

var yAxis = d3.svg.axis().orient("left").scale(y).tickFormat(function(d){return d; });
var yAxis2 = d3.svg.axis().orient("left").scale(y3).tickFormat(function(d){return d; });
var yAxis3 = d3.svg.axis().orient("left").scale(y2).tickFormat(function(d){return d; });

svg3.append("g")
    .attr("class","y-axis axis")
    .classed("minor", true);

//svg2.selectAll("g").filter(function(d) { return d; })
//  .classed("minor", true);

svg3.append("g")
    .attr("class","y-axis2 axis")
    .classed("minor", true);

svg3.append("g")
    .attr("class","y-axis3 axis")
    .classed("minor", true);

svg3.append("g")
    .attr("class", "x-axis axis")
    .attr("id","x-label")
    .attr("transform","translate(0,"+height22+")")
    //.style("color","rgb(200,200,200")
    .call(xAxis)
;

svg3.append("text")
    .attr("id","y-axis label")
    .attr("class", "axis-label")
    .attr("text-anchor","middle")
    .attr("x",-margin2.left/2)
    .attr("y",-margin2.top/2);

svg3.append("text")
    .attr("id","y-axis3 label")
    .attr("class", "axis-label")
    .attr("text-anchor","middle")
    .attr("x",/*(-margin2.left/2)+*/width2)
    .attr("y",-margin2.top/2)
    .attr("transform","translate(0,"+width2+")")
;

svg3.append("text")
    .attr("id","y-axis2 label2")
    .attr("class", "axis-label2")
    .attr("text-anchor","middle")
    .attr("x",-margin2.left/2)
    .attr("y",-margin2.top/2)

;

// INITIALIZE DATA////////////////////////////////////////////////////////////////////////////////////////
dataImpactViz = myEventJSON;
setTimeout(loadDataImpactViz,5000);
//loadDataImpactViz();

//BOX SELECTION///////////////////////////////////////////////////////////////////////////////////////////
d3.select("#data-type2").on("change", function () { updateImpactViz() });
//d3.select("#btn-update").on("click", function() { updateVisualization() });

//LOAD DATA FUNCTION//////////////////////////////////////////////////////////////////////////////////////
function loadDataImpactViz(){


    dataTest2.push({e: dataImpactViz[0].date}); //day left to add at the array
   //Check how many Dates are
    for(var i=1; i<dataImpactViz.length;i++) {
         var skDate0=dataImpactViz[i-1].date;

         var skDate=dataImpactViz[i].date;

         if(skDate != skDate0){
             dataTest2.push({e: dataImpactViz[i].date});
         }
    }
    //Build the Array
    for(var i=0;i<dataTest2.length;i++){
        var ArrayOneDate=[];
        for(var j=0;j<dataImpactViz.length;j++){
            if(dataTest2[i].e == dataImpactViz[j].date){ ArrayOneDate.push(dataImpactViz[j]); }
        }
        ArrayDates.push(ArrayOneDate);
    }
    var avgPopularityByDate=[];
    var totalCapacityByDate=[];
    var totalEventsByDate=[];

    //Do the addition of Days, the avg of Popularity & get the Capacity
    for (var i=0; i<ArrayDates.length;i++){
        var NumberEventsByDay= ArrayDates[i].length;
        var Capacity=0;
        var Popularity=0.0;
        var CountPop=0;
        totalEventsByDate.push(NumberEventsByDay);
        for(var j=0;j<ArrayDates[i].length;j++){
            if (ArrayDates [i][j].popularity !=null){
                CountPop +=1;
            }
        }

        for(var j=0;j<ArrayDates[i].length;j++){
            if (ArrayDates[i][j].venueCapacity != null) {
                var cap = parseInt(ArrayDates[i][j].venueCapacity);
                Capacity += cap;
            }

            if (ArrayDates [i][j].popularity !=null){
                var pop =parseFloat(ArrayDates[i][j].popularity)
                Popularity +=pop/CountPop;
            }
        }
        totalCapacityByDate.push(Capacity);
        avgPopularityByDate.push(Popularity);

        myJSONeventsByDate.push({
            date:ArrayDates[i][0].date,
            dateFormat: parseDate(ArrayDates[i][0].date),
            avgPopularity:Popularity,
            totalEvents:NumberEventsByDay,
            totalCapacity:Capacity,
            event:ArrayDates[i]
        })
    }

    data01=myJSONeventsByDate;
    setTimeout(updateImpactViz,1000);

} //FINISH DATA FUNCTION

//DRAW & UPDATE VISUALIZATION /////////////////////////////////////////////////////////////////////////////
function updateImpactViz(){
    console.log(myJSONeventsByDate);


    //SELECTION IN BOX/////////////////////////////////////////////////////////////////////
    xSelect2 = d3.select("#data-type2").property("value");



    //sortData01= data01.sort(function (a,b){return b[xSelect] - a[xSelect];});


    sortData01= sortingData(data01,xSelect2);

    valueMaxEvents =d3.max(data01,function(d){return d.totalEvents;});
    valueMaxPop =d3.max(data01,function(d){return d.avgPopularity;});
    valueMaxCap =d3.max(data01,function(d){return d.totalCapacity;});
    /*valueShort = d3.max(sortData01, function(d){
     if (xSelect2=="Code"){return 0}
     else{ return d[xSelect2];} })
     ;*/


    //SCALES & OTHER DATA OPERATIONS///////////////////////////////////////////////////////
    //xShort.domain(sortData.map(function(d){return d.Code;}));
    //yShort.domain([valueShort,0]);

    x.domain(sortData01.map(function(d){return d.date;}));
    y.domain([valueMaxEvents,0]);
    y2.domain([valueMaxPop,0]);
    y3.domain([valueMaxCap,0]);

    var xVariable=3;
    var chartdowOffset=40;

    //BAR CHART////////////////////////////////////////////////////////////////////////////

    var bars1 = svg3.selectAll(".bars01")
        .data(sortData01);
    var bars2 = svg3.selectAll(".bars02")
        .data(sortData01);
    var bars3 = svg3.selectAll(".bars03")
        .data(sortData01);



//SANITATION BARS
    bars1.enter()
        .append("rect")
        .attr("class", "bars01");
    // .attr("fill", colorSanitation)
    //.attr("fill-opacity", opacityX)

    bars1.transition().duration(1500)
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.totalEvents); })
        .attr("width", x.rangeBand()-5)
        //.attr("height",50)
        .attr("height", function(d) { return height22 - y(d.totalEvents); })
        .attr("fill", colorPopulation)
    ;
    bars1.exit().remove();

    //WATER BARS
    bars2.enter()
        .append("rect")
        .attr("class", "bars02");


    bars2.transition().duration(1500)
        .attr("x", function(d) { return x(d.date)+xVariable; })
        .attr("y", function(d) { return y2(d.avgPopularity); })
        .attr("width", x.rangeBand()-5)
        //.attr("height",80)
        .attr("height", function(d) { return height22 - y2(d.avgPopularity); })
        .attr("fill", colorPopulation)
        .attr("fill-opacity", 0.4);

    bars2.exit().remove();

    //POPULATION BARS
    bars3.enter()
        .append("rect")
        .attr("class", "bars03")
    ;

    bars3.transition().duration(1500)
        .attr("x", function(d) { return x(d.date); })
        .attr("y", height22+chartdowOffset)
        .attr("width", x.rangeBand()-5)
        .attr("height", function(d) { return y3(d.totalCapacity); })
        .attr("fill", colorPopulation)
    ;

    bars3.exit().remove();


    //UPDATE AXIS//////////////////////////////////////////////////////////////////////////
    svg3.select("g.x-axis").transition().duration(1500)
        .attr("fill",function(d){
            return "rgb(50,50,50)"
        })
        .call(xAxis)

    svg3.selectAll("text")
        .attr("y", 0)
        .attr("x", 0)
        //.attr("dy", "0em")
        .attr("transform", "rotate(90) translate("+(chartdowOffset*0.25)+",-10)")
        .style("text-anchor", "start")
    ;
    svg3.select("g.y-axis").transition().duration(1500).call(yAxis);
    svg3.select("g.y-axis3")
        .attr("transform", "translate("+1100+",0)")
        .transition().duration(1500).call(yAxis3);

    svg3.select("g.y-axis2").attr("transform","translate(0,"+(height22+chartdowOffset)+")")
        .transition().duration(1500)
        .call(yAxis2);
}

function formatMillions(d) {
    var s = formatNumber(d / 1e6);
    return d === y.domain()[1]
        ? " million "+ s
        : s;
}

function sortingData(dataSet,xSelectX){
    if(xSelectX=="totalEvents"){return dataSet.sort(function (a,b){return b[xSelectX] - a[xSelectX]})}
    else if(xSelectX=="avgPopularity"){return dataSet.sort(function (a,b){return b[xSelectX] - a[xSelectX]})}
    else if(xSelectX=="totalCapacity"){return dataSet.sort(function (a,b){return b[xSelectX] - a[xSelectX]})}
    else {return dataSet;}
}