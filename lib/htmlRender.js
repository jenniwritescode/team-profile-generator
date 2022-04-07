const path = require('path');
const fs = require('fs');

const templatesDir = path.resolve(__dirname, '../dist');

const htmlRender = (employees) => {
	const html = [];

	html.push(employees.filter((employee) => employee.getRole() === 'Manager').map((manager) => renderManager(manager)));
	html.push(employees.filter((employee) => employee.getRole() === 'Engineer').map((engineer) => renderEngineer(engineer)));
	html.push(employees.filter((employee) => employee.getRole() === 'Intern').map((intern) => renderIntern(intern)));

	return renderTeam(html.join(''));
};

const renderManager = (manager) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'manager.html'), 'utf8');
	template = swapPlaceholders(template, 'name', manager.getName());
	template = swapPlaceholders(template, 'role', manager.getRole());
	template = swapPlaceholders(template, 'email', manager.getEmail());
	template = swapPlaceholders(template, 'id', manager.getId());
	template = swapPlaceholders(template, 'officeNumber', manager.getOfficeNumber());
	return template;
};

const renderEngineer = (engineer) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'engineer.html'), 'utf8');
	template = swapPlaceholders(template, 'name', engineer.getName());
	template = swapPlaceholders(template, 'role', engineer.getRole());
	template = swapPlaceholders(template, 'email', engineer.getEmail());
	template = swapPlaceholders(template, 'id', engineer.getId());
	template = swapPlaceholders(template, 'github', engineer.getGithub());
	return template;
};

const renderIntern = (intern) => {
	let template = fs.readFileSync(path.resolve(templatesDir, 'intern.html'), 'utf8');
	template = swapPlaceholders(template, 'name', intern.getName());
	template = swapPlaceholders(template, 'role', intern.getRole());
	template = swapPlaceholders(template, 'email', intern.getEmail());
	template = swapPlaceholders(template, 'id', intern.getId());
	template = swapPlaceholders(template, 'school', intern.getSchool());
	return template;
};

const renderTeam = (html) => {
	const template = fs.readFileSync(path.resolve(templatesDir, 'team.html'), 'utf8');
	return swapPlaceholders(template, 'team', html);
};

const swapPlaceholders = (template, placeholder, value) => {
	const pattern = new RegExp('{{ ' + placeholder + ' }}', 'gm');
	return template.replace(pattern, value);
};

module.exports = htmlRender;