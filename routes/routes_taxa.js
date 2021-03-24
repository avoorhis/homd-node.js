const express  = require('express');
var router   = express.Router();
const CFG   = require(app_root + '/config/config');
const fs       = require('fs-extra');
const url = require('url');
const path     = require('path');
const C		  = require(app_root + '/public/constants');
const helpers = require(app_root + '/routes/helpers/helpers');

router.get('/taxTable', (req, res) => {
//router.get('/taxTable', helpers.isLoggedIn, (req, res) => {
	
	console.log('in taxtable -get')
	helpers.show_session(req)
	let myurl = url.parse(req.url, true);
  	//console.log(myurl.query)
	req.session.tax_letter = myurl.query.k
	
	tcount = C.taxonomy_taxalist.length
	//console.log(tax_letter)
	// filter
	if(req.session.tax_letter){
	   // COOL....
	   send_tax_obj = C.taxonomy_taxalist.filter(item => item.genus.charAt(0) == req.session.tax_letter)
	}else{
	   send_tax_obj = C.taxonomy_taxalist
	}
	
	// table sort done via client side js library sorttable: 
	// https://www.kryogenix.org/code/browser/sorttable
    console.log(send_tax_obj[0])
	res.render('pages/taxa/taxtable', {
		title: 'HOMD :: Taxon Table', 
		hostname: CFG.hostname,
		res: JSON.stringify(send_tax_obj),
		count: Object.keys(send_tax_obj).length,
		tcount: tcount,
		letter: req.session.tax_letter,
		statusfltr: JSON.stringify(C.tax_status_on) ,  // default
		sitefltr: JSON.stringify(C.tax_sites_on),  //default
		search: ''
	});
});
router.post('/taxTable', (req, res) => {
	console.log('in taxtable -post')
	tcount = C.taxonomy_taxalist.length
	//helpers.show_session(req)
	console.log(req.body)
	//plus valid
	valid = req.body.valid  // WHAT IS THIS???
	// filter_status = ['named','unnamed','phylotype','lost','dropped']
// 	filter_sites = ['oral','nasal','skin','vaginal','unassigned','nonoral']
	
	statusfilter_on =[]
	sitefilter_on  = []
	for(i in req.body){
		if(C.tax_status_all.indexOf(i) != -1){
		   statusfilter_on.push(i)
		}
		if(C.tax_sites_all.indexOf(i) != -1){
		   sitefilter_on.push(i)
		}
	}
	//console.log('statusfilter_on',statusfilter_on)
	//console.log('sitefilter_on',sitefilter_on)
	// letterfilter
	if(req.session.tax_letter){
	   // COOL....
	   send_tax_obj = C.taxonomy_taxalist.filter(item => item.genus.charAt(0) == req.session.tax_letter)
	}else{
	   send_tax_obj = C.taxonomy_taxalist
	}
	// status filter
	//console.log('send_tax_obj[0]',send_tax_obj[0])
	send_tax_obj = send_tax_obj.filter(item => statusfilter_on.indexOf(item.status.toLowerCase()) != -1 )
	//console.log('send_tax_obj',send_tax_obj)
	// site filter
	send_tax_obj = send_tax_obj.filter(item => sitefilter_on.indexOf(item.site.toLowerCase()) != -1)
	// use session for taxletter
	res.render('pages/taxa/taxtable', {
		title: 'HOMD :: Taxon Table', 
		hostname: CFG.hostname,
		res: JSON.stringify(send_tax_obj),
		count: Object.keys(send_tax_obj).length,
		tcount: tcount,
		letter: req.session.tax_letter,
		statusfltr: JSON.stringify(statusfilter_on),
		sitefltr:JSON.stringify(sitefilter_on),
		
		search: ''
	});
});
router.get('/taxHierarchy', (req, res) => {
	//the json file was created from a csv of vamps taxonomy
	// using the script: taxonomy_csv2json.py in ../homd_data
	
	// use this only if use the version 5 dhtmlx tree	( w/dynamic loading)
	// using file public/data/all_silva_taxonomy.json
	res.render('pages/taxa/taxhierarchy', {
			title: 'HOMD :: Taxon Hierarchy', 
			hostname: CFG.hostname,
			data: {}
		});
		
	// use this only if use the version 7 dhtmlx tree	(non-dynamic loading)
	// fs.readFile('public/data/vamps_taxonomy.json', (err, jsondata) => {
// 		//console.log(JSON.parse(data));
// 		//let taxaData = JSON.parse(data);
// 		//console.log(student);
// 		res.render('pages/taxon/taxhierarchy', {
// 			title: 'HOMD :: Taxon Hierarchy', 
// 			hostname: CFG.hostname,
// 			data: jsondata
// 		});
// 	});
});
router.get('/taxLevel', (req, res) => {
	
	res.render('pages/taxa/taxlevel', {
		title: 'HOMD :: Taxon Level', 
		hostname: CFG.hostname,
		level: 'domain'
	});
});
//
//
router.post('/taxLevel', (req, res) => {
	
	//console.log(req.body)
	const rank = req.body.rank
	
	const tax_resp = []
	fs.readFile('public/data/taxcounts.json', (err, data) => {
    	if (err)
      		console.log(err)
    	else
			var taxdata = JSON.parse(data);
			//console.log(taxdata['Archaea;Euryarchaeota;Halobacteria'])
			//Problem family: Bacteria;Actinobacteria;Actinobacteria;Acidimicrobiales;Acidimicrobiaceae
			family = C.silva_taxonomy.taxa_tree_dict_map_by_name_n_rank['Acidimicrobiaceae_family']
			fam_pid = family.parent_id
			order1 =C.silva_taxonomy.taxa_tree_dict_map_by_id[fam_pid]
			Acidimicrobiia_klass= C.silva_taxonomy.taxa_tree_dict_map_by_name_n_rank['Acidimicrobiia_klass']
			//order = C.silva_taxonomy.taxa_tree_dict_map_by_name_n_rank[family.taxon +'_'+family.node_id]
			
			console.log(family)
			console.log(order1)
			console.log(Acidimicrobiia_klass)
			const result = C.silva_taxonomy.taxa_tree_dict_map_by_rank[rank].map(taxitem =>{
				// get lineage of taxitem
				//console.log(taxitem)
				lineage = [taxitem.taxon]
				new_search_id = taxitem.parent_id
				new_search_rank = C.RANKS[C.RANKS.indexOf(taxitem.rank)-1]
				//console.log(new_search_id,new_search_rank)
				while (new_search_id != 0){
					new_search_item = C.silva_taxonomy.taxa_tree_dict_map_by_id[new_search_id]
					//name_n_rank
					//new_search_item = new_search_parent
					lineage.unshift(new_search_item.taxon)  // adds to front of lineage array -prepends
					new_search_id = new_search_item.parent_id
				
				}
				return_obj = {}
				return_obj.item_rank = rank
				return_obj.item_taxon = lineage[lineage.length - 1]
				return_obj.parent_rank = C.RANKS[C.RANKS.indexOf(rank) - 1]
				return_obj.parent_taxon = lineage[lineage.length - 2]
				return_obj.item_count = taxdata[lineage.join(';')]
				return_obj.lineage = lineage.join(';')
				if(!return_obj.item_count){
				   //console.log(return_obj)
				   //console.log(lineage.join(';'))
				}
				tax_resp.push(return_obj)
				return return_obj
		
			})
			
			tax_resp.sort(function sortByTaxa(a, b) {
                return helpers.compareStrings_alpha(a.item_taxon, b.item_taxon);
    		});
    		//console.log(tax_resp)
			res.send(JSON.stringify(tax_resp));
	});
});
//
//

router.get('/taxDownload', (req, res) => {
	res.render('pages/taxon/taxdownload', {
		title: 'HOMD :: Taxon Download', 
		hostname: CFG.hostname 
	});
});
//});

// test: choose custom taxonomy, show tree
router.get('/tax_custom_dhtmlx', (req, res) => {
  console.time("TIME: tax_custom_dhtmlx");
  console.log('IN tax_custom_dhtmlx')
  let myurl = url.parse(req.url, true);
  let id = myurl.query.id;

  let json = {};
  json.id = id;
  json.item = [];

  if (parseInt(id) === 0){
    /*
        return json for collapsed tree: 'domain' only
            json = {"id":"0","item":[
                {"id":"1","text":"Bacteria","tooltip":"domain","checked":true,"child":"1","item":[]},
                {"id":"214","text":"Archaea","tooltip":"domain","checked":true,"child":"1","item":[]},
                {"id":"338","text":"Unknown","tooltip":"domain","checked":true,"child":"1","item":[]},
                {"id":"353","text":"Organelle","tooltip":"domain","checked":true,"child":"1","item":[]}
                ]
            }
    */

    C.silva_taxonomy.taxa_tree_dict_map_by_rank["domain"].map(node => {
        let options_obj = get_options_by_node(node);
        options_obj.checked = true;
        json.item.push(options_obj);
      }
    );
  }
  else {
    const objects_w_this_parent_id = C.silva_taxonomy.taxa_tree_dict_map_by_id[id].children_ids.map(n_id => C.silva_taxonomy.taxa_tree_dict_map_by_id[n_id]);
    objects_w_this_parent_id.map(node => {
      let options_obj = get_options_by_node(node);
      options_obj.checked = false;
      json.item.push(options_obj);
    });
  }
  json.item.sort(function sortByAlpha(a, b) {
    return helpers.compareStrings_alpha(a.text, b.text);
  });

  console.timeEnd("TIME: tax_custom_dhtmlx");

  res.json(json);
});
/////////////////////////////////
router.get('/taxDescription', (req, res) => {
	let myurl = url.parse(req.url, true);
  	let oraltaxonid = myurl.query.oraltaxonid;
	var data1 = C.taxonomy_taxalookup[oraltaxonid]
	var data2 = C.taxonomy_infolookup[oraltaxonid]
	var data3 = C.taxonomy_lineagelookup[oraltaxonid]
	if(C.taxonomy_refslookup[oraltaxonid]){
		var data4 = C.taxonomy_refslookup[oraltaxonid]
	}else{
		var data4 = []
	}
	
	//for(c in data2){
	  console.log(data4)
	//}
	res.render('pages/taxa/taxdescription', {
		title: 'HOMD :: Taxon Level', 
		hostname: CFG.hostname,
		taxonid: oraltaxonid,
		data1: JSON.stringify(data1),
		data2: JSON.stringify(data2),
		data3: JSON.stringify(data3),
		data4: JSON.stringify(data4),
	});
});
////////////////////////////////////////////////////////////////////////////////////
function get_options_by_node(node) {
  let options_obj = {
    id: node.node_id,
    text: node.rank+' '+node.taxon,
    rank: node.rank,
    child: 0,
    tooltip: node.rank,
  };
  if (node.children_ids.length > 0) {
    options_obj.child = 1;
    options_obj.item = [];
  }
  return options_obj;
}


module.exports = router;




