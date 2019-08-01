//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load Event Listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click',removeTask);
    // Clear All
    clearBtn.addEventListener('click',clearTasks);
    //Filter
    filter.addEventListener('keyup', filterTasks);
}
//Get Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks =[];
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li =document.createElement('li');
    li.className = 'collection-item';
//Create a text node and add to li
    li.appendChild(document.createTextNode(task));
//Creat close link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
//Add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';    
//Apend to link to li
    li.appendChild(link);
//Apend li to ul
    taskList.appendChild(li);


    });

}
//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task!');
    }
//Create the element
const li =document.createElement('li');
li.className = 'collection-item';
//Create a text node and add to li
li.appendChild(document.createTextNode(taskInput.value));
//Creat close link
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
//Add icon
link.innerHTML = '<i class = "fa fa-remove"></i>';    
//Apend to link to li
li.appendChild(link);
//Apend li to ul
taskList.appendChild(li);

//Store in local storage
storeTaskInLocalStorage(taskInput.value);


//Clear input


taskInput.value='';


    e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task){
let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        //console.log(e.target);
        if(confirm("Are you Sure?")){
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }


}
//Remove From LS function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
//Clear all Tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }

    //Clear from LS
    clearTaasksFromLocalStorage();


}
//Clear Tasks From LS
function clearTaasksFromLocalStorage(){
    localStorage.clear();
}
//Filter
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    //take all list items
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }

    });
}