import express from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import customer_routes from "./router/auth_users.js";
import genl_routes from "./router/general.js";

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth", function auth(req, res, next) {
  //Write the authenication mechanism here
  if (req.body["accessToken"]) {
    let token = req.body["accessToken"];
    jwt.verify(token, "secret", (err, user) => {
      console.log("error :" + err);
      if (!err) {
        res.user = user;
        next();
      } else {
        res.status(300).json({ message: "Authorization failed." });
      }
    });
  } else {
    res.status(401).json({ message: "User not logged in." });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
