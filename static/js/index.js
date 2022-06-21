const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(dataset) {
    var data_info = [];
    for (let id_col of d3.range(0,dataset[0].col.length)){
        var data = dataset[0].X[id_col].concat(dataset[0].cf[id_col])
        data_info.push(d3.extent(data))
    };

    d3Chart(dataset[0],0,data_info);
    draw_percent_bar(dataset[0].proba_x[0]);
    draw_percent_bar(dataset[0].proba_c[0]);
    draw_text_percent(dataset[0].proba_x[0],dataset[0].proba_c[0]);
    makeSelect(dataset[0],data_info);
};