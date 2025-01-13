import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserByEmail,
  getUserContacts,
  addContact,
} from "../db/user.js";
import authorised from "../middlewares/authorised.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({ username: user.name, accessToken });
  } else {
    res.sendStatus(401);
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await getUserByEmail(email);
  if (user) {
    res.sendStatus(409);
    return;
  }

  user = await createUser({ email, password: hashedPassword, name: username });
  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET as string);
  res.status(200).json({ accessToken });
});

router.get("/contacts", authorised, async (req, res) => {
  const { email } = req.body.user;
  const contacts = await getUserContacts(email);

  res.status(200).json(contacts);
});

router.post("/contacts", authorised, async (req, res) => {
  const { email } = req.body.user;
  const { contactEmail } = req.body;

  try {
    await addContact(email, contactEmail);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
});

export default router;
