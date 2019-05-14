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

    displayProducts()
    // .then(function(){
    // connection.end();
    // });

});

function displayProducts() {
    var query = "SELECT item_id, product_name, department_name, price, stock_quantity from products";

    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res);
        // prodArr = res;
        console.table(res);
        console.log("=============================================================================== \n");
        inquireCustomer();

        // connection.end();
    });

    // call the rest of the code and have it execute after 3 seconds
    // setTimeout(inquireCustomer, 3000);
    // console.log(prodArr);

}

function inquireCustomer() {
    inquirer
        .prompt([
            // Here we give the user a list to choose from.
            {
                type: "list",
                message: "Welcome to Bamazon, how can we help you?",
                choices: ["Buy an Item.", "Exit."],
                name: "userAction"
            }
        ])
        .then(function (inquirerResponse) {

            ; switch (inquirerResponse.userAction) {
                case 'Buy an Item.':
                    custBuy();
                    break;
                default:
                    console.log("Thank you, have a nice day!");
                    connection.end();
                    break;

            }
        });
}

function custBuy() {
    inquirer
        .prompt([
            // Here we give the user a list to choose from.
            {
                type: "input",
                message: "Please give me the ID of the product you'd like to purchase.",
                name: "prodID"
            },
            {
                type: "number",
                message: "How many would you like to buy?",
                // choices: ["Buy an Item.", "Exit."],
                name: "prodQuantity"
            }
        ])
        .then(function (inquirerResponse) {
            console.log("Searching for product with ID: " + inquirerResponse.prodID + "...");

            var query = "SELECT product_name, price, stock_quantity, product_sales FROM products WHERE item_id = " + inquirerResponse.prodID;

            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res[0]);

                if (res.length === 0) {
                    console.log("invalid product ID");
                } else {
                    var stockNum = res[0].stock_quantity - parseInt(inquirerResponse.prodQuantity);
                    if (stockNum >= 0) {
                        console.log("\nValid product: " + res[0].product_name + ".\n Updating your purchase now...\n");

                        console.log("You owe a total of: " + res[0].price * parseInt(inquirerResponse.prodQuantity) + ".\n");

                        var totalSale = res[0].product_sales + res[0].price * parseInt(inquirerResponse.prodQuantity);

                        connection.query(
                            "UPDATE products SET ?, ? WHERE ?",
                            [
                                {
                                    stock_quantity: stockNum
                                },
                                {
                                    product_sales: totalSale
                                },
                                {
                                    item_id: inquirerResponse.prodID
                                }
                            ],
                            function (error) {
                                if (error) throw error;
                                console.log("Table successfully updated");
                                connection.query("SELECT item_id, product_name, department_name, stock_quantity FROM products", function (err, results) {
                                    if (err) throw err;
                                    console.table(results);

                                    console.log("\n");

                                    inquirer
                                        .prompt([
                                            // Here we give the user a list to choose from.
                                            {
                                                type: "list",
                                                message: "Would you like to purchase another item?",
                                                choices: ["Yes", "No"],
                                                name: "continue"
                                            }
                                        ])
                                        .then(function (inquirerResponse) {
                                            switch (inquirerResponse.continue) {
                                                case 'Yes':
                                                    custBuy();
                                                    break;
                                                default:
                                                    console.log("Thank you for shopping at Bamazon.\nGoodbye!");
                                                    connection.end();
                                                    break;
                                            }
                                        });
                                })
                            }
                        );
                    } else {
                        console.log("Sorry! We are out of stock or don't have enough to fulfill your order at the moment...");
                        console.log("We only have " + res[0].stock_quantity + " left in stock of Item " + inquirerResponse.prodID + ": " + res[0].product_name + ".\n");

                        inquirer
                            .prompt([
                                // Here we give the user a list to choose from.
                                {
                                    type: "list",
                                    message: "Would you like to buy another item or modify your order?",
                                    choices: ["Yes", "No"],
                                    name: "continue"
                                }
                            ])
                            .then(function (inquirerResponse) {
                                switch (inquirerResponse.continue) {
                                    case 'Yes':
                                        displayProducts();
                                        break;
                                    default:
                                        console.log("Thank you for shopping at Bamazon.\nGoodbye!");
                                        connection.end();
                                        break;
                                }
                            });
                    }
                }
            });

        });
}



























function passwordGen() {
    return '12345';
}


