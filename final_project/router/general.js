const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let book = {}
    if(books[req.params.isbn]){
        book = books[req.params.isbn];
        return res.status(200).json(book);
    }else{
        return res.status(200).json('No record found');
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const authorName = req.params.author;
    const result = [];
    // Iterate over the books object
    for (const isbn in books) {
        if (books[isbn].author.toLowerCase() === authorName.toLowerCase()) {
            result.push({ isbn, ...books[isbn] }); // Include the ISBN and book details
        }
    }
    
    return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const result = [];
    // Iterate over the books object
    for (const isbn in books) {
        if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
            result.push({ isbn, ...books[isbn] });
        }
    }
    return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
