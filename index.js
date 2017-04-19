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

                 //Display movie details
                console.log(chalk.green('\n Here is the forecast for ' + answer.cityname.toUpperCase() + ': '));
                console.log(chalk.yellow('Title: ') + data.query.results.channel.description);
                console.log((chalk.yellow('Wind: ')) + (chalk.blue('Wind Chill; ')) + data.query.results.channel.wind.chill + ', ' + (chalk.blue('Wind Direction; ')) + data.query.results.channel.wind.direction + ', ' + (chalk.blue('Wind Speed; ')) + data.query.results.channel.wind.speed);
                console.log((chalk.yellow('Atmosphere: ')) + (chalk.blue('Humidity; ')) + data.query.results.channel.atmosphere.humidity + ', ' + (chalk.blue('Pressure; ')) + data.query.results.channel.atmosphere.pressure + ', ' + (chalk.blue('Visibility; ')) + data.query.results.channel.atmosphere.visibility);
                console.log((chalk.yellow('Astronomy: ')) + (chalk.blue('Sunrise at about; ')) + data.query.results.channel.astronomy.sunrise + ', ' + (chalk.blue('Sunset at about; ')) + data.query.results.channel.astronomy.sunset);
                console.log((chalk.yellow('Geographical Coordinates: ')) + (chalk.blue('Longitude; ')) + data.query.results.channel.item.long + ', ' + (chalk.blue('Latitude; ')) + data.query.results.channel.item.lat);
                console.log((chalk.yellow('Temperature: ')) + (chalk.blue('Low; ')) + data.query.results.channel.item.forecast[0].low + ', ' + (chalk.blue('High; ')) + data.query.results.channel.item.forecast[0].high);
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.condition.text);
                console.log(chalk.yellow("Tomorrow's Forecast: "));
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
                console.log(chalk.yellow('Condition: ') + data.query.results.channel.item.forecast[9].text);
                                
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
      'Get weather forecasts',
    ]
  } ]).then(function (answer) {

        if(answer.option === 'Get weather forecasts'){
            getForecast();
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