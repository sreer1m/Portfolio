<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get JSON data from request
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Validate input
    if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || 
        empty($data['address']) || empty($data['cardNumber']) || empty($data['cardHolder']) ||
        empty($data['expiryDate']) || empty($data['cvv']) || empty($data['items']) || 
        empty($data['totalAmount'])) {
        
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required'
        ]);
        exit;
    }

    // Start transaction
    $conn->begin_transaction();

    try {
        // 1. Insert or update user
        $stmt = $conn->prepare("INSERT INTO users (name, email, phone, address) 
                               VALUES (?, ?, ?, ?) 
                               ON DUPLICATE KEY UPDATE 
                               name=VALUES(name), phone=VALUES(phone), address=VALUES(address)");
        $stmt->bind_param("ssss", $data['name'], $data['email'], $data['phone'], $data['address']);
        $stmt->execute();
        
        // Get user ID
        if ($stmt->insert_id > 0) {
            $userId = $stmt->insert_id;
        } else {
            // If user exists, get their ID
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $data['email']);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            $userId = $user['id'];
        }

        // 2. Insert order
        $paymentMethod = "Credit Card";
        $stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount, payment_method, payment_status, order_status) 
                               VALUES (?, ?, ?, 'completed', 'processing')");
        $stmt->bind_param("ids", $userId, $data['totalAmount'], $paymentMethod);
        $stmt->execute();
        $orderId = $stmt->insert_id;

        // 3. Insert order items
        $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_name, product_price, quantity, subtotal) 
                               VALUES (?, ?, ?, ?, ?)");
        
        foreach ($data['items'] as $item) {
            $subtotal = $item['price'] * $item['qty'];
            $stmt->bind_param("isdid", $orderId, $item['name'], $item['price'], $item['qty'], $subtotal);
            $stmt->execute();
        }

        // 4. Insert payment details (store last 4 digits only for security)
        $cardLast4 = substr($data['cardNumber'], -4);
        $maskedCard = "****-****-****-" . $cardLast4;
        $transactionId = 'TXN' . time() . rand(1000, 9999);
        
        $stmt = $conn->prepare("INSERT INTO payments (order_id, card_number, card_holder_name, transaction_id) 
                               VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isss", $orderId, $maskedCard, $data['cardHolder'], $transactionId);
        $stmt->execute();

        // Commit transaction
        $conn->commit();

        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Payment successful!',
            'orderId' => $orderId,
            'transactionId' => $transactionId
        ]);

    } catch (Exception $e) {
        // Rollback on error
        $conn->rollback();
        
        echo json_encode([
            'success' => false,
            'message' => 'Payment failed: ' . $e->getMessage()
        ]);
    }

} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

$conn->close();
?>