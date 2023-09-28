import App from './App'

function CurrentWeatherHeader({currentTemp, feelsLike, forecastText, maxTemp, minTemp, cityName}) {

    return (
        <div className='header-component'>
                <h2 id='city-name'>{cityName}</h2>
                <h1 id='temperature-hero'>{currentTemp}°F</h1>
                <h4 id='feels-like-text'>Feels like: {feelsLike}°F</h4>
                <h5 id='max-low-text'>H: {maxTemp}°F  L: {minTemp}°F</h5>
        </div>
    )
}

export default CurrentWeatherHeader