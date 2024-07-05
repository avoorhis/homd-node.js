  
  // set the dimensions and margins of the graph

      //.range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"])
      // ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", 
      //"#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99"
    
    siteLongNames = {
    'AKE': '(AKE) Attached Keratinized Gingiva (oral)', //Attached_Keratinized_gingiva
    'ANA': '(ANA) Anterior Nares (nasal)', //#Anterior_nares
    'BMU': '(BMU) Buccal Mucosa (oral)', //#Buccal_mucosa
    'HPA': '(HPA) Hard Palate (oral)', //#Hard_palate
    'LAF': '(LAF) Left Antecubital Fossa (skin)', //#L_Antecubital_fossa  # not in HMP
    'PERIO': '(PERIO) Periodontal (oral)',  //# ONLY in HMP
    'LRC': '(LRC) Left Retroauricular Crease (skin)',  //#L_Retroauricular_crease
    'MVA': '(MVA) Mid Vagina',  //#Mid_vagina
    'PFO': '(PFO) Posterior Fornix (vaginal)',  //#Posterior_fornix
    'PTO': '(PTO) Palatine Tonsils (oral)',  //#Palatine_Tonsils
    'RAF': '(RAF) Right Antecubital Fossa (skin)',  //#R_Antecubital_fossa
    'RRC': '(RRC) Right Retroauricular Crease (skin)',  //#R_Retroauricular_crease
    'SAL': '(SAL) Saliva (oral)',  //#Saliva
    'STO': '(STO) Stool (gut)',  //#Stool
    'SUBP': '(SUBP) Subgingival Plaque (oral)', //#Subgingival_plaque
    'SUPP': '(SUPP) Supragingival Plaque (oral)', //#Supragingival_plaque
    'THR': '(THR) Throat (oral)',  //#Throat
    'TDO': '(TDO) Tongue Dorsum (oral)',  //#Tongue_dorsum
    'VIN': '(VIN) Vaginal Introitus '   //#Vaginal_introitus
    }
    site_colors2 = {
    'AKE': '#3366cc', //Attached_Keratinized_gingiva
    'ANA': '#0099c6', //#Anterior_nares
    
    'BMU':  '#ff9900', //#Buccal_mucosa
    'HPA':  '#109618', //#Hard_palate
    'LAF':  '#990099', //#L_Antecubital_fossa  # not in HMP
    'PERIO': '',  //# ONLY in HMP
    'LRC': '#dd4477',  //#L_Retroauricular_crease
    'MVA': '#66aa00',  //#Mid_vagina
    'PFO': 'yellow',  //#Posterior_fornix
    'PTO': '#316395',  //#Palatine_Tonsils
    'RAF': '#994499',  //#R_Antecubital_fossa
    'RRC': '#22aa99',  //#R_Retroauricular_crease
    'SAL': '#dc3912',  //#Saliva
    
    'STO': 'brown',  //#Stool
    'SUBP': 'slateblue', //#Subgingival_plaque
    'SUPP': 'red', //#Supragingival_plaque
    'THR': 'pink',  //#Throat
    'TDO': 'black',  //#Tongue_dorsum
    'VIN':'grey'   //#Vaginal_introitus
    }
//D3 category20
// 0   #1f77b4
// 1   #aec7e8
// 2   #ff7f0e
// 3   #ffbb78
// 4   #2ca02c
// 5   #98df8a
// 6   #d62728
// 7   #ff9896
// 8   #9467bd
// 9   #c5b0d5
// 10  #8c564b
// 11  #c49c94
// 12  #e377c2
// 13  #f7b6d2
// 14  #7f7f7f
// 15  #c7c7c7
// 16  #bcbd22
// 17  #dbdb8d
// 18  #17becf
// 19  #9edae5
site_colors3 = {
    'AKE': '#ff7f0e', //Attached_Keratinized_gingiva
    'ANA': '#ffbb78', //#Anterior_nares
    
    'BMU':  '#2ca02c', //#Buccal_mucosa
    'HPA':  '#98df8a', //#Hard_palate
    'LAF':  '#d62728', //#L_Antecubital_fossa  # not in HMP
    'PERIO': '#aec7e8',  //# ONLY in HMP
    'LRC': '#ff9896',  //#L_Retroauricular_crease
    'MVA': '#9467bd',  //#Mid_vagina
    'PFO': '#c5b0d5',  //#Posterior_fornix
    'PTO': '#8c564b',  //#Palatine_Tonsils
    'RAF': '#c49c94',  //#R_Antecubital_fossa
    'RRC': '#e377c2',  //#R_Retroauricular_crease
    'SAL': '#f7b6d2',  //#Saliva
    
    'STO': '#7f7f7f',  //#Stool
    'SUBP': '#c7c7c7', //#Subgingival_plaque
    'SUPP': '#bcbd22', //#Supragingival_plaque
    'THR': '#dbdb8d',  //#Throat
    'TDO': '#17becf',  //#Tongue_dorsum
    'VIN':'#9edae5'   //#Vaginal_introitus
    }
    // ----------------
    // Create  tooltips
    // ----------------
    var tooltips = {}
    //tooltips.hmprefseqv1v3 = d3.select("#plot_hmp_refseqv1v3_here").append("div").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    
    tooltips.hmprefseqv1v3_log = d3.select("#plot_log_hmp_refseqv1v3_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    tooltips.hmprefseqv3v5_log = d3.select("#plot_log_hmp_refseqv3v5_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    tooltips.dewhirst_log = d3.select("#plot_log_dewhirst_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    tooltips.erenv1v3_log = d3.select("#plot_log_erenv1v3_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    tooltips.erenv3v5_log = d3.select("#plot_log_erenv3v5_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    tooltips.hmpmetaphlan_log = d3.select("#plot_log_hmp_metaphlan_here").append("div").style("position", "absolute").style('font-size','12').style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "10px")
    mousemoveX = 30
    mousemoveY = 150
// HMP_Log_RefSeq V1V3
//LOGLOGLOG
// https://d3-graph-gallery.com/graph/lollipop_basic.html

// data = data_ary[0]
// dataNDs = data_ary[1]
// console.log(data_ary[0])
if(Object.keys(hmprefseqv1v3).length == 0){
     document.getElementById("plot_log_hmp_refseqv1v3_here").innerHTML = "<span class='nodata'>No Data</span>"
}else{
    
    // append the svg object to the body of the page
    var svg = d3.select("#plot_log_hmp_refseqv1v3_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'HMP 16S RefSeq V1-V3';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.hmprefseqv1v3_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.hmprefseqv1v3_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    console.log(e)
    return tooltips.hmprefseqv1v3_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.hmprefseqv1v3_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(hmprefseqv1v3.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(hmprefseqv1v3, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
    
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(hmprefseqv1v3)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })
    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(hmprefseqv1v3)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)
  

} // end else LOG


////////////////////////////////////////////////////////////
// HMP_RefSeq V3V5
  if(Object.keys(hmprefseqv3v5).length == 0){
     document.getElementById("plot_log_hmp_refseqv3v5_here").innerHTML = "<span class='nodata'>No Data</span>"
  }else{
    // append the svg object to the body of the page
    var svg = d3.select("#plot_log_hmp_refseqv3v5_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'HMP 16S RefSeq V3-V5';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.hmprefseqv3v5_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.hmprefseqv3v5_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    //console.log(x,y)
    //console.log(e)
    return tooltips.hmprefseqv3v5_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.hmprefseqv3v5_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(hmprefseqv3v5.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(hmprefseqv3v5, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
    
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(hmprefseqv3v5)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })
    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(hmprefseqv3v5)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)
} // end else

////////////////////////////////////////////////////
  //
  // Dewhirst
  //
  
if(Object.keys(dewhirst).length == 0){
     document.getElementById("plot_log_dewhirst_here").innerHTML = "<span class='nodata'>No Data</span>"
}else{
        // append the svg object to the body of the page
    var svg = d3.select("#plot_log_dewhirst_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'Dewhirst';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.dewhirst_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.dewhirst_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    //console.log(x,y)
    console.log(e)
    return tooltips.dewhirst_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.dewhirst_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(dewhirst.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(dewhirst, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(dewhirst)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })
    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(dewhirst)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)
  
    
}
////////////////////////////////////////////////////
  //
  // Erenv1v3
  //
  //
if(Object.keys(erenv1v3).length == 0){
     document.getElementById("plot_log_erenv1v3_here").innerHTML = "<span class='nodata'>No Data</span>"
}else{
    // append the svg object to the body of the page
    var svg = d3.select("#plot_log_erenv1v3_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'Eren V1-V3';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.erenv1v3_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.erenv1v3_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    //console.log(x,y)
    return tooltips.eren1v3_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.eren1v3_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(erenv1v3.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(erenv1v3, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
    
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(erenv1v3)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })
    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(erenv1v3)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)

}
////////////////////////////////////////////////////
  //
  // Erenv3v5
  //
  //
if(Object.keys(erenv3v5).length == 0){
     document.getElementById("plot_log_erenv3v5_here").innerHTML = "<span class='nodata'>No Data</span>"
}else{
    // append the svg object to the body of the page
    var svg = d3.select("#plot_log_erenv3v5_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'Eren V3-V5';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.erenv3v5_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.erenv3v5_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    //console.log(x,y)
    return tooltips.erenv3v5_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.erenv3v5_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(erenv3v5.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(erenv3v5, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
    
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(erenv3v5)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })
    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(erenv3v5)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)
  

}

  
////////////////////////////////////////////////////
  // HMP_MetaPhlan
if(Object.keys(hmpmetaphlan).length == 0){
     document.getElementById("plot_log_hmp_metaphlan_here").innerHTML = "<span class='nodata'>No Data</span>"
}else{
    // append the svg object to the body of the page
    var svg = d3.select("#plot_log_hmp_metaphlan_here")
      .append("svg")
      .attr("width", widthlog + marginlog.left + marginlog.right)
      .attr("height", heightlog + marginlog.top + marginlog.bottom)
      .append("g")
      .attr("transform",
          "translate(" + marginlog.left + "," + marginlog.top + ")");
  
    var mouseover = function(e,d){ 
         var plotName = 'HMP MetaPhlan';//d3.select(this.parentNode).datum().key;
         var siteName = siteLongNames[d.site]
         var plotValue = d.avg;
         tooltips.hmpmetaphlan_log.html(plotName+"<br>"+"Lineage: "+lineage+"<br>"+"Site: <span style='border:1px solid black;padding:1px 8px;background:"+site_colors3[d.site]+";'></span>&nbsp;&nbsp;" + siteName + "<br>" + "Value: " + plotValue+"% Abundance")
         //console.log(e.x,e.y)
         return tooltips.hmpmetaphlan_log.style("visibility", "visible");
         
         //tooltips.hmptablev1v3.html(hmpv1v3table)
         //return tooltips.hmptablev1v3.style("visibility", "visible");
     }
  
  var mousemove = function(e,d) {
    //console.log('this',this)
    //console.log(e.x,e.y)
    //var coordinates= d3.pointer(e);
    //console.log(coordinates)
    //var x = coordinates[0];
    //var y = coordinates[1];
    //console.log(x,y)
    return tooltips.hmpmetaphlan_log.style("left", (e.pageX+20) + "px")
                                  .style("top",  (e.pageY) + "px")

  }
  var mouseleave = function(d) {
    return tooltips.hmpmetaphlan_log.style("visibility", "hidden");
    //return tooltips.hmptablev1v3.style("visibility", "hidden");
  }
var x = d3.scaleBand()
  .range([ 0, widthlog ])
  .domain(hmpmetaphlan.map(function(d) { return d.site; }))
  .padding(1);
//let ndaxis = d3.axisBottom(nd)
var y = d3.scaleSymlog()
  //.domain([d3.min(data, function(d) { return +d.avg; }), d3.max(data, function(d) { return +d.avg; })])
  .domain([0, d3.max(hmpmetaphlan, function(d) { return +d.avg; })])
  //.constant()
  .range([ heightlog, 0.0 ]);

svg.append("g")
  .call(d3.axisLeft(y).scale(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -45)
    .attr("x", -150 )
    .attr("transform", "rotate(-90)")
    .text("Log % Abundance");
    
svg.append("g")
  .attr("transform", "translate(0," + heightlog + ")")
  .call(d3.axisBottom(x))
  //.call(d3.axisLeft(y))
  //.call(yAxis)
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Lines
svg.selectAll("myline")
  .data(hmpmetaphlan)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.site); })
    .attr("x2", function(d) { return x(d.site); })

    .attr("y1", function(d) { return y(d.avg); })
    .attr("y2", y(0))
    
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(hmpmetaphlan)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.site); })
    .attr("cy", function(d) { return y(d.avg); })
    .attr("r", "7")
     .attr("fill", function(d) {return site_colors3[d.site];})
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave)
  
} // end else



function change_view(v,r,t){
    console.log(v,r,t)
    window.open('ecology?rank='+r+'&name='+t+'&page='+v,'_self')
}

 