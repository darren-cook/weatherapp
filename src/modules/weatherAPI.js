const apiKey = "f2e559c52b6d79a001f90f630edcc2b9"

async function getLocationObject(locationInput){
    let country = ""
    if(/^\d{5}$/.test(locationInput)){ // Checks if input is a 5 digit zip code. If yes, appends "us" country code to fetch to prevent international cities.
        country = ",us"                // For example, "90210" searches "90210,us" and returns "Beverly Hills". By default, "90210" returns "Calpulalpan, Mexico".
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput}${country}&appid=${apiKey}`, {mode: "cors"})
    const locationData = await response.json();
    const locationLat = locationData.coord.lat;
    const locationLon = locationData.coord.lon;
    const locationName = locationData.name;
    const locationCoordinates = [locationLat, locationLon];
    const locationObject = {
        city: locationName,
        coordinates: locationCoordinates
    }
    return(locationObject);
}

async function getWeatherData(locationCoordinates){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherUrl, {mode: "cors"});
    const weatherData = await response.json();
    return(weatherData);
}

async function getForecastData(locationCoordinates){
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&appid=${apiKey}&units=imperial`;
    const response = await fetch(forecastUrl, {mode: "cors"});
    const forecastData = await response.json();
    return(forecastData);
}

export { getLocationObject, getWeatherData, getForecastData }