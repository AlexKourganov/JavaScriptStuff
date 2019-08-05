//Easy HTTP Lib v2

class EasyHTTP{
//make http get request    
    get(url){
        return new Promise((resolve,reject) => {
            //what we wanna do when we succeed
            //fetch itself returns a promise
            //if we suceed we call resolve and send all the data we got from url and pass it to the function that called us
            fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            //what we wanna dow hen we fail
            .catch(err  => reject(err));

        });

        // fetch(url)
        // .then(res => res.json())
        // .then(data => data)
        // .catch(err  => err);
    }
    //Make an HTTP POST request
    post(url,data){
        return new Promise((resolve,reject) => {
       
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
        
            })
            .then(res => res.json())
            .then(data => resolve(data))
            //what we wanna dow hen we fail
            .catch(err  => reject(err));

        });

   
    }

    //HTTP  Put Update
    put(url,data){
        return new Promise((resolve,reject) => {
       
            fetch(url,{
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
        
            })
            .then(res => res.json())
            .then(data => resolve(data))
            //what we wanna dow hen we fail
            .catch(err  => reject(err));

        });

   
    }

    //HTTP DELETE
    delete(url){
        return new Promise((resolve,reject) => {
       
            fetch(url,{
                method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                }
             
        
            })
            .then(res => res.json())
            .then(() => resolve('RESOURCE DELETED'))
            //what we wanna dow hen we fail
            .catch(err  => reject(err));

        });

   
    }
    

    
}