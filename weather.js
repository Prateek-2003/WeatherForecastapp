
const temp = document.getElementById("temp"),
date = document.getElementById("date-time"),
currentLocation = document.getElementById("location"),
uvIndex = document.querySelector(".uv-index"),
uvText = document.querySelector(".uv-text"),
humidity = document.querySelector(".humidity"),
humidityText = document.querySelector(".humidity-text"),
wind = document.querySelector(".wind"),
windText = document.querySelector(".wind-text"),
precipitation = document.querySelector(".precipitation"),
precipitationText = document.querySelector(".precipitation-text"),
feelslike = document.querySelector(".feelslike"),
feelslikeText = document.querySelector(".feelslike-text"),
sunrise = document.querySelector(".sunrise"),
sunset = document.querySelector(".sunset"),
weatherInfo = document.getElementById("iconText"),
mainIcon = document.getElementById("icon"),
weatherCards = document.getElementById("weather-cards");


function getDateTime(){
    let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    hour = hour%12;
    if(hour < 10){
        hour = "0"+hour
    }
    if(minute < 10){
        minute = "0"+minute;
    }
    let dayString = days[now.getDay()];
    return `${dayString},${hour}:${minute}`;
}

date.innerText = getDateTime();

setInterval(()=> {
    date.innerText = getDateTime();
},1000);


getWeatherData()

function getWeatherData(){
    const apiKey = "LLRK568PEKTNFH2UE2T2PQB34"
    fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lucknow%2CIndia?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
        method: "GET",
    }
    )
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let today = data.currentConditions;
        temp.innerText = today.temp;
        currentLocation.innerText = data.resolvedAddress;
        uvIndex.innerText = today.uvindex;
        wind.innerText = today.windspeed;
        humidity.innerText = today.humidity + "%";
        precipitation.innerText = today.precip + "%";
        feelslike.innerText = today.feelslike + "°";
        sunrise.innerText = today.sunrise;
        sunset.innerText = today.sunset;
        measureUvIndex(today.uvindex);
        updateHumidityStatus(today.humidity);
        weatherInfo.innerText = today.conditions;
        mainIcon.src = getIcon(today.conditions);
        updateForecast(data.days);
    });
}

function updateForecast(data){
   weatherCards.innerHTML = "";

   let day = 0;
   let numCards = 7;
   for(let i=0; i<numCards; i++){
    let card = document.createElement("div");
    card.classList.add("card");
    let dayName = getDayName(data[day].datetime);
    let dayTemp = data[day].temp;
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = "°C";
    card.innerHTML = `<h2 class="day-name">${dayName}</h2>
    <div class="card-icon">
      <img src="${iconSrc}" alt="">
    </div>
    <div class="day-temp">
      <h2 class="temp">${dayTemp}</h2>
      <span class="temp-unit">${tempUnit}</span>
    </div>`;
    weatherCards.appendChild(card);
    day++;
   }
}

function measureUvIndex(uvIndex){
    if(uvIndex <= 2){
        uvText.innerText = "Low";
    }else if(uvIndex <= 5){
        uvText.innerText = "Moderate";
    }else{
        uvText.innerText = "Very High";
    }
}
function updateHumidityStatus(humidity){
    if(humidity <= 30){
        humidityText.innerText = "Low";
    }else if(humidity <= 60){
        humidityText.innerText = "Moderate";
    }else if(humidity < 80){
        humidityText.innerText = "High";
    }else{
        humidityText.innerText = "High";
    }
}
function getIcon(condition){
    if(condition === "partly-cloudy-day"){
       return "./Reimg/partlyCloudy.png";
    }else if(condition === "partly-cloudy-night"){
        return "./Reimg/partlyCloudyNight.png";
    }else if(condition === "clear-day"){
        return "./Reimg/clearDay.png";
    }else if(condition === "clear-night"){
        return "./Reimg/clearNight.png";
    }else if(condition === "Overcast"){
        return "./Reimg/overcast.png";
    }else if(condition === "rain"){
        return "./Reimg/rain.png";
    }else{
        return "./Reimg/normalWeather.png";
    }
}

function getDayName(date){
   let day = new Date(date);
   let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
   ];
   return days[day.getDay()];
}