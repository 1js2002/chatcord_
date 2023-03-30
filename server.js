const path = require('path');
const express = require("express");
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, '_html_css')));

//Run when client connects
io.on('connection', socket => {
    console.log('new WS connection...');

    socket.emit('message', 'welcome to chatcord');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server started on port ${PORT}...`));