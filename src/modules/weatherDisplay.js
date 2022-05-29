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
    nowDescription.style.textTransform = "capitalize";
    nowHumidity.textContent = nowObject.nowHumidity;
    nowWind.textContent = nowObject.wind;
}

function displayHoury(hourlyObjectList){
    const times = Array.from(document.querySelectorAll(".hour-time"));
    const imgs = Array.from(document.querySelectorAll(".hour-img"));
    const temps = Array.from(document.querySelectorAll(".hour-temp"));
    const rains = Array.from(document.querySelectorAll(".hour-rain"));

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
    rains.forEach((element, index)=>{
        element.textContent = hourlyObjectList[index].rain;
    })
}

function displayDaily(dailyObjectList){
    const times = Array.from(document.querySelectorAll(".day-time"));
    const imgs = Array.from(document.querySelectorAll(".day-img"));
    const temps = Array.from(document.querySelectorAll(".day-temp"));
    const rains = Array.from(document.querySelectorAll(".day-rain"));

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
    rains.forEach((element, index)=>{
        element.textContent = dailyObjectList[index].rain;
    })
}

export { displayNow, displayHoury, displayDaily }