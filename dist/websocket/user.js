import jwt from "jsonwebtoken";
const connections = new Map();
export function authenticateUser(ws, request) {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
        ws.close(4001, "Unauthorized");
        return;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        connections.set(payload.email, ws);
        return payload.email;
    }
    catch (error) {
        ws.close(4001, "Unauthorized");
    }
}
export function disconnectUser(email) {
    connections.delete(email);
}
export function getRecipientWs(email) {
    return connections.get(email);
}
//# sourceMappingURL=user.js.map