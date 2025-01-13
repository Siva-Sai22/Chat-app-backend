import express from "express";

import { getMessages } from "../db/message.js";
import authorised from "../middlewares/authorised.js";

const router = express.Router();

router.get("/:receiverEmail", authorised, async (req, res) => {
  const { email } = req.body.user;
  const receiverEmail = req.params.receiverEmail;
  const page = req.query.page ? parseInt(req.query.page as string) : 0;
  
  const messages = await getMessages(email, receiverEmail, page);

  res.status(200).json(messages);
});

export default router;
