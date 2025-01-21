const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secretKey = "your_secret_key"; // Replace with a secure key

let users = [];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Authorization header
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ message: "Token missing or invalid" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired" });
        }
        req.user = user; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route
    });
};

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
        const token = jwt.sign(
            { username: user.username }, // Payload
            secretKey, // Secret key
            { expiresIn: "1h" } // Token expiration
        );// Return success response with token
        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
        });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.post("/auth/review/:isbn", authenticateToken, (req, res) => {
    //Write your code here
    console.log("User from token..", req.user);
    const user = users.find(
        (user) => user.username === username && user.password === password
    );
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.delete("/auth/review/:isbn", authenticateToken,(req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
