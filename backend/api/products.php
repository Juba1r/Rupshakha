<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("SELECT * FROM Products");
    $products = $stmt->fetchAll();
    echo json_encode(["success" => true, "data" => $products]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
