'use strict';

var request = require('request'),
    clear   = require('clear'),
    figlet  = require('figlet'),
    inquirer    = require('inquirer'),
    chalk       = require('chalk'),
    Spinner     = require('clui').Spinner, fs = require('fs');

clear();
console.log('\t===============================================================================================================================');
console.log(
  chalk.green(
    figlet.textSync('            Weatherman      ', { horizontalLayout: 'full' })
  )
);
console.log('\t===============================================================================================================================');
console.log('\n\n');


function getForecast() {
    inquirer.prompt([ {
            type: 'input',
            name: 'cityname',
            message: '\t\t\t\t\t What city do you want forecasts for?'
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
                 fs.appendFile('recent.json', data , function (err) {
                    if (err) return console.log(err);
                    }); 

                data = JSON.parse(data);
                status.stop();

                //Exit if nothing was found
                if (data === '') {
                    console.log('\nLocation not in database.\n');
                    return exitApp();
                } 

                 //Display movie details
                 console.log('\t\t\t********************************************************************************');
                //console.log(chalk.green('\n Here is the forecast for ' + answer.cityname.toUpperCase())); ...+ ' ' +today +': '));
                console.log(chalk.yellow('\n\t\t\t\t\t' + data.query.results.channel.description));
                console.log('\t\t\t\t-------------------------------------------------------------'); 
                console.log((chalk.yellow('\t\t\t\t\t\t\t\tWind')));  
                console.log(chalk.green('\t\t\t\t\t Wind Chill') + '\t\t |' + '\t\t' + data.query.results.channel.wind.chill);
                console.log(chalk.green('\t\t\t\t\t Wind Direction') + '\t\t |' + '\t\t' + data.query.results.channel.wind.direction);
                console.log(chalk.green('\t\t\t\t\t Wind Speed') + '\t\t |' + '\t\t' + data.query.results.channel.wind.speed);
                console.log((chalk.yellow('\t\t\t\t\t\t\t      Atmosphere')));
                console.log(chalk.green('\t\t\t\t\t Humidity') + '\t\t |' + '\t\t' + data.query.results.channel.atmosphere.humidity);
                console.log(chalk.green('\t\t\t\t\t Pressure') + '\t\t |' + '\t\t' + data.query.results.channel.atmosphere.pressure);
                console.log(chalk.green('\t\t\t\t\t Visibility') + '\t\t |' + '\t\t' + data.query.results.channel.atmosphere.visibility);
                console.log((chalk.yellow('\t\t\t\t\t\t\t      Astronomy')));
                console.log(chalk.green('\t\t\t\t\t Sunrise at') + '\t\t |' + '\t\t' + data.query.results.channel.astronomy.sunrise);
                console.log(chalk.green('\t\t\t\t\t Sunset at') + '\t\t |' + '\t\t' + data.query.results.channel.astronomy.sunset);
                console.log((chalk.yellow('\t\t\t\t\t\t\t      Temperature')));
                console.log(chalk.green('\t\t\t\t\t Low') + '\t\t\t |' + '\t\t' + data.query.results.channel.item.forecast[0].low);
                console.log(chalk.green('\t\t\t\t\t High') + '\t\t\t |' + '\t\t' + data.query.results.channel.item.forecast[0].high);
                console.log((chalk.yellow('\t\t\t\t\t\t\t ++++++++++++++++++')));
                console.log(chalk.green('\t\t\t\t\t Condition') + '\t\t |' + '\t\t' + data.query.results.channel.item.condition.text);
                console.log('\n');
                
                exitApp();                 
            });
        });
}

function getCoordinates() {
    inquirer.prompt([ {
            type: 'input',
            name: 'cityname',
            message: '\t\t\t\t\t What city do you want coordinates for?'
        },

        ]).then(function (answer) {
            //Reformat movie title to fit query
            var cityname    = answer.cityname.split(/\s+/).join('%20');
            var link = ' https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cityname+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


            var status = new Spinner("I'll get your coordinates in a jiffy...");
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

                 //Display movie details
               console.log('\t\t\t********************************************************************************');
               
                console.log(chalk.yellow('\t\t\t\t\t\tGeographical Coordinates for ' + answer.cityname.toUpperCase() + ': ')); 
                console.log('\t\t\t\t-------------------------------------------------------------'); 
                console.log(chalk.green('\n\t\t\t\t\t   Longitude ') + '\t\t| ' + '\t   ' + data.query.results.channel.item.long);
                console.log(chalk.green('\n\t\t\t\t\t   Latitude ') + '\t\t| ' + '\t   ' + data.query.results.channel.item.lat);
                console.log('');
                exitApp();

              
            });
        });
}

//Function that starts the application
function startApp() {
    inquirer.prompt([ {
    type: 'list',
    name: 'option',
    message: '\t\t\t\t\t What do you want to do?',
    choices: [
      //'Search for a book (e.g: Things fall apart)',
      //'Search for a movie (e.g: The expendables)',
      'Get weather forecast',
      'Get geographical coordinates'
    ]
  } ]).then(function (answer) {

        if(answer.option === 'Get weather forecast') {
            getForecast();
        }

        if(answer.option === 'Get geographical coordinates') {
          getCoordinates();
        }

    });
}

//Exit function
function exitApp() {
    inquirer.prompt([ {
    type: 'list',
    name: 'option',
    message: '\t\t\t\t\t Exit?',
    choices: [
      'Yes',
      'No',
    ]
  } ]).then(function (answer) {
      
        if(answer.option === 'No') { 
           return startApp();
        }
        if(answer.option === 'Yes') {
          return console.log(chalk.yellow('\n\t\t\t You can find all your recently searched weather information in the recent.json file in this directory'));
        }
    });
}

startApp();