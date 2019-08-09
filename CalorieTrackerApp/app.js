//Storage Controller
const StorageCtrl = (function(){


//Public Methods
    return{
        storeItem:function(item){
            let items;
            
            //check if any items in LS
            if(localStorage.getItem('items')===null){
                items=[];
                //push new item
                items.push(item);
                //Set LS
                localStorage.setItem('items',JSON.stringify(items));
            }else{
                //change from string back to object
                items = JSON.parse(localStorage.getItem('items'));
                //push new item
                items.push(item);
                //reset LS
                localStorage.setItem('items',JSON.stringify(items));
            }

        },
        getItemsFromStorage:function(){
            let items;
            if(localStorage.getItem('items') ===null){
                items=[];
            }else{
               items=JSON.parse(localStorage.getItem('items')); 
            }
            return items;


        },
        updateItemStorage:function(updatedItem){
            let items= JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item,index){
                if(updatedItem.id === item.id){
                    items.splice(index,1,updatedItem);

                }

            }); 
            //RESET LS
            localStorage.setItem('items',JSON.stringify(items));

        },
        deleteItemFromStorage:function(id){
            let items= JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item,index){
                if(id === item.id){
                    items.splice(index,1);

                }

            }); 
            localStorage.setItem('items',JSON.stringify(items));


        },
        clearItemsFromStorage:function(){
            localStorage.removeItem('items');
        }

    }
})();



//Item Controller
const ItemCtrl = (function(){
//Item Constructor
const Item = function(id,name,calories){
this.id=id;
this.name=name;
this.calories=calories;
}
//DATA Structure /State
const data = {
    // items:[
    //     // {id:0,name:'Steak',calories:1200},
    //     // {id:1,name:'Cookie',calories:300},
    //     // {id:2,name:'Eggs',calories:400}
    // ],
    items:StorageCtrl.getItemsFromStorage(),
    currentItem:null,
    totalCalories:0

}

//PUBLIC METHODS
return{
    getItems:function(){
        return data.items;
    },
    addItem:function(name,calories){
       //Create id
       let ID;
       if(data.items.length > 0){
            ID=data.items[data.items.length-1].id+1;
       }else{
        ID=0;
       }
       //Calories to Number since when we enter them they are string
       calories = parseInt(calories);
       //Create new Item
       newItem = new Item(ID,name,calories);
       //Add to items array
       data.items.push(newItem);
       
       return newItem;
    },
    getItemById(id){
        let found = null;
        //loop through items
        data.items.forEach(function(item){
            if(item.id ===id){
                found = item;
            }
            
        });
        return found;

    },
    updateItem:function(name,calories){
        //turn calories to a number
        calories = parseInt(calories);

        let  found =null;
        data.items.forEach(function(item){
            if(item.id === data.currentItem.id){
                item.name = name;
                item.calories = calories;
                found =item;

            }
        });
        return found;
    },
    deleteItem:function(id){
        //Get the ids
        ids = data.items.map(function(item){
            return item.id;
        });
        //Get the index
        const index = ids.indexOf(id);

        //remove item

        data.items.splice(index,1);


    },
    clearAllItems:function(){
        data.items  = [];


    },
    setCurrentItem:function(item){
        data.currentItem = item;
    },
    getCurrentItem:function(){
        return data.currentItem;
    },
    getTotalCalories:function(){
        let total = 0;
        data.items.forEach(function(item){
            total+= item.calories;
        });
        //set total calories in data
        data.totalCalories = total;
        return data.totalCalories;
    },
    logData:function(){
        return data;
    }
}

})();


//UI Controller
const UICtrl = (function(){
const UISelectors = {
 itemList:'#item-list',
 listItems:'#item-list li',
 addBtn: '.add-btn',
 itemNameInput:'#item-name',
 itemCaloriesInput:'#item-calories',
 totalCalories:'.total-calories',
 updateBtn: '.update-btn',
 deleteBtn: '.delete-btn',
 backBtn: '.back-btn',
 clearBtn:'.clear-btn'
}
 
    
//PUBLIC METHODS    
return{
    populateItemList:function(items){
        let html='';
        items.forEach(function(item){
            html += `
            <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}:</strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
            
            `;
        });

        //INSERT LIST ITEMS
        document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput:function(){
        return{
            name:document.querySelector(UISelectors.itemNameInput).value,
            calories:document.querySelector(UISelectors.itemCaloriesInput).value
        }
    },
    addListItem:function(item){
        //Show the list/ unhide it
        document.querySelector(UISelectors.itemList).style.display='block';
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //add id
        li.id= `item-${item.id}`;
        //add html
        li.innerHTML=`<strong>${item.name}:</strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        //Insert Item
        document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);

    },
    updateListItem:function(item){
        let listItems = document.querySelectorAll(UISelectors.listItems);
        //Convert node list to array
        listItems = Array.from(listItems);

        listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
            if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            }


        });



    },
    deleteListItem:function(id){
        const itemID = `#item-${id}`;
        const item = document.querySelector(itemID);
        item.remove();



    },
    clearInput:function(){
      document.querySelector(UISelectors.itemNameInput).value = '';  
      document.querySelector(UISelectors.itemCaloriesInput).value = '';  
    },
    addItemToForm:function(){
        document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;  
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;  
        //change to edit state after we press edit button
        UICtrl.showEditState();
    },
    removeItems:function(){
        let listItems = document.querySelectorAll(UISelectors.listItems);
        //convert to array
        listItems = Array.from(listItems);

        listItems.forEach(function(item){
            item.remove();
        });

    },

    hideList:function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories:function(totalCalories){
        document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState:function(){
        UICtrl.clearInput();
        document.querySelector(UISelectors.updateBtn).style.display = 'none';
        document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        document.querySelector(UISelectors.backBtn).style.display = 'none';
        document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState:function(){
       
        document.querySelector(UISelectors.updateBtn).style.display = 'inline';
        document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
        document.querySelector(UISelectors.backBtn).style.display = 'inline';
        document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors:function(){
        return UISelectors;
    }
}

})();



//App Controller
const App = (function(ItemCtrl,UICtrl,StorageCtrl){
//Load Event Listeners
const loadEventListeners = function(){
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    //disable submit on enter
    document.addEventListener('keypress',function(e){
        if(e.keyCode ===13 || e.which ===13){
           e.preventDefault();
           return false; 
        }
    });

    //Edit Icon Event/ use item delegation
    document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

    //Back button Event
    document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);

    //Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

    //Clear All event
    document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);



    
}
//Add item submit
const itemAddSubmit = function(e){
 //Get form input from UI controller
 const input = UICtrl.getItemInput();

    //console.log(input);

    //Check for name and calories input
    if(input.name!=='' && input.calories!==''){
        //Add item
        const newItem = ItemCtrl.addItem(input.name,input.calories);
        //Add item to UI list
        UICtrl.addListItem(newItem);

        //Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to ui
        UICtrl.showTotalCalories(totalCalories);

        //Store in Local Storage
        StorageCtrl.storeItem(newItem);
        
        //clear fields
        UICtrl.clearInput();
    }



    e.preventDefault();
}
//Click/Edit Item
const itemEditClick = function(e){
    //target edit button
    if(e.target.classList.contains('edit-item')){
       //Get list item id(item-0)
       const listId = e.target.parentNode.parentNode.id;
       //Get regular number, so break into array by splitting
       const listIdArray = listId.split('-');
       //get acutal id
       const id = parseInt(listIdArray[1]);

       //Get item
       const itemToEdit = ItemCtrl.getItemById(id);
       
       //set to current item
       ItemCtrl.setCurrentItem(itemToEdit);
       //add item to form
       UICtrl.addItemToForm();


    }
    
    e.preventDefault();
}
//Item update submit
const itemUpdateSubmit = function(e){
    //get item inpt
    const input = UICtrl.getItemInput();
    //update item
    const updatedItem = ItemCtrl.updateItem(input.name,input.calories);

    //update ui
    UICtrl.updateListItem(updatedItem);

    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add total calories to ui
    UICtrl.showTotalCalories(totalCalories);

    //Update LS
    StorageCtrl.updateItemStorage(updatedItem);
   
    UICtrl.clearEditState();


    
    e.preventDefault();
}

//DELETE
const itemDeleteSubmit = function(e){
    const items = ItemCtrl.getItems();
    //get id from curent item
    const currentItem = ItemCtrl.getCurrentItem();
    
    //delete data from data structure
    ItemCtrl.deleteItem(currentItem.id);

    //Remove from UI
    UICtrl.deleteListItem(currentItem.id);

     //Get Total Calories
     const totalCalories = ItemCtrl.getTotalCalories();
     //Add total calories to ui
     UICtrl.showTotalCalories(totalCalories);

     //Delete from LS
     StorageCtrl.deleteItemFromStorage(currentItem.id);
 
     UICtrl.clearEditState();

     if(items.length === 0){
        UICtrl.hideList();
    }
 

    e.preventDefault();
}
//Clear Items Event
const clearAllItemsClick = function(e){
    //Delete all items from data structure
    ItemCtrl.clearAllItems();

 

    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add total calories to ui
    UICtrl.showTotalCalories(totalCalories);

       //remove from ui
       UICtrl.removeItems();
       //Remove from LS
       StorageCtrl.clearItemsFromStorage();

    //HIDE ul
    UICtrl.hideList();



e.preventDefault();
}



//PUBLIC METHODS
return{
    init:function(){
        //Clear Edit State / set initial state
        UICtrl.clearEditState();
        //Fetch Items From Data
        const items = ItemCtrl.getItems();

        //check if any items
        if(items.length === 0){
            UICtrl.hideList();
        }else{
            //Populate List With Items
            UICtrl.populateItemList(items);
        }

         //Get Total Calories
         const totalCalories = ItemCtrl.getTotalCalories();
         //Add total calories to ui
         UICtrl.showTotalCalories(totalCalories);

      
        

        //Load event listeners
        loadEventListeners();
    }
}



})(ItemCtrl,UICtrl,StorageCtrl);

//INITIALIZE APP
App.init();