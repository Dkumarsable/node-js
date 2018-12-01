'use strict';
var database      = require('mongoose');
    database.connect('mongodb://127.0.0.1:27017/blog').then(()=>console.log('connected'));

   

module.exports=database;
