import { WebSocket } from "ws";

import { getRecipientWs } from "./user.js";
import { createMessage } from "../db/message.js";

type ChatMessage = {
  type: "message";
  to: string;
  content: string;
  timestamp: Date;
};

export async function oneToOneChatHandler(ws: WebSocket, senderEmail: string) {
  ws.on("message", async (data) => {
    try {
      const message: ChatMessage = JSON.parse(data.toString());
      const recipientWs = getRecipientWs(message.to);

      await createMessage(senderEmail, message.to, message.content, message.timestamp);

      if (recipientWs) {
        recipientWs.send(
          JSON.stringify({
            from: senderEmail,
            message: message.content,
            timestamp: message.timestamp,
          })
        );
      }
    } catch (err) {
      // Implement message queues
      console.error("Failed to process message:", err);
    }
  });
}
