const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code 
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(500).json({ message: "Missing information" });
    }
    if (users && users.length > 0) {
        let user = users.filter((user) => user.username === req.body.username);
        console.log('User...', user);
        if (user && user.length > 0) {
            return res.status(500).json({ message: "User already exists" });
        }
    }
    users.push({
        'username': req.body.username,
        'password': req.body.password,
    })
    return res.status(200).json({ message: "User added successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    let booksPromise = getBooks();
    booksPromise.then((books) => {
        return res.status(200).json(books);
    }).catch((error) => {
        return res.status(500).json({ message: "Error fetching books" });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    // let book = {}
    let bookPromise = getBookDetails(req.params.isbn);
    bookPromise.then((book) => {
        return res.status(200).json(book);
    }).catch((error) => {
        return res.status(500).json({ message: "Error fetching book details" });
    });
    // if (books[req.params.isbn]) {
    //     book = books[req.params.isbn];
    //     return res.status(200).json(book);
    // } else {
    //     return res.status(200).json('No record found');
    // }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const authorName = req.params.author;
    let booksPromise = getBookDetailsByAuthor(authorName);
    booksPromise.then((books) => {
        return res.status(200).json(books);
    }).catch((error) => {
        return res.status(500).json({ message: "Error fetching book details" });
    });
    // const result = [];
    // // Iterate over the books object
    // for (const isbn in books) {
    //     if (books[isbn].author.toLowerCase() === authorName.toLowerCase()) {
    //         result.push({ isbn, ...books[isbn] }); // Include the ISBN and book details
    //     }
    // }

    // return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let booksPromise = getBookDetailsByTitle(title);
    booksPromise.then((books) => {
        return res.status(200).json(books);
    }).catch((error) => {
        return res.status(500).json({ message: "Error fetching book details" });
    });
    // const result = [];
    // // Iterate over the books object
    // for (const isbn in books) {
    //     if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
    //         result.push({ isbn, ...books[isbn] });
    //     }
    // }
    // return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let reviews = {}
    if (books[req.params.isbn]) {
        reviews = books[req.params.isbn].reviews;
        return res.status(200).json(reviews);
    } else {
        return res.status(200).json('No record found');
    }
});

const getBooks = async () => {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

const getBookDetails = async (isbn) => {
    return new Promise((resolve, reject) => {
        let book = {}
        if (books[isbn]) {
            book = books[isbn];
        }
        resolve(book);
    });
}

const getBookDetailsByAuthor = async (author) => {
    return new Promise((resolve, reject) => {
        let result = [];
        for (const isbn in books) {
            if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
                result.push({ isbn, ...books[isbn] }); // Include the ISBN and book details
            }
        }
        resolve(result);
    });
}


const getBookDetailsByTitle = async (title) => {
    return new Promise((resolve, reject) => {
        let result = [];
        for (const isbn in books) {
            if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
                result.push({ isbn, ...books[isbn] });
            }
        }
        resolve(result);
    });
}
module.exports.general = public_users;
