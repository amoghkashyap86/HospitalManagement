const mysql = require("mysql")
const express = require("express")
const app = express()
var mysqlconnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'hospital'
    }
);
module.exports = mysqlconnection
