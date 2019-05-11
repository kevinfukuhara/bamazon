const mysql = require('mysql');

// Variable to be exported
var response;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "12345",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // customerSetup();

    console.log(customerSetup());
});


// const CustSetup = function customerSetup() {
function customerSetup() {
    // connection.connect(function (err) {
    //     if (err) throw err;
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        response = res;
        
    });

    // connection.end();

    // });
    // return response;
}

// customerSetup();

// Export the response at end of all calls.
module.exports = {
    custSetup: customerSetup()
    // res: response
}