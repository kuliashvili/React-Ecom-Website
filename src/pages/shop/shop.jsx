import {react} from "react";
import { PRODUCTS} from "../../products"
import { Product} from "./product"
import "./shop.css"
// 
import React, { useState } from 'react';
const api = {
  key: "9e277487a498b89532640100ddf00489",
  base: "https://api.openweathermap.org/data/2.5/"
}


export const Shop =  () => {
// 
const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
//   


    return  (
        <div className="shop">
            <div className="shopTitle">
                <h1>shop and get weather below, two in one!</h1>
            </div>
            <div className="products"> {PRODUCTS.map((product) => <Product data={product} />)} </div>

{/* svsd */}
<div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <h1 className="header-weather" >bored? see weather in your area, type name in search box, for example: tbilisi and hit enter</h1>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>

        </div>
    )
}

