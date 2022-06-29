const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(datasets) {
    var dataset = datasets[0]
    var data_info = {};
    
    for (prob of Object.keys(dataset)){
        data_info[prob] = []
        for (let id_col of d3.range(0,dataset[prob].col.length)){
            var data = dataset[prob].X[id_col].concat(dataset[prob].cf[id_col])
            data_info[prob].push(d3.extent(data))
        }
    };
    
    for (prob of Object.keys(dataset)){
        let n_changes = 0,
        col_names_changes = [],
        col_names_no_changes = [],
        n_no_changes = 0;
        dataset[prob].changes = []
        for (let id_indiv of d3.range(0,dataset[prob].X[0].length)){
            for (let id_col of d3.range(0,dataset[prob].col.length)){
                // valeur pour l'exemple'
                var x_val = dataset[prob].X[id_col][id_indiv]
                // valeur pour le contrefactuel
                var cf_val = dataset[prob].cf[id_col][id_indiv]

                if (x_val!==cf_val){
                    n_changes +=1;
                    col_names_changes.push(dataset[prob].col[id_col])
                }
                else{
                    n_no_changes +=1;
                    col_names_no_changes.push(dataset[prob].col[id_col])
                };
                
            }
            dataset[prob].changes.push({"n_changes" : n_changes,
            "n_no_changes" : n_no_changes,
            "col_names_changes" : col_names_changes,
            "col_names_no_changes" : col_names_no_changes})
            col_names_changes = [],
            col_names_no_changes = [],
            n_changes = 0,
            n_no_changes =0;
        }
    }
    
    var prob = dataset["0.0"].y_x[0] === 0 ? "1.0" : "0.0";
    d3ChartOnlyChanges(dataset[prob],0,data_info[prob]);
    drawCircleStriped();
    draw_predict_class_circle(dataset[prob].y_x[0],"x",dataset[prob].y_true_x[0]);
    draw_predict_class_circle(dataset[prob].y_c[0],"c");
    draw_percent_bar(dataset[prob].proba_x[0]);
    draw_percent_bar(dataset[prob].proba_c[0]);
    drawPieChart(dataset[prob],0);
    //draw_text_percent(dataset.proba_x[0],dataset.proba_c[0]);
    text_description(dataset[prob],0);
    makeSelect(dataset,data_info);
    var id_indiv = d3.select('select').property('value'); 
    var proba_x = dataset["0.0"].proba_x[id_indiv];
    var y_x = dataset["0.0"].y_x[id_indiv];
    var input_range = d3.select('#form-threshold')
    .append('input')
    .attr('id','threshold')
    .attr("type","range")
    .attr("min",y_x === 0 ? Math.round(proba_x*10)/10 : 0)
    .attr("max",y_x === 0 ? 1 : Math.round(proba_x*10)/10)
    .attr("value",y_x === 0 ? 1 : 0)
    .attr("step",0.1)
};