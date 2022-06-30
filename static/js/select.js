
function parseProb(prob){
 /* Parse proba to add .0 when prob is 0 or 1 */
  var parse_prob = ""
  if (prob.length === 1){
    parse_prob = prob + ".0"
  }
  else{
    parse_prob = prob;
  }
  return parse_prob
}
function onchange(dataset,data_info) {
  /* Web page changes when switching to another individual 
  */

    /* Remove old values depending on the old individual */
    d3.selectAll("svg").remove();
    d3.selectAll("#text-display p").remove()
    d3.selectAll("#text-description .description-title,ul").remove()
    d3.select('#threshold').remove()
    /* get new individual ID*/
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    /* Construct new threshold range */
    makeSelectThreshold(dataset,data_info)
    /* Get new prob depending on the threshold */
    var prob = parseProb(d3.select("#threshold").property('value'))
    /* Get variables of interest */
    var proba_x = dataset[prob].proba_x[selectValue];
    var proba_c = dataset[prob].proba_c[selectValue];
    var y_x = dataset[prob].y_x[selectValue];
    var y_c = dataset[prob].y_c[selectValue];
    var y_true_x = dataset[prob].y_true_x[selectValue];
    /* Reconstruct the graphs and texts */
    d3ChartOnlyChanges(dataset[prob],selectValue,data_info[prob]);
    draw_predict_class_circle(y_x,"x",y_true_x);
    draw_predict_class_circle(y_c,"c");
    drawCircleStriped()
    draw_percent_bar(proba_x);
    draw_percent_bar(proba_c);
    text_description(dataset[prob],selectValue);
    drawPieChart(dataset[prob],selectValue);
    makeSelectChanges(dataset[prob],data_info[prob]);
};

function switchToNoChanges(dataset,data_info){
  /* Switch to the graph reprensenting features which don't change */
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    d3.select("#d3 svg").remove();
    d3ChartNochanges(dataset,selectValue,data_info);
    makeSelectChanges(dataset,data_info);
    d3.select("#pop_text").remove()
}

function switchToOnlyChanges(dataset,data_info){
  /* Switch to the graph reprensenting features which don't change */
  selectValue = d3.select('select').property('value');
  selectValue = Number(selectValue);
  d3.select("#d3 svg").remove();
  d3ChartOnlyChanges(dataset,selectValue,data_info);
  makeSelectChanges(dataset,data_info);
  d3.select("#pop_text").remove()
}

function makeSelectChanges(dataset,data_info){
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

function onChangeThreshold(dataset,data_info){
  /* Define the behaviour when the threshold change */
  d3.selectAll("svg").remove();
  d3.selectAll("#text-display p").remove()
  d3.selectAll("#text-description .description-title,ul").remove()
  var selectValue = d3.select('select').property('value');
  selectValue = Number(selectValue);
  var prob = parseProb(d3.select("input").property('value'))
  d3.select("#test-val")
  .html(prob)

  console.log(prob)
  var proba_x = dataset[prob].proba_x[selectValue];
  var proba_c = dataset[prob].proba_c[selectValue];
  var y_x = dataset[prob].y_x[selectValue];
  var y_c = dataset[prob].y_c[selectValue];
  var y_true_x = dataset[prob].y_true_x[selectValue];
  d3ChartOnlyChanges(dataset[prob],selectValue,data_info[prob]);
  draw_predict_class_circle(y_x,"x",y_true_x);
  draw_predict_class_circle(y_c,"c");
  drawCircleStriped();
  draw_percent_bar(proba_x);
  draw_percent_bar(proba_c);
  text_description(dataset[prob],selectValue);
  drawPieChart(dataset[prob],selectValue);
  makeSelectChanges(dataset[prob],data_info[prob]);
}

  function makeSelectThreshold(dataset,data_info){
    /* Construct the threshold input range */
    var selectValue = d3.select('select').property('value');
    var proba_x = dataset["0.0"].proba_x[selectValue];
    var y_x = dataset["0.0"].y_x[selectValue];
    d3.select('#form-threshold')
    .append('input')
    .attr('id','threshold')
    .attr("type","range")
    .attr("min",y_x === 0 ? Math.round(proba_x*10)/10 : 0)
    .attr("max",y_x === 0 ? 1 : Math.round(proba_x*10)/10)
    .attr("value",y_x === 0 ? 1 : 0)
    .attr("step",0.1)
    .on('change', function(){onChangeThreshold(dataset,data_info)})
    .property("value",y_x === 0 ? 1 : 0)
    d3.select("#test-val")
    .html(y_x === 0 ? 1 : 0)
  };

function makeSelect(dataset,data_info){
/*  Construct the select object in order to choose the individual to visualize*/
var prob = dataset["0.0"].y_x[0] === 0 ? "1.0" : "0.0";

var indiv_range = d3.range([dataset[prob].X[0].length]);

var select = d3.select('#right-bar')
  .append('select')
  	.attr('class','select')
    .on('change', function(){onchange(dataset,data_info)});

var options = select
  .selectAll('option')
	.data(indiv_range).enter()
	.append('option')
	.text(function (d) { return d; });
    //.attr("value",function (d) { return d; });
makeSelectChanges(dataset[prob],data_info[prob]);
//makeSelectThreshold(dataset,data_info);

};

