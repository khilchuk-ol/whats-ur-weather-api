# What's Ur Weather API (server application) :globe_with_meridians:

This is an api for test task What's Ur Weather :thermometer: :droplet: :cloud: \
This project was developed using the following stack of technologies:
- Node.JS
- Express
- MySQL
- Mocha (for testing)

The client-side for this application can be found [here](https://github.com/khilchuk-ol/whats-ur-weather-client).

To run the aplication localy you will need node.js and npm installed on your device. 
To use MySQL database for analytics, it is also required to have it installed on the device. Other option is to substitute dao implementations which work with the database with corresponding in-memory implementations. 
To run tests you will need mocha globally installed (run `npm i mocha -g` in cmd)


## Available Endpoints

Application provides 2 endpoints

### /weather

Basic endpoint, used to check whether the server works correctly. 
Returns JSON object, containing only one property - welcoming message.

JSON schema:\
``` typescript
{
  message: string
}
```

### /weather/current?city={city name}

Main endpoint. Provides basic information about current weather in the city. City name should be alphabetic string, containing only English letters, no longer than 45 characters. 
Returns JSON object, containing information about temperature (in C), humidity (in %) and windSpeed (in km/h).

JSON schema:\
``` typescript
{
  temperature: number,
  humidity: number,
  windSpeed: number
}
```


## Available Scripts

It is recommended to use only following scripts:

### `npm start`

Runs the app.\
Server listens to port 8080 (if no other port specified through the environment), so you can access endpoints through [http://localhost:8080](http://localhost:8080).

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run test`

Runs tests using Mocha engine. Output is printed to the console

