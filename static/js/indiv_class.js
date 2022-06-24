function draw_predict_class_circle(proba,id_indiv){
    var good_col = "#d95f02",
        bad_col = "#1b9e77";
    var colorScale = d3.scaleLinear()
        .range([bad_col, "white", good_col]);
    
    var circle_proba = d3.select("#space")
                        .append("svg")
                        .attr("width",270)
                        .attr("height",52)

    circle_proba.append("circle")
                .attr("cx",270/2)
                .attr("cy",52/2)
                .attr("r")
}