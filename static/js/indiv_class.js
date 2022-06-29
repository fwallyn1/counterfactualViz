function draw_predict_class_circle(predict_class,type){
    var  bad_col= "#d95f02",
    good_col = "#1b9e77";

    /* var colorScale = d3.scaleThreshold()
        .domain([0,0.5,1])
        .range([bad_col, bad_col, good_col,good_col]); */

    var color = predict_class === 1 ? bad_col : good_col
    if (type === "x"){
        var text = "Example : "
    }
    else{
        var text = "Counterfactual : "
    }

    var churn = predict_class === 0 ? "don't churn" : "churn";

    churn = churn.split(' ')

    var circle_class = d3.select("#circle-class")
                        .append("svg")
                        .attr("width",250)
                        .attr("height",50);

    circle_class.append("circle")
                .attr("cx",200)
                .attr("cy",25)
                .attr("r",20)
                .style("fill",color)
                .style("stroke","black")
                //.style("fill-opacity","0.9")
                //.style("stroke-opacity","1");

    circle_class.append("text")
                .attr("x",150)
                .attr("y",30)
                .attr("text-anchor","end")
                .style("font-size",20)
                .style("font-weight","bold")
                .text(text)

    circle_class.append("text")
    .attr("y",predict_class===0 ? "15" : "20")
    .attr("text-anchor","middle")
    .style("font-size",12)
    .selectAll('tspan').data(churn)
    .enter().append('tspan')
    .text(function(d) {
        return d;
        })
    .attr('dy', '0.8em').attr('x', 200);
}