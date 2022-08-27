const urls = [DataUrl],
thresh = "None",
desc = description;
Promise.all(urls.map(url => d3.json(url))).then(run);
function run(datasets) {
    console.log("DATA INDEX",data_from_flask)
    console.log("CF INDEX",counterfactuals)
    console.log((data_from_flask === null))
    var dataset = (data_from_flask === null) ? counterfactuals : data_from_flask 
    console.log(dataset === null | dataset === undefined);
    var dataset = (dataset === null | dataset === undefined) ? dataset = {'0.0': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[50], [52.46], [3286.51], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['No'], ['No'], ['No internet service'], ['Yes'], ['Yes'], ['Yes'], ['No internet service'], ['Yes'], ['Two year'], ['No'], ['Bank transfer (automatic)']], 'y_x': [0], 'y_c': [0], 'proba_x': [0.3708881735801697], 'proba_c': [0.02139226533472538], 'y_true_x': [1]}, '0.1': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[41], [58.34], [2847.65], ['Female'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['DSL'], ['Yes'], ['No internet service'], ['No'], ['Yes'], ['No'], ['No internet service'], ['Month-to-month'], ['No'], ['Bank transfer (automatic)']], 'y_x': [0], 'y_c': [0], 'proba_x': [0.3708881735801697], 'proba_c': [0.037764228880405426], 'y_true_x': [1]}, '0.2': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[33], [61.85], [2386.48], ['Male'], [1], ['No'], ['Yes'], ['Yes'], ['No'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['One year'], ['Yes'], ['Bank transfer (automatic)']], 'y_x': [0], 'y_c': [0], 'proba_x': [0.3708881735801697], 'proba_c': [0.10980316996574402], 'y_true_x': [1]}, '0.3': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[23], [66.04], [1653.25], ['Female'], [1], ['Yes'], ['No'], ['Yes'], ['No'], ['Fiber optic'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Mailed check']], 'y_x': [0], 'y_c': [0], 'proba_x': [0.3708881735801697], 'proba_c': [0.46082207560539246], 'y_true_x': [1]}, '0.4': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[16], [70.23], [1410.63], ['Female'], [0], ['Yes'], ['No'], ['Yes'], ['No'], ['DSL'], ['No'], ['Yes'], ['No'], ['No'], ['No'], ['No'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [0], 'proba_x': [0.3708881735801697], 'proba_c': [0.30636924505233765], 'y_true_x': [1]}, '0.5': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[11], [74.77], [1116.62], ['Female'], [0], ['No'], ['No'], ['Yes'], ['No'], ['Fiber optic'], ['No'], ['Yes'], ['No'], ['No'], ['Yes'], ['No'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.6464419364929199], 'y_true_x': [1]}, '0.6': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[9], [77.18], [930.94], ['Male'], [0], ['No'], ['Yes'], ['Yes'], ['No'], ['Fiber optic'], ['No'], ['No'], ['Yes'], ['No'], ['No'], ['No'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.5893891453742981], 'y_true_x': [1]}, '0.7': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[6], [81.1], [680.53], ['Male'], [0], ['No'], ['No'], ['Yes'], ['No'], ['Fiber optic'], ['No internet service'], ['No'], ['No'], ['No'], ['No'], ['Yes'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.6292684078216553], 'y_true_x': [1]}, '0.8': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[5], [83.71], [578.09], ['Male'], [1], ['No'], ['No'], ['Yes'], ['Yes'], ['Fiber optic'], ['No'], ['No'], ['No'], ['No'], ['No'], ['Yes'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.7773029208183289], 'y_true_x': [1]}, '0.9': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[4], [86.05], [432.39], ['Female'], [0], ['No'], ['No'], ['Yes'], ['Yes'], ['Fiber optic'], ['No'], ['No'], ['No'], ['No'], ['No'], ['No'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.7585144639015198], 'y_true_x': [1]}, '1.0': {'col': ['tenure', 'MonthlyCharges', 'TotalCharges', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod'], 'X': [[1], [20.0], [250.0], ['Male'], [0], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['No'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Yes'], ['Month-to-month'], ['Yes'], ['Bank transfer (automatic)']], 'cf': [[3], [87.92], [349.11], ['Female'], [1], ['No'], ['No'], ['Yes'], ['No'], ['Fiber optic'], ['No'], ['No'], ['No'], ['No'], ['No'], ['Yes'], ['Month-to-month'], ['Yes'], ['Electronic check']], 'y_x': [0], 'y_c': [1], 'proba_x': [0.3708881735801697], 'proba_c': [0.7715253829956055], 'y_true_x': [1]}} : dataset = dataset
    var full_dataset = datasets[0]
    var data_info = {};
    console.log(dataset)
    for (prob of Object.keys(full_dataset)){
        data_info[prob] = []
        for (let id_col of d3.range(0,full_dataset[prob].col.length)){
            var data = full_dataset[prob].X[id_col].concat(full_dataset[prob].cf[id_col])
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
        var threshToPlot = thresholdsToPlot(dataset,0)
        var obj = {}
        for (prob of threshToPlot){
            obj[prob] = dataset[prob].proba_c[0]
        }
        var thresh = dataset["0.0"].y_x[0] === 1 ? Object.keys(obj).reduce((key, v) => obj[v] < obj[key] ? v : key) : Object.keys(obj).reduce((key, v) => obj[v] > obj[key] ? v : key)
    }
    else{
        var thresh = threshold;
    }
    d3.select("#threshold-text")
    .html("Threshold")
    //var prob = dataset["0.0"].y_x[indiv] === 0 ? "1.0" : "0.0";
    console.log(threshold);
    var data_thresh = dataset[thresh]
    indivValues = getIndivValues(data_thresh,0);
    var col_names_changes = data_thresh.changes[0].col_names_changes;
    var n_col_changes = data_thresh.changes[0].n_changes;
    var len_max = d3.max(data_thresh.col.map(d => d.length) )
    d3ChartOnlyChanges(col_names_changes,n_col_changes,len_max,indivValues,data_info[thresh],description);
    //drawCircleStriped();
    console.log(data_thresh)
    draw_predict_class_circle(data_thresh.y_x[0],"x",data_thresh.y_x[0]);
    draw_predict_class_circle(data_thresh.y_c[0],"c");
    draw_percent_bar(data_thresh.proba_x[0]);
    draw_percent_bar(data_thresh.proba_c[0]);
    drawPieChart(data_thresh,0);
    //draw_text_percent(dataset.proba_x[0],dataset.proba_c[0]);
    text_description(data_thresh,0);
    makeSelectCustom(dataset,data_info,thresh,0,description);
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