<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM Products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if ($product) {
            echo json_encode(["success" => true, "data" => $product]);
        } else {
            echo json_encode(["success" => false, "message" => "Product not found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid product ID"]);
}
?>
