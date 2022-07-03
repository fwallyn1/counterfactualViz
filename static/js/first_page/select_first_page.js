function makeSelectFirstPage(dataset,data_info){
    /*  Construct the select object in order to choose the individual to visualize*/
    
    var prob = "0.0"
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
    };

    function onchange(dataset,data_info) {
        /* Web page changes when switching to another individual */
      
          /* Remove old values depending on the old individual */
          d3.selectAll("svg").remove();
          /* get new individual ID*/
          selectValue = d3.select('select').property('value');
          selectValue = Number(selectValue);
          /* Get variables of interest */
          var proba_x = dataset["0.0"].proba_x[selectValue];
          var y_x = dataset["0.0"].y_x[selectValue];
          var y_true_x = dataset["0.0"].y_true_x[selectValue];
          var thresholds = thresholdsToPlot(dataset,selectValue)
          /* Reconstruct the graphs and texts */
          draw_predict_class_circle(y_x,"x",y_true_x);
          drawCircleStriped()
          draw_percent_bar(proba_x);
          drawScatterPlot(dataset,thresholds,selectValue)
      };


