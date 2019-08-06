class Storage{

    constructor(){
        this.zip;
        this.country;
        this.defaultZip = '91401';
        this.defaultCountry='us';

    }
    //get the location data
    getLocationData(){
        //check if Local storage is empty first
        if(localStorage.getItem('zip') === ''){
            //console.log('Triggered');
            this.zip = this.defaultZip;
            //console.log(this.zip);
            
        }else{
            this.zip=localStorage.getItem('zip');
          

        }

        // do same for country
        if(localStorage.getItem('country') === ''){
            //console.log('Triggered2');
            this.country=this.defaultCountry;
            //console.log(this.country);
        }else{
            
            this.country=localStorage.getItem('country');

        }

        return{
            zip:this.zip,
            country:this.country
        }

    }


    //set the location data
    setLocationData(zip,country){
        localStorage.setItem('zip',zip);
        localStorage.setItem('country',country);

    }
}