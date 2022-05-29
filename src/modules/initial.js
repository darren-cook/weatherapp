import { getAndDisplayWeather } from "./weatherData";

function initial(){
    const locationObject = checkLocalStorage();
    getAndDisplayWeather(locationObject)
}

function checkLocalStorage(){
    let localStorageLocation = JSON.parse(localStorage.getItem("locationInfo"));

    if(localStorageLocation !== null){
        return localStorageLocation;
    } else {
        const locationObject = {
            city:"Los Angeles",
            coordinates:["34.0522", "-118.2436"] 
        };
        localStorage.setItem("locationInfo", JSON.stringify(locationObject));
        return locationObject;
    }
}

export { initial }