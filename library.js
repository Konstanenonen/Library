const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "already read" : "not read yet"
  }`;
}

function addBookToLibrary(array) {
  array.forEach(book => {
    const bookElement = document.createElement("div");
    const bookInfo = document.createElement("p");

    bookInfo.innerText = book.info();
    bookElement.appendChild(bookInfo);

    document.querySelector(".main").appendChild(bookElement);
  });
}