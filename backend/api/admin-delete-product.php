<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    try {
        $stmt = $pdo->prepare("DELETE FROM Products WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing ID"]);
}
?>
