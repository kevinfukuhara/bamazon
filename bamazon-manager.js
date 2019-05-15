const mysql = require("mysql");
// const bamasql = require("./bamazon-sql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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

    managerPrompt();
});

function managerPrompt() {
    inquirer
        .prompt([
            // Here we give the user a list to choose from.
            {
                type: "list",
                message: "Welcome to Bamazon, how can we help you?",
                choices: ["View Products for Sale.", "View Low Inventory.", "Add to Inventory.", "Add New Product.", "Exit."],
                name: "userAction"
            }
        ])
        .then(function (inquirerResponse) {

            switch (inquirerResponse.userAction) {
                case 'View Products for Sale.':
                    displayProducts('all');
                    break;
                case 'View Low Inventory.':
                    displayProducts('low');
                    break;
                case 'Add to Inventory.':
                    break;
                case 'Add New Product.':
                    break;
                default:
                    console.log("Thank you, have a nice day!");
                    connection.end();
                    break;
            }
        });
}

// Function ran when Manager selects an option and needs data displayed 
function displayProducts(queryScope) {
    var query;

    // Generate the correct query based on what results we want displayed
    if(queryScope === 'all') {
        query = 'SELECT * FROM products';
    } else if (queryScope === 'low') {
        query = 'SELECT * FROM products WHERE stock_quantity < 5';
    }

    // Query for the table information and display to user 
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Display tbale to user
        console.table(res);
        //- Bring them back to main menu.
        managerPrompt();
    });
}

function addInventory() {
    inquirer
    .prompt([
        // Here we give the user a list to choose from.
        {
            type: "input",
            message: "Please enter the 'item_id' of the product you would like to add inventory for?",
            validate: function(ans) {
                return (typeof ans === 'number');
            },
            name: "item"
        },
        {
            type: "input",
            message: "How much inventory would you like to add?",
            validate: function(ans) {
                return (typeof ans === 'number');
            },
            name: "stockAdd"
        }
    ])
    .then(function (inquirerResponse) {
        // Query Database for the item of id from user input
        var query = "SELECT * FROM products WHERE item_id=" + inquirerResponse.item;
        console.log("Searching for your tiem with item_id: " + inquirerResponse.item);
        connection.query(query, function (err, res) {
            if (err) throw err;

            // Validate whether or not the requested item is valid
            if(res[0].length === 0) {
                // Not a valid product case
                console.log("Not a valid item please try again.\n");
                managerPrompt();
            } else {
                // Valid Product case
                console.log("Valid product.\n" +
                "item_id: " + res[0].item_id + 
                "product_name: " + res[0].product_name + 
                "stock_quantity (original): " + res[0].stock_quantity + "\n");

                console.log("Updating the quantity now... Adding " + inquirerResponse.stockAdd + " to the stock's quantity.")

                connection.end();
            }
        });

    });
}

























































function passwordGen() {
    return '12345';
}


