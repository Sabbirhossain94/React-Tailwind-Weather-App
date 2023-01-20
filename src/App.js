import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

import "./index.css";

export default function App() {
  const [weatherApiData, setWeatherApiData] = useState();
  const [forecastData, setForecastData] = useState();

  const apiKey = "1c3579424b8f0d37df401ff1c117fafe";
  function getWeatherDetails() {
    if (!navigator.geolocation) {
      console.log("does not work!");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

        fetch(weatherUrl)
          .then((res) => res.json())
          .then((data) => {
            setWeatherApiData(data);
          })
          .catch((err) => console.log(err));
        fetch(forecastUrl)
          .then((res) => res.json())
          .then((data) => {
            setForecastData(data);
          });
      });
    }
  }
  useEffect(() => {
    getWeatherDetails();
  }, []);
  // const weekdays = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  console.log(weatherApiData);
  console.log(forecastData);

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  console.log(date);
  return (
    <div>
      <div className="font-inter font-medium bg-zinc-900 h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="ring-1 ring-zinc-800 shadow-2xl h-3/4 w-3/4 bg-transparent flex rounded-md text-center justify-center items-center bg-zinc-800">
            {weatherApiData ? (
              <div className="flex flex-row">
                <div className="border border-black p-10">
                  <p className=" text-white text-5xl">
                    {Math.round(weatherApiData.main.temp)}°c
                  </p>
                  <div className="text-slate-400 flex justify-center mt-[20px]">
                    <p className="flex">
                      <FaLongArrowAltUp style={{ marginTop: "3px" }} />
                      {Math.round(weatherApiData.main.temp_max)}°c
                    </p>
                    <p className="flex ml-[20px]">
                      <FaLongArrowAltDown style={{ marginTop: "3px" }} />
                      {Math.round(weatherApiData.main.temp_min)}°c
                    </p>
                  </div>
                  <p className=" text-white text-4xl mt-[30px] ">
                    {weatherApiData.weather[0].main}
                  </p>
                  <p className="text-slate-400 text-sm font-normal mt-3">
                    Today - {date}
                  </p>
                  <div className="flex mt-[30px] justify-center ">
                    <p className="flex text-slate-400 text-md">
                      <MdLocationOn
                        style={{ marginTop: "3px", marginRight: "2px" }}
                      />
                      {weatherApiData.sys.country}
                    </p>
                  </div>
                </div>
                <div className="grid border border-black grid-cols-2 grid-rows-2 grid-gap-4 ml-10">
                  <div className="border border-black flex flex-col justify-center items-center w-44">
                    <p>Humidity</p>
                    <p className="text-2xl p-4">
                      {weatherApiData.main.humidity}
                    </p>
                  </div>
                  <div className="border border-black flex flex-col justify-center items-center w-44">
                    <p>Pressure</p>
                    <p className="text-2xl p-4">
                      {weatherApiData.main.pressure} mb
                    </p>
                  </div>
                  <div className="border border-black flex flex-col justify-center items-center w-44">
                    <p>Visibility</p>
                    <p className="text-2xl p-4">
                      {Math.round(weatherApiData.visibility / 1609.34)} Miles
                    </p>
                  </div>
                  <div className="border border-black flex flex-col justify-center items-center w-44">
                    <p>Wind</p>
                    <p className="text-2xl p-4">
                      {weatherApiData.wind.speed} mph
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
