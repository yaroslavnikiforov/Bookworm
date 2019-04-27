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

router.post("/confirmation", (req, res) => {
  const { token } = req.body;

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(user =>
    user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

export default router;
