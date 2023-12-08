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
  res.json(weatherData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
