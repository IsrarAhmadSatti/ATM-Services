#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

// using functions
let loggedin = false;
let userData =
{
    userName:"Israr",
    pin:1254,
    balance:100,
}

async function balanceInquiry()
{
    console.log(chalk.blue("Your Balance is: "+userData.balance,"\n"));
}

async function withdraw() 
{
    let withdraw = await inquirer.prompt([
        {
            message:"Enter the amount you want to withdraw",
            type:"input",
            name:"amount"
        },
    ]);
    const amount = parseFloat(withdraw.amount);

    if (isNaN(amount) || amount <= 0) {
        console.log(chalk.red("Invalid amount. Please enter a valid number."));
        return;
    }

    if (amount > userData.balance) {
        console.log(chalk.red("Insufficient balance."));
        return;
    }
    userData.balance -= amount;
    console.log(chalk.blue("Withdrawal successful. Your new balance is: " + userData.balance));    
}

//fnction to add credit to the account
async function AddCredit() 
{
    let add = await inquirer.prompt([
        {
            message:"Enter the amount",
            type:"input",
            name:"amount",
        }
    ])
    const amount = parseInt(add.amount); //converting amount to numeric
    if (isNaN(amount) || amount <= 0) {
        console.log(chalk.red("Invalid amount. Please enter a valid number."));
        return;
    }

    userData.balance += amount;
    console.log(chalk.blue("Deposit successful. Your new balance is: " + userData.balance));
}

async function ATMModule(pass:boolean)
{
   if (pass)
   {
        let operation = await inquirer.prompt([
            {
              type:"list",
              name:"option",
              choices:["Balance Inquiry","Withdraw","AddCredit","Exit"]
            },
        ])
        if (operation.option === "Balance Inquiry")
        {
           await balanceInquiry()
           ATMModule(loggedin)
        }
        else if(operation.option === "AddCredit")
        {
            await AddCredit()
            ATMModule(loggedin)
        }
        else if(operation.option === "Withdraw")
        {
            await withdraw()
            ATMModule(loggedin)
        }
        else
        {
            console.log(chalk.greenBright("\tThankyou for using ATM Services"));
            process.exit()
        }
    }
    
}

async function login()
{
    let answer = await inquirer.prompt([
        {
            type:"input",
            name:"Name",
            message:"Please enter user name"
        },
        {
            type:"input",
            name:"pincode",
            message:"Enter the pin number"
        }
    ])
    if (answer.Name === userData.userName && Number(answer.pincode) === userData.pin)
    {
        console.log(chalk.green("\tLOGIN SUCCESSFULL\n"));
        loggedin = true
    }
    else
    {
        console.log(chalk.redBright("\tWRONG CREDENTIALS!!!: please try again"));
        login()
    }
    ATMModule(loggedin)
}
console.log(chalk.greenBright("\tWelcome to ATM Services\n"));
console.log(chalk.blue("Please enter your credentials to continue\n"));
login(); //starting the oparation

// // implementation using loops
// // Getting user name from user
// while (true){
// let answer = await inquirer.prompt([
//     {
//         message:"Enter your name",
//         type:"input",
//         name:"userName",
//     },   
// ])

// if (answer.userName === userData.userName)
//     {
//         console.log(chalk.green("\tWelcome to ATM\n"));
//         break;
//     }
// else
// {
//     console.log(chalk.red("Wrong User Name: Try Again"));
// }
// }

// // Varifying the pin
// while (true){
// let pincode = await inquirer.prompt([
//     {
//         message:"Enter your pin",
//         type:"input",
//         name:"code",
//     },   
// ])
// if (Number(pincode.code) === userData.pin)
// {
//     console.log(chalk.green("\tLogin Successful\n"));
//     break;
// }
// else
// {
//     console.log(chalk.red("Wrong Pin: Enter the pin again"));
// }
// }

// // Displaying option to the user
// while(true){
// let operation = await inquirer.prompt([
//     {
//         message:"Select your operation",
//         type:"list",
//         name:"option",
//         choices:["Balance Inquiry","Cash Withdrawal","Add Cash","change pin","Exit"]
//     }
// ])

// if (operation.option === "Balance Inquiry")
// {
//     console.log(chalk.blue("Your Balance is: "+userData.balance,"\n"));
// }
// else if (operation.option === "Cash Withdrawal")
// {
//     let withdraw = await inquirer.prompt([
//         {
//             message:"Enter the amount",
//             type:"number",
//             name:"amount",
//         }
//     ])
//     if (withdraw.amount <= userData.balance)
//     {
//         userData.balance -= withdraw.amount;
//         console.log(chalk.blue("Your Balance is: "+userData.balance,"\n"));
//     }
//     else
//     {
//         console.log(chalk.red("Insufficient Balance \n"));
//     }

// }

// else if (operation.option === "Add Cash")
// {
//     let add = await inquirer.prompt([
//         {
//             message:"Enter the amount",
//             type:"number",
//             name:"amount",
//         }
//     ])
//     userData.balance += add.amount;
//     console.log(chalk.bgGrey("Your Balance is: "+userData.balance,"\n"));
// }
// else if (operation.option === "change pin")
// {
//     let newPin = await inquirer.prompt([
//         {
//             message:"Enter the new pin",
//             type:"number",
//             name:"pin",
//         }
//     ])
//     userData.pin = newPin.pin;
//     console.log(chalk.bgGrey("Your Pin is changed\n"));
// }
// else
// {
//     console.log(chalk.red("Thank You for using ATM"));
//     process.exit();
// }
// }