import React, { useEffect, useState } from 'react'
import '../style/style.css'
import WeatherDetails from './WeatherDetails'
import Forecast from './Forecast'

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState('Kharkiv')
    const [tempInfo, setTempInfo] = useState({})
    const [forecastData, setForecastData] = useState({})
    const [nameData, setNameData] = useState({})
    const [countryData, setCountryData] = useState({})
    const [lonData, setLonData] = useState({})
    const [latData, setLatData] = useState({})


    const getWeatherDetails  = async() => {

      try {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
        let res = await fetch(url);
        let data = await res.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        setNameData(name)
        const {speed} = data.wind;
        const country = data.sys.country;
        setCountryData(country)
        let lon = data.coord.lon;
        setLonData(lon)
        let lat = data.coord.lat;
        setLatData(lat)


      } catch (error) {
        //console.log(error)
      }
    }

    const getForecastDetails = async() => {
        await getWeatherDetails()
      try {
            console.log(latData, lonData)
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latData}&lon=${lonData}&exclude=hourly,minutely,current&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
            let res = await fetch(url);
            let forecast_data = await res.json();
            let forecast = forecast_data.daily;
            const {main: weatherType} = forecast[0].weather[0];
            const temp = forecast[0].temp;
            const humidity = forecast[0].humidity;
            const pressure = forecast[0].pressure;
            const speed = forecast[0].wind_speed;
            const sunset = forecast[0].sunset;

            const myNewWeatherInfo = {
              temp,
              humidity,
              pressure,
              weatherType,
              nameData,
              speed,
              countryData,
              sunset
            }
            setTempInfo(myNewWeatherInfo)
            setForecastData(forecast_data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
      getForecastDetails()
    }, [latData])

    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        getForecastDetails()
    }
  }

  return (
   <> <header>Text</header>
       <div className='wrap'>
      <div className='search'>
          <input className="searchTerm" onKeyDown={handleKeyDown} type='search' placeholder='Type city' id='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <button className='searchButton' onClick={getForecastDetails}>Search</button>
      </div>
    </div>
       <div className="days">
           </div>
   <WeatherDetails {...tempInfo} /></>
  )
}

export default SearchMain;
