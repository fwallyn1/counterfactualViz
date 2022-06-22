
// Setting the default group
//const group = "All";

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

//draw main graph

function d3Chart(data,id_indiv,data_info){
    var len_max = d3.max(data.col.map(d => d.length) );
    const margin = {top: 0, right: 0, bottom: 0, left: 0},
    inner_margin = {top: 20, right: 10, bottom: 14*len_max*(0.7), left: 10},
    rect_width = 100,
    width = data.col.length * rect_width + inner_margin.left + inner_margin.right + 14*len_max*0.7,
    height = 500 - margin.top - margin.bottom + 14*len_max*(0.7),
    barPadding = 7,
    graph_misc = {ylabel:4, xlabelH :4, title:9},
    final_rect_width = (width - inner_margin.left - inner_margin.right)/data.col.length

    var good_col = "rgb(0, 30, 73)",
        bad_col = "rgb(0, 30, 73)";

    var col = data.col
    // construct svg
    var svg = d3.select('#d3')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    //.style('background-color', 'lightgrey');
    //légende
    

    //axe des variables
    var xAxis = svg.append("g");

    var x = d3.scaleBand() // axe catégoriel
                .domain(data.col) // le domaine est le nom des variables
                .rangeRound([inner_margin.left, width-inner_margin.right]);

    // axe des valeurs (hauteur)
    var y = d3.scaleLinear() // axe linéaire
    .domain([1,0]) // domaine [1,0]
    .rangeRound([inner_margin.top+50, height-inner_margin.bottom-50]);

    // faire apparaître l'axe des x
    xAxis.call(d3.axisBottom(x)
    .tickSize(0)) // on ne veut pas de tick visible              
    .call(g => g.select(".domain").remove())
    .attr("transform", `translate(0,${height-inner_margin.bottom})`)
    .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.5em")
      .attr("dy", ".15em")
      .attr("transform", "translate(20,0)rotate(-45)")
      //.attr("transform","translate(20,0)")
      .style("font-weight","bold")
        .style("font-size", "12px");

    //.attr("transform","translate(0,10)")
    //.attr("transform", "rotate(-65)");
    
    // contour du graphe
    contour = svg.append("g")

    // on parcourt les colonnes
    for (let id_col of d3.range(0,data.col.length)){
        // valeur pour l'exemple'
        var x_val = data.X[id_col][id_indiv]
        // valeur pour le contrefactuel
        var cf_val = data.cf[id_col][id_indiv]
        // valeur pour le nom de la colonne
        var col_name = data.col[id_col]
        //y_x val
        var y_x_val = data.y_x[id_indiv];
        //y_c val
        var y_c_val = data.y_c[id_indiv];

        var arrow_color = y_x_val===0 ? good_col : bad_col;
        // on ajoute un rectangle
        contour.append("rect")
        .attr("x",x(col_name))
        .attr("y",inner_margin.top)
        .attr("width",final_rect_width)
        .attr("height",height-inner_margin.top-inner_margin.bottom)
        .style("stroke","rgba(94, 92, 92, 0.8)")
        .style("fill","rgba(94, 92, 92, 0.1");

        
        // si type string
        if (typeof(x_val) === "string"){
            
            // si pas de changement avec le contrefactuel
            if (x_val===cf_val){
                //on ajoute le texte
                contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y",y(1/2)) // au milieu
            .text(`${x_val}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold")
            .style("font-size", "12px");
            }
            // si changement 
            else{
                // texte de l'exemple
                contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y",y(0.25)) // en bas du graphe
            .text(`${x_val}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold")
            .style("font-size", "12px");

            // texte du contrefactuel
            contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y",y(0.75))// en haut du graphe
            .text(`${cf_val}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold")
            .style("font-size", "12px");
            /*
            //fleche
            //triangle
            contour.append("svg:defs").append("svg:marker")
                .attr("id", "triangle")
                .attr("refX", 6)
                .attr("refY", 6)
                .attr("markerWidth", 30)
                .attr("markerHeight", 30)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0 0 12 6 0 12 3 6")
                .style("fill", "black");

            //line              
            contour.append("line")
            .attr("x1", (x(col_name)+(width/data.col.length)/2))
            .attr("y1", y(0.25)-10)
            .attr("x2", (x(col_name)+(width/data.col.length)/2))
            .attr("y2", y(0.75)+10)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("marker-end", "url(#triangle)");
            */
            const custom_arrow =   {p1 :[(x(col_name)+(width/data.col.length)/2)-10,y(0.25)-20],
            p2 : [(x(col_name)+(width/data.col.length)/2)-10,y(0.75)+20],
            p3 : [(x(col_name)+(width/data.col.length)/2),y(0.75)+10],
            p4 : [(x(col_name)+(width/data.col.length)/2)+10,y(0.75)+20],
            p5 : [(x(col_name)+(width/data.col.length)/2)+10,y(0.25)-20],
            p6 : [(x(col_name)+(width/data.col.length)/2)-10, y(0.25)-20]
        };
        contour.append("path")
        .attr('d', d3.line()([custom_arrow.p1,custom_arrow.p2,custom_arrow.p3,custom_arrow.p4,custom_arrow.p5,custom_arrow.p6]))
        .attr("fill",arrow_color)
        .attr("fill-opacity","0.5")
        .attr("stroke",arrow_color)
        .attr("stroke-opacity","0.8");
        }  
        }
        //Si quantitatif
        
        else{
            //min-max scaling
            var transf_x = (x_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
            var transf_cf = (cf_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
            
            if(x_val===cf_val){
                contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y", y(transf_x))
            .text(`${roundToTwo(x_val)}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold");
            }
            else{
                contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y", x_val>cf_val ? y(transf_x)-10 :  y(transf_x)+10)
            .text(`${roundToTwo(x_val)}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold");

            contour.append("text")
            .attr("x",(x(col_name)+(width/data.col.length)/2))
            .attr("y", x_val>cf_val ? y(transf_cf)+10 :  y(transf_cf)-10)
            .text(`${roundToTwo(cf_val)}`)
            .attr("text-anchor","middle")
            .style("font-weight","bold");
            
            /*
            //fleche
            //triangle
            contour.append("svg:defs").append("svg:marker")
                .attr("id", "triangle")
                .attr("refX", 6)
                .attr("refY", 6)
                .attr("markerWidth", 30)
                .attr("markerHeight", 30)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0 0 12 6 0 12 3 6")
                .style("fill", "black");

            //line              
            contour.append("line")
            .attr("x1",(x(col_name)+(width/data.col.length)/2))
            .attr("y1", x_val>cf_val ? y(transf_x) : y(transf_x)-20)
            .attr("x2", (x(col_name)+(width/data.col.length)/2))
            .attr("y2", x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+20)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("marker-end", "url(#triangle)");
            */
           
            const custom_arrow =   {p1 :[(x(col_name)+(width/data.col.length)/2)-10, x_val>cf_val ? y(transf_x) : y(transf_x)-10],
                                    p2 : [(x(col_name)+(width/data.col.length)/2)-10,x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+10],
                                    p3 : [(x(col_name)+(width/data.col.length)/2),x_val>cf_val ? y(transf_cf)-10 : y(transf_cf)],
                                    p4 : [(x(col_name)+(width/data.col.length)/2)+10,x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+10],
                                    p5 : [(x(col_name)+(width/data.col.length)/2)+10,x_val>cf_val ? y(transf_x) : y(transf_x)-10],
                                    p6 : [(x(col_name)+(width/data.col.length)/2)-10, x_val>cf_val ? y(transf_x) : y(transf_x)-10]
            };
            contour.append("path")
            .attr('d', d3.line()([custom_arrow.p1,custom_arrow.p2,custom_arrow.p3,custom_arrow.p4,custom_arrow.p5,custom_arrow.p6]))
            .attr("fill",arrow_color)
            .attr("fill-opacity","0.5")
            .attr("stroke",arrow_color)
            .attr("stroke-opacity","0.8")
            ;
            }  

            }                
        };        
        
    } ;

