let myLibrary = [];

document
  .querySelector(".show-book-form-btn")
  .addEventListener("click", toggleForm);

document.querySelector(".book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addNewBook(myLibrary);
})

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "already read" : "not read yet"
  }`;
};

function deleteBook(id) {
  myLibrary = myLibrary.filter(book => (book.id != id));
  addBooksToLibrary(myLibrary);
}

function addBooksToLibrary(array) {
  document.querySelector(".main").innerHTML = "";
  array.forEach((book) => {
    const bookInfo = document.createElement("p");
    bookInfo.innerText = book.info();

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE"
    deleteButton.addEventListener("click", () => {
      deleteBook(book.id);
    })

    const bookElement = document.createElement("div");
    bookElement.appendChild(bookInfo);
    bookElement.appendChild(deleteButton);
    bookElement.id = book.id;

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
    document.getElementById("read").checked,
    Date.now(),
  );

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  array.push(newBook);

  addBooksToLibrary(myLibrary);

  toggleForm();
}
