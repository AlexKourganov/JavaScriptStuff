const http = new easyHTTP;

//get posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(err,response){
    
//     if(err){
//         console.log(err);
//     }else{
//         console.log(response);
//     }
    
// });

//get single post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(err,response){
    
//     if(err){
//         console.log(err);
//     }else{
//         console.log(response);
//     }
    
// });

//Post Request
//create data
const data = {
    title:'ccccc',
    body:'dasfga'
};
//create post
// http.post('https://jsonplaceholder.typicode.com/posts',data,function(err,post){
//     if(err){
//                 console.log(err);
//             }else{
//                 console.log(post);
//             }

// });

//UPDATE Post
// http.put('https://jsonplaceholder.typicode.com/posts/1',data,function(err,post){

//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//         }
// });


//delete post
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err,response){
    
    if(err){
        console.log(err);
    }else{
        console.log(response);
    }
    
});
