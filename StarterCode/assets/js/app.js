// @TODO: YOUR CODE HERE!
function makeResponsive(){
var svgWidth = 1000;
var svgHeight = 500;

var chartMargin = {
    top:70,
    right: 70,
    bottom: 70,
    left: 70
}

var chartWidth = svgWidth - chartMargin.left -chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
var chartGroup = svg.append("g")
                    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv('assets/data/data.csv').then(function(stateData){
    console.log(stateData);
    stateData.forEach(function(d){
        d.poverty = +d.poverty;
        d.povertyMoe= +d.povertyMoe;
        d.age= +d.age;
        d.ageMoe= +d.ageMoe;
        d.income= +d.income;
        d.incomeMoe= +d.incomeMoe;
        d.healthcare= +d.healthcare;
        d.healthcareLow= +d.healthcareLow;
        d.healthcareHigh = +d.healthcareHigh;
    });

    var yScale = d3.scaleLinear()
                    .domain([d3.max(stateData, d=>d.obesity),16])
                    .range([0,chartHeight]);

    var xScale = d3.scaleLinear()
                    .domain([8.5, d3.max(stateData, d=>d.poverty)])
                    .range([0,chartWidth]);

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append("g")
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(xAxis);
    chartGroup.append("g")
                .call(yAxis);

    chartGroup.append("text")             
                .attr("transform", `translate(${chartWidth/2}, ${chartHeight+32})`)
                .style("text-anchor", "middle")
                .text("% in Poverty");

    chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - chartMargin.left)
                .attr("x",0 - (chartHeight / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Obesity %");              

    var circlesGroup = chartGroup.selectAll("circle")
                .data(stateData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.poverty))
                .attr("cy", d => yScale(d.obesity))
                .attr("r", "15")
                .attr("fill", "blue")
                .attr("opacity", ".5")
 
   
    var textGroup = chartGroup.selectAll(".circletext")
               .data(stateData)
               .enter()
               .append("text")
               .attr("x", d => (xScale(d.poverty)-11))
               .attr("y", d => (yScale(d.obesity)+7))
               .text(d=>d.abbr)
               .attr("fill", "white");
});
};
makeResponsive();