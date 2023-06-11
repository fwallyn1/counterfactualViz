
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
function onchange(dataset,data_info,description) {
  
  /* Web page changes when switching to another individual */

    /* Remove old values depending on the old individual */
    d3.selectAll("svg").remove();
    d3.selectAll("#text-display p").remove()
    d3.selectAll("#text-description .description-title,ul").remove()
    d3.select('#threshold').remove()
    /* get new individual ID*/
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    var threshToPlot = thresholdsToPlot(dataset,selectValue)
    var obj = {}
    for (prob of threshToPlot){
        //obj[prob] = dataset[prob].proba_c[selectValue]
        obj[prob] = dataset[prob].changes[indiv].n_changes
    }
    //var thresh = dataset["0.0"].y_x[selectValue] === 1 ? Object.keys(obj).reduce((key, v) => obj[v] < obj[key] ? v : key) : Object.keys(obj).reduce((key, v) => obj[v] > obj[key] ? v : key)
    var thresh = Object.keys(obj).reduce((key, v) => obj[v] < obj[key] ? v : key)
    /* Construct new threshold range */
    //makeSelectThreshold(dataset,data_info)
    /* Get new prob depending on the threshold */
    //var prob = parseProb(d3.select("#threshold").property('value'))
    /* Get variables of interest */
    var proba_x = dataset[thresh].proba_x[selectValue];
    var proba_c = dataset[thresh].proba_c[selectValue];
    var y_x = dataset[thresh].y_x[selectValue];
    var y_c = dataset[thresh].y_c[selectValue];
    var y_true_x = dataset[thresh].y_true_x[selectValue];
    /* Reconstruct the graphs and texts */
    document.getElementById("button-expert").setAttribute("onclick",`window.location.href='/expert?id_indiv=${selectValue}'`)
    d3ChartOnlyChanges(dataset[thresh],selectValue,data_info[thresh],description);
    draw_predict_class_circle(y_x,"x",y_true_x);
    draw_predict_class_circle(y_c,"c");
    drawCircleStriped()
    draw_percent_bar(proba_x);
    draw_percent_bar(proba_c);
    text_description(dataset[thresh],selectValue);
    drawPieChart(dataset[thresh],selectValue);
    makeSelectChanges(dataset[thresh],data_info[thresh],selectValue,description);
};

function switchToNoChanges(dataset,data_info,id_indiv,description){
  /* Switch to the graph reprensenting features which don't change */
    d3.select("#d3 svg").remove();
    d3ChartNochanges(dataset,id_indiv,data_info,description);
    makeSelectChanges(dataset,data_info,id_indiv,description);
    d3.select("#pop_text").remove()
}

function switchToOnlyChanges(dataset,data_info,id_indiv,description){
  /* Switch to the graph reprensenting features which don't change */
  d3.select("#d3 svg").remove();
  d3ChartOnlyChanges(dataset,id_indiv,data_info,description);
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

function onChangeThreshold(dataset,data_info,description){
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
  d3ChartOnlyChanges(dataset[prob],selectValue,data_info[prob],description);
  draw_predict_class_circle(y_x,"x",y_true_x);
  draw_predict_class_circle(y_c,"c");
  drawCircleStriped();
  draw_percent_bar(proba_x);
  draw_percent_bar(proba_c);
  text_description(dataset[prob],selectValue);
  drawPieChart(dataset[prob],selectValue);
  makeSelectChanges(dataset[prob],data_info[prob],id_indiv,description);
}

  function makeSelectThreshold(dataset,data_info,description){
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
    .on('change', function(){onChangeThreshold(dataset,data_info,description)})
    .property("value",y_x === 0 ? 1 : 0)
    d3.select("#test-val")
    .html(y_x === 0 ? 1 : 0)
  };

function makeSelect(dataset,data_info,thresh,id_indiv,description){
/*  Construct the select object in order to choose the individual to visualize*/
//var prob = dataset["0.0"].y_x[0] === 0 ? "1.0" : "0.0";
var indiv_range = d3.range([dataset[thresh].X[0].length]);

var select = d3.select('#choose-indiv')
  .append('select')
  	.attr('class','select')
    .on('change', function(){onchange(dataset,data_info,description)});

var options = select
  .selectAll('option')
	.data(indiv_range).enter()
	.append('option')
	.text(function (d) { return d; });
  d3.select("select").property("value",id_indiv)
    //.attr("value",function (d) { return d; });
/* d3.select("#right-bar")
  .append("input")
  .attr("id","button1")
  .attr("type","button")
  .attr("value", "Custom Counterfactual")
  .attr("onclick", function(d){var id = d3.select("select").property("value");
    return `window.location.href='/expert?id_indiv=${id}'`;}) */
    d3.select("#choose-other-counterfactual")
      .append("p")
      .attr("id","button-expert")
      .text("Click to choose other counterfactuals")
      .attr("onclick", function(d){var id = d3.select("select").property("value");
        return `window.location.href='/expert?id_indiv=${id}'`;}) 
makeSelectChanges(dataset[thresh],data_info[thresh],id_indiv,description);
//makeSelectThreshold(dataset,data_info);
};

