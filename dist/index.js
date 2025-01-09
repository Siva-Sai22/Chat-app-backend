import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./routes/user.js";
import { initializeWebSocket } from "./websocket/index.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
const server = http.createServer(app);
initializeWebSocket(server);
server.listen(8080, () => {
    console.log("Server is running on port 8080");
});
//# sourceMappingURL=index.js.map