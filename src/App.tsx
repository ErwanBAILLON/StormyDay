import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

interface WeatherState {
  temp: number;
  city: string;
}

interface CityState {
  insee: string;
  ncity: string;
}

const API_KEY = 'YOUR_API_KEY';

async function getCity(city : string) : Promise<CityState> {
  const response = await axios.get(`https://api.meteo-concept.com/api/location/cities?token=${API_KEY}&search=${city}`);
  const data = response.data;
  const insee = data.cities[0].insee;
  const ncity = city;
  return {insee, ncity};
}

async function getWeather(city : string, insee: string): Promise<WeatherState> {
  const response = await axios.get(`https://api.meteo-concept.com/api/forecast/nextHours?token=${API_KEY}&insee=${insee}`);
  const data = response.data;
  const temp = data.forecast[0].temp2m;
  return {temp, city};
};

function App() {
  const [weather, setWeather] = useState<WeatherState>({temp: 0, city: 'NONE'});
  const [city, setCity] = useState<string>('Select your city');
  const [oldCity, setOldCity] = useState<string>('Select your city');
  useEffect(() => {
    setCity(city);

    if (oldCity != city) {
      setOldCity(city);
    } else if (city === 'Select your city') {
      return;
    } else {
      return;
    }
    getCity(city).then((result) => {
      getWeather(city, result.insee).then((weather) => {
        setCity(result.ncity);
        setWeather(weather);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
      setWeather({temp: 0, city: city});
    });
  }, [city, weather]);

  useEffect(() => {
    setInterval(() => {
      getCity(city).then((result) => {
        getWeather(city, result.insee).then((weather) => {
          setCity(result.ncity);
          setWeather(weather);
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    }, 3600000);
  }, [weather]);

  return (
    <div className="App">
      <div>
        <h1>StormyDay App</h1>
      </div>
      <div className='my_select_city'>
        <select className='selector_city' value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Select your city">Select your city</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Toulouse">Toulouse</option>
          <option value="Nice">Nice</option>
          <option value="Nantes">Nantes</option>
          <option value="Montpellier">Montpellier</option>
          <option value="Strasbourg">Strasbourg</option>
          <option value="Brest">Brest</option>
          <option value="Rennes">Rennes</option>
          <option value="Le Havre">Le Havre</option>
          <option value="Reims">Reims</option>
          <option value="Lille">Lille</option>
          <option value="Saint-Étienne">Saint-Étienne</option>
          <option value="Toulon">Toulon</option>
          <option value="Grenoble">Grenoble</option>
          <option value="Dijon">Dijon</option>
          <option value="Angers">Angers</option>
          <option value="Nîmes">Nîmes</option>
          <option value="Villeurbanne">Villeurbanne</option>
          <option value="Le Mans">Le Mans</option>
          <option value="Aix-en-Provence">Aix-en-Provence</option>
          <option value="Boulogne-Billancourt">Boulogne-Billancourt</option>
          <option value="Limoges">Limoges</option>
          <option value="Clermont-Ferrand">Clermont-Ferrand</option>
          <option value="Tours">Tours</option>
          <option value="Amiens">Amiens</option>
          <option value="Perpignan">Perpignan</option>
          <option value="Besançon">Besançon</option>
          <option value="Metz">Metz</option>
          <option value="Rouen">Rouen</option>
          <option value="Argenteuil">Argenteuil</option>
          <option value="Nancy">Nancy</option>
          <option value="Saint-Denis">Saint-Denis</option>
          <option value="Montreuil">Montreuil</option>
          <option value="Caen">Caen</option>
          <option value="Nanterre">Nanterre</option>
          <option value="Roubaix">Roubaix</option>
          <option value="Mulhouse">Mulhouse</option>
          <option value="Saint-Paul">Saint-Paul</option>
          <option value="Poitiers">Poitiers</option>
          <option value="Orléans">Orléans</option>
          <option value="Rueil-Malmaison">Rueil-Malmaison</option>
          <option value="Avignon">Avignon</option>
          <option value="Tourcoing">Tourcoing</option>
          <option value="Versailles">Versailles</option>
          <option value="Créteil">Créteil</option>
          <option value="Colombes">Colombes</option>
          <option value="Aulnay-sous-Bois">Aulnay-sous-Bois</option>
          <option value="Bourges">Bourges</option>
          <option value="Vitry-sur-Seine">Vitry-sur-Seine</option>
          <option value="Arcachon">Arcachon</option>
        </select>
      </div>
      <p></p>
      <div className="weather">
          <p className='output_temp'>
            {weather.city}: {weather.temp}°C
          </p>
      </div>
    </div>
  );
}

export default App;