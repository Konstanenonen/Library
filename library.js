"use strict";

let myLibrary = [];

document
  .querySelector(".show-book-form-btn")
  .addEventListener("click", toggleForm);

document.querySelector(".book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addNewBook(myLibrary);
});

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }`;
  }
}

function deleteBook(id) {
  myLibrary = myLibrary.filter((book) => Number(book.id) !== Number(id));
  addBooksToLibrary(myLibrary);
}

function toggleRead(id) {
  myLibrary = myLibrary.map((book) => {
    if (book.id == id) {
      book.read = !book.read;
      return book;
    } else {
      return book;
    }
  });
  addBooksToLibrary(myLibrary);
}

function addBooksToLibrary(array) {
  document.querySelector(".main").innerHTML = "";
  array.forEach((book) => {
    const titleElement = document.createElement("h2");
    titleElement.innerText = `${book.title} by ${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.innerText = `Pages: ${book.pages}`;

    const readElement = document.createElement("p");
    readElement.innerText = book.read ? `Read: Yes` : `Read: No`;

    const bookInfoArea = document.createElement("div");
    bookInfoArea.appendChild(titleElement);
    bookInfoArea.appendChild(pagesElement);
    bookInfoArea.appendChild(readElement);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => {
      deleteBook(book.id);
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.innerText = "TOGGLE READ";
    toggleReadButton.className = "toggle-btn";
    toggleReadButton.addEventListener("click", () => {
      toggleRead(book.id);
    });

    const bookElement = document.createElement("div");
    bookElement.appendChild(bookInfoArea);
    bookElement.appendChild(toggleReadButton);
    bookElement.appendChild(deleteButton);
    bookElement.id = book.id;

    document.querySelector(".main").appendChild(bookElement);
  });
}

function toggleForm() {
  const form = document.querySelector(".book-form");
  form.classList.toggle("hidden");

  const infoText = document.querySelector(".info-text");
  infoText.classList.toggle("hidden");
}

function addNewBook(array) {
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked,
    Date.now()
  );

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  array.push(newBook);

  addBooksToLibrary(myLibrary);

  toggleForm();
}
