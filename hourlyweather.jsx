import App from './App.jsx'

function HourlyWeather({hourlyInfo}) {
    

    return (
        <section className='hourly-weather-sec'>
            <div className='hourly-weather-cont'>
               {hourlyInfo}
            </div> 
        </section>
    )
}

export default HourlyWeather