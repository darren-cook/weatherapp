import { format } from "date-fns";
import { getWeatherData, getForecastData} from "./weatherAPI";
import { displayNow, displayHoury, displayDaily, toggleSkeleton } from "./weatherDisplay";

async function getAndDisplayWeather(locationObject){
    const coordinates = locationObject.coordinates;
    const weatherData = await getWeatherData(coordinates);
    const forecastData = await getForecastData(coordinates);

    const nowObject = nowFactory(weatherData);
    const hourlyObjectList = handleHourlyData(forecastData);
    const dailyObjectList = handleDailyData(forecastData);
    displayNow(nowObject);
    displayHoury(hourlyObjectList);
    displayDaily(dailyObjectList);
    toggleSkeleton();
}

function handleHourlyData(forecastData){
    const forecastDataList = forecastData.list;
    const hourlyObjectList = [];
    for(let i=0; i<6; i++){
        hourlyObjectList.push(hourlyFactory(forecastDataList[i]));
    }
    return hourlyObjectList;
}

function handleDailyData(forecastData){
    const forecastDataList = forecastData.list;
    const dailyObjectList = [];
    const today = format(Date.now(), "dd")
    const firstDayIndex = forecastDataList.findIndex(hourlyObject => format(new Date(hourlyObject.dt*1000),"dd")!==today);
    const day1 = forecastDataList.slice(firstDayIndex, firstDayIndex+8);
    const day2 = forecastDataList.slice(firstDayIndex+8, firstDayIndex+16);
    const day3 = forecastDataList.slice(firstDayIndex+16, firstDayIndex+24);
    const day4 = forecastDataList.slice(firstDayIndex+24, firstDayIndex+32);
    const days = [day1, day2, day3, day4];
    for(let i=0; i<days.length; i++){
        const day = days[i];
        const rawTime = day[i+1].dt;
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
    return dailyObjectList;
}

const nowFactory = (weatherObject) => {
    const city = weatherObject.name;
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}??`;
    const description = weatherObject.weather[0].main;
    const humidity = `Humidity: ${weatherObject.main.humidity}%`;
    const wind = `Wind: ${weatherObject.wind.speed}mph`;

    return {city, img, temp, description, humidity, wind}
}

const hourlyFactory = (weatherObject) => {
    // const time = format(new Date(weatherObject.dt_txt),"haaa");
    const time = format(new Date(weatherObject.dt*1000),"haaa");
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}??`;
    const description = weatherObject.weather[0].main;
    const rain = `Rain: ${Math.round(weatherObject.pop*100)}%`;

    return {time, img, temp, description, rain}
}

const dailyFactory = (rawTime, icon, weatherDescription, maxTemp, minTemp, maxRain) => {
    // const time = format(new Date(rawTime),"EEEE");
    const time = format(new Date(rawTime*1000),"EEEE");
    const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const description = weatherDescription;
    const highTemp = `H:${Math.round(maxTemp)}??`;
    const lowTemp = `L:${Math.round(minTemp)}??`;
    const rain = `Rain: ${Math.round(maxRain*100)}%`;

    return {time, img, description, highTemp, lowTemp, rain}
}



export { getAndDisplayWeather }