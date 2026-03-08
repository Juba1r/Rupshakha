<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("SELECT o.*, u.name as user_name FROM Orders o JOIN Users u ON o.user_id = u.id ORDER BY o.created_at DESC");
    $orders = $stmt->fetchAll();

    foreach ($orders as &$order) {
        $itemStmt = $pdo->prepare("SELECT oi.*, p.name as product_name, p.price as product_price, p.image FROM Order_Items oi JOIN Products p ON oi.product_id = p.id WHERE oi.order_id = ?");
        $itemStmt->execute([$order['id']]);
        $order['items'] = $itemStmt->fetchAll();
    }

    echo json_encode(["success" => true, "data" => $orders]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
