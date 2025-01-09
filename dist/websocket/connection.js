import jwt from "jsonwebtoken";
const connections = new Map();
function authenticateUser(ws, request) {
    const url = new URL(request.url, `ws://${request.headers.host}`);
    const token = url.searchParams.get("token");
    if (!token) {
        ws.close(4001, "Unauthorized");
        return;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        connections.set(payload.email, ws);
    }
    catch (error) {
        ws.close(4001, "Unauthorized");
    }
}
function disconnectUser(email) {
    connections.delete(email);
}
//# sourceMappingURL=connection.js.map