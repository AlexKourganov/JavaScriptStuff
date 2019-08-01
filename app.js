//set local storage item Local stays till you clear it out, session stays till browser is closed

// localStorage.setItem('name','John');
// localStorage.setItem('age','30');

// sessionStorage.setItem('name','Beth');

//remove items
//localStorage.removeItem('name');
//get from storage
// const name = localStorage.getItem('name');
// const age = localStorage.getItem('age');

// console.log(name,age);

//add from form

document.querySelector('form').addEventListener('submit',
function(e){
    //console.log("name,age");
    const task = document.getElementById('task').value;
    
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }else{
       tasks= JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    alert('SAVED');

    e.preventDefault();
}

);

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(function(task){

    console.log(task);
}

);
