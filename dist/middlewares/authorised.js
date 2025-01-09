import jwt from "jsonwebtoken";
const authorised = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.body.user = user;
        next();
    });
};
export default authorised;
//# sourceMappingURL=authorised.js.map