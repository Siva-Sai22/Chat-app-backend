import { getRecipientWs } from "./user.js";
import { createMessage } from "../db/message.js";
export async function oneToOneChatHandler(ws, senderEmail) {
    ws.on("message", async (data) => {
        try {
            const message = JSON.parse(data.toString());
            const recipientWs = getRecipientWs(message.to);
            await createMessage(senderEmail, message.to, message.content, message.timestamp);
            if (recipientWs) {
                recipientWs.send(JSON.stringify({
                    from: senderEmail,
                    message: message.content,
                    timestamp: message.timestamp,
                }));
            }
        }
        catch (err) {
            // Implement message queues
            console.error("Failed to process message:", err);
        }
    });
}
//# sourceMappingURL=chat.js.map