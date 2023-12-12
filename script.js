import { getLastCity,setLastCity,getLocationFromStorage,setterStorage } from "./local-storage.js";

const addCity = document.querySelector('.searching');
const searchName = document.querySelector('.search');
const city = document.querySelector('.city-name');
const cityDetails = document.querySelector('.city-name_details');
const gradeCel=document.querySelector('.grade');
const forecastTemp = document.querySelector('.forecast-temp');
const forecastTempFeel = document.querySelector('.forecast-temp_feel');
const forecastCloud = document.querySelector('.forecast-cloud');
const forecastSunrise = document.querySelector('.forecast-sunrise');
const forecastSunset = document.querySelector('.forecast-sunset');
const cloud = document.querySelector('.cloud');
const heart = document.querySelector('.img-heart');
const listItem = document.querySelector('.list-items')



window.addEventListener('load', function (e) {
	const lastCity = getLastCity();
	if (lastCity) {
		searchName.value = lastCity;
		addCityInput()
	}
});
const listLocation = getLocationFromStorage();
    
    heart.addEventListener('click',(e)=>{
        e.preventDefault(); 
        addFavouriteCity()
    }) 


async function f(url) { 
    try { 
        let response = await fetch(url);
        let json = await response.json();
        const sunriseTime = new Date(json.sys.sunrise * 1000);
        const formattedSunriseTime = sunriseTime.toLocaleTimeString();
        const sunsetTime = new Date(json.sys.sunset * 1000);
        const formattedSunsetTime = sunsetTime.toLocaleTimeString();
        const finalSunriseTime = formattedSunriseTime.substring(0, 5);
        const finalSunsetTime = formattedSunsetTime.substring(0, 5);
        const list = {
            name:json.name,
            temp:Math.round(json.main.temp),
            temp_feel:Math.round(json.main.feels_like),
            sunrise:finalSunriseTime,
            sunset:finalSunsetTime,
            icon:json.weather[0].icon,
            cloud:json.clouds.all,
            id:Math.floor(Math.random() * 100),
        }
        addCityWearther(list) ;  
    } catch (error) {
        console.log(error);
    } 
}

   
    
    // const cityLocation = getLocationFromStorage(); 
    render(listLocation)
function render(listLocation)  {
    listItem.replaceChildren();
   for(let i=0;i<listLocation.length;i++){
    const item = document.createElement('li');           
    item.className = 'list-item';
    listItem.insertBefore(item,listItem.firstChild);
    const itemText = document.createElement('p')
    itemText.textContent =listLocation[i] ;
    
    item.append(itemText);
    const closeList = document.createElement('button');
    closeList.innerHTML = '&times';
    // closeList.src='./img/icon-close.png';
    closeList.classList.add('close-list');
    item.append(closeList);
    
    closeList.addEventListener('click',(e)=>{    
        item.closest('li').remove()
            const oneElement = 1;
            const locationName = e.target.previousElementSibling;
            const elementPosition = listLocation.indexOf(locationName.textContent);
            listLocation.splice(elementPosition, oneElement);
            setterStorage(listLocation)
            render(listLocation);
    })  
    itemText.addEventListener('click', ()=>{
        const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
        let cityName = itemText.textContent;
        const apiKey = '778ffae0d51392358c4468ba67db913f'; 
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric&lang={ru}`;
        f(url) 
    })
   } 
}  

function addFavouriteCity(){
    if (listLocation.includes(city.textContent)) return;
    listLocation.push(city.textContent);
    setterStorage(listLocation);
    render(listLocation);           
}


function addCityWearther(item){
        
        city.textContent = `${item.name}`;
        cityDetails.textContent = `${item.name}`;
        gradeCel.innerHTML = `${item.temp}<span>&deg;C</span>`;
        forecastTemp.innerHTML = `${item.temp}<span>&deg;C</span>`;
        forecastTempFeel.innerHTML = `${item.temp_feel}<span>&deg;C</span>`;
        
        forecastSunrise.textContent = `${item.sunrise}`;
        forecastSunset.textContent =  `${item.sunset}`;
        cloud.innerHTML = `<img src="img/${item.icon}.png" class = "img-cloud" alt="cloud">`
        forecastCloud.textContent = `${item.cloud}`;  
        console.log(2);
        
}

function addCityInput(cityName){
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
    cityName = searchName.value;
    const apiKey = '778ffae0d51392358c4468ba67db913f'; 
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
     f(url)
     searchName.value = ''; 
    setLastCity(cityName) 
     
}
addCity.addEventListener('submit',(e)=>{
    e.preventDefault();
    addCityInput()
   
    
})

        


