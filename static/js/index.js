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
        console.log(dataset[prob])
        for (let id_indiv of d3.range(0,dataset[prob].X.length)){
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

    d3ChartOnlyChanges(dataset["0.5"],0,data_info["0.5"]);
    draw_predict_class_circle(dataset["0.5"].proba_x[0],"x");
    draw_predict_class_circle(dataset["0.5"].proba_c[0],"c");
    draw_percent_bar(dataset["0.5"].proba_x[0]);
    draw_percent_bar(dataset["0.5"].proba_c[0]);
    drawPieChart(dataset["0.5"],0);
    //draw_text_percent(dataset.proba_x[0],dataset.proba_c[0]);
    text_description(dataset["0.5"],0);
    makeSelect(dataset["0.5"],data_info["0.5"]);
};