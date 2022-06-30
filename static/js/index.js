const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(dataset) {
    var data_info = [];
    for (let id_col of d3.range(0,dataset[0].col.length)){
        var data = dataset[0].X[id_col].concat(dataset[0].cf[id_col])
        data_info.push(d3.extent(data))
    };
    let n_changes = 0,
    col_names_changes = [],
    col_names_no_changes = [],
    n_no_changes = 0;
    dataset[0].changes = []

    for (let id_indiv of d3.range(0,dataset[0].X.length)){
        for (let id_col of d3.range(0,dataset[0].col.length)){
            // valeur pour l'exemple'
         var x_val = dataset[0].X[id_col][id_indiv]
         // valeur pour le contrefactuel
         var cf_val = dataset[0].cf[id_col][id_indiv]

         if (x_val!==cf_val){
            n_changes +=1;
            col_names_changes.push(dataset[0].col[id_col])
         }
         else{
            n_no_changes +=1;
            col_names_no_changes.push(dataset[0].col[id_col])
         };
            
        }
        dataset[0].changes.push({"n_changes" : n_changes,
        "n_no_changes" : n_no_changes,
        "col_names_changes" : col_names_changes,
        "col_names_no_changes" : col_names_no_changes})
        col_names_changes = [],
        col_names_no_changes = [],
        n_changes = 0,
        n_no_changes =0;

    }

    d3ChartOnlyChanges(dataset[0],0,data_info);
    draw_predict_class_circle(dataset[0].y_x[0],"x");
    draw_predict_class_circle(dataset[0].y_c[0],"c");
    draw_percent_bar(dataset[0].proba_x[0]);
    draw_percent_bar(dataset[0].proba_c[0]);
    drawPieChart(dataset[0],0);
    //draw_text_percent(dataset[0].proba_x[0],dataset[0].proba_c[0]);
    text_description(dataset[0],0);
    makeSelect(dataset[0],data_info);
};