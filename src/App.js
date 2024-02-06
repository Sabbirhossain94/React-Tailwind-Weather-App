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
import Forecast from "./components/Forecast";
import LoadingScreen from "./components/LoadingScreen";
import axios from "axios";
import Footer from "./components/Footer";

export default function App() {
  const [weatherApiData, setWeatherApiData] = useState();
  const [forecastData, setForecastData] = useState();
  const [city, setCity] = useState("");
  const [weatherByCity, setWeatherByCity] = useState();
  const [forecastByCity, setForecastByCity] = useState();
  const [delay, setDelay] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  function getWeatherDetails() {
    if (!navigator.geolocation) {
      console.log("does not work!");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&type=hour&units=metric&appid=${apiKey}`;
        axios
          .get(weatherUrl)
          .then((response) => setWeatherApiData(response.data));
        axios
          .get(forecastUrl)
          .then((response) => setForecastData(response.data));
      });
    }
  }
  useEffect(() => {
    getWeatherDetails();
    // eslint-disable-next-line
  }, []);

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const queryCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const queryForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=hour&units=metric&appid=${apiKey}`;

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      try {
        setLoading(true);
        await axios
          .get(queryCity)
          .then((response) => {
            setWeatherByCity(response.data);
          })
          .catch((error) => {
            console.log(error);
            setCity("");
          });
        await axios
          .get(queryForecast)
          .then((response) => {
            setForecastByCity(response.data);
          })
          .catch((error) => {
            console.log(error);
            setCity("");
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  setTimeout(() => setDelay(1), 2000);
  return delay === 0 ? (
    <LoadingScreen />
  ) : (
    <div className="overflow-hidden">
      <div className="font-inter font-medium  bg-slate-800  h-full w-full">
        <div className="mx-auto border border-transparent sm:h-full xs:w-11/12 sm:w-10/12 md:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2  ">
          {/* search area */}
          <div className="mt-24 ">
            <label className="relative block ">
              <span className="absolute inset-y-0 left-0 flex items-center ml-4 ">
                <AiOutlineSearch className="text-slate-400 " />
              </span>
              <input
                className=" caret-slate-400 placeholder:not-italic placeholder:text-slate-400 placeholder:text-md block text-slate-400 bg-zinc-900/20 w-full h-12 border border-slate-900/10 rounded-md py-2 pl-9  shadow-md focus:outline-none focus:border-cyan-500 sm:text-sm"
                placeholder="Search by cities..."
                type="text"
                name="search"
                value={city}
                onKeyPress={handleSubmit}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
          </div>
          {/* search area /end */}

          {/* main */}
          {loading ? (
            <div className="font-inter h-screen flex flex-col justify-center items-center bg-slate-800">
              <div className=" mx-auto">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div>
              <div className="  bg-zinc-900/20 rounded-lg mt-8 grid xs:grid-cols-1 xs:grid-rows-2 sm:grid-cols-2 sm:grid-rows-1  ">
                <div className="  flex flex-col items-center ">
                  <div className=" h-36 w-52 mt-4 ">
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-cyan-400 text-md mt-10">{date}</p>
                      <div className="flex justify-center ">
                        <img
                          style={{ color: "white", marginLeft: "10px" }}
                          src={`http://openweathermap.org/img/wn/${weatherByCity
                              ? weatherByCity?.weather[0].icon
                              : weatherApiData?.weather[0].icon
                            }@2x.png`}
                          alt="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" h-32 w-52 ">
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex mt-4">
                        <p className=" text-white text-5xl ">
                          {weatherByCity
                            ? Math.round(weatherByCity?.main.temp)
                            : Math.round(weatherApiData?.main.temp)}
                        </p>
                        <span>
                          <TbTemperatureCelsius className="text-4xl text-slate-400" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center mt-4">
                      {" "}
                      <p className=" text-slate-400">Feels like </p>{" "}
                      <span className="text-white ml-1">
                        {weatherByCity
                          ? Math.round(weatherByCity?.main?.feels_like)
                          : Math.round(weatherApiData?.main?.feels_like)}
                        <span className="text-slate-400 ml-0.5">°</span>
                      </span>
                    </div>
                  </div>
                  <div className=" h-36 w-52">
                    <div className=" flex flex-col justify-center items-center">
                      <div>
                        <p className=" text-white text-3xl text-center">
                          {weatherByCity
                            ? weatherByCity?.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                            weatherByCity?.weather[0].description.slice(1)
                            : weatherApiData?.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                            weatherApiData?.weather[0].description.slice(1)}
                        </p>
                      </div>
                      <div className="flex mt-2 justify-center ">
                        <span>
                          <MdLocationOn className="mt-0.5 mr-0.5 text-cyan-500 text-xl" />
                        </span>
                        <p className="flex text-slate-400 text-md">
                          {weatherByCity
                            ? weatherByCity.name +
                            ", " +
                            weatherByCity?.sys.country
                            : weatherApiData?.sys.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto xs:grid xs:grid-rows-2 xs:grid-cols-3 sm:grid sm:grid-cols-2 sm:grid-rows-3 ">
                  <div className=" flex flex-col justify-end items-center h-32 w-36 xs:mr-2 sm:mr-8">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400 ">Max</p>
                      <FaLongArrowAltUp className="text-cyan-400 text-lg ml-0.5 mt-1" />
                    </div>

                    <p className="text-lg p-4 text-white flex flex-row">
                      {weatherByCity
                        ? Math.round(weatherByCity?.main.temp_max)
                        : Math.round(weatherApiData?.main.temp_max)}
                      <span className="text-slate-400 ">
                        <TbTemperatureCelsius className="mt-0.5" />
                      </span>
                    </p>
                  </div>
                  <div className=" flex flex-col justify-end items-center h-32 w-36  ">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400">Min</p>
                      <FaLongArrowAltDown className="text-cyan-400 text-lg ml-0.5 mt-1" />
                    </div>
                    <p className="text-lg p-4 text-white flex flex-row">
                      {weatherByCity
                        ? Math.round(weatherByCity?.main.temp_min)
                        : Math.round(weatherApiData?.main.temp_min)}
                      <span className="text-slate-400">
                        <TbTemperatureCelsius className="mt-0.5" />
                      </span>
                    </p>
                  </div>

                  <div className=" flex flex-col sm:justify-center items-center h-32 w-36 xs:justify-end">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400">Humidity</p>
                      <WiHumidity className="text-cyan-400 text-xl ml-0.5" />
                    </div>
                    <p className="text-lg p-4 text-white">
                      {weatherByCity
                        ? weatherByCity?.main.humidity
                        : weatherApiData?.main.humidity}
                      %
                    </p>
                  </div>
                  <div className=" flex flex-col xs:justify-start sm:justify-center items-center h-32 w-36 xs:-mt-16 sm:mt-0">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400">Pressure</p>
                      <TbGauge className="text-cyan-400 text-xl ml-2 mt-0.5" />
                    </div>
                    <p className="text-lg p-4 text-white">
                      {weatherByCity
                        ? weatherByCity?.main.pressure
                        : weatherApiData?.main.pressure}{" "}
                      mb
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start items-center h-32 w-36 xs:-mt-16 sm:mt-0">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400">Visibility </p>
                      <MdVisibility className="text-cyan-400 text-xl ml-2 mt-1" />
                    </div>
                    <p className="text-lg p-4 text-white">
                      {weatherByCity
                        ? Math.round(weatherByCity?.visibility / 1609.34)
                        : Math.round(weatherApiData?.visibility / 1609.34)}{" "}
                      Miles
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start items-center h-32 w-36 xs:-mt-16 sm:mt-0">
                    <div className="flex flex-row justify-center">
                      <p className="text-slate-400">Wind </p>
                      <BiWind className="text-cyan-400 text-xl ml-2 mt-0.5" />
                    </div>
                    <p className="text-lg p-4 text-white">
                      {weatherByCity
                        ? weatherByCity?.wind.speed
                        : weatherApiData?.wind.speed}{" "}
                      mph
                    </p>
                  </div>
                </div>
              </div>
              <Forecast
                forecastByCity={forecastByCity}
                forecastData={forecastData}
              />
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
