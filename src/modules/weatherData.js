import { format } from "date-fns";
import { getLatLon, getWeatherData, getForecastData} from "./weatherAPI";

async function getAndDisplayWeather(locationObject){
    const city = locationObject.city;
    const coordinates = locationObject.coordinates;
    const weatherData = await getWeatherData(coordinates);
    const forecastData = await getForecastData(coordinates);

    const nowObject = nowFactory(weatherData);
    const hourlyObjectList = handleHourlyData(forecastData);
    const dailyObjectList = handleDailyData(forecastData);

    console.log(nowObject);
    console.log(hourlyObjectList);
    console.log(dailyObjectList);
    console.log(weatherData);
    console.log(forecastData);
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
    const today = format(new Date(), "dd");
    const firstDayIndex = forecastDataList.findIndex(hourlyObject => hourlyObject.dt_txt.slice(8,10)!==today);
    const day1 = forecastDataList.slice(firstDayIndex, firstDayIndex+9);
    const day2 = forecastDataList.slice(firstDayIndex+8, firstDayIndex+17);
    const day3 = forecastDataList.slice(firstDayIndex+16, firstDayIndex+25);
    const day4 = forecastDataList.slice(firstDayIndex+24, firstDayIndex+33);
    const days = [day1, day2, day3, day4];

    for(let i=0; i<days.length; i++){
        const day = days[i];
        const rawTime = day[i+1].dt_txt;
        const icon = day[4].weather[0].icon;
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
        dailyObjectList.push(dailyFactory(rawTime, icon, maxTemp, minTemp, maxRain));
    }

    return dailyObjectList;
}

const nowFactory = (weatherObject) => {
    const city = weatherObject.name;
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}°`;
    const description = weatherObject.weather[0].description;
    const humidity = `Humidity: ${weatherObject.main.humidity}%`;
    const wind = `Wind: ${weatherObject.wind.speed}mph`;

    return {city, img, temp, description, humidity, wind}
}

const hourlyFactory = (weatherObject) => {
    const time = format(new Date(weatherObject.dt_txt),"haaa");
    const img = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
    const temp = `${Math.round(weatherObject.main.temp)}°`;
    const rain = `Rain: ${weatherObject.pop*100}%`

    return {time, img, temp, rain}
}

const dailyFactory = (rawTime, icon, maxTemp, minTemp, maxRain) => {
    const time = format(new Date(rawTime),"EEEE");
    const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const highTemp = `H:${Math.round(maxTemp)}°`;
    const lowTemp = `L:${Math.round(minTemp)}°`;
    const rain = `Rain: ${maxRain*100}%`;

    return {time, img, highTemp, lowTemp, rain}
}



export { getAndDisplayWeather }