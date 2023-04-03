 const chatForm = document.getElementById('chat-form');

const socket = io(); // creates a new socket.io instance and establishes a connection to the server

//message from the server
socket.on('message', message => {
    //this listens for the message event and logs the message when it is received
    console.log(message);
    outputMessage(message)
});

//message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get the submitted msg text
    const msg = e.target.elements.msg.value;

    //emit the msg to server
    socket.emit('chatMessage', msg);

});

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}