<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['order_id']) && isset($data['status'])) {
    try {
        $stmt = $pdo->prepare("UPDATE Orders SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['order_id']]);
        echo json_encode(["success" => true, "message" => "Order updated successfully"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing data"]);
}
?>
