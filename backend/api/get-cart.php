<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($userId > 0) {
    try {
        $stmt = $pdo->prepare("SELECT c.id as cart_id, c.quantity, p.* FROM Cart c JOIN Products p ON c.product_id = p.id WHERE c.user_id = ?");
        $stmt->execute([$userId]);
        $cartItems = $stmt->fetchAll();
        echo json_encode(["success" => true, "data" => $cartItems]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid user ID"]);
}
?>
