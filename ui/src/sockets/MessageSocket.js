import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// Listen for real-time messages
socket.on('receive-message', (message) => {
    console.log('New message received:', message);
});

// Send a message
const sendMessage = (message) => {
    socket.emit('send-message', message);
};


export default socket;
