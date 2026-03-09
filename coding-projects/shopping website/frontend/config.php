<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');              // Your MySQL username
define('DB_PASS', 'ram@0111');     // Change this to your MySQL password
define('DB_NAME', 'shop_and_shop');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set charset to utf8
$conn->set_charset("utf8");
?>