"use strict"
// for newrelic: start in config.js
//const winston = require('winston');
const CFG = require('./config/config');
const taxdbconn = require('./config/database').taxon_pool;
const annodbconn = require('./config/database').taxon_pool2;
//const gendbconn = require('./config/database').genome_pool;
const path = require('path');
// explicitly makes conn global
global.TDBConn = taxdbconn;   // database:  homd
global.ADBConn = annodbconn;  // database: genome
global.app_root = path.resolve(__dirname);
const C = require('./public/constants');
const helpers   = require(app_root + '/routes/helpers/helpers')
const fs = require('fs-extra');
//const createIframe = require("node-iframe");
const express = require('express');
const logFilePath = path.join(CFG.LOG_DIR, CFG.PRODUCTION_LOG)
const node_log = require('simple-node-logger').createSimpleFileLogger(logFilePath);

const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('express-flash');
//const favicon = require('serve-favicon');
const async = require('async')
//const zlib = require('zlib');
//const sizeof = require('object-sizeof');


const home      = require('./routes/index');

const admin     = require('./routes/routes_admin');
//const help      = require('./routes/routes_help');
const taxa      = require('./routes/routes_taxa');
const refseq = require('./routes/routes_refseq');
const genome = require('./routes/routes_genome');
const phage    = require('./routes/routes_phage');
const blast    = require('./routes/routes_blast');
const help    = require('./routes/routes_help');
const app = express();

// PRODUCTION: log every restart
if(CFG.ENV === 'production'){
    const output = fs.createWriteStream('../homd-stats/restart.log', {flags : 'a'})
    const restart_logger = new console.Console(output)
    restart_logger.log('Restart on '+helpers.timestamp())
}

app.set('appName', 'HOMD');
app.set('trust proxy', true);
require('./config/passport')(passport, TDBConn); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
//
// MIDDLEWARE  <-- must be in correct order:
//app.use(bodyParser({limit: 1024000000 })); // 1024MB
// app.use(bodyParser({uploadDir:'./uploads'}));
//app.use(createIframe);


app.use(bodyParser.urlencoded({
    extended: false,         // allows for richer json like experience https://www.npmjs.com/package/qs#readme
    limit: '50mb',          // size of body
    parameterLimit: 100000 // number of parameters
}));
app.use(bodyParser.json());

// https://blog.jscrambler.com/best-practices-for-secure-session-management-in-node
app.use(session({
  secret: 'gtf34ds',
  resave: true,
  saveUninitialized: true,
  cookie: { maxage: 6000 }
  
}));

app.use(express.static('public'));
//app.use(express.static(config.jbrowse_data));

app.use(express.static('tmp'));
//app.use('/genomes', express.static(__dirname + 'jbrowse2/static/js'))
//upload.single('singleInputFileName')
//app.use(upload.single('singleInputFileName'));  // for multipart uploads: files

//app.use(cookieParser());

//app.use(compression());
/**
 * maxAge used to cache the content, # msec
 * to "uncache" some pages: http://stackoverflow.com/questions/17407770/express-setting-different-maxage-for-certain-files
 */
//app.use(express.static( 'public', {maxAge: '24h' }));
//app.use(express.static('tmp'));

//app.use(express.static('jbrowse2/static/js'));
//path.join(__dirname, 'public', 'javascripts')
//app.use('data', express.static(path.join(__dirname, 'public', 'data')));

// ROUTES:
app.use('/', home);
app.use('/admin', admin);
app.use('/taxa', taxa);
app.use('/refseq', refseq);
app.use('/genome', genome);
app.use('/phage', phage);
app.use('/blast', blast);
app.use('/help', help);


// error handler middleware:
app.use((error, req, res, next) => {
  console.error(error);
  //res.status(500).send('Something Broke! Please use the browsers \'Back\' button');
  //if(CFG.ENV === 'development'){
  if(CFG.ENV === 'production'){
     node_log.debug(error.toString())
  }
  res.render('pages/lost', { 
      url: req.url,
      pgname: 'lost',
      title:'HOMD Lost',
      config : JSON.stringify({hostname: CFG.HOSTNAME,env: CFG.ENV}),
      ver_info: JSON.stringify({rna_ver:C.rRNA_refseq_version, gen_ver:C.genomic_refseq_version}),
      msg: 'We\'re Sorry -- Something Broke!<br><br>If it happens again please let us know. Below is the error message:',
      trace: error.toString()
  });
  
})
// LAST Middleware:
app.use(function(req, res, next){
  console.log('in 404')
  res.status(404)
  // respond with html page
  if (req.accepts('html')) {
    res.render('pages/lost', { 
      url: req.url,
      pgname: 'lost',
      title:'HOMD Lost',
      config : JSON.stringify({hostname: CFG.HOSTNAME,env: CFG.ENV}),
      ver_info: JSON.stringify({rna_ver:C.rRNA_refseq_version, gen_ver:C.genomic_refseq_version}),
      msg: 'Sorry -- We can\'t find the page you requested.',
      trace: JSON.stringify(req.url)
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});
/*
 * Create global objects once upon server startup
 */
const CustomTaxa  = require('./routes/helpers/taxa_class');

// scripts to create this data::
// homd-scripts/homd_init_data.py
//
var data_init_files =[
  
  path.join(CFG.PATH_TO_DATA, C.taxon_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.lineage_lookup_fn) ,
  path.join(CFG.PATH_TO_DATA, C.tax_hierarchy_fn),  // gives you taxonomy lineage
  path.join(CFG.PATH_TO_DATA, C.genome_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.refseq_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.references_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.info_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.taxcounts_fn),
  path.join(CFG.PATH_TO_DATA, C.annotation_lookup_fn),
  path.join(CFG.PATH_TO_DATA, C.phage_lookup_fn),
  //path.join('public','data', C.image_location_fn),
  
  path.join('public','data', C.image_location_locfn),  // image name and text
  path.join('public','data', C.image_location_taxfn)  // match image w/ otid or tax rank
  
]
//console.log('Path to Data Files:',CFG.PATH_TO_DATA)


async.map(data_init_files, helpers.readAsync, function(err, results) {
    // results = ['file 1 content', 'file 2 content', ...]
    // add the data to CONSTANTS so they are availible everywhere
    // the lookups are keyed on Oral_taxon_id
    //console.log('parsing0')
    //console.log(results[0])
    C.taxon_lookup              = JSON.parse(results[0]);// lookup by otid
    //console.log('parsing1')
    C.taxon_lineage_lookup        = JSON.parse(results[1]); // lookup by otid
    //console.log('parsing2') 
    C.homd_taxonomy =  new CustomTaxa(JSON.parse(results[2]));
    //console.log('parsing3')
    C.genome_lookup         = JSON.parse(results[3]);  // lookup by gid
    //console.log('parsing4')
    C.refseq_lookup         = JSON.parse(results[4]);
    //console.log('parsing5')
    C.taxon_references_lookup       = JSON.parse(results[5]);   // lookup by otid
    //console.log('parsing6')
    C.taxon_info_lookup       = JSON.parse(results[6]);  // lookup by otid
    //console.log('parsing7')
    C.taxon_counts_lookup       = JSON.parse(results[7]);   // lookup by lineage
    C.annotation_lookup       = JSON.parse(results[8]);
    C.phage_lookup              = JSON.parse(results[9]);
    //C.images              = JSON.parse(results[10]);
    
    C.images_loc              = JSON.parse(results[10]);   // image name and text
    C.images_tax              = JSON.parse(results[11]);   // match image w/ otid or tax rank
    // add genus, species to C.genome_lookup
    
    //Object.values(C.taxon_lookup)
    C.dropped_taxids    = Object.values(C.taxon_lookup).filter(item => (item.status === 'Dropped')).map(x => x.otid)
    C.nonoralref_taxids = Object.values(C.taxon_lookup).filter(item => (item.status === 'NonOralRef')).map(x => x.otid)
    //helpers.print_size()
    //var  = C.dropped_obj
    console.log('Dropped:',C.dropped_taxids)
    //console.log('NonOralRef:',C.nonoralref_taxids)
   // C.oral_homd_taxonomy    =  new CustomTaxa(JSON.parse(results[5]));
    
    //examples
    let size = Buffer.byteLength(JSON.stringify(C.taxon_lookup))
    console.log('C.taxon_lookup length:',Object.keys(C.taxon_lookup).length,'\t\tsize(KB):',size/1024)
    console.log('C.taxon_references_lookup length',Object.keys(C.taxon_references_lookup).length)
    //console.log(C.phage_lookup)
    size = Buffer.byteLength(JSON.stringify(C.taxon_lineage_lookup))
    console.log('C.taxon_lineage_lookup length',Object.keys(C.taxon_lineage_lookup).length,'\tsize(KB):',size/1024)
    
    size = Buffer.byteLength(JSON.stringify(C.taxon_info_lookup))
    console.log('C.taxon_info_lookup length',Object.keys(C.taxon_info_lookup).length)
    
    size = Buffer.byteLength(JSON.stringify(C.refseq_lookup))
    console.log('C.refseq_lookup length',Object.keys(C.refseq_lookup).length)
    
    size = Buffer.byteLength(JSON.stringify(C.genome_lookup))
    console.log('C.genome_lookup length',Object.keys(C.genome_lookup).length,'\t\tsize(KB):',size/1024)
    
    size = Buffer.byteLength(JSON.stringify(C.annotation_lookup))
    console.log('C.annotation_lookup length',Object.keys(C.annotation_lookup).length,'\t\tsize(KB):',size/1024)
    
    size = Buffer.byteLength(JSON.stringify(C.taxon_counts_lookup))
    console.log('C.taxon_counts_lookup length',Object.keys(C.taxon_counts_lookup).length,'\tsize(KB):',size/1024)
    for(var n in C.homd_taxonomy){
       console.log(n)
    }
   // console.log(C.homd_taxonomy.taxonomy_obj)
   //class
   //Absconditabacteria (SR1) [C-1]
    //console.log(C.homd_taxonomy.taxa_tree_dict_map_by_name_n_rank[ 'Burkholderiales_order'])
    helpers.print(['lineage 701',C.taxon_lineage_lookup[701]])
    //console.log('refseq 12',C.refseq_lookup[12])
    //console.log('SEQF1388',C.genome_lookup['SEQF1388'])
    //console.log(C.taxon_counts_lookup['Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales;Comamonadaceae;Variovorax'])
    //console.log('755',C.taxon_lineage_lookup[755])
    //console.log(C.homd_taxonomy.taxa_tree_dict_map_by_name_n_rank['Streptococcus oralis subsp. dentisani clade 058_species'])
    //console.log(C.homd_taxonomy.taxa_tree_dict_map_by_name_n_rank['Abiotrophia defectiva_species'])
    //console.log(C.homd_taxonomy.taxa_tree_dict_map_by_rank['subspecies'])
    //console.log(C.homd_taxonomy.taxa_tree_dict_map_by_name_n_rank['clade_886_subspecies'])
    
    let num_zeros = 0
    for(n in C.homd_taxonomy.taxa_tree_dict_map_by_rank['genus']){
       var m = C.homd_taxonomy.taxa_tree_dict_map_by_rank['genus'][n]
       if(m.parent_id==0){
          console.log(m)
          num_zeros += 1
       }
    }
    console.log("number of genera with parent_id='0': ",num_zeros," :Should be zero!")
});

// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[0]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.taxon_lookup               = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[1]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.taxon_lineage_lookup             = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[2]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.homd_taxonomy =  new CustomTaxa(JSON.parse(results));
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[3]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.genome_lookup              = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[4]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.refseq_lookup              = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[5]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.taxon_references_lookup              = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[6]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.taxon_info_lookup              = JSON.parse(results);
// })
// fs.readFile(path.join(CFG.PATH_TO_DATA, data_init_files[7]), (err, results) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   C.taxon_counts_lookup              = JSON.parse(results);
// })
// 


console.log('start here in app.js')

module.exports = app;



