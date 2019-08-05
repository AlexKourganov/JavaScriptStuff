// const sayHello = function(){
//     console.log('Hello');
// }
//Arrow Function
// const sayHello = ()=> {
//     console.log('Hello');
// }
//One line Function dont need bracers
// const sayHello = () => console.log('Hello!');
// sayHello();
//one line returns
// const sayHello = () => 'Hello!'
// console.log(sayHello());

//returning object literals

// const sayHello = () => ({msg:'Hello!'});

//Single parameter, dont need parenthesis
// const sayHello = (name) => console.log(`Hello ${name}`);
// sayHello('Book');

//multiple parameters
// const sayHello = (firstName,lastName) => console.log(`Hello ${firstName} ${lastName}`);
// sayHello('Book', 'Walker');
//console.log(sayHello());

const users=['johm','willi','hono'];

// const nameLenghts = users.map(function(name){
//     return name.length;
// });
//using arrows
// const nameLenghts = users.map((name) =>{
//      return name.length;
//  });
 //shortest
 const nameLenghts = users.map(name => name.length);

console.log(nameLenghts);