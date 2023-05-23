const cors = require('cors');

const corsOptions = {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"], //"PUT" for editing
    allowedHeaders: ["*"]
};

module.exports = cors(corsOptions);
