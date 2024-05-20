#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.bold.blue("\n\t*******Welcome to Muhib Ahmed TodoList******\n"));
while (condition) {
    let ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: (chalk.green("Please select an option")),
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        }
    ]);
    if (ans.select === "Add") {
        let addTask = await inquirer.prompt({
            name: "firstQuestion",
            type: "input",
            message: (chalk.green("Please add your tasks:")),
            validate: function (input) {
                if (input.trim() == "") {
                    return (chalk.red("Please add a task:"));
                }
                return true;
            }
        });
        if (addTask.firstQuestion.trim() !== "") {
            todoList.push(addTask.firstQuestion);
            todoList.forEach(firstQuestion => console.log(firstQuestion));
        }
    }
    if (ans.select === "Update") {
        let updateTask = await inquirer.prompt([{
                name: "thirdQuestion",
                type: "list",
                message: (chalk.green("Please update tasks")),
                choices: todoList.map(item => item)
            }]);
        let addTask = await inquirer.prompt({
            name: "firstQuestion",
            type: "input",
            message: (chalk.green("Please add your tasks"))
        });
        let newTodoList: any[] = todoList.filter(val => val !== updateTask.thirdQuestion);
        todoList = [...newTodoList, addTask.firstQuestion];
        todoList.forEach(thirdQuestion => console.log(thirdQuestion));
    }
    if (ans.select === "View") {
        console.log(chalk.bold.blue("*****Your existing TodoList is:"));
        todoList.forEach(firstQuestion => console.log(firstQuestion));
    }
    if (ans.select === "Delete") {
        let deleteTask = await inquirer.prompt({
            name: "fourthQuestion",
            type: "list",
            message: (chalk.green("Which task do you want to delete")),
            choices: todoList.map(item => item)
        });
        let newTodoList: any[] = todoList.filter(val => val !== deleteTask.fourthQuestion);
        todoList = [...newTodoList];
        todoList.forEach(fourthQuestion => console.log(fourthQuestion));
    }
    if (ans.select === "Exit") {
        console.log(chalk.bold.yellowBright("You are exiting a program"));
        condition = false;
    }
}
