//import fetch from 'node-fetch' ** NOTE ** use if executing in node environment, no need in browser
// Global variables
const apiKey = "9faac331824276bce93600720a88aff1";
const unsplashKey = "jGhREgywG0IpL5j5V2zHDpVRB-6eqJRdZDsOWONRM0M";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric"; 
const FIND_WEATHER_BUTTON = document.getElementById("citySubmit");
const FIND_WEATHER_FORM = document.getElementById("cityName");

// Get random image based on city
const getImage = async(city) => {
    const unsplashURL = "https://api.unsplash.com/photos/random";
    const requestParams = `?client_id=${unsplashKey}&query=${city}&orientation=${"landscape"}`;
    const apiCall = `${unsplashURL}${requestParams}`;
    try{
        const response = await fetch(apiCall);
        if(response.ok){
            const unsplashResponse = await response.json();
            console.log(unsplashResponse);
            const unsplashImageURL = unsplashResponse.links.download; 
            console.log(unsplashImageURL);
            return unsplashImageURL;
        }
        throw new Error("something went wrong with unsplash API request");
    } catch (error){
        console.log(error);
    }
}

// Get weather from city
const getWeatherCity = async() => {
    const city = document.getElementById("cityName").value;
    const requestParams = `?q=${city}&appid=${apiKey}&units=${units}`;
    const apiCall = `${baseUrl}${requestParams}`;
    try {
        const response = await fetch(apiCall);
        console.log(response);
        if(response.ok){
            const cityWeatherJSON = await response.json();
            return cityWeatherJSON;
        }
        if(response.status === 404){
            alert("Enter valid City");
        };
        throw new Error("something went wrong");
    } catch (error){
        console.log(error);
    }
}

// Get weather for popular cities
const getWeatherPopular = async(latitude, longitude) => {
    const requestParams = `?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    const apiCall = `${baseUrl}${requestParams}`;
    try {
        const response = await fetch(apiCall);
        if(response.ok){
            const responseJSON = await response.json();
            return responseJSON;
        }
    } catch (error){
        console.log(`Error message: ${error}`);
    }
}

// Display API response on webpage
const displayWeatherCity = async() => {
    const weatherData = await getWeatherCity();
    const weatherInfoDiv = document.getElementById("weatherInfo");

    // Choose data pulled from API request
    const location = weatherData.name;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const temperatureHigh = weatherData.main.temp_max;
    const temperatureLow = weatherData.main.temp_min;
    const humidity = weatherData.main.humidity;

    // Assign HTML element for the API data
    const locationElement = document.createElement("h2");
    const descriptionElement = document.createElement("h3");
    const temperatureElement = document.createElement("h3");
    const temperatureHighElement = document.createElement("h3");
    const temperatureLowElement = document.createElement("h3");
    const humidityElement = document.createElement("h3");

    // Replace location once a new one is selected
    while (weatherInfoDiv.firstChild) {
        weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
    }

    // Specify the text to appear in HTML elements 
    locationElement.innerHTML = location;
    descriptionElement.innerHTML = `Description: ${description}`;
    temperatureElement.innerHTML = `Temperature: ${temperature}`;
    temperatureHighElement.innerHTML = `Temperature highs: ${temperatureHigh}`;
    temperatureLowElement.innerHTML = `Temperature lows: ${temperatureLow}`;
    humidityElement.innerHTML = `Humidity: ${humidity}`;
    
    // Append HTML elements to Div for display
    weatherInfoDiv.appendChild(locationElement);
    weatherInfoDiv.appendChild(descriptionElement);
    weatherInfoDiv.appendChild(temperatureElement);
    weatherInfoDiv.appendChild(temperatureHighElement);
    weatherInfoDiv.appendChild(temperatureLowElement);
    weatherInfoDiv.appendChild(humidityElement);
    
    // Set background image
    const unsplashImageDiv = document.getElementById("unsplashImage");
    const unsplashImageURL = await getImage(location);
    console.log(`image url is: ${unsplashImageURL}`);
    unsplashImageDiv.style.backgroundImage = `url(${unsplashImageURL})`;
}

// Display API response on webpage for Popular Locations *** THIS IS EXACTLY THE SAME AS displayWeather()... CAN I MERGE?? ***
    const displayWeatherPopular = async(latitude, longitude) => {
    const weatherData = await getWeatherPopular(latitude, longitude);
    const weatherInfoDiv = document.getElementById("weatherInfo");

    // Choose data pulled from API request
    const location = weatherData.name;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const temperatureHigh = weatherData.main.temp_max;
    const temperatureLow = weatherData.main.temp_min;
    const humidity = weatherData.main.humidity;

    // Assign HTML element for the API data
    const locationElement = document.createElement("h2");
    const descriptionElement = document.createElement("h3");
    const temperatureElement = document.createElement("h3");
    const temperatureHighElement = document.createElement("h3");
    const temperatureLowElement = document.createElement("h3");
    const humidityElement = document.createElement("h3");

    // Replace location once a new one is selected
    while (weatherInfoDiv.firstChild) {
        weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
    }

    // Specify the text to appear in HTML elements 
    locationElement.innerHTML = location;
    descriptionElement.innerHTML = `Description: ${description}`;
    temperatureElement.innerHTML = `Temperature: ${temperature}`;
    temperatureHighElement.innerHTML = `Temperature highs: ${temperatureHigh}`;
    temperatureLowElement.innerHTML = `Temperature lows: ${temperatureLow}`;
    humidityElement.innerHTML = `Humidity: ${humidity}`;
    
    // Append HTML elements to Div for display
    weatherInfoDiv.appendChild(locationElement);
    weatherInfoDiv.appendChild(descriptionElement);
    weatherInfoDiv.appendChild(temperatureElement);
    weatherInfoDiv.appendChild(temperatureHighElement);
    weatherInfoDiv.appendChild(temperatureLowElement);
    weatherInfoDiv.appendChild(humidityElement);

    // Set background image
    const unsplashImageDiv = document.getElementById("unsplashImage");
    const unsplashImageURL = await getImage(location);
    console.log(`image url is: ${unsplashImageURL}`);
    unsplashImageDiv.style.backgroundImage = `url(${unsplashImageURL})`;
}

// Form validation with reg exp
const onlyLettersAndSpaces = (string) => {
    return /^[A-Za-z\s]*$/.test(string);
}

// Event Handler
const findWeatherHandler = () => {
    const USER_CITY = document.getElementById("cityName").value;
    if(onlyLettersAndSpaces(USER_CITY) === true){
        displayWeatherCity();
    }
    else{
        alert("Enter valid city");
    }
}

// Event listener for city submissions
FIND_WEATHER_BUTTON.addEventListener("click", findWeatherHandler);
FIND_WEATHER_FORM.addEventListener("keydown", (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        findWeatherHandler();
    }
});

// FIND_WEATHER_BUTTON.addEventListener("click", function() {
//     const USER_CITY = document.getElementById("cityName").value;
//     if(onlyLettersAndSpaces(USER_CITY) === true){
//         displayWeatherCity();
//     }
//     else{
//         alert("Enter valid city");
//     }
// });

// Event Listener for popular locations
const popularLocationClass = document.querySelectorAll(".popularLocations");
popularLocationClass.forEach(function(element) {
    element.addEventListener('click', function(event) {
        let latitude, longitude, city;
        if(event.target.id === "getLondonData"){
            latitude = 51.5072;
            longitude = -0.1276;
            city = "London";
        }
        else if(event.target.id === "getNewYorkData"){
            latitude = 40.7;
            longitude = -74;
            city = "New York";
        }
        else if(event.target.id === "getParisData"){
            latitude = 48.85;
            longitude = 2.35;
            city = "Paris";
        }
        else if(event.target.id === "getGdanskData"){
            latitude = 54.35;
            longitude = 18.65;
            city = "Gdansk";
        }
        displayWeatherPopular(latitude, longitude);
    })  
    });
    
// Clear event listener
document.getElementById("clear").addEventListener("click", () => {
    const weatherInfoDiv = document.getElementById("weatherInfo");
    const unsplashImageDiv = document.getElementById("unsplashImage");
    unsplashImageDiv.style.backgroundImage = "none";
    // Clear all data and reset forms
    while (weatherInfoDiv.firstChild){
        weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
    }
    // document.getElementById("latitude").value = "";
    // document.getElementById("longitude").value ="";
    document.getElementById("cityName").value ="";
});

// COORDINATES FUNCTIONALITY BELOW

// Event listener for coordinate submissions
// document.getElementById("submit").addEventListener("click", function() {
//     displayWeather();
// });

// Retrieve user inputted coordinates
// const getCoordinates = () => {
//     const latitude = document.getElementById("latitude").value;
//     const longitude = document.getElementById("longitude").value;
//     const coordinates = [latitude, longitude];
//     return coordinates;
// };

// Get weather from coordinates
// const getWeather = async() => {
//     const arrayOfCoordinates = getCoordinates();
//     let latitude = arrayOfCoordinates[0];
//     let longitude = arrayOfCoordinates[1];
//     const requestParams = `?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
//     const apiCall = `${baseUrl}${requestParams}`;
//     try {
//         const response = await fetch(apiCall);
//         if(response.ok){
//             const responseJSON = await response.json();
//             return responseJSON;
//         }
//     } catch (error){
//         console.log(`Error message: ${error}`);
//     }
// }

// const displayWeather = async() => {
//     const weatherData = await getWeather();
//     const weatherInfoDiv = document.getElementById("weatherInfo");
    
//     // Choose data pulled from API request
//     const location = weatherData.name;
//     const description = weatherData.weather[0].description;
//     const temperature = weatherData.main.temp;
//     const temperatureHigh = weatherData.main.temp_max;
//     const temperatureLow = weatherData.main.temp_min;
//     const humidity = weatherData.main.humidity;

//     // Assign HTML element for the API data
//     const locationElement = document.createElement("h2");
//     const descriptionElement = document.createElement("h3");
//     const temperatureElement = document.createElement("h3");
//     const temperatureHighElement = document.createElement("h3");
//     const temperatureLowElement = document.createElement("h3");
//     const humidityElement = document.createElement("h3");

//     // Replace location once a new one is selected
//     while (weatherInfoDiv.firstChild) {
//         weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
//     }

//     // Specify the text to appear in HTML elements 
//     locationElement.innerHTML = location;
//     descriptionElement.innerHTML = `Description: ${description}`;
//     temperatureElement.innerHTML = `Temperature: ${temperature}`;
//     temperatureHighElement.innerHTML = `Temperature highs: ${temperatureHigh}`;
//     temperatureLowElement.innerHTML = `Temperature lows: ${temperatureLow}`;
//     humidityElement.innerHTML = `Humidity: ${humidity}`;
    
//     // Append HTML elements to Div for display
//     weatherInfoDiv.appendChild(locationElement);
//     weatherInfoDiv.appendChild(descriptionElement);
//     weatherInfoDiv.appendChild(temperatureElement);
//     weatherInfoDiv.appendChild(temperatureHighElement);
//     weatherInfoDiv.appendChild(temperatureLowElement);
//     weatherInfoDiv.appendChild(humidityElement);
// }