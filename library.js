const myLibrary = [];

document
  .querySelector(".show-book-form-btn")
  .addEventListener("click", toggleForm);

document.querySelector(".book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addNewBook(myLibrary);
})

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
};

function addBookToLibrary(array) {
  array.forEach((book) => {
    const bookElement = document.createElement("div");
    const bookInfo = document.createElement("p");

    bookInfo.innerText = book.info();
    bookElement.appendChild(bookInfo);

    document.querySelector(".main").appendChild(bookElement);
  });
}

function toggleForm() {
  const form = document.querySelector(".book-form");
  form.classList.toggle("hidden");
}

function addNewBook(array) {
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  array.push(newBook);

  document.querySelector(".main").innerHTML = "";
  addBookToLibrary(myLibrary);

  toggleForm();
}
