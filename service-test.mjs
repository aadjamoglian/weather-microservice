/**
 * Program to test the weather microservice.
 * To use, run:
 * node ./service-test.mjs --<forecast|current|sentiment>
 * 
 * e.g. to test the forecast, run:
 * node ./service-test.mjs --forecast
 * 
 */

import { parseArgs, styleText } from 'node:util'
import { loadEnvFile } from 'node:process'
loadEnvFile()

// CLI arguments
const args = parseArgs({
  options: {
    forecast: { type: 'boolean', default: false },
    current: { type: 'boolean', default: false },
    sentiment: { type: 'boolean', default: false },

    lat: { type: 'string', default: '47.6198222886231' },
    lon: { type: 'string', default: '-122.34921508719148' },
  }
})

const microserviceURL = `http://localhost:${process.env.PORT}`

async function run() {
  const { lat, lon } = args.values

  if (args.values.current) {
    return runCurrent({ lat, lon })
  }
  if (args.values.forecast) {
    return runForecast({ lat, lon })
  }
  if (args.values.sentiment) {
    return runForecast({ lat, lon })
  }

}

/**
 * Calls the current forecast endpoint of the microservice
 */
async function runCurrent({ lat, lon }) {
  console.log(styleText(['blue', 'bold'], 'Requesting Current Weather...'))
  
  const url = `${microserviceURL}/current-weather/?lat=${lat}&lon=${lon}`
  const response = await fetch(url, { method: 'GET' })
  const json = await response.json()

  printResults(json)
}

/**
 * Calls the run forecast endpoint of the microservice
 */
async function runForecast({ lat, lon }) {
  console.log(styleText(['blue', 'bold'], 'Requesting Weather Forecast...'))

  const url = `${microserviceURL}/forecast-weather/?lat=${lat}&lon=${lon}`
  const response = await fetch(url, { method: 'GET' })
  const json = await response.json()

  printResults(json)

}

/** Sentiment runner */
async function runSentiment({ lat, lon }) {
  console.log(styleText(['blue', 'bold'], 'Requesting Weather Forecast...'))

  const url = `${microserviceURL}/sentiment-weather/?lat=${lat}&lon=${lon}`
  const response = await fetch(url, { method: 'GET' })
  const json = await response.json()

  printResults(json)
}


function printResults(jsonObject) {
  const prettified = JSON.stringify(jsonObject, null, 2)

  console.log(styleText(['blue', 'bold'], '\nJSON Result:'))
  console.log(styleText(['bgBlack', 'whiteBright'], prettified))
}

run()