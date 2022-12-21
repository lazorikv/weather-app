import React, { useEffect, useState } from 'react';
import {roundValue} from "../utils";
import "../style/forecast.css";

const Forecast = (props) => {
    let forecast = props.forecast;
    const temp = roundValue(forecast.temp.day);
    const humidity = forecast.humidity;
    const pressure = forecast.pressure;
    const speed = forecast.wind_speed;
    const sunset = forecast.sunset;
    const min_temp = roundValue(forecast.temp.min);
    const max_temp = roundValue(forecast.temp.max);
    const {main: weatherType} = forecast.weather[0];
    let timestamp = forecast.dt;
    let a = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const detailMonth = a.getMonth() + 1;
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dayOfWeek = days[a.getDay()]
    const date = a.getDate();
    const detailTime = date + "/" + detailMonth + "/" + year;
    const timeInfo = date + ' '  + month + ' ' + year;

    const [weatherState, setWeatherState] = useState("");

    useEffect(() => {
      if (weatherType) {
        switch (weatherType) {
          case "Clouds":
            setWeatherState("wi-day-cloudy");
            break;
          case "Haze":
            setWeatherState("wi-fog");
            break;
          case "Clear":
            setWeatherState("wi-day-sunny");
            break;
          case "Mist":
            setWeatherState("wi-dust");
            break;
          case "Rain":
            setWeatherState("wi-day-rain");
            break;
          case "Snow":
            setWeatherState("wi-snow");
            break;

          default:
            setWeatherState("wi-day-sunny");
            break;
        }
      }
    }, [weatherType]);

    const handleClick = () => {
        const myNewWeatherInfo = {
        detailTime,
        temp,
        min_temp,
        max_temp,
        humidity,
        pressure,
        weatherType,
        nameData: props.allWeatherData.name,
        speed,
        countryData: props.allWeatherData.country,
        sunset
      };
        props.setTempInfo(myNewWeatherInfo);
    }

    return (
        <>
            <div onClick={handleClick} className="day-item">
                <div className='weatherIcon'>
              <i className={`wi ${weatherState}`}>
                  </i></div>
                <div className="forecastData">
                    <div className="temperature">{temp}&deg;</div>
                    <div><b>{dayOfWeek}</b></div>
                <div className="timeInfo">{timeInfo}</div>
                </div>

            </div>

        </>
    )
}

export default Forecast;