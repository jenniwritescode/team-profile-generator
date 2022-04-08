const path = require('path');
const fs = require('fs');

// declare directory for templates for html rendering
const templatesDir = path.resolve(__dirname, '../src');

// array for html
const htmlRender = (employees) => {
	const html = [];

	html.push(employees.filter((employee) => employee.getRole() === 'Manager').map((manager) => renderManager(manager)));
	html.push(employees.filter((employee) => employee.getRole() === 'Engineer').map((engineer) => renderEngineer(engineer)));
	html.push(employees.filter((employee) => employee.getRole() === 'Intern').map((intern) => renderIntern(intern)));

	return renderTeam(html.join(''));
};

// get values for manager
const renderManager = (manager) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'manager.html'), 'utf8');
	template = swapPlaceholders(template, 'name', manager.getName());
	template = swapPlaceholders(template, 'role', manager.getRole());
	template = swapPlaceholders(template, 'id', manager.getId());
	template = swapPlaceholders(template, 'email', manager.getEmail());
	template = swapPlaceholders(template, 'officeNumber', manager.getOfficeNumber());
	return template;
};

// get values for Engineers
const renderEngineer = (engineer) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'engineer.html'), 'utf8');
	template = swapPlaceholders(template, 'name', engineer.getName());
	template = swapPlaceholders(template, 'role', engineer.getRole());
	template = swapPlaceholders(template, 'id', engineer.getId());
	template = swapPlaceholders(template, 'email', engineer.getEmail());
	template = swapPlaceholders(template, 'github', engineer.getGithub());
	return template;
};

// get values for Interns
const renderIntern = (intern) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'intern.html'), 'utf8');
	template = swapPlaceholders(template, 'name', intern.getName());
	template = swapPlaceholders(template, 'role', intern.getRole());
	template = swapPlaceholders(template, 'id', intern.getId());
	template = swapPlaceholders(template, 'email', intern.getEmail());
	template = swapPlaceholders(template, 'school', intern.getSchool());
	return template;
};

// read team.html file and put values in for the different team members
const renderTeam = (html) => {
	const template = fs.readFileSync(path.resolve(templatesDir, 'team.html'), 'utf8');
	return swapPlaceholders(template, 'team', html);
};

// replace values in templates with actual values for team members
const swapPlaceholders = (template, placeholder, value) => {
	const pattern = new RegExp('{{ ' + placeholder + ' }}', 'gm');
	return template.replace(pattern, value);
};

module.exports = htmlRender;