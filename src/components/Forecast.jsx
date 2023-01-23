import React from 'react'
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";
import moment from "moment/moment";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

export default function Forecast({forecastByCity,forecastData}) {
  return (
    <div className="h-full mt-8 w-full">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={-150}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={{ padding: "60px" }}
      >
        <div className="h-56 w-full grid grid-cols-5 grid-rows-1 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-x-8">
          <ul>
            {forecastByCity
              ? forecastByCity.list.map((item, key) => {
                  return (
                    <SwiperSlide>
                      <li key={key} className="list-none">
                        <div className="h-56 w-44 mt-8 flex flex-col items-center pt-2 rounded-xl bg-slate-900/10 ">
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
                                item.weather[0].description.slice(1)}
                            </p>
                          </div>
                          <div className="p-4 h-12 w-40 flex flex-row justify-center">
                            <div className="flex mr-10">
                              <span>
                                <FaLongArrowAltUp className="text-cyan-400 text-md mt-0.5 " />
                              </span>
                              <p className="text-slate-400 text-md">
                                {Math.round(item.main.temp_max)}°
                              </p>
                            </div>
                            <div className="flex">
                              <span>
                                <FaLongArrowAltDown className="text-cyan-400 text-md mt-0.5" />
                              </span>
                              <p className="text-slate-400 text-md">
                                {Math.round(item.main.temp_min)}°
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
                        <div className="h-56 w-44 mt-8 flex flex-col items-center pt-2 rounded-xl bg-slate-900/10 ">
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
                                item.weather[0].description.slice(1)}
                            </p>
                          </div>
                          <div className="p-4 h-12 w-40 flex flex-row justify-center">
                            <div className="flex mr-10">
                              <span>
                                <FaLongArrowAltUp className="text-cyan-400 text-md mt-1 " />
                              </span>
                              <p className="text-slate-400">
                                {Math.round(item.main.temp_max)}°
                              </p>
                            </div>
                            <div className="flex">
                              <span>
                                <FaLongArrowAltDown className="text-cyan-400 text-md mt-1" />
                              </span>
                              <p className="text-slate-400">
                                {Math.round(item.main.temp_min)}°
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
  );
}
