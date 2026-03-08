<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['cart_id'])) {
    try {
        $stmt = $pdo->prepare("DELETE FROM Cart WHERE id = ?");
        $stmt->execute([$data['cart_id']]);
        echo json_encode(["success" => true, "message" => "Item removed from cart"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing cart ID"]);
}
?>
