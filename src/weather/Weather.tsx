import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface CityState {
    insee: string;
    city: string;
    temp: number;
}

const cities = [
    'Select your city',
    'Bordeaux',
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse'
]
const API_KEY = 'YOUR_API_KEY';

async function getCity(city : string) : Promise<CityState> {
    if (city === 'NONE') {
        city = 'Bordeaux';
    }
    const response = await axios.get(`https://api.meteo-concept.com/api/location/cities?token=${API_KEY}&search=${city}`);
    if (response === undefined) {
        return {insee: 'NULL', city: 'NONE', temp: 0};
    }
    const data = response.data;
    const res = await axios.get(`https://api.meteo-concept.com/api/forecast/nextHours?token=${API_KEY}&insee=${data.cities[0].insee}`);
    if (res === undefined) {
        return {insee: 'NULL', city: 'NONE', temp: 0};
    }
    const dt = res.data;
    console.log(dt);
    const insee = data.cities[0].insee;
    const temp = dt.forecast[0].temp2m;
    return {insee, city, temp};
    }

export function Weather() {
    const [city, setCity] = useState<CityState>({insee: 'NULL', city: 'NONE', temp: 0});
    const [oldCity, setOldCity] = useState<string>('Select your city');

    useEffect(() => {
        if (oldCity !== 'Select your city') {
            getCity(oldCity).then((city) => setCity(city));
        }
    }, [oldCity]);

    useEffect(() => {
        if (city.city === oldCity)
            return;
        else
            setCity(city);
        getCity(city.city).then((city) => setCity(city));
    }, [city, oldCity]);
    
    return (
        <div className="Weather">
          <div className='my_select_city'>
          <select className='selector_city' value={oldCity} onChange={(e) => setOldCity(e.target.value)}>
            {
                cities.map((city, index) => {
                    return <option key={index} value={city}>{city}</option>
                })
            }
          </select>
        </div>
        <div className="weather">
            <p className='output_temp'>
              {
                city.city === 'NONE' ? 'Select your city' : city.city
              }: {
                city.temp === 0 ? 'Loading...' : city.temp
              }°C
            </p>
        </div>
        </div>
    );
}