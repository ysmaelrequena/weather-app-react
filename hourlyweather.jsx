import App from './App.jsx'

function HourlyWeather({hourlyInfo}) {
    

    return (
            <div className='hourly-weather-cont'>
               {hourlyInfo}
            </div> 
        
    )
}

export default HourlyWeather