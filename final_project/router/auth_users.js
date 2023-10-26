import express from "express";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";
// import { users } from "./general.js";

const regd_users = express.Router();

let users = [
  { username: "abc", password: "abc123" },
  { username: "def", password: "def123" },
];

const authenticatedUser = (username, password) => {
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );
  return validUser ? true : false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({ message: "provide uername and password!" });
  } else {
    if (authenticatedUser(username, password)) {
      // console.log(authenticatedUser(username, password));
      let acessToken = jwt.sign({ data: password }, "secret", {
        expiresIn: 60 * 60,
      });
      req.session.authorization = {
        acessToken,
        username,
      };
      return res.status(200).json({ message: "user sucessfuly logged in!" });
    } else {
      res.status(208).json({ message: "incorrect username and password!" });
    }
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const selectedBook = books.filter((book) => {
    book.isbn === isbn;
  });
  selectedBook.reviews.push(review);
  return res.status(200).json({ message: "review added" });
});

export default regd_users;
