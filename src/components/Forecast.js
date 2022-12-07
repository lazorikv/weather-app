import React, { useEffect, useState } from 'react'

function Forecast(props) {
    let forecast = props.forecast;
    const temp = forecast.temp;
    // const humidity = forecast.humidity;
    // const pressure = forecast.pressure;
    // const country = props.country;
    // const sunset = forecast.sunset;
    // const {name} = props.name;
    // const {speed} = forecast.wind_speed;
    const {main: weatherType} = forecast.weather[0];
    let timestamp = forecast.dt;
    let a = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const timeInfo = date + ' ' + month + ' ' + year;

    // const myNewWeatherInfo = {
    //       temp,
    //       humidity,
    //       pressure,
    //       weatherType,
    //       name,
    //       speed,
    //       country,
    //       sunset,
    //     timeInfo
    //     }
    // const [tempInfo, setTempInfo] = useState({myNewWeatherInfo})


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

          default:
            setWeatherState("wi-day-sunny");
            break;
        }
      }
    }, [weatherType]);

    return (
        <>
            <div className="day-item">
                <div className='weatherIcon'>
              <i className={`wi ${weatherState}`}>
                  </i></div>
                <div>{temp.day}&deg;</div>
                <div>{timeInfo}</div>
            </div>

        </>
    )
}

export default Forecast;