import { initial } from "./modules/initial";
import { handleSearch } from "./modules/weatherSearch";
import { getAndDisplayWeather } from "./modules/weatherData";

const locationObject = {
    city:"Los Angeles",
    coordinates:["34.0522", "-118.2436"] 
};

getAndDisplayWeather(locationObject);

// initial();

const inputSearch = document.getElementById("input-search");

inputSearch.addEventListener("click", function(){
    handleSearch();
});