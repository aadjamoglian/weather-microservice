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

app.get('/current-weather', asyncHandler ( async(req, res) => {

    // Grab lat and long from query parameters
    const { lat, lon } = req.query;
    console.log("Latitude: " + lat)
    console.log("Longtitude: " + lon)

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
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
        console.log(result);

        // Send result as response
        res.status(200).type('application/json').send(result)

    } catch (error) {
        console.error(error.message);
    }

}));