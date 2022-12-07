import React, { useEffect, useState } from 'react'

function Forecast(props) {
    let forecast = props.forecast
    console.log(forecast)

    return (
        <>
            <div className="day-item">
            </div>
        </>
    )
}

export default Forecast;