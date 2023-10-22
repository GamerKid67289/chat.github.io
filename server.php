<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle sending messages
    $message = $_POST['message'];
    file_put_contents('chat.txt', "You:$message\n", FILE_APPEND);
    echo "Message sent: $message";
} else {
    // Handle retrieving messages
    $messages = file_get_contents('chat.txt');
    echo $messages;
}
?>
