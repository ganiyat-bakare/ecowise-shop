const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const aqiElement = document.querySelector("#aqi");
const weatherTipElement = document.querySelector("#weather-tip");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=9.06&lon=7.50&appid=3b8e49e1c7833a396d7ecc85f676d123&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    weatherTipElement.textContent = "Weather data unavailable.";
  }
}

function displayResults(weatherData) {
  // Set temperature
  const temperature = weatherData.main.temp.toFixed(1);
  currentTemp.innerHTML = `${temperature}&deg;F`;

  // Set weather description and icon
  const iconCode = weatherData.weather[0].icon;
  const description = weatherData.weather[0].description;
  const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

  weatherIcon.setAttribute("src", iconURL);
  weatherIcon.setAttribute("alt", description);
  captionDesc.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);

  // Simulated AQI Value (in a real app, you'd fetch from a dedicated AQI API)
  const simulatedAQI = Math.floor(Math.random() * 201); // value between 0 and 200
  aqiElement.textContent = simulatedAQI;

  // Choose AQI category (optional enhancement)
  let aqiCategory = "";
  if (simulatedAQI <= 50) {
    aqiCategory = "Good";
  } else if (simulatedAQI <= 100) {
    aqiCategory = "Moderate";
  } else {
    aqiCategory = "Unhealthy";
  }

  // Eco-friendly tips based on weather
  const tipsByCondition = {
    Clear: "Great day to walk or bike instead of driving—save emissions!",
    Clouds:
      "Overcast skies? Perfect for indoor activities that use less energy.",
    Rain: "Collect rainwater for your garden. Save water, grow greener!",
    Thunderstorm: "Unplug electronics to avoid power surges and save energy.",
    Drizzle: "A light drizzle—skip watering your plants today!",
    Snow: "Bundle up with layers instead of cranking the heat.",
    Mist: "Air quality can dip in misty weather—limit car usage.",
    Fog: "Drive less and use lights efficiently to avoid unnecessary energy use.",
    Haze: "Try indoor plants to improve air quality naturally.",
    Dust: "Keep windows closed and use natural cleaning products indoors.",
    Smoke: "Avoid burning waste. Recycle and reduce fire risk.",
    Sand: "Sandstorms? Use weather stripping to protect your home and save energy.",
  };

  const defaultTip =
    "Every day is a good day to reduce waste, reuse, and recycle.";

  const mainCondition = weatherData.weather[0].main;
  const ecoTip = tipsByCondition[mainCondition] || defaultTip;

  weatherTipElement.textContent = `${ecoTip} (AQI: ${simulatedAQI} - ${aqiCategory})`;
}

apiFetch();

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    document.getElementById("visitor-message").innerText =
      "Welcome! Let us know if you have any questions.";
  } else {
    const differenceInMilliseconds = currentVisit - lastVisit;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays < 1) {
      document.getElementById("visitor-message").innerText =
        "Back so soon! Awesome!";
    } else {
      const dayText = differenceInDays === 1 ? "day" : "days";
      document.getElementById("visitor-message").innerText =
        `You last visited ${differenceInDays} ${dayText} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

displayVisitMessage();

const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const newsletterSubmit = document.getElementById("newsletterSubmit");
const newsletterEmailInput = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterSubmit.addEventListener("click", function () {
  const email = newsletterEmailInput.value.trim();
  if (email === "") {
    newsletterMessage.innerText = "Please enter a valid email address.";
    newsletterMessage.classList.remove("hidden");
    return;
  }

  setTimeout(() => {
    newsletterMessage.innerText =
      "Thank you for subscribing to our newsletter!";
    newsletterMessage.classList.remove("hidden");
  }, 1000);

  newsletterEmailInput.value = "";
});

const colorClasses = ["color-1", "color-2", "color-3"];
let currentIndex = 0;

function changeCardColors() {
  const weatherSection = document.querySelector(".weather-section");

  weatherSection.classList.add("fade");

  setTimeout(() => {
    colorClasses.forEach((colorClass) =>
      weatherSection.classList.remove(colorClass),
    );
    currentIndex = (currentIndex + 1) % colorClasses.length;
    weatherSection.classList.add(colorClasses[currentIndex]);

    weatherSection.classList.remove("fade");
  }, 500);

  setTimeout(() => {
    weatherSection.classList.add("fade");
  }, 0);
}

setInterval(changeCardColors, 10000);
