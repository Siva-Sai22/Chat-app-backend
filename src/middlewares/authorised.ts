import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorised = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.body.user = user;
    next();
  });
};

export default authorised;
