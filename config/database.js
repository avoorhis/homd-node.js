var mysql = require('mysql2');
var fs    = require('fs-extra');
//var path  = require('path');

var db_config_file = './config/db-connection.js';
eval(fs.readFileSync(db_config_file).toString());


exports.taxon_pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : db_config_tax.host,
    user     : db_config_tax.user,
    password : db_config_tax.password,
    socketPath : db_config_tax.socketPath,
    database : db_config_tax.database,
    debug    :  false
});

exports.genome_pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : db_config_gen.host,
    user     : db_config_gen.user,
    password : db_config_gen.password,
    socketPath : db_config_gen.socketPath,
    database : db_config_gen.database,
    debug    :  false
});


