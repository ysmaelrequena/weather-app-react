import App from './App.jsx'

function DailyWeather({dailyInfo}) {

    return (
        <div className='daily-weather-container'>
            <div className="daily-weather-info">
                <h4>{dailyInfo}</h4>
            </div>
        </div>
    )
}

export default DailyWeather