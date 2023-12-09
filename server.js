const express = require('express');
const app = express();

let weatherData;

try {
  weatherData = require('./data/weather.json');
  console.log(weatherData);
} catch (error) {
  console.error('Error reading the weather data:', error);
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
    res.json(foundCity);
  } else {
    res.status(404).send('City not found or not supported');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
