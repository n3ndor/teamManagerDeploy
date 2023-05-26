require('dotenv').config();
const express = require('express');
const app = express();

const http = require('http');
const playerRoutes = require('./routes/players.routes');
const userRoutes = require('./routes/users.routes');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const corsOptions = require('./config/cors.config');
const jwtError = require('./middlewares/jwtError');
const configureSocketIO = require('./config/socket.config');

app.use(express.json());
app.use(cors(corsOptions));
app.use(expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/api/register', '/api/login'] }));
app.use(jwtError);

playerRoutes(app);
userRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

require('./config/mongoose.config');

const server = http.createServer(app);
const io = configureSocketIO(server);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ errors: err.errors });
    } else {
        res.status(500).json({ message: "An unexpected error occurred. Please try again." });
    }
});

app.use(function (req, res, next) {
    console.log(req.headers);
    next();
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server running on port ${port}`));