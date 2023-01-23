import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { TbTemperatureCelsius } from "react-icons/tb";
import "./index.css";
import moment from "moment/moment";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";

export default function App() {
  const [weatherApiData, setWeatherApiData] = useState();
  const [forecastData, setForecastData] = useState();
  const [city, setCity] = useState("");
  const [weatherByCity, setWeatherByCity] = useState();
  const [forecastByCity, setForecastByCity] = useState();

  const apiKey = "1c3579424b8f0d37df401ff1c117fafe";
  function getWeatherDetails() {
    if (!navigator.geolocation) {
      console.log("does not work!");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&type=hour&units=metric&appid=${apiKey}`;
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

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const queryCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const queryForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=hour&units=metric&appid=${apiKey}`;

    fetch(queryCity)
      .then((res) => res.json())
      .then((data) => {
        setWeatherByCity(data);
      })
      .catch((err) => setWeatherByCity(err.message));
    fetch(queryForecast)
      .then((res) => res.json())
      .then((data) => {
        setForecastByCity(data);
      })
      .catch((err) => setForecastByCity(err.message));
  }
  console.log(forecastByCity);
  const number = moment("2023-01-23 21:00:00").format("D-MMM");
  console.log(number);
  return (
    <div>
      <div className="font-inter font-medium bg-gradient-to-t from-slate-600 to-slate-900 h-screen ">
        <div className="flex justify-center items-center h-full">
          <div className="h-full sm:h-full sm:w-full lg:w-full xl:w-3/4 2xl:w-1/2 flex  text-center justify-center items-center bg-slate-900/10">
            {weatherApiData ? (
              <div className="w-10/12">
                <div>
                  <label className="relative block mx-0 ml-2">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <AiOutlineSearch className="text-slate-400 ml-1" />
                    </span>
                    <form onSubmit={handleSubmit}>
                      <input
                        className="caret-slate-400 placeholder:not-italic placeholder:text-slate-400 placeholder:text-md block text-slate-400 bg-slate-900/20 w-full h-12 border border-slate-700 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-cyan-500 sm:text-sm"
                        placeholder="Search by cities..."
                        type="text"
                        name="search"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </form>
                  </label>
                </div>
                <div className="mt-16 flex flex-row justify-center">
                  <div className="p-10 ">
                    <p className="text-cyan-400 text-md mt-6">{date}</p>
                    <div className="flex justify-center ">
                      <img
                        style={{ color: "white", marginLeft: "10px" }}
                        src={`http://openweathermap.org/img/wn/${
                          weatherByCity
                            ? weatherByCity.weather[0].icon
                            : weatherApiData.weather[0].icon
                        }@2x.png`}
                        alt="error"
                      />
                    </div>
                    <div className="flex flex-row justify-center">
                      <p className=" text-white text-5xl">
                        {weatherByCity
                          ? Math.round(weatherByCity.main.temp)
                          : Math.round(weatherApiData.main.temp)}
                      </p>
                      <TbTemperatureCelsius className="text-4xl text-slate-400" />
                    </div>
                    <div className="text-slate-400 flex justify-center mt-[20px]">
                      <p>
                        <span className="tracking-wide">Feels like</span>{" "}
                        <span className="text-white">
                          {weatherByCity
                            ? Math.round(weatherByCity.main.feels_like)
                            : Math.round(weatherApiData.main.feels_like)}
                          <span className="text-slate-400 ml-0.5">°</span>
                        </span>
                      </p>
                    </div>
                    <p className=" text-white text-3xl mt-[20px] ">
                      {weatherByCity
                        ? weatherByCity.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                          weatherByCity.weather[0].description.slice(1)
                        : weatherApiData.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                          weatherApiData.weather[0].description.slice(1)}
                    </p>

                    <div className="flex mt-[15px] justify-center ">
                      <span>
                        <MdLocationOn className="mt-0.5 mr-0.5 text-cyan-500 text-xl" />
                      </span>
                      <p className="flex text-slate-400 text-md">
                        {weatherByCity
                          ? weatherByCity.name +
                            ", " +
                            weatherByCity.sys.country
                          : weatherApiData.sys.country}
                      </p>
                    </div>
                  </div>
                  <div className=" grid grid-cols-2 grid-rows-2 grid-gap-4 ml-36">
                    <div className="flex flex-col  justify-center items-center w-44 mt-[55px]">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400 ">Max</p>
                        <FaLongArrowAltUp className="text-cyan-400 text-lg ml-0.5 mt-1" />
                      </div>

                      <p className="text-lg p-4 text-white flex flex-row">
                        {weatherByCity
                          ? Math.round(weatherByCity.main.temp_max)
                          : Math.round(weatherApiData.main.temp_max)}
                        <span className="text-slate-400 ">
                          <TbTemperatureCelsius className="mt-0.5" />
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-44 mt-[55px]">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400">Min</p>
                        <FaLongArrowAltDown className="text-cyan-400 text-lg ml-0.5 mt-1" />
                      </div>
                      <p className="text-lg p-4 text-white flex flex-row">
                        {weatherByCity
                          ? Math.round(weatherByCity.main.temp_min)
                          : Math.round(weatherApiData.main.temp_min)}
                        <span className="text-slate-400">
                          <TbTemperatureCelsius className="mt-0.5" />
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col  justify-center items-center w-44 ">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400">Humidity</p>
                        <WiHumidity className="text-cyan-400 text-xl ml-0.5" />
                      </div>
                      <p className="text-lg p-4 text-white">
                        {weatherByCity
                          ? weatherByCity.main.humidity
                          : weatherApiData.main.humidity}
                        %
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-44">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400">Pressure</p>
                        <TbGauge className="text-cyan-400 text-xl ml-2 mt-0.5" />
                      </div>
                      <p className="text-lg p-4 text-white">
                        {weatherByCity
                          ? weatherByCity.main.pressure
                          : weatherApiData.main.pressure}{" "}
                        mb
                      </p>
                    </div>
                    <div className="flex flex-col  justify-center items-center w-44 mb-5">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400">Visibility </p>
                        <MdVisibility className="text-cyan-400 text-xl ml-2 mt-1" />
                      </div>
                      <p className="text-lg p-4 text-white">
                        {weatherByCity
                          ? Math.round(weatherByCity.visibility / 1609.34)
                          : Math.round(
                              weatherApiData.visibility / 1609.34
                            )}{" "}
                        Miles
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-44 mb-5">
                      <div className="flex flex-row justify-center">
                        <p className="text-slate-400">Wind </p>
                        <BiWind className="text-cyan-400 text-xl ml-2 mt-0.5" />
                      </div>
                      <p className="text-lg p-4 text-white">
                        {weatherByCity
                          ? weatherByCity.wind.speed
                          : weatherApiData.wind.speed}{" "}
                        mph
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-full mt-8 w-full">
                  <Swiper
                    modules={[Pagination, A11y]}
                    spaceBetween={-150}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    style={{ padding: "60px", }}
                  >
                    <div className="h-56 w-full grid grid-cols-5 grid-rows-1 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-x-8">
                      <ul>
                        {forecastByCity
                          ? forecastByCity.list.map((item, key) => {
                              return (
                                <SwiperSlide>
                                  <li key={key} className="list-none">
                                    <div className="h-56 w-40 mt-8 flex flex-col items-center pt-2 rounded-xl bg-slate-900/10 ">
                                      <div className="w-40  mt-2 flex flex-col items-center ">
                                        <p className="text-cyan-500  ">
                                          {moment(item.dt_txt).format("D")}
                                          <span className="text-slate-400">
                                            {" "}
                                            {moment(item.dt_txt).format("MMM")}
                                          </span>
                                          <span>
                                            {" "}
                                            {moment(item.dt_txt).format("h")}
                                            <span className="text-slate-400">
                                              {" "}
                                              {moment(item.dt_txt).format("A")}
                                            </span>
                                          </span>
                                        </p>

                                        <img
                                          width="100px"
                                          height="100px"
                                          className="mb-[-4px]"
                                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                          alt="error"
                                        />
                                        <p className=" text-lg text-white ">
                                          {item.weather[0].description
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.weather[0].description.slice(
                                              1
                                            )}
                                        </p>
                                      </div>
                                      <div className="p-4 h-12 w-40 flex flex-row justify-center">
                                        <div className="flex mr-10">
                                          <span>
                                            <FaLongArrowAltUp className="text-cyan-400 text-md mt-0.5 " />
                                          </span>
                                          <p className="text-slate-400 text-md">
                                            {Math.round(item.main.temp_max)}
                                          </p>
                                        </div>
                                        <div className="flex">
                                          <span>
                                            <FaLongArrowAltDown className="text-cyan-400 text-md mt-0.5" />
                                          </span>
                                          <p className="text-slate-400 text-md">
                                            {Math.round(item.main.temp_min)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </SwiperSlide>
                              );
                            })
                          : forecastData
                          ? forecastData.list.map((item, key) => {
                              return (
                                <SwiperSlide>
                                  <li key={key} className="list-none">
                                    {" "}
                                    <div className="h-56 w-40 mt-8 flex flex-col items-center pt-2 rounded-xl bg-slate-900/10 ">
                                      <div className="w-40  mt-2 flex flex-col items-center ">
                                        <p className="text-cyan-500  ">
                                          {moment(item.dt_txt).format("D")}
                                          <span className="text-slate-400">
                                            {" "}
                                            {moment(item.dt_txt).format("MMM")}
                                          </span>
                                          <span>
                                            {" "}
                                            {moment(item.dt_txt).format("h")}
                                            <span className="text-slate-400">
                                              {" "}
                                              {moment(item.dt_txt).format("A")}
                                            </span>
                                          </span>
                                        </p>
                                        
                                        <img
                                          width="100px"
                                          height="100px"
                                          className="mb-[-4px]"
                                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                          alt="error"
                                        />
                                        <p className=" text-lg text-white ">
                                          {item.weather[0].description
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.weather[0].description.slice(
                                              1
                                            )}
                                        </p>
                                      </div>
                                      <div className="p-4 h-12 w-40 flex flex-row justify-center">
                                        <div className="flex mr-10">
                                          <span>
                                            <FaLongArrowAltUp className="text-cyan-400 text-md mt-1 " />
                                          </span>
                                          <p className="text-slate-400">
                                            {Math.round(item.main.temp_max)}
                                          </p>
                                        </div>
                                        <div className="flex">
                                          <span>
                                            <FaLongArrowAltDown className="text-cyan-400 text-md mt-1" />
                                          </span>
                                          <p className="text-slate-400">
                                            {Math.round(item.main.temp_min)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </SwiperSlide>
                              );
                            })
                          : ""}
                      </ul>
                    </div>
                  </Swiper>
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
