//Init storage
const storage = new Storage();
//Get Stored local Data
const weatherLocation = storage.getLocationData();

// Init Weather class
const weather = new Weather(weatherLocation.zip,weatherLocation.country);
//init us
const ui = new UI();

//Get Weather on DOM load
document.addEventListener('DOMContentLoaded',getWeather);

//Change location Event
document.getElementById('w-change-btn').addEventListener('click',(e)=>{
    let zip = document.getElementById('zip').value;
    let country = document.getElementById('country').value;
        if(document.getElementById('zip').value ==='' && document.getElementById('country').value ==='' ){
            //If the fields are empty we want to revert back to default in this a van nuys zip code
            //note if we dont revert to default then app will kind of break and default is easiest solution
            //because if we dont fill out fields and submit then storage gets set to empty values and we call and api without giving it aa zip or city which will throw an error
            
            zip = '91401';
            country = 'us';

        }
    
    
    weather.changeLocation(zip,country);

    //Set location in local storage
    storage.setLocationData(zip,country);

    //call getweather again and repaint to display
    getWeather();
    //Close the modal with some Jquery
    $('#locModal').modal('hide');
    // clear the modal fields after we are done
    document.getElementById('zip').value ='';
    document.getElementById('country').value='';

});

//weather.changeLocation();
//get weather
function getWeather(){
    weather.getWeather()
    .then(results =>{
        console.log(results);
        ui.paint(results);
    })
    .catch(err => console.log('ERROR'));
}
