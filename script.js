var margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
.range([ 0, width ])
.padding(0.2);
var xAxis = svg.append("g")
.attr("transform", "translate(0," + height + ")")

var y = d3.scaleLinear()
.range([ height, 0]);
var yAxis = svg.append("g")
.attr("class", "myYaxis")


function update(selectedVar) {

d3.text("data/info_general.csv", function(text) {

var rows = text.trim().split('\n');
var columns = rows.shift().split(';');

var data = rows.map(function(row) {
    var values = row.split(';');
    var obj = {};

    columns.forEach(function(column, index) {
        obj[column] = +values[index];
    });

    return obj;
});

x.domain(data.map(function(d) { return d.any; }))
xAxis.transition().duration(1000).call(d3.axisBottom(x))

y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
yAxis.transition().duration(1000).call(d3.axisLeft(y));

var labels = svg.append("g").attr("class", "labels");

var u = svg.selectAll("rect")
  .data(data)

u
  .enter()
  .append("rect")
  .merge(u)
  .transition()
  .duration(1000)
    .attr("x", function(d) { return x(d.any); })
    .attr("y", function(d) {
        var value = +d[selectedVar];
        return isNaN(value) ? 0 : y(value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
        var value = +d[selectedVar];
        if (isNaN(value)) {
            return 0;
        }
        return height - y(value);
    })
    .attr("fill", "#69b3a2");

svg.selectAll(".label").remove();

var labels = svg.selectAll(".label")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "label");

labels
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
        return x(d.any) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
    var value = +d[selectedVar];
    return isNaN(value) ? 0 : y(value)
    })
    .attr("dy", "-5px")
    .text(function (d) {
    var value = +d[selectedVar];
    return isNaN(value) ? "" : value;
    })
    .attr("text-anchor", "middle");

labels
    .selectAll("text")
    .filter(function (d) {
        var value = +d[selectedVar];
        return isNaN(value) || value === 0;
    })
    .remove();

})

}

update('votants')