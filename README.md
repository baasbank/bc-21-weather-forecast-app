# Weather Forecast App

## Introduction

* **`Weather Forecast App`** is a console project that enables a user to get weather forecast and related weather data for any particular location. A user can also get geographic coordinates of any location.

## Features
* The App has the following features:
  * A simple and easy to use command line user interface.
  * Users can view weather forecast for any given location; works well for cities or big towns.
  * Users can view other weather-related data such as temperature, pressure, wind speed, etc.
  * Users can enter a location and see its geographic coordinates; longitude and latitude.
  * It creates a `recent.json` file that saves all searched weather data for a particular user.
  
## Dependencies
This App makes use of the following dependencies:
* Chalk
* Figlet
* Inquirer
* Request
* Clui
* Clear

## Tools
* Nodejs
* Yahoo Weather API
  https://developer.yahoo.com/weather/

## How to run this App
+ Clone this repository using the command : `git clone https://github.com/baasbank/bc-21-weather-forecast-app.git`
+ Navigate to the root folder
+ Delete the `recent.json` file in the directory; a new one is automatically created to hold each user's search history.
+ Run  `npm install`
+ Run  `node index.js`
+ Follow on-screen instructions








