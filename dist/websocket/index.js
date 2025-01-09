import { WebSocketServer } from "ws";
import { authenticateUser, disconnectUser } from "./user.js";
import { oneToOneChatHandler } from "./chat.js";
export function initializeWebSocket(server) {
    const wss = new WebSocketServer({ server });
    wss.on("connection", async (ws, req) => {
        const userEmail = authenticateUser(ws, req);
        if (!userEmail) {
            return;
        }
        oneToOneChatHandler(ws, userEmail);
        ws.on("close", () => {
            disconnectUser(userEmail);
        });
    });
}
//# sourceMappingURL=index.js.map