const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new messages
    socket.on('chatMessage', ({ username, message }) => {
        const timestamp = new Date().toLocaleTimeString();
        const chatMessage = { username, message, timestamp };
        io.emit('message', chatMessage);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
