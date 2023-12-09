const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

let weatherData;

try {
  weatherData = require('./data/weather.json');
  console.log(weatherData);
} catch (error) {
  console.error('Error reading the weather data:', error);
}

class Forecast {
  constructor(date, description, high_temp, low_temp) {
    this.date = date;
    this.description = `Low of ${low_temp}, high of ${high_temp} with ${description}`;
  }
}

app.get('/', (req, res) => {
  res.send('City Explorer');
});

app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  const foundCity = weatherData.find(city => 
    city.lat === lat && city.lon === lon && city.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  if (foundCity && ['Seattle', 'Paris', 'Amman'].includes(foundCity.city_name)) {
    const forecasts = foundCity.data.map(weatherDay => {
      const date = weatherDay.valid_date;
      const description = weatherDay.weather.description;
      const highTemp = weatherDay.high_temp;
      const lowTemp = weatherDay.low_temp;
      return new Forecast(date, description, highTemp, lowTemp);
    });

    res.json(forecasts);
  } else {
    res.status(404).send('City not found or not supported');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
