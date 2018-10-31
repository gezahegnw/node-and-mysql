var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require('chalk');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

/*connection.connect(function(err) {
  if (err) throw err;
  showMeAllPoduct();
});

*/
//=====================================================================
// Show ids, names, and prices of products

  
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Show ids, names, and prices of products
connection.query('SELECT * FROM `products`', function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  for (var i=0; i<results.length; i++) {
    console.log(chalk.green("Item_Id: ") + results[i].item_id + " " + chalk.blue("Porduct_Name: ") +
    results[i].product_name + " " + chalk.green("Department: ") +
    results[i].department_name + " [" + chalk.yellow("Price: ") +
    results[i].price.toString() + "]" + " " + chalk.red("Quantity: ") +
    results[i].stock_quantity.toString());  }
  // Prompt user to select a product and enter desired quantity
  function saleItems() {
    inquirer.prompt( [{
      name: "itemId",
      type: "input",
      message: "Enter the id of the product you'd like to buy."
    }, {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
    }]).then(function(answer) {
      for (var i=0; i<results.length; i++) {
        if (results[i].item_id === parseInt(answer.itemId)) {
          // If order quantity is too high, notify user of insufficient stock
          if (results[i].stock_quantity < parseInt(answer.quantity)) {
            console.log(chalk.red("Insufficient stock!"));
            saleItems();
          } else {
            // Calculate order total and remaining stock
            var total = parseFloat(answer.quantity*results[i].price).toFixed(2);
            var newStock = results[i].stock_quantity - answer.quantity;

            // Construct query to update stock
            var updateStock = 'UPDATE `products` SET `stock_quantity` = ' + newStock + ' WHERE `item_id` = ' + answer.itemId
            connection.query(updateStock, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(chalk.blue(result.affectedRows + " product updated"));
                keepShopping();
              }
            });

            // Notify user of successful purchase
            console.log("You have purchased " + answer.quantity + " " + results[i].product_name);
            console.log("Your order total is " + total);
          //  keepShopping();
          }
        }
      }
    });
  }
    saleItems();

  function keepShopping() {
    inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        message: "Would you like to keep shopping?",
      }
    ]).then(function(response){
      if(response.confirm){
        console.log("================================================");
        saleItems();
      }else{
        console.log("Thank you for shopping with Bamazon");
        connection.end();
      };
     
    });
  };
  //saleItems();
});

    

      









