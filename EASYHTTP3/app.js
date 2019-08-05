const http = new EasyHTTP;

//Get Users
// http.get('https://jsonplaceholder.typicode.com/users')
//do this when resolve succeds
// .then(data => console.log(data))
//do this when it fails
// .catch(err => console.log(err));


//POST
//user dat
const data = {
    name:'john doe',
    username:'john',
    email:'forgivemejohn@gmail.com'
}
//create post
// http.post('https://jsonplaceholder.typicode.com/users',data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

//UPDATE Post
// http.put('https://jsonplaceholder.typicode.com/users/2',data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

//DELETE
// http.delete('https://jsonplaceholder.typicode.com/users/2')
// .then(data => console.log(data))
// .catch(err => console.log(err));