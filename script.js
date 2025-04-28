const apiKey = "4a2a323fdf53008e590bb9a69d368c70";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city !== "") {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

function getWeather(city) {
  document.getElementById("loading").style.display = "block";
  document.getElementById("weatherResult").innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

function displayWeather(data) {
  document.getElementById("loading").style.display = "none";

  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
