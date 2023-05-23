const socketio = require('socket.io');
const Message = require('../models/messages.model');

const configureSocketIO = (server, corsOptions) => {
    const io = socketio(server, { cors: corsOptions });

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('join', async ({ username }) => {
            console.log(`${username} joined the chat`);

            let messages = await Message.find();
            socket.emit('chat history', messages);

            socket.emit('message', { user: 'Chat info', text: `${username}, welcome to the chat!` });
            socket.broadcast.emit('message', { user: 'Chat info', text: `${username} has joined the chat!` });
        });

        socket.on('sendMessage', async (message) => {
            let newMessage = new Message(message);
            await newMessage.save();

            io.emit('message', { user: message.user, text: message.text });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
            socket.broadcast.emit('message', { user: 'admin', text: 'A user has left the chat.' });
        });
    });

    return io;
};

module.exports = configureSocketIO;
