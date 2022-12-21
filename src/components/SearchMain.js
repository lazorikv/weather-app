import React, { useEffect, useState } from "react";
import "../style/style.css";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import {AppContext} from "../context";
import Header from "./Header";
import {roundValue} from "../utils";

const SearchMain = () => {
  const [searchTerm, setSearchTerm] = useState("Kharkiv");
  const [tempInfo, setTempInfo] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [allWeatherData, setAllWeatherData] = useState(null);

  const getWeatherDetails = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const country = data.sys.country;
      let lon = data.coord.lon;
      let lat = data.coord.lat;
      setAllWeatherData({
        lat,
        lon,
        country,
        speed,
        name,
        weatherType,
        humidity,
        temp,
        pressure
      });
    } catch (error) {
      console.log(error)
    }
  };

  const getForecastDetails = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${allWeatherData.lat}&lon=${allWeatherData.lon}&exclude=hourly,minutely,current&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`;
      let res = await fetch(url);
      let forecast_data = await res.json();
      let forecast = forecast_data.daily.slice(0, 5);
      let detailTime = null;
      const min_temp = roundValue(forecast[0].temp.min);
      const max_temp = roundValue(forecast[0].temp.max);
      const { main: weatherType } = forecast[0].weather[0];
      const temp = roundValue(forecast[0].temp.day);
      const humidity = forecast[0].humidity;
      const pressure = forecast[0].pressure;
      const speed = forecast[0].wind_speed;
      const sunset = forecast[0].sunset;

      const myNewWeatherInfo = {
        detailTime,
        temp,
        min_temp,
        max_temp,
        humidity,
        pressure,
        weatherType,
        nameData: allWeatherData.name,
        speed,
        countryData: allWeatherData.country,
        sunset
      };
      setTempInfo(myNewWeatherInfo);
      setForecastData(forecast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allWeatherData === null) getWeatherDetails();
  }, [allWeatherData]);


  useEffect(() => {
    if (allWeatherData !== null) getForecastDetails();
  }, [allWeatherData]);


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getWeatherDetails();
    }
  };


  return (
     <AppContext.Provider
         value = {{setTempInfo, allWeatherData, setSearchTerm, searchTerm}}
    >
      {" "}
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <div className="wrap">
        <div className="search">
          <input
            className="searchTerm"
            onKeyDown={handleKeyDown}
            type="search"
            placeholder="Type city"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton" onClick={getWeatherDetails}>
            Search
          </button>
        </div>
      </div>
      <div className="days">
        {Array.isArray(forecastData) ? forecastData.map((item) => <Forecast key={item.dt} forecast={item} setTempInfo={setTempInfo} allWeatherData={allWeatherData}/>) : null}
           </div>
      <WeatherDetails {...tempInfo} />
      </AppContext.Provider>
  );
}

export default SearchMain;