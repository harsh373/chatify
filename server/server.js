import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize socket.io
export const io = new Server(server, {
    cors: {
        origin: 'https://chatify-eight-sigma.vercel.app',
        credentials: true
    }
});

// Store online users
export const userSocketMap = {};

// Socket.io connection
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Middleware
app.use(express.json({ limit: '4mb' }));

app.use(cors({
    origin: 'https://chatify-eight-sigma.vercel.app',
    credentials: true
}));

// Routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// DB Connection
await connectDB();

// Server start
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default server;
