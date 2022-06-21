function draw_text_percent(proba_x,proba_c){
    data = [`Le modèle prédit une probabilité de rester client de ${Math.round(proba_x*100)}% sur les données réélles.`,
    `Le modèle prédit une probabilité de rester client de ${Math.round(proba_c*100)}% sur les données contrafactuelles.`]
var text_pct = d3.select("#text-display")
        .selectAll("p")
        .data(data)
        .enter()
        .append("p")
        .text(function(d){return d;});

}
/*
function draw_text_percent(result){
    d3.select("#text-display")
            .append("p")
            .text(`Le modèle prédit une probabilité de rester client de ${Math.round(result*100)}%`)
    
    }*/