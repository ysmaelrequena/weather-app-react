import App from './App.jsx'

function DailyWeather({ dailyInfo }) {

    return (
        <div className='daily-weather-container'>
               {dailyInfo}
            </div>
    )
}

export default DailyWeather