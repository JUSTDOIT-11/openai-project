import React, { useEffect, useState } from "react";
import "CSS/Pages.css";

const Pages = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [location, setLocation] = useState("");
  const [tem, setTem] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API;

  const weatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLocation((prev) => data.name);
        setTem((prev) => data.main.temp);
      });
  };

  useEffect(() => {
    weatherData();
  }, [lat, lon]);

  //위치 받아오는데 성공했을 때
  const geoSuccess = (position) => {
    setLat((prev) => position.coords.latitude);
    setLon((prev) => position.coords.longitude);
  };

  //위치 받아오지 못했을 때
  const geoError = (error) => {
    console.log(error);
  };

  //현재 위치 받아오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  return (
    <div className="weather-bigbox">
      <div className="weather-box">
        <div className="weather-box__div weather-box__div__top">
          <div>
            <span>{location}</span>
            <span>{tem}</span>
            <span></span>
          </div>
          <div>
            <img />
          </div>
        </div>
        <div className="weather-box__div weather-box__div__middie"></div>
        <div className="weather-box__div weather-box__div__bottom"></div>
      </div>
    </div>
  );
};

export default Pages;
