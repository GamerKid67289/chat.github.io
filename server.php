<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];
    
    if (!empty($message)) {
        // Open the file in append mode
        $file = fopen('chat.txt', 'a');
        if ($file) {
            // Append the message to the file
            fwrite($file, "User: $message\n");
            fclose($file);
            echo "Message sent: $message";
        } else {
            echo "Error writing to the file.";
        }
    } else {
        echo "Message is empty.";
    }
} else {
    echo "Invalid request.";
}
?>
