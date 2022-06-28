

function onchange(dataset,data_info) {
    d3.selectAll("svg").remove();
    d3.selectAll("#text-display p").remove()
    d3.selectAll("#text-description .description-title,ul").remove()
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    /*d3.select('body')
		.append('p')
		.text(`${dataset.col[0]} +  is the last selected option.`)*/
    var proba_x = dataset.proba_x[selectValue];
    var proba_c = dataset.proba_c[selectValue];
    d3ChartOnlyChanges(dataset,selectValue,data_info);
    draw_predict_class_circle(proba_x,"x");
    draw_predict_class_circle(proba_c,"c");
    draw_percent_bar(proba_x);
    draw_percent_bar(proba_c);
    //draw_text_percent(proba_x,proba_c);
    text_description(dataset,selectValue);
    drawPieChart(dataset,selectValue);
    makeSelectChanges(dataset,data_info);
};

function switchToNoChanges(dataset,data_info){
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    d3.select("#d3 svg").remove();
    d3ChartNochanges(dataset,selectValue,data_info);
    makeSelectChanges(dataset,data_info);
    d3.select("#pop_text").remove()
}

function switchToOnlyChanges(dataset,data_info){
  selectValue = d3.select('select').property('value');
  selectValue = Number(selectValue);
  d3.select("#d3 svg").remove();
  d3ChartOnlyChanges(dataset,selectValue,data_info);
  makeSelectChanges(dataset,data_info);
  d3.select("#pop_text").remove()
}

function makeSelectChanges(dataset,data_info){
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
  .on("click",function(){switchToOnlyChanges(dataset,data_info);})
  
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
  .on("click",function(){switchToNoChanges(dataset,data_info);})
  };


function makeSelect(dataset,data_info){
var indiv_range = d3.range([dataset.X[0].length]);

var select = d3.select('#right-bar')
  .append('select')
  	.attr('class','select')
    .on('change', function(){onchange(dataset,data_info)});

var options = select
  .selectAll('option')
	.data(indiv_range).enter()
	.append('option')
	.text(function (d) { return d; })
    //.attr("value",function (d) { return d; });
  
  makeSelectChanges(dataset,data_info)

};

