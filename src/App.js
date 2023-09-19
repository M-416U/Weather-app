import axios from "axios";
import { SVGS } from "./SVGS/SVG";
import React, { useEffect, useState } from "react";
function App() {
  const [Location, setLocation] = useState("Cairo");
  const [errMsg, setErr] = useState("");
  const Wapi = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=4e4a2b0dedffb478caebaa6d21c229b7&&units=metric`;
  useEffect(() => {
    const DLocation = "Cairo";
    setLocation(DLocation);
    handelSearch();
  }, []);
  const [data, setData] = useState({
    Country: "EG*",
    Status: "Clear",
    wind: "25*",
    humidity: "20*",
    celsius: "20*",
  });
  const handelSearch = () => {
    if (Location !== "") {
      axios
        .get(Wapi)
        .then((res) => {
          setLocation(res.data.name);
          setData({
            ...data,
            Status: res.data.weather[0].main,
            celsius: res.data.main.temp,
            humidity: res.data.main.humidity,
            wind: res.data.wind.speed,
            Country: res.data.sys.country,
          });
          setErr("");
        })
        .catch((err) => {
          setErr(err.response.data.message);
        });
    }
  };
  const handelEnter = (e) => {
    if (e.key === "Enter") {
      handelSearch();
    }
  };
  return (
    <section className="app">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter City Name"
            onKeyPress={handelEnter}
            onInput={(e) => setLocation(e.target.value)}
          />
          <div className="search-icon" onClick={handelSearch}>
            <SVGS.Search />
          </div>
          <span className="errmsg">
            {errMsg !== "" ? errMsg : data.Country}
          </span>
        </div>
        <div className="resolts-bar">
          <div className="main-details">
            <div>
              {data.Status === "Clear" ? (
                <SVGS.Clear />
              ) : data.Status === "Clouds" ? (
                <SVGS.Cloud />
              ) : data.Status === "Rain" ? (
                <SVGS.Rain />
              ) : data.Status === "Drizzel" ? (
                <SVGS.Drizzel />
              ) : null}
              <div>
                <span className="name">{Location}</span>
                <span className="deg"> {data.celsius}°C</span>
              </div>
            </div>
            <div className="status">
              {data.Status}
              <span>
                {data.Status === "Clear" ? (
                  <SVGS.Clear w="30" />
                ) : data.Status === "Clouds" ? (
                  <SVGS.Cloud w="30" />
                ) : data.Status === "Rain" ? (
                  <SVGS.Rain w="30" />
                ) : data.Status === "Drizzel" ? (
                  <SVGS.Drizzel w="30" />
                ) : null}
              </span>
            </div>
          </div>
          <div className="other-details">
            <div className="sec">
              <p className="perc">{data.humidity} %</p>
              <p className="name">Humidity</p>
            </div>
            <div className="sec">
              <p className="perc">{data.wind} KM per H</p>
              <p className="name">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
