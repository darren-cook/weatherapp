import { format } from "date-fns";
import { getWeatherData, getForecastData} from "./weatherAPI";
import { displayNow, displayHoury, displayDaily, toggleSkeleton } from "./weatherDisplay";

async function getAndDisplayWeather(locationObject){
    const coordinates = locationObject.coordinates;
    const weatherData = await getWeatherData(coordinates);
    const forecastData = await getForecastData(coordinates);

    document.getElementById("log").textContent += "Before nowFactory - ";
    const nowObject = nowFactory(weatherData);
    document.getElementById("log").textContent += "before handleHourly -";
    const hourlyObjectList = handleHourlyData(forecastData);
    document.getElementById("log").textContent += "before handleDaily -";
    const dailyObjectList = handleDailyData(forecastData);
    document.getElementById("log").textContent += "before display -";
    displayNow(nowObject);
    displayHoury(hourlyObjectList);
    displayDaily(dailyObjectList);
    toggleSkeleton();
    document.getElementById("log").textContent += "after display -";
}

function handleHourlyData(forecastData){
    document.getElementById("log").textContent += "start of hourly data -";
    const forecastDataList = forecastData.list;
    const hourlyObjectList = [];
    document.getElementById("log").textContent += "before for loop -";
    for(let i=0; i<6; i++){
        hourlyObjectList.push(hourlyFactory(forecastDataList[i]));
    }
    document.getElementById("log").textContent += "end hourly data -";
    return hourlyObjectList;
}

function handleDailyData(forecastData){
    document.getElementById("log").textContent += "start daily hourly -";
    const forecastDataList = forecastData.list;
    const dailyObjectList = [];
    const today = format(new Date(), "dd");
    const firstDayIndex = forecastDataList.findIndex(hourlyObject => hourlyObject.dt_txt.slice(8,10)!==today);
    const day1 = forecastDataList.slice(firstDayIndex, firstDayIndex+9);
    const day2 = forecastDataList.slice(firstDayIndex+8, firstDayIndex+17);
    const day3 = forecastDataList.slice(firstDayIndex+16, firstDayIndex+25);
    const day4 = forecastDataList.slice(firstDayIndex+24, firstDayIndex+33);
    const days = [day1, day2, day3, day4];
    document.getElementById("log").textContent += "before daily loop -";
    for(let i=0; i<days.length; i++){
        const day = days[i];
        const rawTime = day[i+1].dt_txt;
        const icon = day[4].weather[0].icon;
        const weatherDescription = day[4].weather[0].main;
        let maxTemp = -9999;
        let minTemp = 9999;
        let maxRain = 0;
        for(let j=0; j<day.length; j++){
            let temp = day[j].main.temp;
            let rain = day[j].pop;
            if(temp > maxTemp){
                maxTemp = temp;
            }
            if(temp < minTemp){
                minTemp = temp;
            }
            if(rain > maxRain){
                maxRain = rain;
            }
        }
        dailyObjectList.push(dailyFactory(rawTime, icon, weatherDescription, maxTemp, minTemp, maxRain));
    }
    document.getElementById("log").textContent += "end daily data -";
    return dailyObjectList;
}

const nowFactory = (weatherObject) => {
    const city = weatherObject.name;
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}°`;
    const description = weatherObject.weather[0].main;
    const humidity = `Humidity: ${weatherObject.main.humidity}%`;
    const wind = `Wind: ${weatherObject.wind.speed}mph`;

    return {city, img, temp, description, humidity, wind}
}

const hourlyFactory = (weatherObject) => {
    console.log(weatherObject.dt);
    console.log(weatherObject.dt_txt)
    console.log(format(new Date(weatherObject.dt*1000), "dd/MMM/yyyy/hh:mm:ss"))
    document.getElementById("log").textContent += "start hourly factory -";
    // const time = format(new Date(weatherObject.dt_txt),"haaa");
    const time = format(new Date(weatherObject.dt*1000),"haaa");
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}°`;
    const description = weatherObject.weather[0].main;
    const rain = `Rain: ${weatherObject.pop*100}%`;
    document.getElementById("log").textContent += "end hourly factory -";

    return {time, img, temp, description, rain}
}

const dailyFactory = (rawTime, icon, weatherDescription, maxTemp, minTemp, maxRain) => {
    // const time = format(new Date(rawTime),"EEEE");
    const time = "Monday";
    const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const description = weatherDescription;
    const highTemp = `H:${Math.round(maxTemp)}°`;
    const lowTemp = `L:${Math.round(minTemp)}°`;
    const rain = `Rain: ${maxRain*100}%`;

    return {time, img, description, highTemp, lowTemp, rain}
}



export { getAndDisplayWeather }