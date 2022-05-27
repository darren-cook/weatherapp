const apiKey = "f2e559c52b6d79a001f90f630edcc2b9"

// http://openweathermap.org/img/wn/10d@2x.png

async function getLatLon(locationInput){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`)
    const locationData = await response.json();
    const locationLat = locationData.coord.lat;
    const locationLon = locationData.coord.lon;
    const locationCoordinates = [locationLat, locationLon]
    return(locationCoordinates);
}

async function getWeatherData(locationCoordinates){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return(weatherData);
}

async function getWeatherForecast(locationCoordinates){
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&appid=${apiKey}&units=imperial`;
    const response = await fetch(forecastUrl);
    const forecastData = await response.json();
    return(forecastData);
}

async function test(){
    let coords = await getLatLon("Waterbury");
    let weather = await getWeatherData(coords);
    let forecast = await getWeatherForecast(coords);
    // console.log(output2.main.temp)
    // console.log(output2.weather[0].main)
    console.log(weather)
    console.log(forecast)
}


export { test }