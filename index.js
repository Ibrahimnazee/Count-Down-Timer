#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow('*'.repeat(45)));
console.log(chalk.bold.italic.blue("\n \t WELCOME TO COUNTDOWN TIMER\n"));
console.log(chalk.yellow('*'.repeat(45)));
const response = await inquirer.prompt({
    name: "number",
    type: "input",
    message: chalk.bold.italic("Please Enter The Amount Of Seconds"),
    validate: (input) => {
        const num = Number(input);
        if (isNaN(num)) {
            return chalk.bold.red("Please enter a valid number");
        }
        else if (num >= 60) {
            return chalk.bold.red("Seconds must be less than 60");
        }
        else {
            return true;
        }
    },
});
let input = Number(response.number);
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.red("Time Has Expired"));
            process.exit(0);
        }
        let min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        let sec = Math.floor(timeDiff % 60);
        console.log(chalk.bold.italic.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
