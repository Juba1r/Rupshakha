<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id']) && isset($data['product_id']) && isset($data['quantity'])) {
    try {
        // Check if item exists
        $stmt = $pdo->prepare("SELECT id, quantity FROM Cart WHERE user_id = ? AND product_id = ?");
        $stmt->execute([$data['user_id'], $data['product_id']]);
        $existing = $stmt->fetch();

        if ($existing) {
            $newQuantity = $existing['quantity'] + $data['quantity'];
            $update = $pdo->prepare("UPDATE Cart SET quantity = ? WHERE id = ?");
            $update->execute([$newQuantity, $existing['id']]);
        } else {
            $insert = $pdo->prepare("INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
            $insert->execute([$data['user_id'], $data['product_id'], $data['quantity']]);
        }
        echo json_encode(["success" => true, "message" => "Cart updated"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing data"]);
}
?>
