function showDate() {
  let now = new Date();

  let date = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let h1 = document.querySelector("#current-date");
  h1.innerHTML = `${day} ${month} ${date} ${year}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  //   let dateElement = document.querySelector("#current-date");
  //   dateElement.innerHTML = await response.data.dt;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.src = getIconPath(response.data.weather[0].description);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  celsiusTemperature = response.data.main.temp;
}

function getIconPath(description) {
  switch (description) {
    case "clear sky":
      return "src/weather_icons/clear_sky.png";
    case "few clouds":
      return "src/weather_icons/few_clouds.png";
    case "scattered clouds":
      return "src/weather_icons/cloudy.png";
    case "broken clouds":
      return "src/weather_icons/cloudy.png";
    case "shower rain":
      return "src/weather_icons/shower_rain.png";
    case "heavy intensity rain":
      return "src/weather_icons/shower_rain.png";
    case "rain":
      return "src/weather_icons/rain.png";
    case "light rain":
      return "src/weather_icons/rain.png";
    case "thunderstorm":
      return "src/weather_icons/thunderstorm.png";
    case "snow":
      return "src/weather_icons/snow.png";
    case "light snow":
      return "src/weather_icons/snow.png";
    case "mist":
      return "src/weather_icons/cloudy.png";
    default:
      return "src/weather_icons/few_clouds.png";
  }
}

function showCity(city) {
  let apiKey = "4af9b5d3de1ded9c0d4d2430790f082e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  showCity(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

showDate();
showCity("Warsaw");
