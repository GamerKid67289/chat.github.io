document.addEventListener("DOMContentLoaded", function() {
    const chat = document.getElementById("chat");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const usernameInput = document.getElementById("username");

    sendButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();
        const username = usernameInput.value.trim();

        if (messageText !== "" && username !== "") {
            const messageElement = document.createElement("div");
            messageElement.className = "message";
            messageElement.innerHTML = `<strong>${username}:</strong> ${messageText}`;
            chat.appendChild(messageElement);
            messageInput.value = "";
            chat.scrollTop = chat.scrollHeight;
        }
    });

    messageInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
