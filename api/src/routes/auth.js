import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.credentials;

  User.findOne({ email }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

export default router;
