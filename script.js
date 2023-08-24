document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatMessages = document.getElementById("chatMessages");

  // Prompt for user name
  const userName = prompt("Please enter your name:");
  if (!userName) return; // User canceled or didn't provide a name

  // Initialize PubNub
  const pubnub = new PubNub({
    publishKey: 'pub-c-e42d1bf9-f7d0-4fa9-8ff0-e4c3c15327e5',
    subscribeKey: 'sub-c-bc9cd395-dd8a-4177-84f5-ac4b368108aa'
  });

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      pubnub.publish({
        channel: 'chat-channel',
        message: { userName: userName, text: message },
      });
      messageInput.value = "";
    }
  });

  pubnub.addListener({
    message: function(event) {
      displayMessage(event.message);
    }
  });

  function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = `${message.userName}: ${message.text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  pubnub.subscribe({
    channels: ['chat-channel']
  });
});
