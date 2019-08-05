//Book Constructor
function Book(title,author,isbn){
this.title = title;
this.author = author;
this.isbn = isbn;

}
//
document.addEventListener('DOMContentLoaded', getBooks);

//UI Constructor collection of methods for us
function UI(){

}
//Local Storage Functions
//Add to local storage function

function storeTaskInLocalStorage(book){
    let books;
        if(localStorage.getItem('books')===null){
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    
}
//Function To display From Local Storga on Load

function getBooks(){
    let books;
        if(localStorage.getItem('books')===null){
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        books.forEach(function(book){
            const list = document.getElementById('book-list');
            //create tr element
            const row = document.createElement('tr');
            //insert columns
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class = "delete">X<a></td>
            `;
            list.appendChild(row);

        });
    
}
//Function to delete from local storage
function removeBookFromLocalStorage(bookItem){
    let books;
        if(localStorage.getItem('books')===null){
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        //console.log(bookItem);
        console.log(books);
       books.forEach(function(book, index){
        
        if(bookItem === book.isbn){
          books.splice(index, 1);
        }
      });
    
      localStorage.setItem('books', JSON.stringify(books));


}

//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "delete">X<a></td>
    `;
    list.appendChild(row);
}
//Error Message
UI.prototype.showAlert = function(message,className){
//create div
const div = document.createElement('div');
div.className = `alert ${className}`;
div.appendChild(document.createTextNode(message));
//get Parent
const container = document.querySelector('.container');
//get form
const form = document.querySelector('#book-form');
//what we want to insert, before what we want to insert
container.insertBefore(div,form);
//timeout after 3 seconds
setTimeout(function(){
document.querySelector('.alert').remove();
},3000);
}
//Delete book
UI.prototype.deleteBook=function(target){
    if(target.className === 'delete'){
        const ui = new UI();
        //we going from a to td and then to tr and delete that
        target.parentElement.parentElement.remove();
        ui.showAlert('Book Removed!','success');

        //remove from local storage
        removeBookFromLocalStorage(target.parentElement.previousElementSibling.textContent);

    }
}
//Clear Fields after submitting
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';

    document.getElementById('isbn').value = '';

}

//event listener for book
document.getElementById('book-form').addEventListener('submit',function(e){
    //console.log('test1');
    //Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    //Instantiate a new book     
    const book = new Book(title,author,isbn);
    //Instanitate UI
    const ui = new UI();

    //validate
    if(title === ''|| author === '' || isbn === ''){
        //error alert
        ui.showAlert('Please fill out all the fields!','error');
    }else{
    // add book to list
    ui.addBookToList(book);
    //Add book to local Storage

    storeTaskInLocalStorage(book);

    //show sucess alert
    ui.showAlert('Book Added!','success');
    //clear fields
    ui.clearFields();

    }

 

          //console.log(book);
    e.preventDefault();
});

//Event listner for delete
//use the parent, item delegation
document.getElementById('book-list').addEventListener('click',function(e){
//console.log(123);
const ui = new UI();
ui.deleteBook(e.target);
//show alert
//ui.showAlert('Book Removed!','success');


e.preventDefault();
});