import React, { useEffect, useState } from 'react'

function Forecast(props) {
    let forecast = props.forecast

    return (
        <>
            <div className="day-item">
                {forecast.temp.day}&deg;
            </div>
        </>
    )
}

export default Forecast;