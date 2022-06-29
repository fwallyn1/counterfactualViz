function draw_predict_class_circle(predict_class,type,real_class=null){
    var  bad_col= "#d95f02",
    good_col = "#1b9e77";

    /* var colorScale = d3.scaleThreshold()
        .domain([0,0.5,1])
        .range([bad_col, bad_col, good_col,good_col]); */

    var color = predict_class === 1 ? bad_col : good_col
    if (type === "x"){
        var text = "Example* : "
    }
    else{
        var text = "Counterfactual : "
    }

    var churn = predict_class === 0 ? "don't churn" : "churn";

    churn = churn.split(' ')

    var circle_class = d3.select("#circle-class")
                        .append("svg")
                        .attr("width",250)
                        .attr("height",80);

    circle_class.append("circle")
                .attr("cx",200)
                .attr("cy",40)
                .attr("r",30)
                .style("fill",color)
                .style("stroke","black")

    if (real_class && predict_class!==real_class){
        circle_class.append("defs")
    .append("pattern")
    .attr("id","stripes")
    .attr("width","8")
    .attr("height","8")
    .attr("fill","red")
    .attr("patternUnits","userSpaceOnUse")
    .attr("patternTransform","rotate(60)")
    .append("line")
    .attr("x1","0")
    .attr("y1","0")
    .attr("x2","0")
    .attr("y2","8")
    .attr("stroke","grey")
    .attr("stroke-width","5");
    circle_class.append("circle")
                .attr("cx",200)
                .attr("cy",40)
                .attr("r",30)
                .style("fill","url(#stripes)")
                .style("stroke","black")
    }
    circle_class.append("text")
                .attr("x",150)
                .attr("y",40)
                .attr("text-anchor","end")
                .style("font-size",20)
                .style("font-weight","bold")
                .text(text)

    circle_class.append("text")
    .attr("y",predict_class===0 ? "30" : "35")
    .attr("text-anchor","middle")
    .style("font-size",14)
    .selectAll('tspan').data(churn)
    .enter().append('tspan')
    .text(function(d) {
        return d;
        })
    .attr('dy', '0.8em').attr('x', 200);
}