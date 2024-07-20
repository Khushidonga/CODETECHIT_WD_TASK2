const apiKey = '62f39f9f722a243ca25e5da3ec475a92'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('city-name').innerText = data.name;
        document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
        document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
        getForecast(city);
    } else {
        document.getElementById('city-name').innerText = 'City not found';
        document.getElementById('temperature').innerText = '';
        document.getElementById('description').innerText = '';
        document.getElementById('forecast').innerText = '';
    }
}

async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = '<h3>5-day Forecast</h3>';
        data.list.slice(0, 5).forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.innerText = `${forecast.dt_txt}: ${forecast.main.temp} °C, ${forecast.weather[0].description}`;
            forecastElement.appendChild(forecastItem);
        });
    }
}
