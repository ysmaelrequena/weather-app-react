import App from './App.jsx'

function DailyWeather({dailyInfo}) {

    return (
        <div className='daily-weather-container'>
            <div className="daily-weather-info">
                {dailyInfo}
            </div>
        </div>
    )
}

export default DailyWeather