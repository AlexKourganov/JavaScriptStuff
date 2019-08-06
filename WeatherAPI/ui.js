class UI{
    constructor(){
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.pressure = document.getElementById('w-pressure');
        this.wind = document.getElementById('w-wind');
    }



    paint(weather){

        this.location.textContent = weather.name;
        //console.log(weather.weather[0].description);
        this.desc.textContent=(weather.weather[0].description).toUpperCase();
        this.string.textContent = `${UI.convertToC(weather.main.temp)} C / ${UI.convertToF(weather.main.temp)} F`;
        this.icon.setAttribute('src',`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
        this.feelsLike.textContent = `Max Temp:${UI.convertToF(weather.main.temp_max)}F (${UI.convertToC(weather.main.temp_max)} C) / Min Temp:${UI.convertToF(weather.main.temp_min)}F (${UI.convertToC(weather.main.temp_min)} C)`;
        this.pressure.textContent = `Pressure(inches of mercury): ${UI.convertPressure(weather.main.pressure)}`;
        this.wind.textContent = `Wind Speed(m/s):${weather.wind.speed} / Wind Direction: ${weather.wind.deg} degrees`;




    }

    static convertToF(temp){

            return (((temp-273.15)*(9/5))+32).toFixed(2);

    }
    static convertToC(temp){

        return ((temp-273.15).toFixed(2));

    }
    static convertPressure(p){
        return((p*0.030).toFixed(2));
    }

}