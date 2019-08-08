//basi structure
// (function(){
// //declare private vars and functions, meaning we cant acess it outside the module
// return{
//     //decalre public var and functions
// }
// })();
/////////////////////////////////////////////////////////////////////////////////////
//patern for the future calorie project(data)

// const UICtrl = (function(){
//     // cant acess it outside this module
//     let text = 'Hello World!';

//     const changeText = function(){
//         const element = document.querySelector('#heading');
//         element.textContent  = text;
//     }
//     //will return something that will public
//     return{
//         callChangeText : function (){
//             changeText();
//             console.log(text);
//         }
//     }
// })();

// UICtrl.callChangeText();


//Revealing MODUL Patern
//instead of returning public functions we map private functions

// const ItemCtrl = (function(){
//     let data = [];


//     function add(item){
//         data.push(item);
//         console.log('ITEM ADDED');
//     }
//     function get(id){
//         return data.find(item => {
//             return item.id === id;
//         })
//     }

//     return{
//         add:add,
//         get:get
//     }

// })();

// ItemCtrl.add({id:1,name:'John1'});
// ItemCtrl.add({id:2,name:'John2'});
// ItemCtrl.add({id:3,name:'John3'});
// ItemCtrl.add({id:4,name:'John4'});


// console.log(ItemCtrl.get(3));


//Singleton Pattern(Frowned uppon for global  stuff)

// const Singleton =(function(){
// let instance;


// function createInstance(){
//     const object = new Object({name:'Object Instance!'});
//     return object;

// }
// return{
//     getInstance: function(){
//        if(!instance){
//            instance = createInstance();

//        } 
//        return instance;
//     }

// }



// })();

// const instanceA = Singleton.getInstance();
// console.log(instanceA);

//Factory Pattern
//Manage to maintain collection of objects, like members

// function MemberFactory(){

//     this.createMember = function (name,type){
//         let member;

//         if(type === 'simple'){
//             member = new SimpleMembership(name);
//         }else if(type === 'standard'){
//             member = new StandardMembership(name);
//         }else if(type === 'super'){
//             member = new SuperMembership(name);
//         }

//         member.type = type;

//         member.define = function(){
//             console.log(`${this.name}(${this.type}):${this.cost}`);
//         }
//         return member;
//     }
// }

// const SimpleMembership = function(name){
//     this.name = name;
//     this.cost = '5$';
// }
// const StandardMembership = function(name){
//     this.name = name;
//     this.cost = '10$';
// }
// const SuperMembership = function(name){
//     this.name = name;
//     this.cost = '25$';
// }

// const members = [];
// const factory = new MemberFactory();

// members.push(factory.createMember('John Doe','simple'));
// members.push(factory.createMember('Bob Sag','standard'));
// members.push(factory.createMember('Bob Sag2','standard'));
// members.push(factory.createMember('Bob Sag3','standard'));
// members.push(factory.createMember('Bob Sag4','super'));


// console.log(members);

// members.forEach(function(member){
//     member.define();
// });

///////OBSERVER PATTERN///////////////

// function EventObserver(){
//     this.observers=[];

// }

// EventObserver.prototype = {
//     subscribe:function(fn){
//         this.observers.push(fn);
//         console.log(`You are now subscribed to${fn.name}`);

//     },
//     unsubscribe:function(fn){
//         //Filter out from the list  whatever matches the callback f unction. if there is no match
//         //the call back gets to stay on the list. the filter returns a new list and reassigns the list of observers
//         this.observers = this.observers.filter(function(item){
//             if(item !== fn){
//                 return item;

//             }
//         });
//         console.log(`You are now unsubscribed from ${fn.name}`);
//     },
//     fire:function(){
//         this.observers.forEach(function(item){
//             item.call();
//         });
//     }
// }

// const click = new EventObserver();

// //Event listeners
// document.querySelector('.sub-ms').addEventListener('click',function(){
//     click.subscribe(getCurrMilliseconds);
// });

// document.querySelector('.unsub-ms').addEventListener('click',function(){
//     click.unsubscribe(getCurrMilliseconds);
// });

// /////seconds
// document.querySelector('.sub-s').addEventListener('click',function(){
//     click.subscribe(getCurrSeconds);
// });

// document.querySelector('.unsub-s').addEventListener('click',function(){
//     click.unsubscribe(getCurrSeconds);
// });

// document.querySelector('.fire').addEventListener('click',function(){
//     click.fire();
// });



// //Click handler
// const getCurrMilliseconds = function(){
//     console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
// }
// const getCurrSeconds = function(){
//     console.log(`Current Seconds: ${new Date().getSeconds()}`);
// }

////////////////MEDIATOR///////////////////
const User = function (name){
    this.name = name;
    this.chatroom=null;
}
User.prototype = {
    send:function(message,to){
        this.chatroom.send(message,this,to);
    },
    recieve:function(message,from){
        console.log(`From${from.name} to ${this.name}:${message}`);
    }
}





const Chatroom = function(){
    let users = {

    };//list of users

    return{
        register:function(user){
            users[user.name] = user;
            user.chatroom = this;
        },
        send:function(message,from,to){
            if(to){
                //single user message
                to.recieve(message,from);
            }else{
                for(key in users){
                    if(users[key] !== from){
                        users[key].recieve(message,from);
                    }
                }
            }

        }
    }
}

const a = new User('A');
const b = new User('B');
const c = new User('C');
const chatroom = new Chatroom();

chatroom.register(a);
chatroom.register(b);
chatroom.register(c);

a.send('hello',b);
