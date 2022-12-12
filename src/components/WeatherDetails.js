import React, { useEffect, useState } from "react";
import "../style/details.css"


const WeatherDetails = ({
  detailTime,
  temp,
  min_temp,
  max_temp,
  humidity,
  pressure,
  weatherType,
  nameData,
  speed,
  countryData,
  sunset
}) => {

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

  let date = new Date(sunset * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weatherType}</div>
            <div className="place">
              {nameData}, {countryData}
            </div>
          </div>
          <div className="minimax">
           <div><span>Min: {min_temp}&deg;</span></div>
            <div><span>Max: {max_temp}&deg;</span></div>
          </div>
        </div>
        <div className='date'>{detailTime === null ? new Date().toLocaleString("en-UK").split(', ')[0] : detailTime}</div>
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-sunset"></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr}
                <br />
                Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className="wi wi-humidity"></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br />
                Humidity
              </p>
            </div>
          </div>
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-rain"></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className="wi wi-strong-wind"></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default WeatherDetails;