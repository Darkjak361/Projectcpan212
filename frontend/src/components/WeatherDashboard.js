import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiThunderstorm, WiSnow } from 'react-icons/wi';

const WeatherDashboard = ({ isLoggedIn }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [randomCitiesWeather, setRandomCitiesWeather] = useState([]);

  const cities = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Quebec City'];

  useEffect(() => {
    if (!isLoggedIn) {
      const getCitiesWeather = async () => {
        const weatherData = await Promise.all(
          cities.map((city) =>
            axios.get(`http://localhost:5000/api/weather?location=${city}`)
          )
        );
        setRandomCitiesWeather(weatherData.map((response) => response.data));
      };
      getCitiesWeather();
    }
  }, [isLoggedIn]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?location=${city}`);
      setWeatherData(response.data);
      setError('');
    } catch {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (description) => {
    if (description.includes('rain')) return <WiRain size={40} />;
    if (description.includes('clear')) return <WiDaySunny size={40} />;
    if (description.includes('cloud')) return <WiCloud size={40} />;
    if (description.includes('thunderstorm')) return <WiThunderstorm size={40} />;
    if (description.includes('snow')) return <WiSnow size={40} />;
    return <WiDaySunny size={40} />;
  };

  const getClothingTip = (description) => {
    if (description.includes('rain')) return 'Wear a raincoat or bring an umbrella.';
    if (description.includes('clear')) return 'Light clothing and sunglasses are recommended.';
    if (description.includes('cloud')) return 'A light jacket is good for cloudy weather.';
    if (description.includes('thunderstorm')) return 'Stay indoors if possible or wear waterproof clothing.';
    if (description.includes('snow')) return 'Bundle up with a warm coat, gloves, and scarf.';
    return 'Dress comfortably for the weather.';
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    } else {
      setError('Please enter a city');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Weather Dashboard</h2>
      {!isLoggedIn && randomCitiesWeather.length > 0 && (
        <div>
          <h3>Weather for Canadian Cities</h3>
          {randomCitiesWeather.map((data, index) => (
            <div key={index} style={styles.cityContainer}>
              <h4>{data.city.name}, {data.city.country}</h4>
              <div>
                {getWeatherIcon(data.list[0].weather[0].description)}
                <p>Temperature: {data.list[0].main.temp}°C</p>
                <p>{data.list[0].weather[0].description}</p>
                <p>{getClothingTip(data.list[0].weather[0].description)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoggedIn && (
        <>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Enter
          </button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div style={styles.weatherContainer}>
          <h3>{weatherData.city.name}, {weatherData.city.country}</h3>
          <div>
            {getWeatherIcon(weatherData.list[0].weather[0].description)}
            <p>Temperature: {weatherData.list[0].main.temp}°C</p>
            <p>{weatherData.list[0].weather[0].description}</p>
            <p>{getClothingTip(weatherData.list[0].weather[0].description)}</p>
          </div>
          <h4>Upcoming Hourly Forecast</h4>
          <ul>
            {weatherData.list.slice(0, 8).map((item, index) => (
              <li key={index}>
                <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                <p>Temp: {item.main.temp}°C</p>
                <p>{item.weather[0].description}</p>
                {getWeatherIcon(item.weather[0].description)}
                <p>{getClothingTip(item.weather[0].description)}</p>
              </li>
            ))}
          </ul>
          <h4>Upcoming Daily Forecast</h4>
          <ul>
            {weatherData.list.filter((item, index) => index % 8 === 0).slice(0, 7).map((item, index) => (
              <li key={index}>
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {item.main.temp}°C</p>
                <p>{item.weather[0].description}</p>
                {getWeatherIcon(item.weather[0].description)}
                <p>{getClothingTip(item.weather[0].description)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    margin: '10px 0',
    width: '80%',
    maxWidth: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#003366',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  weatherContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  cityContainer: {
    marginBottom: '15px',
  },
};

export default WeatherDashboard;
