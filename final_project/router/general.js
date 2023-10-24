import express from "express";
import books from "./booksdb.js";
import isValid from "./auth_users.js";
import users from "./auth_users.js";

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (username && password) {
    if (!isValid) {
      users.push({ username: username, password: password });
      return res.status(300).json({ message: "user added" });
    } else {
      return res.status(404).json({ message: "user already resgistered!" });
    }
  } else {
    return res.status(404).json({ message: "provide username and password" });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = Object.keys(books)
    .filter((key) => books[key].author === author)
    .map((key) => books[key]);
  return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const filteredBooks = Object.keys(books)
    .filter((key) => books[key].author === author)
    .map((key) => books[key]);
  return res.status(300).json(filteredBook);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filteredBook = books.filter((book) => {
    book.isbn === isbn;
  });
  return res.status(300).json(filteredBook);
});

export default public_users;
