import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

interface WeatherState {
  temp: number;
  city: string;
}


async function getWeather(city: string): Promise<WeatherState> {
  const API_KEY = 'YOUR_API_KEY';
  const response = await axios.get(`https://api.meteo-concept.com/api/forecast/nextHours?token=${API_KEY}&insee=33063`);
  const data = response.data;
  const temp = data.forecast[0].temp2m;
  console.log(data);
  return {temp, city};
};

function App() {
  const [weather, setWeather] = useState<WeatherState>({temp: 0, city: 'Bordeaux'});
  useEffect(() => {
    getWeather('Bordeaux').then((weather) => {
      setWeather(weather);
    }).catch((error) => {
      setWeather({temp: 61, city: "OUPSI"});
    });
    setInterval(() => {
      getWeather('Bordeaux').then((weather) => {
        setWeather(weather);
      }).catch((error) => {
        setWeather({temp: 61, city: "OUPSI"});
      });
    }, 3600000);
  }, []);
  return (
    <div className="App">
        <p>
          {weather.city}: {weather.temp}°C
        </p>
    </div>
  );
}

export default App;