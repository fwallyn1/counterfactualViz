const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(datasets) {
    var data_info = computeDataInfo(datasets[0]);
    var dataset = addChangesInfo(datasets[0]);
    draw_predict_class_circle(dataset["0.0"].y_x[0],"x",dataset[prob].y_true_x[0]);
    makeSelectFirstPage(dataset,data_info);

}

