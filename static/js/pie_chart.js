

function drawPieChart(data,id_indiv){
    /* Construct piechart and his legend to compare features which change and those which don't change
    between example and counterfactual*/
    var circle_width = 150
    height = 150
    legend_width = 300
    margin = 10
    color_change = "#69b3a2"
    color_no_change = "#404080"
    // The radius of the pieplot is half the circle_width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(circle_width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#pie")
    .append("svg")
        .attr("width", circle_width + legend_width)
        .attr("height", height)

    var pie_chart = svg.append("g")
        .attr("transform", "translate(" + circle_width / 2 + "," + height / 2 + ")");

    // Create data
    var changes_dict = {changes: data.changes[id_indiv].n_changes, no_changes: data.changes[id_indiv].n_no_changes }

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(changes_dict)
    .range([color_change,color_no_change]);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(changes_dict))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    pie_chart
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('path')
        .attr('d', arcGenerator)
        .attr("class",function(d){return d.data.key})
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    pie_chart
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return `${Math.round((d.data.value/(changes_dict.changes+changes_dict.no_changes))*100)}%`})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .attr("class",function(d){return d.data.key})
    .style("text-anchor", "middle")
    .style("font-size", 16)

    var legend = svg.append("g")
                    .attr("transform",(`translate(${circle_width},0)`));
    
    legend.append("circle").attr("cx",10).attr("cy",height/2 -20).attr("r", 6).style("fill", color_no_change).attr("class","no_changes")
    legend.append("circle").attr("cx",10).attr("cy",height/2 +20).attr("r", 6).style("fill", color_change).attr("class","changes")
    legend.append("text").attr("x", 20).attr("y", height/2 -20).text("Features which don't change").style("font-size", "15px").style("text-decoration","underline").attr("alignment-baseline","middle").attr("class","no_changes")
    legend.append("text").attr("x", 20).attr("y", height/2 +20).text("Features which change").style("font-size", "15px").style("text-decoration","underline").attr("alignment-baseline","middle").attr("class","changes")
}