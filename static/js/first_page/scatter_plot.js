function drawScatterPlot(dataset,thresholds,id_indiv=0){
    var margin = {top: 100, right: 200, bottom: 50, left: 60},
    width = 960 ,
    height = 600 ;

    var good_col = "#d95f02",
        bad_col = "#1b9e77";
    var y_x_val = dataset["0.0"].y_x[id_indiv]
    var color = y_x_val===0 ? good_col : bad_col;

    // append the svg object to the body of the page
    var svg = d3.select("#d3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    //Read the data
    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, d3.max(Object.values(dataset), d=> d.changes[id_indiv].n_changes +1)])
      .range([margin.left,width-margin.right])
    svg.append("g")
      .attr("class","axis")
      .attr("transform", `translate(0,${height-margin.bottom})`)
      .call(d3.axisBottom(x)
              .ticks(d3.max(Object.values(dataset), d=> d.changes[id_indiv].n_changes +1))
              .tickSize(5));
    svg.append("g")
    .attr("class","axis")
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisBottom(x)
            .ticks(d3.max(Object.values(dataset), d=> d.changes[id_indiv].n_changes +1))
            .tickSize(height-margin.top-margin.bottom)).call(g => g.select(".domain").remove())
                          .selectAll("text").remove();
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 1])
      .range([height-margin.bottom, margin.top]);
    svg.append("g")
      .attr("class","axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    
      svg.append("g")
      .attr("class","axis")
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisLeft(y).tickSize(width-margin.left-margin.right))
      .call(g => g.select(".domain").remove())
      .selectAll("text").remove();

    //console.log(thresholds)
    var pointsToPlot = thresholds.map(x => [dataset[x].proba_c[id_indiv],dataset[x].changes[id_indiv].n_changes,x])
    console.log(pointsToPlot)
    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(pointsToPlot)
      .enter()
      .append("a")
      .attr("xlink:href",function (d) { return `/counterfactual?id_indiv=${id_indiv}&threshold=${d[2]}`; })
        .append("circle")
        .attr("cx", function (d) { return x(d[1]); } )
        .attr("cy", function (d) { return y(d[0]); } )
        .attr("r", 8)
        .style("fill", color)
        .on("mouseover",function(d){svg.append("line")
                                      .attr("class","dot-line")
                                      .attr("x1",x(0))
                                      .attr("x2",x(d[1]))
                                      .attr("y1",y(d[0]))
                                      .attr("y2",y(d[0]))
                                      .attr("stroke","black")
                                      .attr("stroke-width",2);
                                    svg.append("line")
                                    .attr("class","dot-line")
                                      .attr("x1",x(d[1]))
                                      .attr("x2",x(d[1]))
                                      .attr("y1",y(0))
                                      .attr("y2",y(d[0]))
                                      .attr("stroke","black")
                                      .attr("stroke-width",2);})
      .on("mouseout",function(d){d3.selectAll("#d3 .dot-line").remove()})
        .append("title")
        .text(function(d){return `Sparcity: ${d[1]}, Score of counterfactual: ${Math.round(d[0]*1000)/1000}`;})
        .attr("font-size",10)
    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width-margin.right)
    .attr("y", height -margin.bottom+30)
    .text("Sparcity")
    .style("font-size","1.2em");

    // Y axis label:
    svg.append("g")
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform","rotate(-90)")
    .attr("y", margin.left-30)
    .attr("x", -margin.top)
    .text("Score")
    .style("font-size","1.2em");

  svg.append("g")
    .append("text")
    .attr("x",margin.left)
    .attr("y",margin.top-20)
    .text("Proposal of counterfactuals according to their output churn score and their sparcity")
    .style("font-size","1.3em")
    .style("font-weight","bold")
}