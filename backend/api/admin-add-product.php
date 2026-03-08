<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name']) && isset($data['price'])) {
    try {
        $stmt = $pdo->prepare("INSERT INTO Products (name, price, image, description) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['price'],
            $data['image'] ?? '',
            $data['description'] ?? ''
        ]);
        echo json_encode(["success" => true, "message" => "Product added successfully", "id" => $pdo->lastInsertId()]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing product data"]);
}
?>
