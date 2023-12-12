function setLastCity(lastCity) {
	localStorage.setItem('lastCity', lastCity);
}

function getLastCity() {
	return localStorage.getItem('lastCity');
}
function setterStorage(locations) {
    localStorage.setItem('favouriteCity',JSON.stringify(locations))
}
function getLocationFromStorage() {
    return JSON.parse(localStorage.getItem('favouriteCity')) || [];
}

export{setLastCity,getLastCity,setterStorage,getLocationFromStorage}