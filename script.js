// api key from openweathermap
// https://openweathermap.org/appid
// 4a2a323fdf53008e590bb9a69d368c70
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
      document.getElementById("weatherResult").innerHTML = `
          <div style="
            background-color: #ffcccc;
            color: #a94442;
            padding: 15px;
            border: 1px solid #a94442;
            border-radius: 5px;
            margin-top: 10px;
            font-weight: bold;
            text-align: center;
          ">
            ${error.message}
          </div>
        `;
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
  document.getElementById("cityInput").value = "";
}

// feching cities using static list
// This is a static list of cities for demonstration purposes. In a real application, you might want to fetch this list from an API or a database.
const cityList = [
  "London",
  "Los Angeles",
  "Lisbon",
  "Lagos",
  "Lahore",
  "Luxembourg",
  "Paris",
  "Prague",
  "Philadelphia",
  "Porto",
  "New York",
  "New Delhi",
  "Nice",
  "Nairobi",
  "Tokyo",
  "Toronto",
  "Tunis",
  "Tampa",
  "Berlin",
  "Beijing",
  "Boston",
  "Budapest",
  "Cairo",
  "Chicago",
  "Copenhagen",
];

// fetch function to get suggestions from the static list

document.getElementById("cityInput").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestionsDiv = document.getElementById("suggestions");

  suggestionsDiv.innerHTML = "";

  if (input.length === 0) {
    return;
  }

  const filteredCities = cityList.filter((city) =>
    city.toLowerCase().startsWith(input)
  );

  filteredCities.forEach((city) => {
    const div = document.createElement("div");
    div.textContent = city;
    div.classList.add("suggestion-item");

    div.addEventListener("click", function () {
      document.getElementById("cityInput").value = city;
      suggestionsDiv.innerHTML = "";
    });

    suggestionsDiv.appendChild(div);
  });
});
