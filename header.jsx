import App from './App'

function CurrentWeatherHeader({currentTemp, feelsLike, forecastText, maxTemp, minTemp, cityName}) {

    return (
        <div>
            <div className="current-city-header">
                <h2>{cityName}</h2>
            </div>
            <div className="current-temperature-header">
                <h1>{currentTemp}°F</h1>
            </div>
            <div className="feels-like-temperature">
                <h4>Feels like: {feelsLike}°F</h4>
            </div>
            <div className="forecast-text">
                <h4>{forecastText}</h4>
            </div>
            <div className="high-low-text">
                <h5>H: {maxTemp}°F  L: {minTemp}°F</h5>
            </div>
        </div>
    )
}

export default CurrentWeatherHeader