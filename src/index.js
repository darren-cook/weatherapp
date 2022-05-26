const apiKey = "f2e559c52b6d79a001f90f630edcc2b9"
// https://api.openweathermap.org/data/2.5/weather?q=06704&appid=f2e559c52b6d79a001f90f630edcc2b9
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

async function getLatLonURL(locationInput){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`, {mode: 'cors'})
    const locationData = await response.json();
    const locationLat = locationData.coord.lat;
    const locationLon = locationData.coord.lon;
    const latLonURL = `https://api.openweathermap.org/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&appid=${apiKey}&units=imperial`
    return(latLonURL);
}

async function getWeatherData(latLonURL){
    const response = await fetch(latLonURL, {mode: 'cors'})
    const weatherData = await response.json()
    return(weatherData);
}

async function test(){
    let output = await getLatLonURL("Waterbury");
    let output2 = await getWeatherData(output)
    console.log(output2.main.temp)
    console.log(output2.weather[0].main)
}

test();