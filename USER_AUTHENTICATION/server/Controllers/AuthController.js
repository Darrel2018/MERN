const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}

// This code defines two authentication controller functions for a Node.js/Express application: **Signup** and **Login**. It uses a user model, JWT-style token generation, and password hashing with bcrypt.

// ### Summary

// * Imports:

//   * `User` model for database operations
//   * `createSecretToken` utility for generating authentication tokens
//   * `bcrypt` for password comparison

// ### `Signup` Function

// Handles new user registration.

// #### Process:

// 1. Extracts `email`, `password`, `username`, and `createdAt` from the request body.
// 2. Checks if a user with the same email already exists.
// 3. If the user exists, returns a message: `"User already exists"`.
// 4. If not:

//    * Creates a new user in the database.
//    * Generates an authentication token using the user ID.
//    * Stores the token in a cookie.
//    * Returns a success response with the created user data.
// 5. Errors are logged to the console.

// ### `Login` Function

// Handles existing user authentication.

// #### Process:

// 1. Extracts `email` and `password` from the request body.
// 2. Validates that both fields are provided.
// 3. Searches for the user by email.
// 4. If no user is found, returns `"Incorrect password or email"`.
// 5. Uses `bcrypt.compare()` to verify the password.
// 6. If authentication succeeds:

//    * Generates a token.
//    * Stores it in a cookie.
//    * Returns a successful login response.
// 7. Errors are logged to the console.

// ### Key Features

// * User authentication with encrypted passwords
// * Duplicate email prevention during signup
// * Token-based session handling using cookies
// * Input validation for login
// * Basic error handling

// ### Potential Improvements

// * Set `httpOnly: true` for better cookie security
// * Add proper HTTP status codes for errors
// * Include stronger validation and sanitization
// * Handle errors with user-friendly responses
// * Hash passwords during signup if not already handled in the model
