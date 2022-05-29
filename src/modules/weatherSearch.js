import { getLocationObject } from "./weatherAPI";
import { toggleSkeleton } from "./weatherDisplay";
import { getAndDisplayWeather } from "./weatherData";

async function handleSearch(){
    const input = document.getElementById("input");
    const loader = document.getElementById("loader");
    const inputSearch = document.getElementById("input-search");

    if(input.value===""){
        input.setCustomValidity("Please enter a location.");
        input.reportValidity();
    } else {
        toggleHidden(loader, inputSearch);
        try {
            const locationObject = await getLocationObject(input.value);
            toggleHidden(loader, inputSearch);
            toggleSkeleton();
            getAndDisplayWeather(locationObject);
            localStorage.setItem("locationInfo", JSON.stringify(locationObject));
        } catch (error) {
            input.setCustomValidity("Invalid Location");
            input.reportValidity();
            toggleHidden(loader, inputSearch);
        }
    }

}

function toggleHidden(element1, element2){
    element1.classList.toggle("hidden");
    element2.classList.toggle("hidden");
}

export { handleSearch }