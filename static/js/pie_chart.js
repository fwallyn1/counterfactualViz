

function drawPieChart(data,id_indiv){
    var width = 150
    height = 150
    margin = 10

    let n_changes = 0,
    n_no_changes = 0;

    for (let id_col of d3.range(0,data.col.length)){
         // valeur pour l'exemple'
         var x_val = data.X[id_col][id_indiv]
         // valeur pour le contrefactuel
         var cf_val = data.cf[id_col][id_indiv]

         if (x_val!==cf_val){
            n_changes +=1;
         }
         else{
            n_no_changes +=1;
         };

    }
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#pie")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = {changes: n_changes, no_changes: n_no_changes, }

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(["grey","blue"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('path')
        .attr('d', arcGenerator)
        .attr("id",function(d){return d.data.key})
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    console.log(n_changes+n_no_changes)
    svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return `${Math.round((d.data.value/(n_changes+n_no_changes))*100)}%`})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
}