function domination(setThresholdA,setThresholdB,y_x){
    if (y_x===0){
        if (setThresholdA.n_changes <= setThresholdB.n_changes && setThresholdA.proba_c > setThresholdB.proba_c){
            return {"dominant" : setThresholdA.threshold, "dominated" : setThresholdB.threshold}
        }
        else if (setThresholdA.n_changes >= setThresholdB.n_changes && setThresholdA.proba_c < setThresholdB.proba_c){
            return {"dominant" : setThresholdB.threshold, "dominated" : setThresholdA.threshold}
        }
        else{
            return null
        }
    }
    else{
        if (setThresholdA.n_changes <= setThresholdB.n_changes && setThresholdA.proba_c < setThresholdB.proba_c){
            return {"dominant" : setThresholdA.threshold, "dominated" : setThresholdB.threshold}
        }
        else if (setThresholdA.n_changes >= setThresholdB.n_changes && setThresholdA.proba_c > setThresholdB.proba_c){
            return {"dominant" : setThresholdB.threshold, "dominated" : setThresholdA.threshold}
        }
        else{
            return null
        }
    }
    
}

function thresholdsToPlot(dataset,id_indiv){
    var dominant = []
    var dominated = []
    for (let a of Object.keys(dataset)){
        //console.log({"threshold" : a, "n_changes" : dataset[a].changes[id_indiv].n_changes,"proba_c" : dataset[a].proba_c[id_indiv],"y_x" : dataset[a].y_x[id_indiv],"y_c" : dataset[a].y_c[id_indiv]})
        if (dataset[a].y_x[id_indiv] !== dataset[a].y_c[id_indiv]){
            for (let b of Object.keys(dataset)){
                //console.log("dominant",dominant, "dominated",dominated)
                if (dataset[b].y_x[id_indiv] !== dataset[b].y_c[id_indiv]){
                    var setThresholdA = {"threshold" : a, "n_changes" : dataset[a].changes[id_indiv].n_changes,"proba_c" : dataset[a].proba_c[id_indiv]}
                    var setThresholdB = {"threshold" : b, "n_changes" : dataset[b].changes[id_indiv].n_changes,"proba_c" : dataset[b].proba_c[id_indiv]}
                    
                    dom = domination(setThresholdA,setThresholdB,dataset[a].y_x[id_indiv])
                    console.log(setThresholdA,setThresholdB,dom)
                    if (dom){
                        if (!(dominated.includes(dom.dominated))){
                            dominated.push(dom.dominated)
                        }
                        if (!(dominated.includes(dom.dominant) || dominant.includes(dom.dominant))){
                            dominant.push(dom.dominant)
                        }
                        if (dominant.includes(dom.dominated)){
                            var index = dominant.indexOf(dom.dominated)
                            dominant.splice(index,1)
                        }
                    }
                }
            }
            if (!(dominant.includes(setThresholdA.threshold)) && !(dominated.includes(setThresholdA.threshold))){
                dominant.push(setThresholdA.threshold)
                console.log(dominant)
            }
        }
    }
    return dominant
}
