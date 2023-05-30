// Use Plotly's Python API to fetch the graph data from the Python script
Plotly.d3.json("data.json", function (error, response) {
    if (error) console.warn(error);
    
    // Create the graph using the received data
    Plotly.newPlot('graph', response.data, response.layout);
});
