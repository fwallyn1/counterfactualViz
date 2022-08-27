function switchToNoChanges(dataset,data_info,id_indiv,description){
    /* Switch to the graph reprensenting features which don't change */
      d3.select("#d3 svg").remove();
      indivValues = getIndivValues(dataset,id_indiv);
      var col_names_no_changes = dataset.changes[id_indiv].col_names_no_changes;
      var n_col_no_changes = dataset.changes[id_indiv].n_no_changes;
      var len_max = d3.max(dataset.col.map(d => d.length) )
      d3ChartNochanges(col_names_no_changes,n_col_no_changes,len_max,indivValues,data_info,description);
      makeSelectChanges(dataset,data_info,id_indiv,description);
      d3.select("#pop_text").remove()
  }
  
  function switchToOnlyChanges(dataset,data_info,id_indiv,description){
    /* Switch to the graph reprensenting features which don't change */
    d3.select("#d3 svg").remove();
    indivValues = getIndivValues(dataset,id_indiv);
    var col_names_changes = dataset.changes[id_indiv].col_names_changes;
    var n_col_changes = dataset.changes[id_indiv].n_changes;
    var len_max = d3.max(dataset.col.map(d => d.length))
    d3ChartOnlyChanges(col_names_changes,n_col_changes,len_max,indivValues,data_info,description);
    makeSelectChanges(dataset,data_info,id_indiv,description);
    d3.select("#pop_text").remove()
  }
  
  function makeSelectChanges(dataset,data_info,id_indiv,description){
    /* Defines "on" properties of the pie chart and his legend */
    d3.selectAll(".changes")
    .on(
      "mouseover", function() {
        d3.selectAll(".changes").style("cursor", "pointer")
                        .style("font-weight","bold")
                        .style("stroke-width", "4px")
        d3.select("#pie svg")
          .append("text")
          .attr("x",150)
          .attr("y",15)
          .attr("id","pop_text")
          .text("(click to see features which change)")})
    .on("mouseout",function() {
      d3.selectAll(".changes").style("cursor", "default")
                    .style("font-weight","normal")
                    .style("stroke-width", "2px"); 
      d3.select("#pop_text").remove()
    })
    .on("click",function(){switchToOnlyChanges(dataset,data_info,id_indiv,description);})
    
    d3.selectAll(".no_changes")
    .on(
      "mouseover", function() {
        d3.selectAll(".no_changes").style("cursor", "pointer")
                      .style("font-weight","bold")
                      .style("stroke-width", "4px")
        d3.select("#pie svg")
        .append("text")
        .attr("x",150)
        .attr("y",15)
        .attr("id","pop_text")
        .text("(click to see features which don't change)")})
    .on("mouseout",function() {
      d3.selectAll(".no_changes").style("cursor", "default")
                    .style("font-weight","normal")
                    .style("stroke-width", "2px"); 
      d3.select("#pop_text").remove()
    })
    .on("click",function(){switchToNoChanges(dataset,data_info,id_indiv,description);})
    };
function makeSelectCustom(dataset,data_info,thresh,id_indiv,description){
    /*  Construct the select object in order to choose the individual to visualize*/
    //var prob = dataset["0.0"].y_x[0] === 0 ? "1.0" : "0.0";
    makeSelectChanges(dataset[thresh],data_info[thresh],id_indiv,description)
    d3.select("#choose-other-counterfactual")
        .append("p")
        .attr("id","button-expert")
        .text("Click to choose other counterfactuals")
        .attr("onclick", function(d){var id = 0;
        return `window.location.href='/expert?id_indiv=${id}&data=${JSON.stringify(dataset)}'`;})
}