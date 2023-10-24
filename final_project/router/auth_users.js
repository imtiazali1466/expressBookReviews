import express from "express";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";

const regd_users = express.Router();

export let users = [];

export const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let userWithSameName = users.filter((user) => {
    user.username === username;
  });
  if (userWithSameName.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let validUser = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validUser > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ message: "provide uername and password!" });
  }
  if (authenticatedUser(username, password)) {
    let acessToken = jwt.sign({ data: password }, "secret", {
      expiresIn: 60 * 60,
    });
    req.session.authorization = {
      acessToken, username
    }
    return res.status(200).json({ message: "user sucessfuly logged in!" });
  } else {
    res.status(208).json({ message: "incorrect username and password!" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const selectedBook = books.filter((book)=>{
    book.isbn ===isbn
  })
  selectedBook.reviews.push(review)
  return res.status(200).json({ message: "review added" });
});

export default regd_users;
