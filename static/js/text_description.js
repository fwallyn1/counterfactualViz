function text_description(data,id_indiv){
    var y_x = data.y_x[id_indiv],
    y_c = data.y_c[id_indiv];

    if (y_x===y_c){
        d3.select("#text-description")
        .append("p")
        .attr("class","description-title")
        .text("Counterfactual doesn't change the prediction class.")
    }
    else{
        if (y_c===1){
           d3.select("#text-description")
        .append("p")
        .attr("class","description-title")
        .text("Counterfactual reverts to a positive prediction.")
        }
        else{
            d3.select("#text-description")
        .append("p")
        .attr("class","description-title")
        .text("Counterfactual reverts to a negative prediction.")
        }
    }
    d3.select("#text-description")
        .append("p")
        .attr("class","description-title")
        .text("Feature changes for the counterfatual :")
    var list = d3.select("#text-description")
    .append("ul")
    for (let id_col of d3.range(0,data.col.length)){
        x_val = data.X[id_col][id_indiv],
        cf_val = data.cf[id_col][id_indiv];
        if (x_val !==cf_val){
            var col_name = data.col[id_col];
            //d3.select("#text-description")
            list.append("li")
            .text(`Feature ${col_name} has to change from ${x_val} to ${cf_val}`)
        };
        
    };
};