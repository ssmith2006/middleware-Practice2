import express from "express";
import basicAuth from "../middlewares/authentication.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/login", basicAuth, (req, res) => {
  console.log("User has logged in correctly!");
  res.json({ message: "User has logged in correctly!" });
});

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  const token = header.split("")[1];

  if (!token) return res.status(401).json({ message: "No token provided!" });

  jwt.verify(token, "asecretpassword", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token!" });
    req.user = user;
    next();
  });
}
export default router;
