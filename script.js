document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    let userName = prompt("Please enter your name:"); // Prompt for the user's name

    // Ensure the user provides a name
    while (!userName) {
        userName = prompt("Please enter a valid name:");
    }

    function sendMessage() {
        const message = messageInput.value;
        if (message) {
            appendMessage(userName, message, true); // Use the user's provided name
            messageInput.value = "";

            // Send the message to the server
            sendToServer(message, userName); // Pass the sender's name
        }
    }

    function appendMessage(sender, message, isUserMessage) {
        const messageElement = document.createElement("p");
        if (isUserMessage) {
            // Bold the name for user messages
            messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        } else {
            messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendToServer(message, sender) {
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
                    appendMessage(sender, message, true); // Bold the sender's name
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
                        appendMessage(sender, message, false); // Don't bold the sender's name
                    }
                });
            }
        };
        xhr.send();
    }

    // Start polling for new messages
    setInterval(pollForMessages, 2000);
});
