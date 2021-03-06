'use strict';

//Require dependencies
var request = require('request'),
	clear   = require('clear'),
	figlet  = require('figlet'),
	inquirer    = require('inquirer'),
	chalk       = require('chalk'),
	Spinner     = require('clui').Spinner, fs = require('fs');

var searchedLocation = false;

clear();
console.log('\t===============================================================================================================================');
console.log(
	chalk.yellow(
		figlet.textSync('            Weatherman      ', { horizontalLayout: 'full' })
	)
);
console.log('\t===============================================================================================================================');
console.log('\n\n');

// Function to get forecast
function getForecast() {
	inquirer.prompt([ {
		type: 'input',
		name: 'cityname',
		message: '\nWhat city/area code do you want forecasts for?'
	},
	]).then(function (answer) {
	  //Reformat cityname to fit API query
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

			// If API returns an error
			if (data.error){
				return notValid();
			}

			// If API returns an empty dataset
			if (data.query.count === 0) {
				return notValid();
			}
			else {
				//Filter details from the API result
			  let result = {};
				result['description'] =data.query.results.channel.description;
				result['windChill'] = data.query.results.channel.wind.chill;
				result['windDirection'] = data.query.results.channel.wind.direction;
				result['windSpeed'] = data.query.results.channel.wind.speed;
				result['humidity'] = data.query.results.channel.atmosphere.humidity;
				result['pressure'] = data.query.results.channel.atmosphere.pressure;
				result['visibility'] = data.query.results.channel.atmosphere.visibility;
				result['sunrise'] = data.query.results.channel.astronomy.sunrise;
				result['sunset'] = data.query.results.channel.astronomy.sunset;
				result['low'] = data.query.results.channel.item.forecast[0].low;
				result['high'] = data.query.results.channel.item.forecast[0].high;
				result['condition'] = data.query.results.channel.item.condition.text;

				// Write history to file
				fs.appendFile('recent.json', JSON.stringify(result) + '#' , function (err) {
					if (err) return console.log(err);
				}); 
				
				//Display weather data

				console.log('\n\t\t\t********************************************************************************');
				console.log(chalk.yellow('\n\t\t\t\t\t' + result['description']));
				console.log('\t\t\t\t-------------------------------------------------------------'); 
				console.log((chalk.yellow('\t\t\t\t\t\t\t\tWind')));  
				console.log(chalk.green('\t\t\t\t\t Wind Chill') + '\t\t |' + '\t\t' + result['windChill'] + 'F');
				console.log(chalk.green('\t\t\t\t\t Wind Direction') + '\t\t |' + '\t\t' + result['windDirection']);
				console.log(chalk.green('\t\t\t\t\t Wind Speed') + '\t\t |' + '\t\t' + result['windSpeed'] + 'mph');
				console.log((chalk.yellow('\t\t\t\t\t\t\t      Atmosphere')));
				console.log(chalk.green('\t\t\t\t\t Humidity') + '\t\t |' + '\t\t' + result['humidity'] + 'g/m^3');
				console.log(chalk.green('\t\t\t\t\t Pressure') + '\t\t |' + '\t\t' + result['pressure'] + 'Pa');
				console.log(chalk.green('\t\t\t\t\t Visibility') + '\t\t |' + '\t\t' + result['visibility'] + 'mi');
				console.log((chalk.yellow('\t\t\t\t\t\t\t      Astronomy')));
				console.log(chalk.green('\t\t\t\t\t Sunrise at') + '\t\t |' + '\t\t' + result['sunrise']);
				console.log(chalk.green('\t\t\t\t\t Sunset at') + '\t\t |' + '\t\t' + result['sunset']);
				console.log((chalk.yellow('\t\t\t\t\t\t\t      Temperature')));
				console.log(chalk.green('\t\t\t\t\t Low') + '\t\t\t |' + '\t\t' + result['low'] + 'F');
				console.log(chalk.green('\t\t\t\t\t High') + '\t\t\t |' + '\t\t' + result['high'] + 'F');
				console.log((chalk.yellow('\t\t\t\t\t\t\t ++++++++++++++++++')));
				console.log(chalk.green('\t\t\t\t\t Condition') + '\t\t |' + '\t\t' + result['condition']);
				console.log('\n');
				
				exitApp();
			}                 
		});
	});
}

// Function to get coordinates
function getCoordinates() {
	inquirer.prompt([ {
		type: 'input',
		name: 'cityname',
		message: '\nWhat city/area code do you want coordinates for?'
	},

	]).then(function (answer) {
		//Reformat city name to fit query
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

			// If the API returns an error
			if (data.error){
				return notValid();
			}
			// If the API returns an empty dataset
			if (data.query.count === 0) {
				return notValid();
			}
			else {
				console.log('\n\t\t\t********************************************************************************');
				console.log(chalk.yellow('\t\t\t\t\t\tGeographical Coordinates for ' + answer.cityname.toUpperCase() + ': ')); 
				console.log('\t\t\t\t-------------------------------------------------------------'); 
				console.log(chalk.green('\n\t\t\t\t\t   Longitude ') + '\t\t| ' + '\t   ' + data.query.results.channel.item.long);
				console.log(chalk.green('\n\t\t\t\t\t   Latitude ') + '\t\t| ' + '\t   ' + data.query.results.channel.item.lat);
				console.log('');
				exitApp();
			}
		});
		
	});
}
					

//Function that starts the application
function startApp() {
	inquirer.prompt([ {
		type: 'list',
		name: 'option',
		message: '\nWhat do you want to do?',
		choices: [
			'Get weather forecast',
			'Get geographical coordinates'
	]}]).then(function (answer) {
		if(answer.option === 'Get weather forecast') {
			getForecast();
			searchedLocation = true;
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
	message: '\nDo you wish to exit?',
	choices: [
		'Yes',
		'No',
	]}]).then(function (answer) {
		if(answer.option === 'No') { 
			return startApp();
		}
		if(answer.option === 'Yes') {
			if (searchedLocation === false) { 
				console.log(chalk.yellow('\n\t\t\t **********************************Thanks!********************************************'));
				return;
			}
			inquirer.prompt([ {
				type: 'list',
				name: 'option',
				message: '\nDo you want to view forecast search history?',
				choices: [
				'Yes',
				'No',
				]
			} ]).then(function (answer) { 
				if (answer.option === 'Yes') {
					try {  

						//Display user's search history
						var data = fs.readFileSync('recent.json', 'utf8');
						let history = data.split("#");
						console.log('\nYour History************************************"')
						let result;
						for(let i=0; i< history.length - 1; i++){
							result = JSON.parse(history[i]);
							console.log(`\n\t\t\tHistory ${i+1}  ********************************************************************************`);
							console.log(chalk.yellow('\n\t\t\t\t\t' + result['description']));
							console.log('\t\t\t\t-------------------------------------------------------------'); 
							console.log((chalk.yellow('\t\t\t\t\t\t\t\tWind')));  
							console.log(chalk.green('\t\t\t\t\t Wind Chill') + '\t\t |' + '\t\t' + result['windChill'] + 'F');
							console.log(chalk.green('\t\t\t\t\t Wind Direction') + '\t\t |' + '\t\t' + result['windDirection']);
							console.log(chalk.green('\t\t\t\t\t Wind Speed') + '\t\t |' + '\t\t' + result['windSpeed'] + 'mph');
							console.log((chalk.yellow('\t\t\t\t\t\t\t      Atmosphere')));
							console.log(chalk.green('\t\t\t\t\t Humidity') + '\t\t |' + '\t\t' + result['humidity'] + 'g/m^3');
							console.log(chalk.green('\t\t\t\t\t Pressure') + '\t\t |' + '\t\t' + result['pressure'] + 'Pa');
							console.log(chalk.green('\t\t\t\t\t Visibility') + '\t\t |' + '\t\t' + result['visibility'] + 'mi');
							console.log((chalk.yellow('\t\t\t\t\t\t\t      Astronomy')));
							console.log(chalk.green('\t\t\t\t\t Sunrise at') + '\t\t |' + '\t\t' + result['sunrise']);
							console.log(chalk.green('\t\t\t\t\t Sunset at') + '\t\t |' + '\t\t' + result['sunset']);
							console.log((chalk.yellow('\t\t\t\t\t\t\t      Temperature')));
							console.log(chalk.green('\t\t\t\t\t Low') + '\t\t\t |' + '\t\t' + result['low'] + 'F');
							console.log(chalk.green('\t\t\t\t\t High') + '\t\t\t |' + '\t\t' + result['high'] + 'F');
							console.log((chalk.yellow('\t\t\t\t\t\t\t ++++++++++++++++++')));
							console.log(chalk.green('\t\t\t\t\t Condition') + '\t\t |' + '\t\t' + result['condition']);
							console.log('\n');
						}  
					} 
					catch(e) {
						console.log('Error:', e.stack);
					}

					inquirer.prompt([ {
						type: 'list',
						name: 'option',
						message: '\nDo you wish to clear history?',
						choices: [
						'Yes',
						'No',
					]} ]).then(function (answer) {				
						if(answer.option === 'No') { 
							console.log(chalk.yellow('\n\t\t\t **********************************Thanks!********************************************'));
						}
				
						if(answer.option === 'Yes') {
							fs.unlinkSync('./recent.json');
							console.log(chalk.yellow('\n\t\t\t **********************************Search history cleared!********************************************'));
							console.log(chalk.yellow('\n\t\t\t **********************************Thanks!********************************************'));
						}
					});
				}

				if (answer.option === 'No') {
					console.log(chalk.yellow('\n\t\t\t **********************************Thanks!********************************************'));
					console.log(chalk.gray('\n\t\t\t You can find all searched weather information in the `recent.json` file in this directory.\n\n'));
				}
			});	
		}
	});
}

//Invalid input handler
function notValid() {
	console.log(chalk.red("\n\t\t\t\ Data not found for this location. Make sure you are entering a real city or big town name, check your network connection and try again.\n"));
	return exitApp();
}

startApp();