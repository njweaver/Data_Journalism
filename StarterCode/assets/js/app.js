// @TODO: YOUR CODE HERE!
var svgWidth = 500;
var svgHeight = 500;

var chartMargin = {
    top:30,
    right: 30,
    bottom: 30,
    left: 30
}

var chartWidth = svgWidth - chartMargin.left -chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
var chartGroup = svg.append("g")
                    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("../assets/data/data.csv", function(error, data){
    if (error) throw error;

    // console.log(data);
    data.forEach(function(d){
        d.poverty = +d.poverty;
        d.povertyMoe= +d.povertyMoe;
        d.age= +d.age;
        d.ageMoe= +d.ageMoe;
        d.income= +d.income;
        d.incomeMoe= +d.incomeMoe;
        d.healthcare= +d.healthcare;
        d.healthcareLow= +d.healthcareLow;
        d.healthcareHigh = +d.healthcareHigh;
    })

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(data.obesity)])
                    .range([0,chartHeight]);

    var xScale = d3.scaleBand()
                    .domain([data.abbr])
                    .range([0,chartWidth]);

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append("g")
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(xAxis);
    chartGroup.append("g")
                .call(yAxis);


});