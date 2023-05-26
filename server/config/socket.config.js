const socketio = require('socket.io');
const Message = require("../models/messages.model")

const socketCorsOptions = {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
};

const configureSocketIO = (server) => {
    const io = socketio(server, { cors: socketCorsOptions });

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('joinChat', async ({ userName }) => {
            console.log(`${userName} joined the chat`);

            let messages = await Message.find();
            console.log('Emitting chatHistory with', messages);
            socket.emit('chatHistory', messages);

            socket.emit('chatMessage', { user: 'Chat Admin', text: `${userName}, welcome to the chat!` });
            socket.broadcast.emit('chatMessage', { user: 'Chat Admin', text: `${userName} has joined the chat!` });
        });

        socket.on('sendChatMessage', (message) => {
            io.emit('chatMessage', { user: message.user, text: message.text });
        });

        socket.on('leaveChat', ({ userName }) => {
            console.log(`${userName} logged out`);
            io.emit('chatMessage', { user: 'Chat Admin', text: `${userName} has left the chat.` });
        });
    });

    return io;
};

module.exports = configureSocketIO;