import React from "react";

export default function LoadingScreen() {
  return (
    <div className="font-inter h-screen flex flex-col justify-center items-center bg-slate-800">
      <div className=" mx-auto">
        <img src="/weather.svg" width="70px" height="70px" className="ml-10" alt="logo"/>
      </div>
    </div>
  );
}
