const apiKey = 'cf1ecfb028a815c561d651bfde157613';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');

const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

async function getWeather(city) {
    locationDisplay.textContent = '';
    temperatureDisplay.textContent = '';
    descriptionDisplay.textContent = '';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found or API error');
        }

        const data = await response.json();
        displayWeather(data);
        saveToLocalStorage(city);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `${data.main.temp.toFixed(1)} °C`;
    descriptionDisplay.textContent = data.weather[0].description;
}

function saveToLocalStorage(city) {
    localStorage.setItem('lastCity', city);
}

window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        locationInput.value = lastCity;
        getWeather(lastCity);
    }
});
