const myLibrary = [];

renderBooks();

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    let isAlreadyRead;

    if (isRead == true) {
        isAlreadyRead = "arleady read";
    } else {
        isAlreadyRead = "not read yet";
    }

    return `${title} by ${author}, ${pages} pages, ${isAlreadyRead}`;
};

// display add form with dialog
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-book-show-form");
const closeButton = document.querySelector(".add-book-close-form");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

// handle form submit
let addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementsByName("title")[0].value;
    let author = document.getElementsByName("author")[0].value;
    let pages = document.getElementsByName("pages")[0].value;
    let isRead = document.getElementsByName("isRead")[0].value;

    addBookToLibrary(title, author, pages, isRead);

    // reset form
    document.getElementsByName("title")[0].value = "";
    document.getElementsByName("author")[0].value = "";
    document.getElementsByName("pages")[0].value = "";
    document.getElementsByName("isRead")[0].value = "";

    dialog.close();

    renderBooks();
});

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);

    myLibrary.push(newBook);
}

// display book card
function renderBooks() {
    const bookWrapper = document.querySelector(".books-wrapper");

    bookWrapper.innerHTML = "";

    myLibrary.forEach((item, index) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <div class="title">${item.title}</div>
            <div class="author">${item.author}</div>
            <div class="read-status">
                <div class="total-page">${item.pages} pages</div>
                <div class="is-read">${item.isRead}</div>
            </div>
            <div class="action-button">
            <button class="delete-button">delete</button>
            <button class="read-button">${
                item.isRead == "read" ? "not read" : "read"
            }</button></button>
        </div>
        `;

        bookCard
            .querySelector(".delete-button")
            .addEventListener("click", () => {
                deleteBook(index);
            });

        bookCard.querySelector(".read-button").addEventListener("click", () => {
            changeReadStatus(item);
        });

        bookWrapper.appendChild(bookCard);
    });
}

function deleteBook(index) {
    myLibrary.splice(index, 1);

    renderBooks();
}

function changeReadStatus(item) {
    if (item.isRead == "read") {
        item.isRead = "not read";
    } else {
        item.isRead = "read";
    }

    renderBooks();
}
