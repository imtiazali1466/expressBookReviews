import express from "express";
import books from "./booksdb.js";

const public_users = express.Router();

let users = [
  { username: "abc", password: "abc124" },
  { username: "def", password: "def124" },
];

public_users.post("/register", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  
  const isValid = (username) => {
    let userWithSameName = users.find((user) => {
      user.username === username;
    });
    return userWithSameName? true : false;
  };

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: "user registered." });
    } else {
      return res.status(404).json({ message: "user already resgistered." })
    }
  } else {
    return res.status(404).json({ message: "Provide username and password" });
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
  const title = req.params.title;
  const filteredBooks = Object.keys(books)
    .filter((key) => books[key].title === title)
    .map((key) => books[key]);
  return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const bookReviews = books[isbn].reviews;
  return res.status(200).json(bookReviews);
});

export default public_users;
