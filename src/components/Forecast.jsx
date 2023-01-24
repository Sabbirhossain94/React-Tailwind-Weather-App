import React, { useRef } from "react";
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
import { BsHandIndex } from "react-icons/bs";
export default function Forecast({ forecastByCity, forecastData }) {
  return (
    <div>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 100,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        pagination={{
          clickable: true,
          el: ".swiper-custom-pagination",
        }}
      >
        <div className="h-56 w-full grid grid-cols-4 grid-rows-1 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-x-8">
          <ul>
            {forecastByCity
              ? forecastByCity.list.map((item, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <li className="list-none">
                        <div className="h-56 w-44 flex flex-col mt-8 items-center pt-2 rounded-xl bg-slate-900/10 ">
                          <div className="w-40 mt-6 flex flex-col items-center ">
                            <p className="text-cyan-500 text-md ">
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
                              width="80px"
                              height="80px"
                              className="mb-[-4px]"
                              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt="error"
                            />
                            <p className=" text-sm text-white ">
                              {item.weather[0].description
                                .charAt(0)
                                .toUpperCase() +
                                item.weather[0].description.slice(1)}
                            </p>
                          </div>
                          <div className="p-4 h-12 w-40 flex flex-row justify-center">
                            <div className="flex mr-10">
                              <span>
                                <FaLongArrowAltUp className="text-cyan-400 text-sm mt-0.5 " />
                              </span>
                              <p className="text-slate-400 text-sm">
                                {Math.round(item.main.temp_max)}°
                              </p>
                            </div>
                            <div className="flex">
                              <span>
                                <FaLongArrowAltDown className="text-cyan-400 text-sm mt-0.5" />
                              </span>
                              <p className="text-slate-400 text-sm">
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
                    <SwiperSlide key={key}>
                      <li className="list-none">
                        {" "}
                        <div className="h-56 w-44 mt-8 flex flex-col items-center pt-2 rounded-xl bg-slate-900/10 ">
                          <div className="w-40 mt-6 flex flex-col items-center ">
                            <p className="text-cyan-500 text-md">
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
                              width="80px"
                              height="80px"
                              className="mb-[-4px]"
                              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt="error"
                            />
                            <p className=" text-sm text-white ">
                              {item.weather[0].description
                                .charAt(0)
                                .toUpperCase() +
                                item.weather[0].description.slice(1)}
                            </p>
                          </div>
                          <div className="p-4 h-12 w-40 flex flex-row justify-center">
                            <div className="flex mr-10">
                              <span>
                                <FaLongArrowAltUp className="text-cyan-400 text-sm mt-1 " />
                              </span>
                              <p className="text-slate-400 text-sm mt-0.5">
                                {Math.round(item.main.temp_max)}°
                              </p>
                            </div>
                            <div className="flex">
                              <span>
                                <FaLongArrowAltDown className="text-cyan-400 text-sm mt-1" />
                              </span>
                              <p className="text-slate-400 text-sm mt-0.5">
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
      <div className="mt-6 flex justify-center text-sm text-transparent hover:text-slate-400">
        <BsHandIndex className="mr-2 mt-0.5 hover:text-slate-400" /> hold and drag to see
        future forecasts{" "}
      </div>
    </div>
  );
}
