const fs = require("fs");     // File System module: Read files, Create files, Update files, Delete files, Rename files
const path = require("path"); //Extract the filename from a file path
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const inquirer = require("inquirer"); //provides the user interface and the inquiry session flow: providing error feedback, asking questions, validating answers

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "title",
        message: "What is your Project name?"
    },
    {
        type: "input",
        name: "description",
        message: "What is the description of your projec?"
    },
    {
        type: "list",
        name: "license",
        message: "What is the license of your projec?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "NONE"]
    },
    {
        type: "input",
        name: "installation",
        message: "What is the command to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What is the command to run tester?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "what is the usage?"
    },
    {
        type: "input",
        name: "contributing",
        message: "Who is contributor?"
    },
    {
        type: "input",
        name: "emailAddress",
        message: "what is your Email address?"
    },
    //add questions
];

function writeToFile(fileName, data) {
    const currentDirectory = process.cwd();
    const savedDirectory = path.join(currentDirectory, fileName);
    return fs.writeFileSync(savedDirectory, data); // similar to fs.writeFile (asynchronously) but this completes synchronously and
                                                   // therefore blocks the main thread (I/O is blocking). 
                                                   //If you merely want to update an existing file, you'll want to use appendFile.
}

function init() {
    inquirer.prompt(questions).then((inquirerResponses) =>{
        console.log("...searching");

        api
        .getUser(inquirerResponses.github)
        .then(({data})=>{
            writeToFile("README.md", generateMarkdown({...inquirerResponses,...data}));
        })
    })
}

init();
