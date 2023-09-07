import App from './App'

function CurrentWeatherHeader({currentTemp, feelsLike, forecastText, maxTemp, minTemp, cityName}) {

    return (
        <div className='header-component'>
            <div className="current-city-header header-text">
                <h2>{cityName}</h2>
            </div>
            <div className="current-temperature-header header-text">
                <h1 id='temperature-hero'>{currentTemp}°F</h1>
            </div>
            <div className="feels-like-temperature header-text">
                <h4 id='feels-like-text'>Feels like: {feelsLike}°F</h4>
            </div>
            <div className="forecast-text header-text">
                <h4>{forecastText}</h4>
            </div>
            <div className="high-low-text header-text">
                <h5 id='max-low-text'>H: {maxTemp}°F  L: {minTemp}°F</h5>
            </div>
        </div>
    )
}

export default CurrentWeatherHeader