const id = "eb617224853a84d31e87d8602893627d";
async function checkWeather(city) {
  try {
    let myData = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        `&appid=${id}`
    );
    let result = await myData.json();
    console.log(result);
    // if(result)
    if (result.message === "city not found") {
      document.querySelector(".weather-img img").src = `imgs/notfound.png`;
    }
    // console.log("Hello from fn");
    updateTemp(result.main.temp);
    updateCity(result.name);
    updateHumidity(result.main.humidity);
    updateWindSpeed(result.wind.speed);
    udateWeatherImage(result);
  } catch (reason) {
    console.log(reason);
  }
}
document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  if (document.querySelector("input").value !== "") {
    document.querySelector(".weather-app").classList.remove("close");
    let city = document.querySelector("input").value;
    checkWeather(city);
  }
});

function updateTemp(temp) {
  document.querySelector(".temp").innerHTML = Math.round(temp - 273) + "°c";
}
function updateCity(city) {
  document.querySelector(".city").innerHTML = city;
}
function updateHumidity(humidity) {
  document.querySelector(".humidity").innerHTML = humidity + "%";
}
function updateWindSpeed(windSpeed) {
  document.querySelector(".wind-speed").innerHTML = windSpeed + " KM/H";
}
function udateWeatherImage(weather) {
  const weatherImages = {
    Clear: "clear.png",
    Clouds: "clouds.png",
    Rain: "rain.png",
    Snow: "snow.png",
    Thunderstorm: "thunderstorm.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Fog: "fog.png",
    Haze: "haze.png",
    NotFound: "notfound.png",
  };
  let mainWeather = weather.weather[0].main;
  document.querySelector(
    ".weather-img img"
  ).src = `imgs/${weatherImages[mainWeather]}`;
}
