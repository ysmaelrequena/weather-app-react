import App from './App.jsx'

function HourlyWeather({hourlyInfo}) {
    

    return (
        <div className='daily-weather-container'>
            <div>
                <h5>{hourlyInfo}</h5>
            </div> 
        </div>
    )
}

export default HourlyWeather