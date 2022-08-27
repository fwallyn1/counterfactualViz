const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(datasets) {
    var data_info = computeDataInfo(datasets[0]);
    var dataset = data_from_flask ? addChangesInfo(data_from_flask) : addChangesInfo(datasets[0]);
    console.log(dataset)
    draw_predict_class_circle(dataset["0.0"].y_x[id_indiv],"x",dataset[prob].y_true_x[id_indiv]);
    draw_percent_bar(dataset["0.0"].proba_x[id_indiv]);
    drawCircleStriped();
    makeSelectFirstPage(dataset,data_info,id_indiv);
    var  thresholds = thresholdsToPlot(dataset,id_indiv);
    console.log("THRESHOLDS",thresholds)
    drawScatterPlot(dataset,thresholds,id_indiv);
    var url2 = 'static/images/bouton_home.png';
    var image2 = new Image();
    image2.src = url2;
    document.getElementById('home-button').appendChild(image2)
    document.getElementById("home-button").onclick = function () {
        location.href = "/";
    };
}

