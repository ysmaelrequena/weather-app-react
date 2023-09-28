import { useState,  useEffect } from 'react'
import CurrentWeatherHeader from './header.jsx'
import HourlyWeather from './hourlyweather.jsx'
import DailyWeather from './dailyweather.jsx'
import SearchBar from './searchbar.jsx'
import sunny from './sunny.jpg'
import cloudy from './cloudy.jpg'
import rain from './rain.jpg'
import night from './night.jpg'
import { nonMilitaryTime, militaryTime } from './hours.js';


function App() {

  //recobrar info geografica del usuario y hacer llamado al API

  const [currentWeather, setCurrentWeather] = useState('');
  const [forecastInfo, setForecastInfo] = useState('');
  const [coordinates, setCoordinates] = useState('');

  function getLocation() {
      navigator.geolocation.getCurrentPosition(success)
    }    

    function success(position) {
      setCoordinates(`${position.coords.latitude},${position.coords.longitude}`)
      localStorage.setItem('coordinates',`${position.coords.latitude},${position.coords.longitude}`)
    }

    useEffect(() => {
      getLocation()
    },[])

useEffect(() => {
  async function fetchCurrentData() {
    try{
      const localCoordinates = localStorage.getItem('coordinates');
      const currentDataResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=582d21bc64c146b9ac1143058233108&q=${coordinates || localCoordinates}&aqi=no`)
      console.log(coordinates)
      const currentData = await currentDataResponse.json();
      setCurrentWeather(currentData);

      const forecastDataResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=582d21bc64c146b9ac1143058233108&q=${coordinates || localCoordinates}&days=8&aqi=no&alerts=no`)
      const forecastData = await forecastDataResponse.json();
      setForecastInfo(forecastData);
      }

    catch (error){
      console.log(error);
      }
    }
fetchCurrentData();
  }, [coordinates]);

  //Obtener informacion de la ubicacion del usuario para el header
  
      const cityNameHeader = currentWeather.location?.name;

  // Obtener informacion pertinente al forecast
      const forecastCurrentDay = forecastInfo.forecast?.forecastday[0];
      const forecastNextDay = forecastInfo.forecast?.forecastday[1];
      const maxTempDisplay = forecastCurrentDay?.day?.maxtemp_f;
      const minTempDisplay = forecastCurrentDay?.day?.mintemp_f;


  function createHourlyWeather() {
    const currentHour = new Date().getHours();

    const currentDayHourlyData = forecastCurrentDay?.hour || [];
    const nextDayHourlyData = forecastNextDay?.hour || [];
    console.log(nextDayHourlyData)

    let hourlyTempMap = [];

    if (currentHour <= 12) {
     hourlyTempMap = currentDayHourlyData
       .filter((elem) => {
         const inputString = elem.time;
         const timeRegex = /\d{2}:\d{2}/;
         const correctedHour = inputString.match(timeRegex)[0];
         const elemHour = parseInt(correctedHour.split(":")[0]);
          return elemHour >= currentHour;
        })
       .map((elem) => {
         const inputString = elem.time;
         const timeRegex = /\d{2}:\d{2}/;
         const correctedHour = inputString.match(timeRegex)[0];
         const iconURL = elem.condition?.icon;
          return (
              <h5 key={elem.time_epoch} className='hourly-weather-elem'>
               {correctedHour} <img src={iconURL} alt="temp icon" className='weather-icon' /> {elem.temp_f}°F
             </h5>
         );
       });
   } else {
    hourlyTempMap = currentDayHourlyData
        .filter((elem) => {
         const inputString = elem.time;
         const timeRegex = /\d{2}:\d{2}/;
         const correctedHour = inputString.match(timeRegex)[0];
         const elemHour = parseInt(correctedHour.split(":")[0]);
          return elemHour >= currentHour;
        })
        .map((elem) => {
          const inputString = elem.time;
          const timeRegex = /\d{2}:\d{2}/;
          const correctedHour = inputString.match(timeRegex)[0];
          const iconURL = elem.condition?.icon;
          return (
           <h5 key={elem.time_epoch} className='hourly-weather-elem'>   
               {correctedHour} <img src={iconURL} alt="temp icon" className='weather-icon'/> {elem.temp_f}°F
           </h5>
         );
        });

    const nextDayHourlyToShow = nextDayHourlyData
      .filter((elem) => {
        const inputString = elem.time;
        const timeRegex = /\d{2}:\d{2}/;
        const correctedHour = inputString.match(timeRegex)[0];
        const elemHour = parseInt(correctedHour.split(":")[0]);
        return elemHour <= 12;
      })
      .map((elem) => {
        const inputString = elem.time;
        const timeRegex = /\d{2}:\d{2}/;
        const correctedHour = inputString.match(timeRegex)[0];
        const iconURL = elem.condition?.icon;
        return (
          <h5 key={elem.time_epoch} className='hourly-weather-elem'>
              {correctedHour} <img src={iconURL} alt="temp icon" className='weather-icon'/> {elem.temp_f}°F
          </h5>
        );
      });

    hourlyTempMap = hourlyTempMap.concat(nextDayHourlyToShow);
  }

  return hourlyTempMap;
};

const dailyWeatherContainer = forecastInfo?.forecast?.forecastday || [];

function createDailyWeather() {
  const dailyWeatherMap = dailyWeatherContainer.filter((elem) => {
    const currentDateObj = new Date();
    const currentMonth = currentDateObj.getMonth() + 1;
    const adjustedMonth = currentMonth < 10 ? "0" + currentMonth.toString() : currentMonth.toString();
    const currentDay = currentDateObj.getDate();
    const adjustedDay = currentDay < 10 ? "0" + currentDay.toString() : currentDay.toString();
    const currentYear = currentDateObj.getFullYear();
    const currentDate = `${currentYear.toString()}-${adjustedMonth}-${adjustedDay}`;
    const elemDateString = elem.date.toString();
    return elemDateString !== currentDate;
  })

  .map((elem) => {
    const dayOfTheWeek = new Date(elem.date).getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextDay = dayNames[dayOfTheWeek];
    const icon = elem.day?.condition?.icon;
    const highTemp = elem.day?.maxtemp_f;
    const minTemp = elem.day?.mintemp_f;

    
    return ( 
      <div className='daily-elem-box' key={nextDay}>
         <h5 className='daily-weather-elem' key={elem.date_epoch}>
          {nextDay}: <img src={icon} alt="temp icon" className='weather-icon-daily'/> H:{highTemp}°F L:{minTemp}°F 
         </h5>
      </div>
    )
  })
  console.log(forecastInfo)
  return dailyWeatherMap;
}

//Creacion del search bar

 const [autoCompleteResult, setAutoCompleteResult] = useState('');

  async function handleChange(inputVal) {
    try {

      const autoCompleteResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=582d21bc64c146b9ac1143058233108&q=${inputVal}`);
      const acData = await autoCompleteResponse.json() || [];
      const autoCompleteResponseMap = acData.map((elem) => {

        
          return (
            <>
            <button 
            key={elem.id} 
            className='city-button'
            onClick={() => setCoordinates(`${elem.lat},${elem.lon}`)}>
              {elem.name}, {elem.country}
              </button>
            </>
          )
        
        
      });

      setAutoCompleteResult(autoCompleteResponseMap);
      console.log(acData);
    } 
    
    catch(error) {
      console.log(error);
    }
  }

  // function para elegir el fondo
  return (
    <div className='app-container background'>
    <section className='search-bar' id='searchbar'>
      <SearchBar onInputChange={handleChange} coordinates={coordinates} searchResult={autoCompleteResult} />
    </section>
    <section className='header-container'>
    <CurrentWeatherHeader cityName={cityNameHeader} currentTemp={currentWeather.current?.temp_f} feelsLike={currentWeather.current?.feelslike_f} maxTemp={maxTempDisplay} minTemp={minTempDisplay} />
    </section>
    <section className='hourly-weather-sec'>
    <HourlyWeather hourlyInfo={createHourlyWeather()} />
    </section>
    <section className='daily-weather-sec'>
    <DailyWeather dailyInfo={createDailyWeather()} />
    </section>
    </div>
  )
}

export default App