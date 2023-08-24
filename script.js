document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatMessages = document.getElementById("chatMessages");

  const userName = prompt("Please enter your name:");
  if (!userName) return;

  // Prompt for profile picture URL
  const profilePictureUrl = prompt("Please enter your profile picture URL:");
  if (!profilePictureUrl) return;

  const user = {
    userName: userName,
    profilePictureUrl: profilePictureUrl,
  };

  const pubnub = new PubNub({
    publishKey: 'pub-c-e42d1bf9-f7d0-4fa9-8ff0-e4c3c15327e5',
    subscribeKey: 'sub-c-bc9cd395-dd8a-4177-84f5-ac4b368108aa'
  });

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      pubnub.publish({
        channel: 'chat-channel',
        message: { user: user, text: message },
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

    const userElement = document.createElement("div");
    userElement.classList.add("user");
    const userImage = document.createElement("img");
    userImage.classList.add("profile-pic");
    userImage.src = message.user.profilePictureUrl;
    userElement.appendChild(userImage);
    userElement.textContent = message.user.userName;
    messageElement.appendChild(userElement);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.textContent = message.text;
    messageElement.appendChild(textElement);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  pubnub.subscribe({
    channels: ['chat-channel']
  });
});
