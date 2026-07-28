# weather-microservice
A microservice to generate current weather and 5 day forecast data. The microservice utilizes a rest api through express.
A user/application sends a request with latitude and longitude and the current weather or 5 day forecast is sent as a response
depending on the call structure.

## Set-up
A few steps are needed before you run the server locally.

First, create a .env file in the main folder. In this file include:
API="YOUR API KEY FROM OPEN WEATHER"
PORT=3000 // Or another applicable port to run the express server on

Then, make sure you have npm installed on your system.

Next, enter 'npm install' in your terminal.

Finally, enter 'npm start' to run the server.

Now you are ready to send requests!
I have included an http file in the http-request-files folder for you to see some example requests.
Hope this helps!

## How To Request Data

There are two types of **GET** requests that can be made to the service:

### 1 - Current Weather
  PORT = port referenced in the env file__
  LAT = the latitude of the coordinates you want current weather for__
  LON = the longitude of the coordinates you want current weather for__

  Call Structure in HTTP
  GET http://localhost:{{**PORT**}}/current-weather?lat={{**LAT**}}&lon={{**LON**}} HTTP/1.1

  Example Call:
  GET http://localhost:3000/current-weather?lat=37.3635&lon=118.3951 HTTP/1.1

### 2 - 5 Day Forecast
  PORT = port referenced in the env file
  LAT = the latitude of the coordinates you want current weather for
  LON = the longitude of the coordinates you want current weather for
  
  Call Structure in HTTP
  GET http://localhost:{{**PORT**}}/forecast-weather?lat={{**LAT**}}&lon={{**LON**}} HTTP/1.1

  Example Call:
  GET http://localhost:3000/forecast-weather?lat=37.3635&lon=118.3951 HTTP/1.1

## How To Receive Data

These are the two responses expected from the **GET** requests above.

### 1 - Current Weather

The response will be returned in the following JSON format:

{
  "coord": {
    "lon": -118.7366,
    "lat": 37.3614
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 294.82,
    "feels_like": 293.38,
    "temp_min": 293.3,
    "temp_max": 294.83,
    "pressure": 1013,
    "humidity": 13,
    "sea_level": 1013,
    "grnd_level": 701
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.87,
    "deg": 198,
    "gust": 7.07
  },
  "clouds": {
    "all": 0
  },
  "timezone": -25200,
  "id": 5550372,
  "name": "West Bishop",
  "cod": 200
}

### 2 - Forecast Weather

The response will be returned in the following JSON format:

{
  "code": "200",
  "message": 0,
  "cnt": 5,
  "list": [
    {
      "main": {
        "temp": 294.82,
        "feels_like": 293.54,
        "temp_min": 285.15,
        "temp_max": 294.82,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 704,
        "humidity": 19,
        "temp_kf": 9.67,
        "dew_point": 270.56
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": {
        "all": 40
      },
      "wind": {
        "speed": 3.39,
        "deg": 254,
        "gust": 3.37
      },
      "visibility": 10000,
    }
  ], 
  [...],
  [...],
  [...],
  [...],
}

## UML Sequence Diagram

  



