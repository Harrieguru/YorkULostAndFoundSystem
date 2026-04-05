//Can use const p = require('pg'); then Pool = p.Pool to store the class instead
//leave it like this cuz we are using react
const { Pool } = require('pg');

//IMPORTANT
//Make a dbConfig.js file in the Backend
//This file will not be on git because of git ignore
const {
    userName,
    hostType,
    databaseName,
    databasePass,
    port
  } = require('./dbConfig.js'); 

//THIS INFORMATION MUST BE CHANGED DEPENDNING ON WHO IS RUNNING THE DB
const pool = new Pool({
  user: userName,   //Can find username when creating a connection. (Above the folder icon in postgre)
  host: hostType, //project is local hosted
  database: databaseName, //Can find the db name when creating a connection
  password: databasePass, //If you dont remember your password just reset it
  port: port,   //run: SHOW port inside postgre to find it, default is 5432
});

module.exports = pool; 