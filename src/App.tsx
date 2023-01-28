import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

interface WeatherState {
  temp: number;
  description: string;
  city: string;
}


  async function getWeather(city: string): Promise<WeatherState> {
    const API_KEY = process.env.API_KEY_METEO_FRANCE;
    const response = await axios.get('https://api.meteo-france.com/v1/forecast/next-hours/${city}?token=${API_KEY}');
    const data = response.data;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    return {temp, description, city};
  };

function App() {
  const [weather, setWeather] = useState<WeatherState>({temp: 0, description: '', city: 'Bordeaux'});
  setInterval(() => {
    getWeather('Paris').then((weather) => {
      setWeather(weather);
    });
  }, 1000);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {weather.city}: {weather.temp}°C
        </p>
        <p>
          {weather.description}
        </p>
      </header>
    </div>
  );
}

export default App;
