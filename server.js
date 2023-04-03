const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder with our server
app.use(express.static(path.join(__dirname, '_html_css')))

//run when client connected
io.on('connection', socket => {
 
    //welcome current user - to user only message
    socket.emit('message', 'welcome to charcord');

    //broadcast when a user connects -send to everyone except user
    socket.broadcast.emit('message', "A user has joined the chat");

    // runs when client disconnects
    socket.on('disconnet', () => {
        //sends message to everyone
        io.emit('message', 'A user has let the chat');
    });

    //listens for chat message
    socket.on('chatMessage', (msg) => {
        //send to everyone 
        io.emit('message', msg);
    });


});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`server started on port ${PORT}...`);
}); 