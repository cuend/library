const myLibrary = [];
const bookshelf = document.querySelector(".body");

function Book(title, author, pages, read) 
{ 
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    if (read) {
        this.read = "Read"; 
    } else {
        this.read = "Not Read"; 
    }
    this.info = function () {
        let info = `
        Title: ${this.title}
        Author: ${this.author}
        Pages: ${this.pages}
        Status: ${this.read}`

        return info;
    }
}

function addBook(book) {
    myLibrary.push(book);
}

function createBookCard(book) {
    // Create a new div element for the card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Populate the card with the book details
    cardDiv.innerHTML = `
        <div class="title">${book.title}</div>
        <div class="author">By: ${book.author}</div>
        <div class="pages">Pages: ${book.pages}</div>
        <button class="status" onclick="toggleStatus(this.parentNode.dataset.bookId);">${book.read}</button>
        <button class="delete" onclick="removeBook(this.parentNode.dataset.bookId); refreshBooks();">Remove Book</button>
    `;

    return cardDiv;
}

function refreshBooks() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.firstChild)
    }

    for (let index = 0; index < myLibrary.length; index++) {
        let card = createBookCard(myLibrary[index]);
        card.dataset.bookId = index;
        bookshelf.appendChild(card);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

function toggleStatus(index) {
    if (myLibrary[index].read === 'Read') {
        myLibrary[index].read = 'Not Read';
    }
    else {
        myLibrary[index].read = 'Read';
    }

    refreshBooks();
}

let hp = new Book('Harry Potter', 'JK', 1000, false);
addBook(hp);

const bookForm = document.getElementById('bookForm');
const deleteBtn = document.getElementsByClassName('delete');

refreshBooks();

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').checked;

    let customBook = new Book(title, author, pages, status);

    addBook(customBook);

    refreshBooks();

    bookForm.reset();
})
