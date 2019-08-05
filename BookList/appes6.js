class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{

    addBookToList(book){
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
    showAlert(message,className){
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
    deleteBook(target){
        if(target.className === 'delete'){
            const ui = new UI();

            //we going from a to td and then to tr and delete that
            target.parentElement.parentElement.remove();

           


            ui.showAlert('Book Removed!','success');
        }

    }
    clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

    }
}
//Local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null)
        {
            books = [];
        }else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;
            //add book to ui
            ui.addBookToList(book);

        });
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        //console.log(isbn);
        const books = Store.getBooks();

        books.forEach(function(book,index){
          if(book.isbn === isbn){
            books.splice(index,1);
          }

        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
//Doam Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//event listenere for book
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

    //Add to local storage
    Store.addBook(book);
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

//pass the isbn
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


e.preventDefault();
});