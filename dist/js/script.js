const searchButton = document.querySelector(".show-weather button");
const searchCity = document.querySelector("#city");

const showCity = document.querySelector(".weather-city");
const showDescription = document.querySelector(".weather-description");
const showTemperature = document.querySelector(".weather-temperature");
const loadingText = document.querySelector(".load");
let showWeather = document.querySelectorAll(".weather div");
const showWind = document.querySelector(".weather-wind");
const clouds = document.querySelector(".clouds img");
const showHumidity = document.querySelector(".weather-humidity");
searchButton.addEventListener("click", searchWeather);

const backgroundMain = document.querySelector("body");

function searchWeather() {
  loadingText.style = "display:block";
  const cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    alert("you have to type a city");
  } else {
    var http = new XMLHttpRequest();
    const apiKey = "aac5eb7239e7dc4512acd0517d459bcf";
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=" +
      apiKey;

    const method = "GET";

    http.open(method, url);
    http.onreadystatechange = function() {
      if (http.status === 200 && http.readyState === 4) {
        const data = JSON.parse(http.responseText);
        const weatherData = new Weather(
          cityName,
          data.weather[0].description.toUpperCase()
        );
        weatherData.humidity = data.main.humidity;
        weatherData.wind = data.wind.speed;
        weatherData.temperature = data.main.temp;
        console.log(weatherData);

        showCity.textContent = weatherData.city;
        showDescription.textContent = weatherData.description;
        showTemperature.textContent = "temperature  " + weatherData.temperature;
        showWind.textContent = " wind  " + weatherData.wind;
        showHumidity.textContent = "humidity  " + weatherData.humidity;
        if (weatherData.description == "CLEAR SKY") {
          clouds.src = "img/sunny.png";
          backgroundMain.style = "background: url('img/background_sunny.jpg')";
        }
        if (weatherData.description == "BROKEN CLOUDS") {
          clouds.src = "img/thunderstorms.png";
          backgroundMain.style =
            "background: url('img/Bacground_tunderstorm.jpg')";
        }
        if (weatherData.description == "LIGHT INTENSITY SHOWER RAIN") {
          clouds.src = "img/rain_light.png";
          backgroundMain.style =
            "background: url('img/backround_light_rain.jpg')";
        }
        if (weatherData.description == "OVERCAST CLOUDS") {
          clouds.src = "img/cloudy.png";
          backgroundMain.style = "background: url('img/background_cloudy.jpg')";
        }
        if (weatherData.description == "SCATTERED CLOUDS") {
          clouds.src = "img/partly_cloudy.png";
          backgroundMain.style =
            "background: url('img/backgound_partly_cloudy.jpg')";
        }
        if (
          weatherData.description == "LIGHT RAIN" ||
          weatherData.description == "LIGHT INTENSITY SHOWER RAIN"
        ) {
          clouds.src = "img/light_rain.png";
          backgroundMain.style =
            "background: url('img/background_light_rain.png') ";
        }
        if (weatherData.description == "FEW CLOUDS") {
          clouds.src = "img/few_clouds.png";
          backgroundMain.style =
            "background: url('img/background_few_clouds.png')";
        }
        if (weatherData.description == "HEAVY INTENSITY RAIN") {
          clouds.src = "img/intensive_rain.png";
          backgroundMain.style =
            "background: url('img/backgroun_intensive_rain.jpg')";
        }
        if (weatherData.description == "MODERATE RAIN") {
          clouds.src = "img/shutedr_rain.png";
          backgroundMain.style =
            "background: url('img/background_moderate_rain.jpg')";
        }
        if (weatherData.description == "SHOWER RAIN") {
          clouds.src = "img/intensive_rain.png";
          backgroundMain.style =
            "background: url('img/backgroun_intensive_rain.jpg')";
        }
        if (weatherData.description == "HAZE") {
          clouds.src = "img/haze.png";
          backgroundMain.style = "background: url('img/bacground_haze.jpg')";
        }
        if (weatherData.description == "FOG") {
          clouds.src = "img/haze.png";
          backgroundMain.style = "background: url('img/background_fog.jpg')";
        }
        if (weatherData.description == "MIST") {
          clouds.src = "img/haze.png";
          backgroundMain.style = "background: url('img/background_mist.jpg')";
        }
        showWeather.forEach(item => item.classList.add("show-weather"));
        showIT = true;
        loadingText.style = "display:none";
      } else if (http.status !== 200 && http.readyState == 4) {
        console.log("error");
      }
    };
  }
  http.send();
}

function Weather(city, description) {
  this.city = city;
  this.description = description;
  this._temperature = "";
  this._wind = "";
  this._humidity = "";
}
Object.defineProperty(Weather.prototype, "humidity", {
  get: function() {
    return this._humidity;
  },
  set: function(value) {
    return (this._humidity = value / 4 + "%");
  }
});
Object.defineProperty(Weather.prototype, "wind", {
  get: function() {
    return this._wind;
  },
  set: function(value) {
    return (this._wind = value + "km/h");
  }
});
Object.defineProperty(Weather.prototype, "temperature", {
  get: function() {
    return this._temperature;
  },
  set: function(value) {
    return (this._temperature = (value * 1.8 + 32).toFixed(2) + "F.");
  }
});
