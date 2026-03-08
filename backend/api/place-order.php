<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id']) && isset($data['total']) && isset($data['items'])) {
    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO Orders (user_id, total, full_name, phone, address, city, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['user_id'],
            $data['total'],
            $data['full_name'] ?? '',
            $data['phone'] ?? '',
            $data['address'] ?? '',
            $data['city'] ?? '',
            $data['payment_method'] ?? 'COD'
        ]);
        $orderId = $pdo->lastInsertId();

        $itemStmt = $pdo->prepare("INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (?, ?, ?)");
        foreach ($data['items'] as $item) {
            $itemStmt->execute([$orderId, $item['product_id'], $item['quantity']]);
        }

        // Clear cart
        $clearCart = $pdo->prepare("DELETE FROM Cart WHERE user_id = ?");
        $clearCart->execute([$data['user_id']]);

        $pdo->commit();
        echo json_encode(["success" => true, "order_id" => $orderId]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing order data"]);
}
?>
