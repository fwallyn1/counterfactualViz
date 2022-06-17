
//Set up SVG dimensions and properties
const margin = {top: 50, right: 20, bottom: 50, left: 20},
width = 1000 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom,
barPadding = 7,
graph_misc = {ylabel:4, xlabelH :4, title:9};

// Setting the default group
const group = "All";

// Function to get the percentage values  for a specific selected group from the whole dataset.


function d3Chart(data){
    
    var svg = d3.select('#d3')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('background-color', 'lightgrey')

    var xAxis = svg.append("g");

    var x = d3.scaleBand() // axe catégoriel
                .domain(data.col) // le domaine est le nom des états
                .rangeRound([0, width]);

    xAxis.call(d3.axisBottom(x)
    .tickSize(0)) // on ne veut pas de tick visible              
    .call(g => g.select(".domain").remove())
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .selectAll("text")
    //.attr("transform","translate(0,10)")
    //.attr("transform", "rotate(-65)");

    contour = svg.append("g")
    for (let id_col of d3.range(0,data.col.length)){
        contour.append("rect")
        .attr("x",x(data.col[id_col]))
        .attr("y",margin.top)
        .attr("width",width/data.col.length)
        .attr("height",height-margin.top-margin.bottom)
        .style("stroke","red")
        .style("fill","none");
        
        if (typeof(data.X[0][id_col]) === "string"){
            var y_temp = d3.scaleBand() // axe catégoriel
            .domain([data.X[0][id_col],data.cf[0][id_col]]) // le domaine est le nom des états
            .rangeRound([margin.top+50, height-margin.bottom-50]);
            
            contour.append("circle")
            .attr("cx",x(data.col[id_col]))
            .attr("cy",y_temp(data.X[0][id_col]))
            .attr("r",10)
            .style("fill","red");
        };
        
        
    } ;


    /*d3.select('body')
    .selectAll('p')
    .data(data.col)
    .enter()
    .append('p')
    .text(function(d){return(d)});*/
}

