"use strict";

let myLibrary = [];

document
  .querySelector(".show-book-form-btn")
  .addEventListener("click", toggleForm);

const titleField = document.getElementById("title");
titleField.addEventListener("input", (event) => {
  const titleError = document.getElementById("title-error");

  const showError = () => {
    if (titleField.validity.valueMissing) {
      titleError.textContent = "Please enter a title.";
    } else if (titleField.validity.tooShort) {
      titleError.textContent = `Minimum title length is ${titleField.minLength} charactes,
       currently the length is ${titleField.value.length}`;
    }
    titleError.className = "error";
  };

  if (titleField.validity.valid) {
    titleError.textContent = "";
    titleError.className = "";
  } else {
    showError();
  }
});

const authorField = document.getElementById("author");
authorField.addEventListener("input", (event) => {
  const authorError = document.getElementById("author-error");

  const showError = () => {
    if (authorField.validity.valueMissing) {
      authorError.textContent = "Please enter the author of the book.";
    } else if (authorField.validity.tooShort) {
      authorError.textContent = `Minimum name length is ${authorField.minLength} charactes,
       currently the length is ${authorField.value.length}`;
    }
    authorError.className = "error";
  };

  if (authorField.validity.valid) {
    authorError.textContent = "";
    authorError.className = "";
  } else {
    showError();
  }
});

const pageField = document.getElementById("pages");
pageField.addEventListener("input", (event) => {
  const pageError = document.getElementById("page-error");

  const showError = () => {
    if (pageField.validity.typeMismatch) {
      pageError.textContent = "Please input only the number of pages";
    } else if (pageField.validity.tooShort) {
      pageError.textContent = `Minimum page length is ${apageField.minLength} charactes,
      currently the length is ${pageField.value.length}`;
    } else if (pageField.validity.valueMissing) {
      pageError.textContent = "Please input the number of pages";
    }
    pageError.className = "error";
  };

  if (pageField.validity.valid) {
    pageError.textContent = "";
    pageError.className = "";
  } else {
    showError();
  }
});

document.querySelector(".book-form").addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    !titleField.validity.valid ||
    !authorField.validity.valid ||
    !pageField.validity.valid
  ) {
    return;
  }

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
