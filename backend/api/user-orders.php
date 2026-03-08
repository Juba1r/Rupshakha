<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($userId > 0) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll();

        // Optionally fetch items for each order
        foreach($orders as &$order) {
            $itemStmt = $pdo->prepare("SELECT oi.*, p.name as product_name, p.image FROM Order_Items oi JOIN Products p ON oi.product_id = p.id WHERE oi.order_id = ?");
            $itemStmt->execute([$order['id']]);
            $order['items'] = $itemStmt->fetchAll();
        }

        echo json_encode(["success" => true, "data" => $orders]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid user ID"]);
}
?>
