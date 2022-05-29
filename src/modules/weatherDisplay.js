function displayNow(nowObject){
    const nowTitle = document.getElementById("now-title");
    const nowImg = document.getElementById("now-img");
    const nowTemp = document.getElementById("now-temp");
    const nowDescription = document.getElementById("now-description");
    const nowHumidity = document.getElementById("now-humidity");
    const nowWind = document.getElementById("now-wind");

    nowTitle.textContent = nowObject.city;
    nowImg.src = nowObject.img;
    nowImg.alt = `${nowObject.description} icon`;
    nowTemp.textContent = nowObject.temp;
    nowDescription.textContent = nowObject.description;
    nowHumidity.textContent = nowObject.nowHumidity;
    nowWind.textContent = nowObject.wind;
}

function displayHoury(hourlyObjectList){
    const times = document.querySelectorAll(".hour-time");
    const imgs = document.querySelectorAll(".hour-img");
    const temps = document.querySelectorAll(".hour-temp");
    const descriptions = document.querySelectorAll(".hour-description");
    const rains = document.querySelectorAll(".hour-rain");

    times.forEach((element, index) =>{
        element.textContent = hourlyObjectList[index].time;
    })
    imgs.forEach((element, index)=>{
        element.src = hourlyObjectList[index].img;
        element.alt = `${hourlyObjectList[index].description} icon`;
    })
    temps.forEach((element, index)=>{
        element.textContent = hourlyObjectList[index].temp;
    })
    descriptions.forEach((element, index)=>{
        element.textContent = hourlyObjectList[index].description;
    })
    rains.forEach((element, index)=>{
        element.textContent = hourlyObjectList[index].rain;
    })
}

function displayDaily(dailyObjectList){
    const times = document.querySelectorAll(".day-time");
    const imgs = document.querySelectorAll(".day-img");
    const temps = document.querySelectorAll(".day-temp");
    const descriptions = document.querySelectorAll(".day-description");
    const rains = document.querySelectorAll(".day-rain");

    times.forEach((element, index) =>{
        element.textContent = dailyObjectList[index].time;
    })
    imgs.forEach((element, index)=>{
        element.src = dailyObjectList[index].img;
        element.alt = `${dailyObjectList[index].description} icon`;
    })
    temps.forEach((element, index)=>{
        element.textContent = `${dailyObjectList[index].highTemp} ${dailyObjectList[index].lowTemp}`;
    })
    descriptions.forEach((element, index)=>{
        element.textContent = dailyObjectList[index].description;
    })
    rains.forEach((element, index)=>{
        element.textContent = dailyObjectList[index].rain;
    })
}

function toggleSkeleton(){
    const skeletonables = document.querySelectorAll(".skeletonable")

    skeletonables.forEach(element =>{
        element.classList.toggle("skeleton");
    })
}

export { displayNow, displayHoury, displayDaily, toggleSkeleton }