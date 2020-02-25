const bookListUl = document.getElementById("list");
const bookDisplayDiv = document.getElementById("show-panel")
let currUser = null

// Render Index Page
const renderBookNames = books => {
    books.forEach(book => renderBookName(book));
};

const renderBookName = book => {
    const bookListLi = document.createElement("li");
    bookListLi.addEventListener('click', () => renderBookInfo(book))
    bookListUl.id = book.id
    bookListLi.innerHTML = book.title
    bookListUl.append(bookListLi);
};

// bookListUl.addEventListener('click', e => {
//     const id = e.target.id
//     getBooks(id)
// })

//Render Book
const renderBookInfo = (book) => {
    let id = book.id;
    bookDisplayDiv.innerHTML = ""
    return fetch(`http://localhost:3000/books/${id}`)
        .then(jsonify)
        .then(book => renderFullBook(book));
}

const renderFullBook = book => {
    bookDisplayDiv.innerText = ""

    const titleEl = document.createElement("h2")
    titleEl.innerHTML = book.title
    
    const descriptionEl = document.createElement("p")
    descriptionEl.innerHTML = book.description
    
    const imgEl = document.createElement("img")
    imgEl.src = book.img_url

    const usersEl = document.createElement("ul")
    usersEl.innerHTML = "Liked by:"
    
    const userLi = book.users.forEach ( user => {
        const userEl = document.createElement("li")
        userEl.innerHTML = user.username
        usersEl.append(userEl)
    });

    const buttonEl = document.createElement("button")
    buttonEl.addEventListener("click", () => increaseLikes(book))
    buttonEl.innerHTML = "I Liked This Book"

    bookDisplayDiv.append(titleEl, imgEl, descriptionEl, usersEl, buttonEl);
}

// LIKES
// You are user 1 {"id":1, "username":"pouros"}
        const increaseLikes = (book) => {
            if (book.users.find((user) => user.id === 1)) {
                alert('You have liked this book already');
            } else {
                let newBook = book;
                let current = {
                    id: 1,
                    username: 'pouros'
                };
                newBook.users.push(current);
                API.patchBook(book).then(renderFullBook(book));
            }
        };


// PATCH REQUEST
const config = (method, book) => {
    return {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    };
  };

// PATCH 
const patchConfig = book => {
    return config("PATCH", book);
  };

// API fetch
BOOKS_URL = "http://localhost:3000/books"
const jsonify = response => response.json()

const API = {
    getBooks: () => fetch(BOOKS_URL).then(jsonify),
    patchBook: (book) => fetch(`${BOOKS_URL}/${book.id}`, patchConfig(book)).then(jsonify)
};

const getBooks = API.getBooks().then(books => renderBookNames(books));