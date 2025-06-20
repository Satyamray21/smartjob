const token = localStorage.getItem('token'); // Fetch candidate's JWT token from localStorage

if (token) {
    // Connect to the WebSocket server
    const socket = new WebSocket('ws://your-server-url/ws');

    // Send token to authenticate the connection
    socket.onopen = () => {
        socket.send(JSON.stringify({ token })); // Send token to the backend
        console.log('WebSocket connection established');
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received notification:', data);
    };

    // Handle connection errors
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Handle connection closure
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };
}
