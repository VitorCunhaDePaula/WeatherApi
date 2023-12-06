const apiKey ="25af260b1956e013905cb5c002969df8";
const input = document.querySelector("input");
const button = document.querySelector("button");
const mainDiv = document.querySelector(".weather-data");
const cityUser = document.querySelector(".city");
const flag = document.querySelector(".flag");
const temp = document.querySelector(".temperature span");
const description = document.querySelector(".description");
const weatherIcon = document.querySelector(".weather-icon");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const notFound = document.querySelector(".notFound");
  
async function getApi(city){
let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
let apiFetch = await fetch(api);
let data = await apiFetch.json();
if(data.cod === "404"){
notFound.style.display = "block";
mainDiv.style.display = "none";
}

else {
cityUser.innerHTML = data.name;
flag.src = ("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
temp.innerHTML = parseInt(data.main.temp);
weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
wind.innerHTML = `${parseInt(data.wind.speed)} KM/H`
humidity.innerHTML = `${parseInt(data.main.humidity)}%`
notFound.style.display = "none";
mainDiv.style.display = "block";

}

   }

   button.addEventListener("click", function(e){
    e.preventDefault();
    getApi(input.value);
    
   })

