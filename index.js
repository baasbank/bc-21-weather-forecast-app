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

        ]).then(function (answer) {
            //Reformat movie title to fit query
            var cityname    = answer.cityname.split(/\s+/).join('%20');
            var link = ' https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cityname+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


            var status = new Spinner("I'll get your forecast in a jiffy...");
            status.start();
            request(link, function (err, res, data){
                if (err) {
                    return console.log(err);
                } 

                data = JSON.parse(data);
                status.stop();

                //Exit if nothing was found
                if (data === '') {
                    console.log('\nNothing found.\n');
                    return exitApp();
                } 