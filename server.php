<?php
// Create or load a chat history file
$chatHistoryFile = 'chat_history.txt';

// Function to retrieve chat history
function getChatHistory() {
    global $chatHistoryFile;
    if (file_exists($chatHistoryFile)) {
        return file_get_contents($chatHistoryFile);
    } else {
        return '';
    }
}

// Function to save a new message to the chat history
function saveMessage($message) {
    global $chatHistoryFile;
    file_put_contents($chatHistoryFile, $message . PHP_EOL, FILE_APPEND);
}

// Handle incoming messages
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];
    if (!empty($message)) {
        $username = $_POST['username'];
        $formattedMessage = "<strong>$username:</strong> $message";
        saveMessage($formattedMessage);
    }
}

// Serve chat history
header('Content-Type: text/plain');
echo getChatHistory();
?>
