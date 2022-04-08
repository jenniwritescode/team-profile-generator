// require statements
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeAsyncFile = util.promisify(fs.writeFile);
const makeHTML = require('./lib/htmlRender');
const LogColors = require('./logColors');

// path statements for output paths and file names
const outputDir = path.resolve(__dirname, 'dist');
const outputPath = path.join(outputDir, 'index.html');

const log = new LogColors();

// array for team members
const teamArray = [];

// intro CLI text
const introQ = {
    type: 'confirm',
	message: `
        Welcome to the Team Profile Generator!
        This program creates a team profile website that will show basic information about each team member. The website is generated using the answers to your questions and uses HTML and CSS Bootstrap.
        
        You will be prompted to provide information about the team manager and will add team members individually.

        After you've entered information on all team members, you will receive instructions on how to access the team profile website.

        Do you wish to continue?`,
	name: 'startQ',
};

// manager CLI questions
const managerQ = [
	{
		type: 'input',
		message: "What is the team manager's full name?",
		name: 'managerName',
        default() {
            return  "FirstName LastName";
        },
	},
	{
		type: 'input',
		message: "What is the team manager's ID number?",
		name: 'managerId',
        default() {
            return  "1001";
        },
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
        default() {
            return  "name@company.com";
        },
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

const introTeamQ = {
	type: 'confirm',
	message: 'Do you want to add anyone to this team? Select "y" to add an Engineer or Intern, or select "N" if you do not need to add any additional team members.',
	name: 'teamQ',
};

const teamMemberType = {
	type: 'list',
	message: 'What type of team member are you adding?',
	choices: [
        'Intern', 
        'Engineer'
    ],
	name: 'teamMemberRole',
};

const engineerQ = [
    {
		type: 'input',
		message: "What is the engineer's full name?",
		name: 'engineerName',
        default() {
            return  "FirstName LastName";
        },
	},
	{
		type: 'input',
		message: "What is the engineer's ID number?",
		name: 'engineerId',
        default() {
            return  "5101";
        },
		validate: function (num) {
			numbers = /^[0-9]+$/.test(num);

			if (numbers) {
				return true;
			} else {
				log.red("Error: please enter only numbers for the ID number.");
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the engineer's email?",
		name: 'engineerEmail',
        default() {
            return  "name@company.com";
        },
		validate: function (emailInput) {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

			if (emailFormat) {
				return true;
			} else {
				log.red("Error: please enter a valid email address.");
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is engineer's GitHub username?",
		name: 'engineerGithub',
        default() {
            return  "coolGitHubUser";
        },
	},
];

const internQ = [
	{
		type: 'input',
		message: "What is the intern's full name?",
		name: 'internName',
        default() {
            return "FirstName LastName"
        }
	},
	{
		type: 'input',
		message: "What is the intern's ID number?",
		name: 'internId',
        default() {
            return "9001"
        },
		validate: function (num) {
			numbers = /^[0-9]+$/.test(num);
			if (numbers) {
				return true;
			} else {
				log.red("Error: please enter only numbers for the ID number.");
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the intern's email?",
		name: 'internEmail',
        default() {
            return "name@school.edu"
        },
		validate: function (emailInput) {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);
			if (emailFormat) {
				return true;
			} else {
				log.red("Error: please enter a valid email address.");
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "Where is the intern attending school?",
		name: 'internSchool',
        default() {
            return "Northwestern University"
        }
	},
];


// function to start inquirer questions
function askIntroQ() {
	inquirer.prompt(introQ).then((startApp) => {
		if (startApp.startQ === true) {
            console.log(startApp.startQ);
			log.green("Great! Let's get information on the team manager.");
			askManagerQ();
		} else {
            console.log(startApp.startQ);
			log.yellow(`Application closed. Type "node index.js" to run application again.`);
		}
	});
}

// function to ask about additional team members, then either loop through to keep adding team members or stop and create the HTML for the team members
function getTeamSize() {
    inquirer.prompt(introTeamQ).then((buildTeam) => {
		if (buildTeam.teamQ === true) {
			addTeamMember();
		}
		else {
			htmlRender(teamArray);
		}
	});
}

// function to get manager questions then prompt for team questions
function askManagerQ() {
    inquirer.prompt(managerQ).then((createManager) => {
		let manager = new Manager(createManager.managerName, createManager.managerId, createManager.managerEmail, createManager.managerOfficeNumber);
		teamArray.push(manager);
		getTeamSize();
});
}

function addTeamMember() {
    inquirer.prompt(teamMemberType).then((roleChoice) => {
        console.log(roleChoice.teamMemberRole);
		if (roleChoice.teamMemberRole === 'Engineer') {
			log.magenta("Let's build an engineer profile!");
			inquirer.prompt(engineerQ).then((buildEngineer) => {
				let engineer = new Engineer(buildEngineer.engineerName, buildEngineer.engineerId, buildEngineer.engineerEmail, buildEngineer.engineerGithub);
				teamArray.push(engineer);
				getTeamSize();
			});
		} else {
			log.magenta("Let's build an intern profile!");
			inquirer.prompt(internQ).then((buildIntern) => {
				let intern = new Intern(buildIntern.internName, buildIntern.internId, buildIntern.internEmail, buildIntern.internSchool);
				teamArray.push(intern);
				getTeamSize();
			});
		}
	});
}

async function htmlRender(file) {
	const indexHTML = makeHTML(file);
	await writeAsyncFile(outputPath, indexHTML).then(function () {
		log.green(`Thank you for using the team profile generator!`);
	});
}

// start asking questions
askIntroQ();