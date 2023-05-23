require('dotenv').config();
const express = require('express');
const app = express();

const http = require('http');
const playerRoutes = require('./routes/players.routes');
const userRoutes = require('./routes/users.routes');

const { expressjwt } = require('express-jwt');
const corsConfig = require('./config/cors.config');
const jwtError = require('./middlewares/jwtError');
const configureSocketIO = require('./config/socket.config');

app.use(express.json());
app.use(corsConfig);
app.use(expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/auth'] }));
app.use(jwtError);

playerRoutes(app);
userRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

require('./config/mongoose.config');

const server = http.createServer(app);
const io = configureSocketIO(server, corsConfig);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server running on port ${port}`));
