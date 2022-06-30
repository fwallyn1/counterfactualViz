function computeDataInfo (dataset){
    var data_info = {};
    for (prob of Object.keys(dataset)){
        data_info[prob] = []
        for (let id_col of d3.range(0,dataset[prob].col.length)){
            var data = dataset[prob].X[id_col].concat(dataset[prob].cf[id_col])
            data_info[prob].push(d3.extent(data))
        }
        };
    return data_info
}
function addChangesInfo(dataset){

    
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
    return dataset
}
