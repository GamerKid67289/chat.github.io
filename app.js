$(document).ready(function() {
    // Array to store chat messages
    let chatMessages = [];
 
    // Function to display chat messages
    function displayChatMessages() {
        let chatMessagesHtml = '';
        chatMessages.forEach(function(message) {
            chatMessagesHtml += '<div class="chat-message"><span class="sender">' + message.sender + ':</span><div class="message">' + message.message + '</div></div>';
        });
        $('#chatMessages').html(chatMessagesHtml);
    }
 
    // Function to send a message
    function sendMessage() {
        let messageInput = $('#messageInput');
        let message = messageInput.val().trim();
        if (message !== '') {
            let newMessage = {
                sender: 'User',
                message: message
            };
            chatMessages.push(newMessage);
            displayChatMessages();
            messageInput.val('');
        }
    }
 
    // Event listener for send button click
    $('#sendButton').click(function() {
        sendMessage();
    });
 
    // Event listener for enter key press
    $('#messageInput').keypress(function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
});
 
        $(document).ready(function() {
            // Array to store chat messages
            let chatMessages = [];
 
            // Function to display chat messages
            function displayChatMessages() {
                let chatMessagesHtml = '';
                chatMessages.forEach(function(message) {
                    chatMessagesHtml += '' + message.sender + ':' + message.message + '';
                });
                $('#chatMessages').html(chatMessagesHtml);
            }
 
            // Function to send a message
            function sendMessage() {
                let messageInput = $('#messageInput');
                let message = messageInput.val().trim();
                if (message !== '') {
                    let newMessage = {
                        sender: 'User',
                        message: message
                    };
                    chatMessages.push(newMessage);
                    displayChatMessages();
                    messageInput.val('');
                }
            }
 
            // Event listener for send button click
            $('#sendButton').click(function() {
                sendMessage();
            });
 
            // Event listener for enter key press
            $('#messageInput').keypress(function(e) {
                if (e.which === 13) {
                    sendMessage();
                }
            });
        });
