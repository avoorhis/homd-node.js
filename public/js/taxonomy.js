

// https://docs.dhtmlx.com/api__refs__dhtmlxtree.html  // this is the 'old' version5 with xml-auto-load
//// Uses customTree = new dhtmlXTreeObject() syntax
//// SEE https://docs.dhtmlx.com/suite/tree__loading_data.html#preparingdataset for proper JSON object format
// https://docs.dhtmlx.com/suite/tree__api__refs__tree.html // new version 7 must load from json file
//// Uses new dhx.Tree() syntax
//// Also see https://snippet.dhtmlx.com/4p7zgiaz for arbitrary appened data
/// Write a python script to take data from vamps (or HOMD) taxonomy to json.file:
//////////////////////////
// SELECT DISTINCT domain, phylum, klass, `order`, family, genus, species, strain, 
//  domain_id, phylum_id, klass_id, order_id, family_id, genus_id, species_id, strain_id 
//  FROM 
//  silva_taxonomy
//   JOIN domain AS dom USING(domain_id) 
//  JOIN phylum AS phy USING(phylum_id) 
//  JOIN klass AS kla USING(klass_id) 
//  JOIN `order` AS ord USING(order_id) 
//  JOIN family AS fam USING(family_id) 
//  JOIN genus AS gen USING(genus_id) 
//  JOIN species AS spe USING(species_id) 
//  JOIN strain AS str USING(strain_id)
/////////////////////////

function load_dhtmlx(data) {
    //console.log('loading dhtmlx')
    // dhtmlx version:5  has dynamic loading
    customOldTree = new dhtmlXTreeObject("custom_treebox","100%","100%",0);
    customOldTree.setImagesPath("/images/dhtmlx/imgs/");
    customOldTree.enableCheckBoxes(false);
    //customTree.enableThreeStateCheckboxes(true);
    customOldTree.enableTreeLines(false); // true by default
    customOldTree.enableTreeImages(false);
    customOldTree.enableAutoTooltips(true)
    customOldTree.attachEvent("onCheck",function(id){
        on_check_dhtmlx(id)
    });
    customOldTree.attachEvent("onDblClick", function(id){
        expand_tree_dhtmlx(id)
    });
    // customOldTree.attachEvent("onClick", function(id){
//      console.log('Item clicked',id)
//      if(customOldTree.getOpenState(id)){
//        customOldTree.closeItem(id);
//      }else{
//        customOldTree.openItem(id);
//      }
//      
//      //return false;
//  })

//customOldTree.parse(dhtmlx_tree,"json");


    customOldTree.setXMLAutoLoading("tax_custom_dhtmlx");
  customOldTree.setDataMode("json");
    ////load first level of tree
  customOldTree.load("tax_custom_dhtmlx?id=0","json");
    
    // // dhtmlx version:7(free) dynamic loading is in pro version
    // customTree = new dhx.Tree("custom_treebox", {
  //      icon: false
  //  });
  //  customTree.data.parse(data);
  //     
  // 
  //     customTree.events.on("itemClick", function(id, e){
  //      console.log("The item with the id "+ id +" was clicked.");
  //      customTree.toggle(id);
  //  });
}
///////////////////////////////////////////////////////////////
function expand_tree_dhtmlx(id){
  //alert(customTree.hasChildren(id))
  //kids = customTree.getAllSubItems(id);
  level = customOldTree.getLevel(id)
  
  
  //alert(level)
  if ( customOldTree.hasChildren(id) ) {
       
      //clk_counter++;
      //if(clk_counter+level <= 7){
        //document.getElementById('custom_rank_info').innerHTML = 'opening;
        customOldTree.openAllItems(id,true); 

      //}else{
      //  alert('no more levels')
      //}

      
       
      
  }else{
    alert('no sub-levels found')
  }

}
function reset_tree_dhtmlx(){
  //customOldTree.closeAllItems(0);
  customOldTree.refreshItem()
  clk_counter = 0  // reset
  //customTree.collapseAll();
}
clk_counter = 0   // global
function open_tree_dhtmlx(){
  // difficult with dynamic loading
  //console.log('open whole tree')
  clk_counter++;
  //console.log('clk_counter',clk_counter)
  if(clk_counter > 7){
      return
  }
  arrystring = customOldTree.getAllSubItems(0)
  arry = arrystring.split(',')
  for(i in arry){
       //console.log(arry[i])
       //level = customOldTree.getLevel(arry[i])
  //clk_counter = 0
  //console.log('level:',level)
       customOldTree.openItem(arry[i])
       ret = get_sublevels(arry[i])
       //console.log('ret',ret)
       for(n in ret){
          //console.log('ret[n]',ret[n])
          //customOldTree.openItem(ret[n])
       }
  }
}
function get_sublevels(lvl){
   subs = customOldTree.getAllSubItems(lvl)
   //subs2 = customOldTree.getAllSubItems('975')
   //console.log(subs2)
   return subs.split(',')
}
///////

function change_level(rank) {
  // Use capitals here for ranks
  var args = {}
  //console.log(rank)
  args.rank = rank.toLowerCase()
  if(args.rank=='class'){args.rank='klass';}// for use in homd_taxonomy.taxa_tree_dict_map_by_rank
  var ranks = ["domain", "phylum", "klass", "order", "family", "genus", "species","subspecies"];
  for(n in ranks){
    document.getElementById(ranks[n]).style ='font-weight:normal;color:black;'
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/taxa/tax_level", true);
  xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            //console.log(response)
            static_data = JSON.parse(response)
            
            //console.log(static_data)
      var html = ''
      html += "<table id='level-table' class='table table-hover' border='0'>"
      html += '<thead>'
      html += '<tr>'
      if(rank != 'domain'){
        html += '<th scope="col">Parent Level</th>'
      }
      
      html += '<th scope="col">'+fix_rank(rank)+'</th>'
      if(rank == 'species' || rank == 'subspecies'){
        html += '<th scope="col">HMT Taxon ID</th>'
      }
      html += '<th scope="col">Taxon Count</th>'
      
      //html += '<th>lineage (for debuging)</th>'
      
      html += '<th scope="col">Genome Count</th><th scope="col">16S rRNA Refseq Count</th></tr></thead><tbody>'
      
      
      for(n in static_data){
        html += '<tr class="table-warning">'
        if(rank != 'domain'){
          html += "<td nowrap><a href='life?rank="+ranks[ranks.indexOf(rank)-1]+"&name="+static_data[n].parent_taxon+"'>"+static_data[n].parent_taxon+"</a></td>"
        }
        
        if(rank == 'species'){
            
            if(static_data[n].otid){
               html += "<td nowrap>"+static_data[n].item_taxon+"</td>"
               html +="<td style='text-align:center'><a href='tax_description?otid="+static_data[n].otid+"'>"+static_data[n].otid+"</a></td>"
            }else{
               html += "<td nowrap><a href='life?rank="+rank+"&name="+static_data[n].item_taxon+"'>"+static_data[n].item_taxon+"</a></td>"
               html +="<td nowrap><small>[<a href='life?rank=species&name=\""+static_data[n].item_taxon+"\"'>open-subsp.</a>]</small></td>"
            }
        }else if(rank == 'subspecies'){
          html += "<td nowrap>"+static_data[n].item_taxon+"</td>"
          html +="<td style='text-align:center'><a href='tax_description?otid="+static_data[n].otid+"'>"+static_data[n].otid+"</a></td>"
        }else{
          html += "<td nowrap><a href='life?rank="+rank+"&name="+static_data[n].item_taxon+"'>"+static_data[n].item_taxon+"</a></td>"
        }
        html += "<td style='text-align:center'>"+static_data[n].tax_count+'</td>'
        
        //html +="<td>"+static_data[n].lineage+"</td>"
        
        html += "<td style='text-align:center'>"+static_data[n].gne_count+'</td>'
        html += "<td style='text-align:center'>"+static_data[n].rrna_count+'</td>'
        
        html += '</tr>'
      }
      html += '</tbody></table>'
      document.getElementById('taxlevel_div').innerHTML = html
      
      document.getElementById(rank).style ='font-weight:bold;font-size:18px;color:#cf1020;'

    }
  }
  
  xmlhttp.send(JSON.stringify(args));


}
// function toggle_oral(oral){
//  console.log(oral)
//  if(oral=='false'){
//    console.log('notcode')
//  }else{
//    console.log('code')
//  }
//  var args = {}
//  args.oral = oral
//  var xmlhttp = new XMLHttpRequest();
//  xmlhttp.open("POST", "/taxa/oral_counts_toggle", true);
//  xmlhttp.setRequestHeader("Content-type","application/json");
//     xmlhttp.onreadystatechange = function() {
//           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             var response = xmlhttp.responseText;
//             console.log(response)
//           }
//     }
//     xmlhttp.send(JSON.stringify(args));
// }
function clear_filter_form(){
  var els = document.getElementsByClassName('filter_ckbx')
  for(i = 0; i < els.length; i++){
    els[i].checked = false
  }
  document.getElementById('valid1').checked = false
  document.getElementById('valid2').checked = false
}

function check_then_post_filter(form){
    //console.log(form)
    var filter_status = ['named','unnamed','phylotype','lost','dropped']
  var filter_sites = ['oral','nasal','skin','vaginal','unassigned','nonoralref']
    var els = document.getElementsByClassName('filter_ckbx')
    var got_one_status = 0
    var got_one_sites = 0
    for(i = 0; i < els.length; i++){
    if(els[i].checked == true){
      if(filter_status.indexOf(els[i].name) != -1){
        got_one_status = 1
      }
      if(filter_sites.indexOf(els[i].name) != -1){
        got_one_sites = 1
      }
    }
  }
  if (got_one_sites == 0 && got_one_status == 0){
     alert('You must choose at least one from "Status".')
     return;
  }
    form.submit()
}

function change_valid(val){
    // used from taxtable filter valid
    //console.log(val)
    var lst = ['named','unnamed','phylotype','lost','oral','nasal','skin','vaginal','unassigned']
    var extra= ['dropped','nonoralref']
    if(val == 'all'){
        for(n in extra){
            document.getElementById(extra[n]).checked = true
        }
    }else{
         for(n in extra){
            document.getElementById(extra[n]).checked = false
        }
    }
    for(n in lst){
        document.getElementById(lst[n]).checked = true
    }
}


function get_refseq(taxfullname,seqid,genus,species,strain,genbank,status,site,flag) {
    
    //<!-- >001A28SC | Bartonella schoenbuchensis | HMT-001 | Strain: A28SC | GB: GQ422708 | Status: Named | Preferred Habitat: Unassigned | Genome: yes -->
    var defline = '>'+seqid+' | '+genus+' '+species+' | '+taxfullname+' | '+strain+' | '+genbank+' | Status: '+status+' | Preferred Habitat: '+site+' | '+flag
    console.log(defline)
    var args={}
    args.refid = seqid
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/taxa/get_refseq", true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var resp = xmlhttp.responseText;
        console.log(resp)
        text = ''
        //text += '<pre>'+defline+'<br>'
        text = '<pre>'
        text += defline+'\n'
        text += resp
        text += '</pre>'
    var win = window.open("about:blank", null, "menubar=no,status=no,toolbar=no,location=no,width=650,height=500");
    var doc = win.document;
    //doc.writeln("<title>yourtitle</title>");
    //doc.title = 'eHOMD Reference Sequence'
    doc.open("text/html");
    
    doc.write("<title>eHOMD Reference Sequence</title>"+text);
    doc.close();
        
        
      }
    }
    xmlhttp.send(JSON.stringify(args));
}
function get_abund_sorted(site,rank) {
    
    //console.log('site',site,'rank',rank)
    
    var xmlhttp = new XMLHttpRequest();
    //xmlhttp.open("POST", "/taxa/get_refseq", true);
    xmlhttp.open("GET","/taxa/show_all_abundance/"+site+"/"+rank)
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        //console.log(response)
        
        var win = window.open("about:blank", null, "menubar=no,status=no,toolbar=no,location=no,width=650,height=500");
        var doc = win.document;
        //doc.writeln("<title>yourtitle</title>");
        //doc.title = 'eHOMD Reference Sequence'
        doc.open("text/html");
    
        doc.write("<title>Sorted Abundances</title>"+response);
        doc.close();
        
        
      }
    }
    //xmlhttp.send(JSON.stringify(args));
    xmlhttp.send();
}
//
// function dld_ttable(type) {
//     var args = {type:type}
//     var xmlhttp = new XMLHttpRequest();
//  xmlhttp.open("POST", "/taxa/dld_ttable", true);
//  xmlhttp.setRequestHeader("Content-type","application/json");
//     xmlhttp.onreadystatechange = function() {
//       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         var resp = xmlhttp.responseText;
//         console.log(resp)
//        } 
//     }
//     xmlhttp.send(JSON.stringify(args));
// }
function tax_table_search(){
   form = document.getElementById('ttable_search')
   if(form.tax_srch.value == ''){
       return
   }
   
   form.submit()
}
function fix_rank(rank){
    if(rank == 'klass' || rank == 'Klass'){
        rank = 'class'
    }
    return rank.charAt(0).toUpperCase() + rank.slice(1);
}
//
function toggle_lower_ranks(){
    
    toggle_btn = document.getElementById('toggle_ranks')
    el = document.getElementById('lower-rank-items-div')
    if(el.style.display == 'none'){
       el.style.display = 'inline'
       document.getElementById('tbl').style.marginLeft = "30px";
       toggle_btn.innerHTML="<a href='#' onclick='toggle_lower_ranks()'>hide[-]</a>"
    }else{
       el.style.display = 'none'
       toggle_btn.innerHTML="<a href='#' onclick='toggle_lower_ranks()'>show[+]</a>"
    }
}
//
//function tax_download(type,letter,page,sites,stati){
// function tax_download(type,letter,page,sites,stati){
//  console.log('type:',type)
//  console.log('letter:',letter)
//  console.log('page:',page)
//  console.log('sites:',sites)
//  console.log('stati:',stati)
//  var xmlhttp = new XMLHttpRequest();
//  xmlhttp.open("POST", "/taxa/dld_table", true);
//  args = {}
//  args.type = type
//  args.letter = letter
//  args.page = page
//  args.sites = sites
//  args.stati = stati
//  xmlhttp.setRequestHeader("Content-type","application/json");
//     xmlhttp.onreadystatechange = function() {
//       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         var resp = xmlhttp.responseText;
//         console.log(resp)
//         document.write(resp)
//        } 
//     }
//     xmlhttp.send(JSON.stringify(args));
//   
//    
// }