
//Set up SVG dimensions and properties
const margin = {top: 50, right: 20, bottom: 50, left: 20},
width = 1000 - margin.left - margin.right,
height = 700 - margin.top - margin.bottom,
barPadding = 7,
graph_misc = {ylabel:4, xlabelH :4, title:9};

// Setting the default group
const group = "All";




function d3Chart(data,id_indiv,data_info){
    //var percentBarX = draw_percent_bar(data.proba_x[id_indiv]);
    var svg = d3.select('#d3')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('background-color', 'lightgrey');
    

    var xAxis = svg.append("g");

    var x = d3.scaleBand() // axe catégoriel
                .domain(data.col) // le domaine est le nom des états
                .rangeRound([0, width]);

    var y = d3.scaleLinear() // axe catégoriel
    .domain([1,0]) // le domaine est le nom des états
    .rangeRound([margin.top+50, height-margin.bottom-50]);



    xAxis.call(d3.axisBottom(x)
    .tickSize(0)) // on ne veut pas de tick visible              
    .call(g => g.select(".domain").remove())
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .selectAll("text");
    //.attr("transform","translate(0,10)")
    //.attr("transform", "rotate(-65)");

    contour = svg.append("g")
    for (let id_col of d3.range(0,data.col.length)){
        var x_val = data.X[id_col][id_indiv]
        var cf_val = data.cf[id_col][id_indiv]
        var col_name = data.col[id_col]
        contour.append("rect")
        .attr("x",x(col_name))
        .attr("y",margin.top)
        .attr("width",width/data.col.length)
        .attr("height",height-margin.top-margin.bottom)
        .style("stroke","black")
        .style("fill","none");
        
        if (typeof(x_val) === "string"){
            
            
            if (x_val===cf_val){
                contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y",y(1/2))
            .text(`${x_val}`)
            .style("fill","blue")
            .style("font-size", "10px");
            }
            else{
                contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y",y(0.25))
            .text(`${x_val}`)
            .style("fill","blue")
            .style("font-size", "10px");

            contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y",y(0.75))
            .text(`${cf_val}`)
            .style("fill","red")
            .style("font-size", "10px");
            contour.append("svg:defs").append("svg:marker")
                .attr("id", "triangle")
                .attr("refX", 6)
                .attr("refY", 6)
                .attr("markerWidth", 30)
                .attr("markerHeight", 30)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0 0 12 6 0 12 3 6")
                .style("fill", "black");

            //line              
            contour.append("line")
            .attr("x1", x(col_name)+60)
            .attr("y1", y(0.25)-10)
            .attr("x2", x(col_name)+60)
            .attr("y2", y(0.75)+10)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("marker-end", "url(#triangle)");
            }
        }
        else{
            var transf_x = (x_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
            var transf_cf = (cf_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
            
            if(x_val===cf_val){
                contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y", y(transf_x))
            .text(`${x_val}`)
            .style("fill","blue");
            }
            else{
                contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y", y(transf_x))
            .text(`${x_val}`)
            .style("fill","blue");

            contour.append("text")
            .attr("x",x(col_name)+50)
            .attr("y", y(transf_cf))
            .text(`${cf_val}`)
            .style("fill","red");

            contour.append("svg:defs").append("svg:marker")
                .attr("id", "triangle")
                .attr("refX", 6)
                .attr("refY", 6)
                .attr("markerWidth", 30)
                .attr("markerHeight", 30)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0 0 12 6 0 12 3 6")
                .style("fill", "black");

            //line              
            contour.append("line")
            .attr("x1", x(col_name)+60)
            .attr("y1", x_val>cf_val ? y(transf_x) : y(transf_x)-20)
            .attr("x2", x(col_name)+60)
            .attr("y2", x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+20)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("marker-end", "url(#triangle)");

            }                
        };        
        
    } ;

//return svg.node()
}

