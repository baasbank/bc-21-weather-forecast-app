'use strict';

var request = require('request'), chalk = require('chalk'),
    clear   = require('clear'), Spinner     = require('clui').Spinner,
    figlet  = require('figlet'), inquirer    = require('inquirer'),
    fs = require('fs');
    
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
                 fs.appendFile('recent.json', data , function (err) {
                    if (err) return console.log(err);
                    //console.log(data);
                    }); 

                data = JSON.parse(data);
                status.stop();

                //Exit if nothing was found
                if (data === '') {
                    console.log('\nLocation not in database.\n');
                    return exitApp();
                } 

                 //Display movie details
                console.log(chalk.green('\n Here is the forecast for ' + answer.cityname.toUpperCase() + ': '));
                console.log(chalk.yellow('Title: ') + data.query.results.channel.description);
                console.log((chalk.yellow('Wind: ')) + (chalk.green('Wind Chill; ')) + data.query.results.channel.wind.chill + ', ' + (chalk.green('Wind Direction; ')) + data.query.results.channel.wind.direction + ', ' + (chalk.green('Wind Speed; ')) + data.query.results.channel.wind.speed);
                console.log((chalk.yellow('Atmosphere: ')) + (chalk.green('Humidity; ')) + data.query.results.channel.atmosphere.humidity + ', ' + (chalk.green('Pressure; ')) + data.query.results.channel.atmosphere.pressure + ', ' + (chalk.green('Visibility; ')) + data.query.results.channel.atmosphere.visibility);
                console.log((chalk.yellow('Astronomy: ')) + (chalk.green('Sunrise at about; ')) + data.query.results.channel.astronomy.sunrise + ', ' + (chalk.green('Sunset at about; ')) + data.query.results.channel.astronomy.sunset);
                console.log((chalk.yellow('Geographical Coordinates: ')) + (chalk.green('Longitude; ')) + data.query.results.channel.item.long + ', ' + (chalk.green('Latitude; ')) + data.query.results.channel.item.lat);
                console.log((chalk.yellow('Temperature: ')) + (chalk.green('Low; ')) + data.query.results.channel.item.forecast[0].low + ', ' + (chalk.green('High; ')) + data.query.results.channel.item.forecast[0].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.condition.text);
                /*console.log(chalk.yellow("Tomorrow's Forecast: "));
                console.log(chalk.yellow('Day/Date: ') + data.query.results.channel.item.forecast[1].day + ', ' + data.query.results.channel.item.forecast[1].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[1].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[1].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[1].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[2].day + ', ' + data.query.results.channel.item.forecast[2].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[2].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[2].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[2].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[3].day + ', ' + data.query.results.channel.item.forecast[3].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[3].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[3].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[3].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[4].day + ', ' + data.query.results.channel.item.forecast[4].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[4].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[4].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[4].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[5].day + ', ' + data.query.results.channel.item.forecast[5].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[5].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[5].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[5].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[6].day + ', ' + data.query.results.channel.item.forecast[6].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[6].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[6].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[6].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[7].day + ', ' + data.query.results.channel.item.forecast[7].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[7].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[7].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[7].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[8].day + ', ' + data.query.results.channel.item.forecast[8].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[8].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[8].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[8].text);
                console.log(chalk.yellow('Forecast for: ') + data.query.results.channel.item.forecast[9].day + ', ' + data.query.results.channel.item.forecast[9].date);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[9].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[9].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[9].text);*/
                                
                exitApp();                 
            });
        });
}

function getCoordinates() {
    inquirer.prompt([ {
            type: 'input',
            name: 'cityname',
            message: 'What city do you want coordinates for?'
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
                console.log(chalk.green('\n Here are the coordinates for ' + answer.cityname.toUpperCase() + ': '));
                
               
                console.log((chalk.yellow('Geographical Coordinates: ')) + (chalk.blue('Longitude; ')) + data.query.results.channel.item.long + ', ' + (chalk.blue('Latitude; ')) + data.query.results.channel.item.lat);
                exitApp();

              
            });
        });
}
            

//Function that starts the application
function startApp() {
    inquirer.prompt([ {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
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
    message: 'Exit?',
    choices: [
      'Yes',
      'No',
    ]
  } ]).then(function (answer) {
      
        if(answer.option === 'No') { 
           return startApp();
        }
        if(answer.option === 'Yes') {
          return console.log(chalk.yellow('*******Hope you liked it?******'));
        }
    });
}

startApp();