// require statements
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const htmlRender = require('./lib/htmlRender');
const LogColors = require('./logColors');

// path statements for output paths and file names
const outputDir = path.resolve(__dirname, 'src');
const outputPath = path.join(outputDir, 'index.html');

const log = new LogColors();

console.log("index.js loading");

const teamArray = [];

// intro CLI text
const introQ = {
    type: 'checkbox',
	message: `
        Welcome to the Team Profile Generator!
        This program creates a team profile website that will show basic information about each team member. The website is generated using the answers to your questions and uses HTML and CSS Bootstrap.
        
        You will be prompted to provide information about the team manager and will select the number of team members.

        You will then submit information for each team member, including whether they are an intern or an engineer. After you've entered all the information, you will receive instructions on how to access the team profile website.

        Do you want to continue?`,
	choices: ['Yes', 'No'],
	name: 'startQ',
};

// manager CLI questions
const managerQ = [
	{
		type: 'input',
		message: "What is the team manager's full name?",
		name: 'managerName',
	},
	{
		type: 'input',
		message: "What is the team manager's ID number?",
		name: 'managerId',
		validate: function (num) {
			numbers = /^[0-9]+$/.test(num);

			if (numbers) {
				return true;
			} else {
				log.red(`Error: please enter only numbers, no letters or special characters.`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the team manager's email?",
		name: 'managerEmail',
		validate: function (emailInput) {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

			if (emailFormat) {
				return true;
			} else {
				log.red(`Error: please enter a valid email address.`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the team manager's office number?",
		name: 'managerOfficeNumber',
        default() {
            return  "312-555-2323";
        },
	},
];

// function to ask questions
function askIntroQ() {
	inquirer.prompt(introQ).then((startApp) => {
		if (startApp.startQ == 'Yes') {
			log.green("Great! Let's get information on the team manager.");
			askManagerQ();
		} else {
			log.yellow(`Application closed. Type "node index.js" to run application again.`);
		}
	});
}

function askManagerQ() {
    inquirer.prompt(managerQ).then((createManager) => {
		let manager = new Manager(createManager.managerName, createManager.managerId, createManager.manageEmail, createManager.managerOfficeNumber);
		teamArray.push(manager);

		//getTeamSize();
});
}

// start asking questions
askIntroQ();