import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {

    const inputRef = useRef()
    const [weatherData,setweatherData] = useState(false)

    //icon code to display our own image

    const allIcon = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

        
    }

    const search = async (city)=>{
        if(city === ''){
            alert("Please enter city name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;

            const res = await fetch(url);
            const data = await res.json();

            if(!res.ok) return alert(data.message)

            console.log(data);
            const icon = allIcon[data.weather[0].icon] || clear_icon
            setweatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        } catch (error) {
            setweatherData(false)
            console.error('Error in fetching weather data')
        }
    }

    useEffect(()=>{
        search('New York')
    },[])
  return (
    <div className='weather'>
        {/* search bar div */}
            <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search Location' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
     </div>

     {/* used ternery operator to check if the weather data is avaiable ; if not clear all data */}

     {/* weather image  */}
     <img src={weatherData.icon} alt="weather icon"  className='weather-icon'/>
     <p className='temperature'>{weatherData.temperature} °F</p>
     <p className='location'>{weatherData.location}</p>
    
    {/* weather data  div with 2 column  */}
    <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windspeed} km/h %</p>
                <span>Wind</span>
            </div>
        </div>

    </div>  
    </div>
  )
}

export default Weather