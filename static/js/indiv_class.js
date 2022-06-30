function draw_predict_class_circle(proba,type){
    var good_col = "#d95f02",
        bad_col = "#1b9e77";
    var colorScale = d3.scaleThreshold()
        .domain([0,0.5,1])
        .range([bad_col, bad_col, good_col,good_col]);
    if (type === "x"){
        var text = "Example: "
    }
    else{
        var text = "Counterfactual: "
    }

    var churn = proba<=0.5 ? "don't churn" : "churn";

    churn = churn.split(' ')

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

    circle_proba.append("text")
    .attr("y",proba<=0.5 ? "15" : "20")
    .attr("text-anchor","middle")
    .style("font-size",12)
    .selectAll('tspan').data(churn)
    .enter().append('tspan')
    .text(function(d) {
        return d;
        })
    .attr('dy', '0.8em').attr('x', 200);
}