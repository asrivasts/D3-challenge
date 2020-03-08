// @TODO: YOUR CODE HERE!
// Setting the dimensions for the SVG container
var svgHeight = 400;
var svgWidth = 1000;

// Margin for the plot
var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
}

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// clear svg is not empty
if (!d3.select("svg").empty()) {
    d3.select("svg").remove();
}

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);



// Append group element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function (result) {

    // Create three variables for x-axis, y-axis and the data labels
    var data = [];

    for (var i = 0; i < result.length; i++) {
        // var info = {
        //     age: parseInt(result[i].age),
        //     smokes: parseInt(result[i].smokes),
        //     label: result[i].abbr
        // };
        // data.push(info)
        result[i].smokes = +result[i].smokes;
        result[i].poverty = +result[i].poverty;
        result[i].povertyMoe = +result[i].povertyMoe;
        result[i].age = +result[i].age;
        result[i].ageMoe = +result[i].ageMoe;
        result[i].income = +result[i].income;
        result[i].incomeMoe = +result[i].incomeMoe;
        result[i].healthcare = +result[i].healthcare;
        result[i].healthcareLow = +result[i].healthcareLow;
        result[i].healthcareHigh = +result[i].healthcareHigh;
        result[i].obesity = +result[i].obesity;
        result[i].obesityLow = +result[i].obesityLow;
        result[i].obesityHigh = +result[i].obesityHigh;
        result[i].smokes = +result[i].smokes;
        result[i].smokesLow = +result[i].smokesLow;
        result[i].smokesHigh = +result[i].smokesHigh;
        

    }

    console.log(result);
    var x = d3.scaleLinear()
        .domain([d3.min(result, d => d.age), d3.max(result, d => d.age)])
        .range([0, width])

    var y = d3.scaleLinear()
        .domain([d3.min(result, d => d.smokes), d3.max(result, d => d.smokes)])
        .range([height, 0])
        
    var r = 9;
    chartGroup.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    chartGroup.append('g')
        .call(d3.axisLeft(y))

    chartGroup.append('g')
        .selectAll("dot")
        .data(result)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.age); })
        .attr("cy", function (d) { return y(d.smokes); })
        .attr("r", r)
        .style("fill", "#69b3a2")
        .style("stroke", "#999999")
    chartGroup.append('g')
        .selectAll("text")
        .data(result)
        .enter()
        .append('text')
        .text((d) => d.abbr)
        .attr("x", function (d) { return x(d.age)-(r-2); })
        .attr("y", function (d) { return y(d.smokes)+(r-4); })
        .style("fill", "#FFFFFF")
        .style("font-size", "10px")


    // console.log(data)

})