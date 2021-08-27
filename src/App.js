import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
const api = {
  key: "0835e6a0346ae75e69cc2c211930f9d7",
  base: "https://api.openweathermap.org/data/2.5/"
};
function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  })
  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          //setQuery('')
          setWeather(result)
          console.log(weather)
        })
    }

  }

  const dateBuilder = (d) => {
    let months = ["january", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}  ${year}`
  }



  return (
    <div className={(typeof weather.main != "undefined")
      ? (weather.main.temp >= 35)
        ? "app-hot" : (weather.main.temp <= 0)
          ? "app-ice" : (weather.weather[0].main === "Clouds" || weather.weather[0].main === "Clear"
            ? "app-clouds" : (weather.weather[0].main === "Haze")
              ? 'app-haze' : (weather.weather[0].main === "Rain")
                ? 'app-rain' : 'App')
      : "App"}>
      <main>
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            className="search-bar"
            placeholder="Search Cities..."
            onKeyPress={search}
            onChange={(e) => {
              let string = e.target.value
              string = string.replace(/[^A-Za-z- ]/ig, '')
              setQuery(string)
            }}
            value={query}

          />
        </div>


        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location" >{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather" >{weather.weather[0].main}</div>
              <div className="weather_max_min">
                <div id="temp_min"><IoIosArrowRoundDown />{weather.main.temp_min}</div>
                <div id="temp_max"><IoIosArrowRoundUp />{weather.main.temp_max}</div>
              </div>
            </div>
          </div>

        ) : <div className="error-message">{weather.message}</div>}

      </main>
    </div>
  );
}

export default App;
