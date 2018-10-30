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
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  showMeAllPoduct();
});


//=====================================================================
// Show ids, names, and prices of products

    // Prompt user to select a product and enter desired quantity
    function productsInfo() {
      inquirer.prompt( [
      {
        name: "itemId",
        type: "input",
        message: "Enter the id of the product you would like to buy."
      }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }

   
     
    ]).then(function(answer) {
       var item1 = answer.product;//product;
     // var item1 = parseFloat(answer.quantity * response[i].price).toFixed(2);
      //var quantity1= response[i].stock_quantity - answer.quantity;
      var quantity1 = answer.quantity; 
       // var quantity1 = answer.quantity; 
        connection.query("SELECT * FROM products WHERE ?", { item_id: item1},function (err, response) {
          if (err) throw err;

          if(response.length === 0){
            console.log("Error: please select a valid Item ID from the products list.");
            showMeAllPoduct();
          }
          else{
            var productInStock = response[0];
            if(quantity1 <= productInStock.stock_quantity){
              console.log("Good news! We have the porduct is in stock....you can place your order!");
            
          var updateTheInventory = "UPDATE products SET stock_quantity = " + (productInStock.stock_quantity - quantity1) + "WHERE item_id = " + item1;
          connection.query(updateTheInventory, function(err, data){
            if(err) throw err;
            console.log("Your order has been placed successfuly! Your total would be $" + productInStock.price * quantity1);
            console.log("Thank you for shopping with us.");
            console.log("====================================");
            keepShopping();
          })
        } else {
          console.log("Sorry, item's not in stock to place your order this time.\n" + "please change your order.\n" + "your item was " +
          productInStock.product_name + " and it has " + productInStock.stock_quantity + " left in stock.");
          keepShopping();
        }
      }
    })
  
    })
  
  }
  

function showMeAllPoduct() {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) {
        console.log(err);
      }
      for (var i=0; i < results.length; i++) {
        console.log(chalk.green("Item_Id: ") + results[i].item_id + " " + chalk.blue("Porduct_Name: ") +
          results[i].product_name + " " + chalk.green("Department: ") +
          results[i].department_name + " [" + chalk.yellow("Price: ") +
          results[i].price.toString() + "]" + " " + chalk.red("Quantity: ") +
          results[i].stock_quantity.toString());
      
      } 
     
      productsInfo();
   });

  
  }

function keepShopping() {
  inquirer.prompt([
    {
      type: "fonfirm",
      message: "Would you like to keep shopping?",
      name: "confirm"
    }
  ]).then(function(response){
    if(response.confirm){
      console.log("================================================");
      showMeAllPoduct();
    }else{
      console.log("Thank you for shopping with Bamazon");
      connection.end();
    };
   
  });
};
    
    

      









