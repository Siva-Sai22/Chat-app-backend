import { WebSocket } from "ws";
import http from "http";
import jwt from "jsonwebtoken";

const connections = new Map<string, WebSocket>();

export function authenticateUser(ws: WebSocket, request: http.IncomingMessage) {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const token = url.searchParams.get("token");
  if (!token) {
    ws.close(4001, "Unauthorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    connections.set(payload.email, ws);
    return payload.email;
  } catch (error) {
    ws.close(4001, "Unauthorized");
  }
}

export function disconnectUser(email: string) {
  connections.delete(email);
}

export function getRecipientWs(email: string) {
  return connections.get(email);
}