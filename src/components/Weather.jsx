import search from "../assets/search.svg";
import rainy from "../assets/rainy.svg";
import cloudy from "../assets/cloudy.svg";
import sunny from "../assets/sunny.svg";
import humid from "../assets/humid.svg";
import wind from "../assets/wind.png";
import winter from "../assets/winter.png";
import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const [weatherData, setweatherData] = useState(false);
  const [iconCode, seticonCode] = useState("01d");
  const inputRef = useRef()

  const searchCity = async (city) => {
    if(city === ""){
        alert("enter city name")
        return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`
      );

      const data = await response.json();
      console.log(data);
      
      if(!response.ok){
        return alert(data.message);
      }
     
      setweatherData({
        temperatue: data.main.temp,
        cityname: data.name,
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
      });
      seticonCode(data.weather[0].icon );
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchCity("mumbai");
  }, []);

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return (
    <div className="weather bg-blue-700 w-fit h-fit p-5 rounded-md">
      <div className="search_bar flex justify-center gap-2">
        <input ref={inputRef} type="text" placeholder="search" className=" border-none rounded-full" />
        <img
            onClick={()=>searchCity(inputRef.current.value)}
          src={search}
          alt="search icon"
          className="searchIcon rounded bg-gray-100 rounded-full cursor-pointer size-7"
        />
      </div>
      <img
        src={iconUrl}
        alt=""
        className="weather_icon size-32 ml-12 mt-5 mb-5"
      />
      <p className="temperature px-20 text-white text-3xl">
        {weatherData.temperatue} °c
      </p>
      <p className="city  px-20 text-white text-3xl ">{weatherData.cityname}</p>

      <div className="weatherdata flex justify-between mt-7">
        <div className="col1">
          <img className="" src={wind} alt="" />
          <p className="text-white">{weatherData.windspeed}</p>
          <span className="text-white">Wind speed</span>
        </div>

        <div className="col2">
          <img src={humid} alt="" className="size-8" />
          <p className="text-white">{weatherData.humidity}</p>
          <span className="text-white">Humidity</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
