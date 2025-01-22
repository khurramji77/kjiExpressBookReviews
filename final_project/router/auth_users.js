const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secretKey = "your_secret_key"; // Replace with a secure key

let users = [];


const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(401).json({ message: "Missing/Invalid credentials" });
    }

    console.log("Users:", users);
    // Validate the user credentials
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    console.log("Users:", users);
    if (user) {
        // Generate a JWT token
        const accessToken = jwt.sign(
            { username: user.username }, // Payload
            secretKey, // Secret key
            { expiresIn: "1h" } // Token expiration
        );
        // Store access token in session
        req.session.authorization = {
            accessToken
        }
        return res.status(200).json({
            message: "User logged in successfully",
            token: accessToken,
        });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.post("/auth/review/:isbn", (req, res) => {
    //Write your code here
    // console.log("User from token..", req.user);
    // console.log("Body..", req.body);
    let resp = { message: "Somthing went wrong"};
    users.forEach(
        (user) => {
            console.log("user from map:",user);
            if(user.username === req.user.username){
                // console.log(req.body.review);
                if(books[req.body.isbn]){
                    console.log(books[req.body.isbn]);
                    books[req.body.isbn].reviews[req.user.username] = req.body.review;
                    resp = { message: "Reviews added for user"+ req.user.username}
                }else {
                    resp = { message: "No book found for ISBN:"+req.body.isbn};
                }
            }
        }
    );
    console.log(books[req.body.isbn]);
    return res.status(200).json(resp);
});

// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let resp = { message: "Somthing went wrong"};
    users.forEach(
        (user) => {
            console.log("user from map:",user);
            if(user.username === req.user.username){
                // console.log(req.body.review);
                if(books[req.body.isbn]){
                    console.log(books[req.body.isbn]);
                    delete books[req.body.isbn].reviews[req.user.username];
                    resp = { message: "Reviews deleted for user"+ req.user.username}
                }else {
                    resp = { message: "No book found for ISBN:"+req.body.isbn};
                }
            }
        }
    );
    console.log(books[req.body.isbn]);
    return res.status(200).json(resp);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
