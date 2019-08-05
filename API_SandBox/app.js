document.getElementById('button1').addEventListener('click',getText);
document.getElementById('button2').addEventListener('click',getJson);
document.getElementById('button3').addEventListener('click',getExternal);


//Get local text file
// function getText(){
//     //fetch returns a promise so need to use .then
//     fetch('test.txt').then(function(res){
//         return res.text();
//     })
//     .then(function(data){
//         console.log(data);
//         document.getElementById('output').innerHTML = data;
//     })
//     .catch(function(err){
//         console.log(err);
//     });
// }

//Using Arrow functions
function getText(){
    //fetch returns a promise so need to use .then
    fetch('test.txt').then(res => res.text())
    .then(data=>{
        console.log(data);
        document.getElementById('output').innerHTML = data;
    })
    .catch(err => console.log(err));
}







//Get  Local Json
function getJson(){
    //fetch returns a promise so need to use .then
    fetch('posts.json').then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        let output = '';
        data.forEach(function(post){
            output += `<li>${post.title} <br>${post.body}</li>`;
        });
        document.getElementById('output').innerHTML = output;

        
    })
    .catch(function(err){
        console.log(err);
    });
}

//Get  External Api
function getExternal(){
    //fetch returns a promise so need to use .then
    fetch('https://api.github.com/users').then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        let output = '';
        data.forEach(function(user){
            output += `<li>${user.login} ID:${user.id}</li>`;
        });
        document.getElementById('output').innerHTML = output;

        
    })
    .catch(function(err){
        console.log(err);
    });
}

