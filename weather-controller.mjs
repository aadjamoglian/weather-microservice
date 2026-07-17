import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, ExpressValidator, validationResult } from 'express-validator';

const app = express();
app.use(express.json())

const API = process.env.API;
const PORT = process.env.PORT;
const RESPONSE_404 = {"Error": "Not found"}
const RESPONSE_400 = {"Error": "Invalid request"}

async function sendCoordinates(message) {
    console.log(`Sending message: "${message}"`)
    const url = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${LAT}&lon=${LONG}&appid=${API}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message }),
            });
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/current-weather', asyncHandler ( async(req, res) => {

    const { LAT, LONG } = req.query;
    console.log("Latitude: " + LAT)
    console.log("Longtitude: " + LONG)

    try {
        const url = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${LAT}&lon=${LONG}&appid=${API}`;
        console.log(url)
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }});

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    }));

// app.post('/send-message', asyncHandler ( async (req, res, next) => {

//     // Get message from get request
//     const send_message = req.body.message;
//     console.log(send_message)
//     sendMessage()

// }))