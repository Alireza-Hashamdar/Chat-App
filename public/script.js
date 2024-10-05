const socket = io();
        const messagesDiv = document.getElementById('messages');
        const usernameInput = document.getElementById('usernameInput');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        sendButton.onclick = () => {
            const username = usernameInput.value || 'Anonymous';
            const message = messageInput.value;
            if (message) {
                socket.emit('chatMessage', { username, message });
                messageInput.value = '';
            }
        };

        socket.on('message', ({ username, message, timestamp }) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${timestamp} - ${username}: ${message}`;
            messagesDiv.appendChild(messageElement);
        });