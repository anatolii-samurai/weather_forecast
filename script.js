
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
        addCityWearther(list)  
        heart.addEventListener('click',(e)=>{
            e.preventDefault(); 
            saveLocal(list) 
            addFavourite(list)
            searchName.value = '';          
    }) 
    } catch (error) {
        console.log(error);
    } 
}

function addFavourite(list){
            const item = document.createElement('li');
            item.className = 'list-item'
            item.textContent = `${list.name}`;
            listItem.insertBefore(item,listItem.firstChild);
            const closeList = document.createElement('img');
            closeList.src='./img/icon-close.png';
            closeList.classList.add('close-list');
            item.append(closeList);
            closeList.addEventListener('click',(e)=>{
                e.preventDefault()
                    item.closest('li').remove()
            })  
            
}

    function saveLocal(city){
        let data = localStorage.getItem('favouriteCity');
        let favouriteCity = [];
        if(data !== '' && data !== null){
            favouriteCity = JSON.parse(data)
        }
        favouriteCity.push(city);
        localStorage.setItem('favouriteCity',JSON.stringify(favouriteCity))
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
        
        
}
// for(const item of favouriteCity ){
//     addCityWearther(item)
// }
addCity.addEventListener('submit',(e)=>{
    e.preventDefault();
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    let cityName = searchName.value;
    const apiKey = '778ffae0d51392358c4468ba67db913f'; 
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
     f(url)
     searchName.value = ''; 
     
})

        const tabs = document.querySelectorAll('.tabheader_item'),
        tabsContent = document.querySelectorAll('.wrapper-weather'),
        tabsParent = document.querySelector('.weather-items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.visibility = 'hidden';
        });
        tabsContent.forEach(item =>{
            item.classList.remove = 'tabheader_item_active';
        });
        }
    function showTabContent(i = 0) {
        tabsContent[i].style.visibility = 'visible';
        tabs[i].classList.add = 'tabheader_item_active';
    }
        hideTabContent();
        showTabContent();
        tabsParent.addEventListener('click',function(event){
            const target = event.target;
            if(target && target.classList.contains('tabheader_item')){
                tabs.forEach((item,i) =>{
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
