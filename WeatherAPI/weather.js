class Weather{
    constructor(zip,country){
        this.apiKey='d2dadf5d95576303f49921d74ecc5549';
        this.zip = zip;
        this.country = country;
    }


    //Fetch weather from api
    async getWeather(){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zip},${this.country}&APPID=${this.apiKey}`);

        const responseData = await response.json();
        //return responseData.weather;
        return responseData;

    }
    //change location
    changeLocation(zip,country){
        this.zip = zip;
        this.country=country;
    }
}