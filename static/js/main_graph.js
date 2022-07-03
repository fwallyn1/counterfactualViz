
// Setting the default group
//const group = "All";

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function slice_text(string){
    var finalSliceString = [];
    if (string.length >=15){
        if(string.includes(" ")){
            sliceString = string.split(' ')
            var sep = " "
            }
        else if (string.includes("_")){
            sliceString = string.split('_')
            var sep = "_"
            }
        else if (string.includes("-")){
                sliceString = string.split('-')
                var sep = "-"
                }
         else{
            var nbChar = Math.floor(string.length/2)
            sliceString = [string.slice(nbChar),string.slice(-(string.length-nbChar))]
         }
        var n = sliceString.length
        var nb_char_temp = sliceString[0].length
        var char_temp = sliceString[0]
        for(let i = 1; i < n; i++){
            let len_str = sliceString[i].length
            if(nb_char_temp+len_str+1<=15){
                char_temp = char_temp.concat(sep,sliceString[i]);
                nb_char_temp += len_str;
            }
            else{
                finalSliceString.push(char_temp);
                char_temp = sliceString[i];
                nb_char_temp = 0;
            }
        }
        finalSliceString.push(char_temp)
        }
    else{
        finalSliceString.push(string)
    }
    
    return(finalSliceString)
    }

//draw main graph

function d3ChartNochanges(data,id_indiv,data_info){
    var len_max = d3.max(data.col.map(d => d.length) );
    const margin = {top: 0, right: 0, bottom: 0, left: 0},
    inner_margin = {top: 20, right: 10, bottom: 8*len_max*(0.7), left: 10},
    //base rectangle width
    rect_width = 100,
    n_col_no_changes = data.changes[id_indiv].n_no_changes,

    // width & height of svg in function of feature name length
    width = n_col_no_changes * rect_width + inner_margin.left + inner_margin.right + 14*len_max*0.7,
    height = 400 - margin.top - margin.bottom + 8*len_max*(0.7),
    //barPadding = 7,
    //graph_misc = {ylabel:4, xlabelH :4, title:9},

    //final rect width to fit svg width
    final_rect_width = (width - inner_margin.left - inner_margin.right)/n_col_no_changes

    //colors used for arrows
    var good_col = "#d95f02",
        bad_col = "#1b9e77";
    // array of feature names
    var col = data.col
    // construct svg
    var svg = d3.select('#d3')
    .style("height",height+60)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns","http://www.w3.org/2000/svg")
    .attr("overflow","scroll");

    //axe des variables
    var xAxis = svg.append("g");

    var x = d3.scaleBand() // axe catégoriel
                .domain(data.changes[id_indiv].col_names_no_changes) // le domaine est le nom des variables
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
      .style("font-weight","bold")
        .style("font-size", "12px");

    
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
        
        if(x_val===cf_val){
            // on ajoute un rectangle
            contour.append("rect")
            .attr("x",x(col_name))
            .attr("y",inner_margin.top)
            .attr("width",final_rect_width)
            .attr("height",height-inner_margin.top-inner_margin.bottom)
            .style("stroke","rgba(94, 92, 92, 0.8)")
            .style("fill","rgba(94, 92, 92, 0.1");
            if (typeof(x_val) === "string"){
                x_val = slice_text(x_val);
                cf_val = slice_text(cf_val);
                //on ajoute le texte
                contour.append("text")
                .attr("x",(x(col_name)+(width/n_col_no_changes)/2))
                .attr("y",y(1/2)) // au milieu
                .attr("text-anchor","middle")
                .style("font-weight","bold")
                .style("font-size", "14px")
                .selectAll('tspan').data(x_val)
                .enter().append('tspan')
                .text(function(d) {
                return d;
                })
                .attr('dy', '0.8em').attr('x', (x(col_name)+(width/n_col_no_changes)/2));
                            }
            else{
                var transf_x = (x_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
                var transf_cf = (cf_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
                contour.append("text")
                    .attr("x",(x(col_name)+(width/n_col_no_changes)/2))
                    .attr("y", y(transf_x))
                    .text(`${roundToTwo(x_val)}`)
                    .attr("text-anchor","middle")
                    .style("font-weight","bold");
            }
        }
        

        
        };        
        
    } ;


    function d3ChartOnlyChanges(data,id_indiv,data_info){
        var len_max = d3.max(data.col.map(d => d.length) );
        const margin = {top: 0, right: 0, bottom: 0, left: 0},
        inner_margin = {top: 20, right: 10, bottom: 8*len_max*(0.7), left: 10},
        //base rectangle width
        rect_width = 100,
        n_col_changes = data.changes[id_indiv].n_changes,
        // width & height of svg in function of feature name length
        width = n_col_changes * rect_width + inner_margin.left + inner_margin.right + 14*len_max*0.7,
        height = 400 - margin.top - margin.bottom + 8*len_max*(0.7),
        //barPadding = 7,
        //graph_misc = {ylabel:4, xlabelH :4, title:9},
    
        //final rect width to fit svg width
        final_rect_width = (width - inner_margin.left - inner_margin.right)/n_col_changes
    
        //colors used for arrows
        var good_col = "#d95f02",
            bad_col = "#1b9e77";
        // array of feature names
        var col = data.col
        // construct svg
        var svg = d3.select('#d3')
        .style("height",height+60)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("xmlns","http://www.w3.org/2000/svg")
        .attr("overflow","scroll");
    
        //axe des variables
        var xAxis = svg.append("g");
        
        var x = d3.scaleBand() // axe catégoriel
                    .domain(data.changes[id_indiv].col_names_changes) // le domaine est le nom des variables
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
          .style("font-weight","bold")
            .style("font-size", "12px");
    
        
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

            if (x_val!==cf_val){
                contour.append("rect")
                .attr("x",x(col_name))
                .attr("y",inner_margin.top)
                .attr("width",final_rect_width)
                .attr("height",height-inner_margin.top-inner_margin.bottom)
                .style("stroke","rgba(94, 92, 92, 0.8)")
                .style("fill","rgba(94, 92, 92, 0.1");

                if (typeof(x_val) === "string"){
                    x_val = slice_text(x_val);
                    cf_val = slice_text(cf_val);
                    // texte de l'exemple
                    contour.append("text")
                    .attr("x",(x(col_name)+(width/n_col_changes)/2))
                    .attr("y",y(0.25)) // en bas du graphe
                    .attr("text-anchor","middle")
                    .style("font-weight","bold")
                    .style("font-size", "14px")
                    .selectAll('tspan').data(x_val)
                    .enter().append('tspan')
                    .text(function(d) {
                    return d;
                    })
                    .attr('dy', '0.8em').attr('x', (x(col_name)+(width/n_col_changes)/2));
    
                    // texte du contrefactuel
                    contour.append("text")
                    .attr("x",(x(col_name)+(width/n_col_changes)/2))
                    .attr("y",y(0.75))// en haut du graphe
                    .attr("text-anchor","middle")
                    .style("font-weight","bold")
                    .style("font-size", "14px")
                    .selectAll('tspan').data(cf_val.reverse())
                    .enter().append('tspan')
                    .text(function(d) {
                    return d;
                    })
                    .attr('dy', '-0.8em').attr('x', x(col_name)+(width/n_col_changes)/2)
                    var nLinesCf = x_val.length
                    const custom_arrow =   {p1 : [(x(col_name)+(width/n_col_changes)/2)-10,y(0.25)-10],
                                            p2 : [(x(col_name)+(width/n_col_changes)/2)-10,y(0.75)+10],
                                            p3 : [(x(col_name)+(width/n_col_changes)/2),y(0.75)],
                                            p4 : [(x(col_name)+(width/n_col_changes)/2)+10,y(0.75)+10],
                                            p5 : [(x(col_name)+(width/n_col_changes)/2)+10,y(0.25)-10],
                                            p6 : [(x(col_name)+(width/n_col_changes)/2)-10, y(0.25)-10]
                                        };
                    const custom_line = {p1 : [(x(col_name)+(width/n_col_changes)/2)-15,y(0.25)-10],
                                        p2 : [(x(col_name)+(width/n_col_changes)/2)+15,y(0.25)-10]
                                        };
    
                    contour.append("path")
                    .attr('d', d3.line()([custom_arrow.p1,custom_arrow.p2,custom_arrow.p3,custom_arrow.p4,custom_arrow.p5,custom_arrow.p6]))
                    .attr("fill",arrow_color)
                    .attr("fill-opacity","0.5")
                    .attr("stroke",arrow_color)
                    .attr("stroke-opacity","0.8");
    
                    contour.append("path")
                        .attr("d",d3.line()([custom_line.p1,custom_line.p2]))
                        .attr("stroke","black")
                        .attr("stroke-width","2")
                    }  
                    else{
                        //min-max scaling
                        var transf_x = (x_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
                        var transf_cf = (cf_val - data_info[id_col][0])/(data_info[id_col][1] - data_info[id_col][0]);
                        contour.append("text")
                        .attr("x",(x(col_name)+(width/n_col_changes)/2))
                        .attr("y", x_val>cf_val ? y(transf_x)-10 :  y(transf_x)+10)
                        .text(`${roundToTwo(x_val)}`)
                        .attr("text-anchor","middle")
                        .style("font-weight","bold");
            
                        contour.append("text")
                        .attr("x",(x(col_name)+(width/n_col_changes)/2))
                        .attr("y", x_val>cf_val ? y(transf_cf)+10 :  y(transf_cf)-10)
                        .text(`${roundToTwo(cf_val)}`)
                        .attr("text-anchor","middle")
                        .style("font-weight","bold");
                                
                        var custom_arrow =   {p1 :[(x(col_name)+(width/n_col_changes)/2)-10, x_val>cf_val ? y(transf_x) : y(transf_x)-10],
                                                p2 : [(x(col_name)+(width/n_col_changes)/2)-10,x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+10],
                                                p3 : [(x(col_name)+(width/n_col_changes)/2),x_val>cf_val ? y(transf_cf)-10 : y(transf_cf)],
                                                p4 : [(x(col_name)+(width/n_col_changes)/2)+10,x_val>cf_val ? y(transf_cf)-20 : y(transf_cf)+10],
                                                p5 : [(x(col_name)+(width/n_col_changes)/2)+10,x_val>cf_val ? y(transf_x) : y(transf_x)-10],
                                                p6 : [(x(col_name)+(width/n_col_changes)/2)-10, x_val>cf_val ? y(transf_x) : y(transf_x)-10]
                        };
                        var custom_line = {p1 :[(x(col_name)+(width/n_col_changes)/2)-15, x_val>cf_val ? y(transf_x) : y(transf_x)-10],
                                            p2 : [(x(col_name)+(width/n_col_changes)/2)+15,x_val>cf_val ? y(transf_x) : y(transf_x)-10]};
            
                        contour.append("path")
                        .attr('d', d3.line()([custom_arrow.p1,custom_arrow.p2,custom_arrow.p3,custom_arrow.p4,custom_arrow.p5,custom_arrow.p6]))
                        .attr("fill",arrow_color)
                        .attr("fill-opacity","0.5")
                        .attr("stroke",arrow_color)
                        .attr("stroke-opacity","0.8")
                        ;
                        contour.append("path")
                        .attr("d",d3.line()([custom_line.p1,custom_line.p2]))
                        .attr("stroke","black")
                        .attr("stroke-width","2")
                }  
    
                }



            }
                  
            };        
            
