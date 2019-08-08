//Storage Controller

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
    items:[
        {id:0,name:'Steak',calories:1200},
        {id:1,name:'Cookie',calories:300},
        {id:2,name:'Eggs',calories:400}
    ],
    currentItem:null,
    totalCalories:0

}

//PUBLIC METHODS
return{
    getItems:function(){
        return data.items;
    },

    logData:function(){
        return data;
    }
}

})();


//UI Controller
const UICtrl = (function(){
const UISelectors = {
 itemList:'#item-list'   
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
    }
}

})();



//App Controller
const App = (function(ItemCtrl,UICtrl){

//PUBLIC METHODS
return{
    init:function(){
        
        //Fetch Items From Data
        const items = ItemCtrl.getItems();
        //console.log(items);
        //Populate List With Items
        UICtrl.populateItemList(items);
    }
}



})(ItemCtrl,UICtrl);

//INITIALIZE APP
App.init();