import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CloudyIcon from "./images/cloudy.svg";
import AirFlowIcon from "./images/air-flow.svg";
import RainIcon from "./images/rain.svg";
import RedoIcon from "./images/redo.svg";

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const Cloudy = styled.img`
  flex-basis: 30%;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

const WeatherApp = () => {
  console.log("---invoke function component---");

  const [currentWeather, setCurrentWeather] = useState({
    observationTime: "2024-10-02 22:10:00",
    locationName: "臺北市",
    description: "多雲時晴",
    temperature: 27.5,
    windSpeed: 0.3,
    humid: 0.88,
  });

  useEffect(() => {
    console.log("execute function in useEffect");
    fetchCurrentWeather();
  }, []);

  const fetchCurrentWeather = () => {
    fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-DE6B03EC-9B1B-4114-A6DB-8E461055FAA6")
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.Station[2];
        const weatherElements = {
          WindSpeed: locationData.WeatherElement.WindSpeed,
          AirTemperature: locationData.WeatherElement.AirTemperature,
          RelativeHumidity: locationData.WeatherElement.RelativeHumidity,
        };
        setCurrentWeather((prevState) => ({
          observationTime: locationData.ObsTime.DateTime,
          locationName: locationData.StationName,
          temperature: weatherElements.AirTemperature,
          windSpeed: weatherElements.WindSpeed,
          humid: weatherElements.RelativeHumidity,
        }));
      });
  };

  return (
    <Container>
      {console.log("render")}

      <WeatherCard>
        <Location>{currentWeather.locationName}</Location>
        <Description>
          {new Intl.DateTimeFormat("zh-TW", {
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currentWeather.observationTime))}{" "}
          {currentWeather.description}
          {/* {currentWeather.observationTime} */}
        </Description>
        <CurrentWeather>
          <Temperature>
            {Math.round(currentWeather.temperature)}
            <Celsius>°C</Celsius>
          </Temperature>
          <Cloudy src={CloudyIcon} />
        </CurrentWeather>
        <AirFlow>
          <img src={AirFlowIcon} />
          {currentWeather.windSpeed} m/h
        </AirFlow>
        <Rain>
          <img src={RainIcon} />
          {Math.round(currentWeather.humid)}%
        </Rain>
        <Redo onClick={fetchCurrentWeather}>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currentWeather.observationTime))}{" "}
          <img src={RedoIcon} />
        </Redo>
      </WeatherCard>
    </Container>
  );
};

export default WeatherApp;
