const urls = [DataUrl],
indiv = id_indiv !== "None" ? id_indiv : 0,
thresh = threshold,
desc = description;
Promise.all(urls.map(url => d3.json(url))).then(run);
function run(datasets) {
    console.log(desc)
    var dataset = datasets[0]
    var data_info = {};
    console.log(dataset)
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
    if (threshold === "None"){
        var threshToPlot = thresholdsToPlot(dataset,indiv)
        var obj = {}
        for (prob of threshToPlot){
            obj[prob] = dataset[prob].proba_c[indiv]
        }
        var thresh = dataset["0.0"].y_x[indiv] === 1 ? Object.keys(obj).reduce((key, v) => obj[v] < obj[key] ? v : key) : Object.keys(obj).reduce((key, v) => obj[v] > obj[key] ? v : key)
    }
    else{
        var thresh = threshold;
    }
    d3.select("#threshold-text")
    .html("Threshold")
    //var prob = dataset["0.0"].y_x[indiv] === 0 ? "1.0" : "0.0";
    console.log(threshold);
    var data_thresh = dataset[thresh]
    indivValues = getIndivValues(data_thresh,indiv);
    var col_names_changes = data_thresh.changes[indiv].col_names_changes;
    var n_col_changes = data_thresh.changes[indiv].n_changes;
    var len_max = d3.max(data_thresh.col.map(d => d.length) )
    d3ChartOnlyChanges(col_names_changes,n_col_changes,len_max,indivValues,data_info[thresh],description);
    drawCircleStriped();
    draw_predict_class_circle(data_thresh.y_x[indiv],"x",data_thresh.y_true_x[indiv]);
    draw_predict_class_circle(data_thresh.y_c[indiv],"c");
    draw_percent_bar(data_thresh.proba_x[indiv]);
    draw_percent_bar(data_thresh.proba_c[indiv]);
    drawPieChart(data_thresh,indiv);
    //draw_text_percent(dataset.proba_x[0],dataset.proba_c[0]);
    text_description(data_thresh,indiv);
    makeSelect(dataset,data_info,thresh,indiv,description);
    var url = 'static/images/fleche.png';
    var image = new Image();
    image.src = url;
    document.getElementById('fleche').appendChild(image)
    var url2 = 'static/images/bouton_home.png';
    var image2 = new Image();
    image2.src = url2;
    document.getElementById('home-button').appendChild(image2)
    document.getElementById("home-button").onclick = function () {
        location.href = "/";
    };
    //makeSelectChanges(dataset[thresh],data_info[thresh],indiv);
    //makeSelectThreshold(dataset,data_info)
};