const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const secretKey = "your_secret_key"; // Replace with a secure key

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    //Write the authenication mechanism here
    // console.log(req.session);
    // if (req.session && req.session.user) {
    //     // Session exists and user is logged in
    //     return next();
    // }

    console.log(req.session.authorization);
    if (req.session && req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token
        // Verify JWT token for user authentication
        jwt.verify(token, secretKey, (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });

        // Return error if no access token is found in the session
    }
    // If not authorized, redirect or send an error response
    res.status(401).send("Unauthorized: Please log in.");
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
