const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const APIKey = 'Seu código de API';
    const city = document.querySelector('.search-box input').value;

    if (city === '' )
        return;       
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .descripition');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        console.log(json.weather[0].description);

        switch (json.weather[0].main){
           
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Thunderstorm':
                image.src = 'images/thunderstorm.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            default:
                image.src = '';

        }

        var descricao = "";
        switch (json.weather[0].icon) {
            case '01d':
            case '01n':
                descricao = 'Céu Limpo'
                break;
    
            case '02d':
            case '02n':
                descricao = 'Algumas Nuvens';
                break
    
            case '03d':
            case '03n':
                descricao = 'Nuvens Dispersas';
                break;

            case '04d':
            case '04n':
                descricao = 'Sol entre Nuvens';
                break;
    
            case '09d':
            case '09n':
                descricao = 'Chuva Leve';
                break;
    
            case '10d':
            case '10n':
                descricao = 'Chuva Moderada';
                break;
    
            case '11d':
            case '11n':
                descricao = 'Chuva Intensa';
                break;
    
            case '13d':
            case '13n':
                descricao = 'Neve';
                break;
    
            case '50d':
            case '50n':
                descricao = 'Nevoeiro';
                break;
    
            default:
                descricao = 'Condição Desconhecida';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = descricao;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

})