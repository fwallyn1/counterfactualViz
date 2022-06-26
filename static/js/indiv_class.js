function draw_predict_class_circle(proba,type){
    var good_col = "#d95f02",
        bad_col = "#1b9e77";
    var colorScale = d3.scaleLinear()
        .domain([0,0.5,1])
        .range([bad_col, "white", good_col]);
    if (type === "x"){
        var text = "Example : "
    }
    else{
        var text = "Counterfactual : "
    }
    
    var circle_proba = d3.select("#circle-class")
                        .append("svg")
                        .attr("width",250)
                        .attr("height",50);

    circle_proba.append("circle")
                .attr("cx",200)
                .attr("cy",25)
                .attr("r",20)
                .style("fill",colorScale(proba))
                .style("stroke","black")
                //.style("fill-opacity","0.9")
                //.style("stroke-opacity","1");

    circle_proba.append("text")
                .attr("x",150)
                .attr("y",30)
                .attr("text-anchor","end")
                .style("font-size",20)
                .style("font-weight","bold")
                .text(text)

    //console.log(proba)
}