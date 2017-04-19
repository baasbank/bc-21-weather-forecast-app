'use strict';

var request = require('request'), chalk = require('chalk'),
    clear   = require('clear'), Spinner     = require('clui').Spinner,
    figlet  = require('figlet'), inquirer    = require('inquirer');
    
clear();
console.log(chalk.green(figlet.textSync('Here you go!', { horizontalLayout: 'full' })));

function getForecast() {
    inquirer.prompt([ {
            type: 'input',
            name: 'cityname',
            message: 'What city do you want forecasts for?'
        },