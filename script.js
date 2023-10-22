document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");

    // Function to retrieve chat history from the server
    function getChatHistory() {
        fetch('server.php')
            .then(response => response.text())
            .then(data => {
                chatBox.innerHTML = data;
                chatBox.scrollTop = chatBox.scrollHeight;
            })
            .catch(error => console.error(error));
    }

    getChatHistory();

    // Event listener for the "Send" button
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            const username = prompt("Enter your username:") || "Anonymous";
            const data = new URLSearchParams();
            data.append('message', message);
            data.append('username', username);

            fetch('server.php', {
                method: 'POST',
                body: data
            })
            .then(getChatHistory)
            .catch(error => console.error(error));

            messageInput.value = "";
        }
    });
});
