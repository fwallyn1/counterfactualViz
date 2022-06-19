

function onchange(dataset,data_info) {
    d3.selectAll("svg").remove();
    d3.selectAll("#text-display p").remove()
    selectValue = d3.select('select').property('value');
    selectValue = Number(selectValue);
    /*d3.select('body')
		.append('p')
		.text(`${dataset.col[0]} +  is the last selected option.`)*/
    var proba_x = dataset.proba_x[selectValue];
    var proba_c = dataset.proba_c[selectValue];
    d3Chart(dataset,selectValue,data_info);
    draw_percent_bar(proba_x);
    draw_percent_bar(proba_c);
    draw_text_percent(proba_x,proba_c);
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

};