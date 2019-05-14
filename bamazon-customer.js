const mysql = require("mysql");
// const bamasql = require("./bamazon-sql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// console.log(bamasql.custSetup);

const pw = passwordGen();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    var query = "SELECT * from products"
    
    connection.query(query, function(err, res) {
        console.log(res);
    });
    connection.end();
});



























function passwordGen() {
    return '12345';
}


