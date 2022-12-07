import React, { useEffect, useState } from 'react'
import '../style/style.css'
import WeatherDetails from './WeatherDetails'
import Forecast from './Forecast'

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState('Kharkiv')
    const [tempInfo, setTempInfo] = useState({})
    const [forecastData, setForecastData] = useState({})
    let lon = 0;
    let lat = 0;

    const getWeatherDetails  = async() => {

      try {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
        let res = await fetch(url);
        let data = await res.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunset} = data.sys;
        lon = data.coord.lon;
        lat = data.coord.lat;
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weatherType,
          name,
          speed,
          country,
          sunset
        }

        getForecastDetails(lon, lat)
        setTempInfo(myNewWeatherInfo)

      } catch (error) {
        //console.log(error)
      }
    }

    const getForecastDetails = async(lon, lat) => {

      try {
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
            let res = await fetch(url);
            let forecast_data = await res.json();

            setForecastData(forecast_data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
      getWeatherDetails()
    }, [])

    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        getWeatherDetails()
    }
  }

  return (
   <> <header>Text</header>
       <div className='wrap'>
      <div className='search'>
          <input className="searchTerm" onKeyDown={handleKeyDown} type='search' placeholder='Type city' id='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <button className='searchButton' onClick={getWeatherDetails}>Search</button>
      </div>
    </div>
       <div className="days">
        <Forecast forecast={forecastData.daily[0]}/>
        <Forecast forecast={forecastData.daily[1]}/>
        <Forecast forecast={forecastData.daily[2]}/>
        <Forecast forecast={forecastData.daily[3]}/>
        <Forecast forecast={forecastData.daily[4]}/>
           </div>
    <WeatherDetails {...tempInfo} /></>
  )
}

export default SearchMain;
