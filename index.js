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

// path statements for output paths and file names
const outputDir = path.resolve(__dirname, 'src');
const outputPath = path.join(outputDir, 'index.html');

console.log("index.js loading");