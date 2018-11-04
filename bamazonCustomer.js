const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require('chalk');

const connection = mysql.createConnection({
  host: "localhost",

  // my port; if not 3306
  port: 3306,

  // my username
  user: "root",

  // my password and my database name
  password: "password",
  database: "bamazon"
});

  
connection.connect(function(err) {
  if (err) throw err; 
  
 console.log("connected as id " + connection.threadId + "\n");
});

//this will  Shows the products ids, products names, and products prices of products department
connection.query('SELECT * FROM `products`', function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  for (let i = 0; i < results.length; i++) {
    console.log(chalk.greenBright("Item_Id: ") + results[i].item_id + " || " + chalk.blueBright("Porduct_Name: ") +
    results[i].product_name + " || " + chalk.greenBright("Department: ") +
    results[i].department_name + " || " + chalk.yellowBright("Price: ") +
    results[i].price.toString() + " || " +  chalk.redBright("Quantity: ") +
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
      for (let i = 0; i < results.length; i++) {
       /*  
        //
         if (results !== answer.item_id) {
          console.log("ERROR! you selected a invalid item ID!");
        
        //
        */
        if (results[i].item_id === parseInt(answer.itemId)) {
          // If order quantity is too high,then notify user of insufficient stock
       
          if (results[i].stock_quantity < parseInt(answer.quantity)) {
            console.log(chalk.redBright("Insufficient stock!"));
            console.log("There is Only  " + results[i].stock_quantity + " item/items left in stock!");
            console.log(chalk.yellowBright("Sorry! There is not enough quantities in stock! Please change your quantities!"));
            saleItems();
           
           } else {
            // this will calculate order total and remaining stock
            let orderTotal = parseFloat(answer.quantity * results[i].price).toFixed(2);
            let updateMyStock = results[i].stock_quantity - answer.quantity;
    
            // this query will update the stock
            let updateStock = 'UPDATE `products` SET `stock_quantity` = ' + updateMyStock + ' WHERE `item_id` = ' + answer.itemId;
            connection.query(updateStock, function(err, result) {
              if (err) {
                console.log(err);
              } else {
               // console.log(chalk.blueBright(result.affectedRows + " product updated"));
                console.log(chalk.greenBright("Thank you for shopping with us!"));
                console.log(chalk.redBright("========================================================================="));
                keepShopping();
              }
            });

            //this will notify user of successful purchase
            console.log(chalk.blueBright("The products your selected is in stock.....We are  placing your order!"));
            console.log(chalk.yellowBright(" Your order has been placed!....You have purchased ") + chalk.greenBright(answer.quantity + " " + results[i].product_name));
            console.log(chalk.magenta("Your order total is ") +chalk.cyanBright(orderTotal));    
            //
          
            //
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
        console.log("=====================================================================================================");
        saleItems();
      }else{
        console.log(chalk.cyanBright("Thank you for shopping with Bamazon! We hope you will come back for shopping with us agian!"));
        connection.end();
      };
     
    });
  };
});

    

      









