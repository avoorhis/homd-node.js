

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
    console.log('loading dhtmlx')
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
//     	console.log('Item clicked',id)
//     	if(customOldTree.getOpenState(id)){
//     	  customOldTree.closeItem(id);
//     	}else{
//     	  customOldTree.openItem(id);
//     	}
//     	
//     	//return false;
// 	})

//customOldTree.parse(dhtmlx_tree,"json");


    customOldTree.setXMLAutoLoading("tax_custom_dhtmlx");
	customOldTree.setDataMode("json");
	  ////load first level of tree
	customOldTree.load("tax_custom_dhtmlx?id=0","json");
	  

    
    
    
    // // dhtmlx version:7(free) dynamic loading is in pro version
    // customTree = new dhx.Tree("custom_treebox", {
	//     	icon: false
	// 	});
	// 	customTree.data.parse(data);
	//     
	// 
	//     customTree.events.on("itemClick", function(id, e){
	//     	console.log("The item with the id "+ id +" was clicked.");
	//     	customTree.toggle(id);
	// 	});
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
  //customTree.collapseAll();
}

function open_tree_dhtmlx(){
  // difficult with dynamic loading
  console.log('open whole tree')
  arrystring = customOldTree.getAllSubItems(0)
  arry = arrystring.split(',')
  for(i in arry){
       console.log(arry[i])
       
       customOldTree.openItem(arry[i])
       ret = get_sublevels(arry[i])
       console.log(ret)
       for(n in ret){
       		console.log(ret[n])
       		customOldTree.openItem(ret[n])
       }
  }
}
function get_sublevels(lvl){
	 subs = customOldTree.getAllSubItems(lvl)
	 subs2 = customOldTree.getAllSubItems('975')
	 console.log(subs2)
	 return subs.split(',')
}
function change_level(rank) {
	// Use capitals here for ranks
	var args = {}
	args.rank = rank.toLowerCase()
	if(args.rank=='class'){args.rank='klass';}// for use in homd_taxonomy.taxa_tree_dict_map_by_rank
	var ranks = ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species"];
	for(n in ranks){
	  document.getElementById(ranks[n]).style ='font-weight:normal;'
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/taxa/taxLevel", true);
	xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            //console.log(response)
            static_data = JSON.parse(response)
            
            //console.log(static_data)
			var html = ''
			html += "<table id='tax-table' class='table' border='0'>"
			html += '<tr>'
			if(rank != 'Domain'){
				html += '<th>Parent Level</th>'
			}
			html += '<th>'+rank+'</th>'
			if(rank == 'Species'){
				html += '<th>HMT Taxon ID</th>'
			}
			html += '<th>Taxon Count</th>'
			
			//html += '<th>lineage (for debuging)</th>'
			
			html += '<th>Genome Count</th><th>16S rRNA Refseq count</th></tr>'
			
			
			for(n in static_data){
				html += '<tr>'
				if(rank != 'Domain'){
					html += '<td nowrap>'+static_data[n].parent_taxon+'</td>'
				}
				html += '<td nowrap>'+static_data[n].item_taxon+"</td>"
				if(rank == 'Species'){
				  	html +="<td style='text-align:center'><a href='tax_description?otid="+static_data[n].otid+"'>"+static_data[n].otid+"</a></td>"
				}
				html += "<td style='text-align:center'>"+static_data[n].item_count+'</td>'
				
				//html +="<td>"+static_data[n].lineage+"</td>"
				
				html += '<td></td><td></td>'
				html += '</tr>'
			}
			html += '</table>'
			document.getElementById('taxlevel_tdiv2').innerHTML = html
			
			document.getElementById(rank).style ='font-weight:bold;'

		}
	}
	
	xmlhttp.send(JSON.stringify(args));


}

function clear_filter_form(){
	var els = document.getElementsByClassName('filter_ckbx')
	for (n in els){
		els[n].checked = false
	}
	document.getElementById('valid1').checked = false
	document.getElementById('valid2').checked = false
}

function check_then_post(form){
   	//console.log(form)
   	var filter_status = ['named','unnamed','phylotype','lost','dropped','nonoralref']
	var filter_sites = ['oral','nasal','skin','vaginal','unassigned','nonoralref']
   	var els = document.getElementsByClassName('filter_ckbx')
   	got_one_status = 0
   	got_one_sites = 0
   	for (n in els){
		if(els[n].checked == true){
			if(filter_status.indexOf(els[n].name) != -1){
				got_one_status = 1
			}
			if(filter_sites.indexOf(els[n].name) != -1){
				got_one_sites = 1
			}
		}
	}
	if (got_one_sites == 0 || got_one_status == 0){
	   alert('You must choose at least one from each group: "Status" and "Body Site".')
	   return;
	}
   	form.submit()
}

function change_valid(val){
    
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
    defline = '>'+seqid+' | '+genus+' '+species+' | '+taxfullname+' | '+strain+' | '+genbank+' | Status: '+status+' | Preferred Habitat: '+site+' | '+flag
    args={}
    args.refid = seqid
    var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/taxa/get_refseq", true);
	xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var resp = xmlhttp.responseText;
        //console.log(defline)
        text = '<pre>'+defline+'<br>'
        text += resp
        text += '</pre>'
		var win = window.open("about:blank", null, "menubar=no,status=no,toolbar=no,location=no,width=500,height=600");
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
