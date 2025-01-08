const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const allRoutes = require('./routes/allRoutes');
const dotenv = require('dotenv');
const http = require('http'); // For WebSocket support
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Use HTTP server
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    }
});

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/documents', (req, res, next) => {
    req.io = io; // Attach Socket.IO instance to request for routes
    next();
}, allRoutes);

// Socket.IO Configuration
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle document room joining
    socket.on('joinDocument', ({ docID }) => {
        socket.join(docID);
        console.log(`User joined document: ${docID}`);
    });

    // Leave document room
    socket.on("leaveDocument", ({ docID }) => {
        socket.leave(docID);
        console.log(`User left document: ${docID}`);
    });

    // Handle document updates and broadcast to other users
    socket.on('updateDocument', ({ docID, content }) => {
        socket.to(docID).emit('receiveUpdate', content); // Broadcast to others in the room
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));