document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");

    sendButton.addEventListener("click", sendMessage);

    function sendMessage() {
        const message = messageInput.value;
        if (message) {
            appendMessage("You", message);
            messageInput.value = "";

            // Send the message to the server
            sendToServer(message);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendToServer(message) {
        // Simulated server logic (using PHP)
        // In a real application, you would make an AJAX request or use WebSockets.
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "server.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                if (response.indexOf("Message sent:") === 0) {
                    // Only append the message to the chat if it starts with "Message sent:"
                    const message = response.replace("Message sent:", "").trim();
                    appendMessage("You", message);
                }
            }
        };
        xhr.send(`message=${encodeURIComponent(message)}`);
    }

    // Simulate receiving messages from the server (polling)
    function pollForMessages() {
        // Simulated server logic (using PHP)
        // In a real application, you would make an AJAX request to retrieve new messages.
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "server.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const messages = xhr.responseText.split("\n");
                messages.forEach((msg) => {
                    const [sender, message] = msg.split(":");
                    if (sender && message) {
                        appendMessage(sender, message);
                    }
                });
            }
        };
        xhr.send();
    }

    // Start polling for new messages
    setInterval(pollForMessages, 2000);
});
