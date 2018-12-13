const axios = require("axios");

const APP_ID = "da9e0ef0f6cc83f2258bf4854ffd4ead";
const UNITS = "metric";
const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast`;

export class OpenWeather {
  static instance = new OpenWeather();

  static convertToFahrenheit(degreesKelvin) {
    let f = 9 / 5 * (degreesKelvin - 273) + 32;
    f = f.toFixed(0);
    f = Number(f);
    return f;
  }

  getCurrentConditions(forCityId, then) {
    console.log(
      "OpenWeather.js Getting current conditions for city id",
      forCityId
    );
    axios
      .get(CURRENT_URL, {
        params: {
          id: forCityId,
          appid: APP_ID,
        },
      })
      .then(response => {
        // check for API error
        if (response.data.error) {
          console.log("There was an error in the API request", response);
          return;
        }
        console.log("OpenWeather.js response", response.data);
        then(response.data);
      })
      .catch(error => console.log(error));
  }

  getForecast(forCityId, then) {
    console.log("OpenWeather.js Getting forecast for city id", forCityId);
    axios
      .get(FORECAST_URL, {
        params: {
          id: forCityId,
          appid: APP_ID,
        },
      })
      .then(response => {
        // check for API error
        if (response.data.error) {
          console.log("There was an error in the API request", response);
          return;
        }
        console.log("OpenWeather.js response", response.data);
        
        // only get 7 days forecast
        console.log("OpenWeather.js filtering to just 7 days");
        response.data.list = response.data.list.filter(
          (day, index) => index < 7
        );

        then(response.data);
      })
      .catch(error => console.log(error));
  }
}
