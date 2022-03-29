let currentDate = new Date();

function displayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let today = document.querySelector("#current-time");

today.innerHTML = `${displayTime(currentDate)}`;

function displayTemp(response) {
  let todayTempElement = document.querySelector("#temp-today");
  let temperature = Math.round(response.data.main.temp);
  todayTempElement.innerHTML = `${temperature}°`;
}

function displayName(response) {
  let cityNameElement = document.querySelector("#today-location");
  let cityName = response.data.name;
  cityNameElement.innerHTML = `${cityName}`;
}

function retrieveName(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayName);
}

navigator.geolocation.getCurrentPosition(retrieveName);

function retrieveTemp(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemp);
}

navigator.geolocation.getCurrentPosition(retrieveTemp);

function saveCity(event) {
  event.preventDefault();
  let citySaved = document.querySelector("#text-input");
  let city = citySaved.value;
  let location = document.querySelector("#today-location");
  location.innerHTML = `${city}`;
  displayCity(city);
}

let searchInput = document.querySelector("#form");
searchInput.addEventListener("submit", saveCity);

//let convertButton = document.querySelector("#convert");
//convertButton.addEventListener("click", toFahrenheit);

function showWeather(response) {
  let todayTempElement = document.querySelector("#temp-today");
  let temperature = Math.round(response.data.main.temp);
  todayTempElement.innerHTML = `${temperature}°`;
}

function displayCity(location) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let cityName = location;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
