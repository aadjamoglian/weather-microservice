import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, ExpressValidator, validationResult } from 'express-validator';

const app = express();
app.use(express.json())

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

// Disable pesky CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/current-weather', asyncHandler ( async(req, res) => {

    // Grab lat and long from query parameters
    const { lat, lon } = req.query;
    console.log("Latitude: " + lat)
    console.log("Longtitude: " + lon)

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        // Call Open Weather API for weather given lat and long
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }});

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Save json response
        const result = await response.json();

        // Modify json
        delete result['dt'];
        delete result['sys'];
        console.log(result)

        // Send result as response
        res.status(200).type('application/json').send(result)

    } catch (error) {
        console.error(error.message);
    }

}));


app.get('/forecast-weather', asyncHandler ( async(req, res) => {

    // Grab lat and long from query parameters
    const { lat, lon } = req.query;
    console.log("Latitude: " + lat)
    console.log("Longtitude: " + lon)

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}`;
        console.log(url)

        // Call Open Weather API for weather given lat and long
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }});

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Save json response
        const result = await response.json();

        for (const dayForecast of result['list']) {            delete dayForecast['dt'];
            delete dayForecast['sys'];
            delete dayForecast['dt_txt'];
            delete dayForecast['pop'];
        } 

        console.log(result);

        // Send result as response
        res.status(200).type('application/json').send(result)

    } catch (error) {
        console.error(error.message);
    }

}));

app.get('/sentiment-weather', asyncHandler (async(req, res) => {

    // Grab lat and long from query parameters
    const { lat, lon } = req.query;
    console.log("Latitude: " + lat)
    console.log("Longtitude: " + lon)

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        console.log(url)

        // Call Open Weather API for weather given lat and long
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }});

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Save json response
        const result = await response.json();
        console.log(result);
        
        // Note, temperatures in kelvins
        let temperature = 'cold'
        if (result.main.temp > 280.372) {
           temperature = 'temperate' // above 40 F and below 78 F
        } else if (result.main.temp > 298.706) {
           temperature = 'hot' // above 78 F
        }
        
        // <none | light | moderate | heavy>
        let precipitation = 'none'
        const metersPerHour = result.rain?.['1h'] ?? 0
        if (metersPerHour >= 2) {
            precipitation = 'heavy'
        } else if (metersPerHour >= 1) {
            precipitation = 'moderate'
        } else if (metersPerHour > 0) {
            precipitation = 'light'
        }
        
        
        // Send result as response
        res.status(200).type('application/json').send({ temperature, precipitation })

    } catch (error) {
        console.error(error.message);
    }

}));
