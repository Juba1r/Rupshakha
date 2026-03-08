<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

try {
    $totalSales = $pdo->query("SELECT SUM(total) as total FROM Orders")->fetch()['total'] ?? 0;
    $totalOrders = $pdo->query("SELECT COUNT(*) as total FROM Orders")->fetch()['total'] ?? 0;
    $totalProducts = $pdo->query("SELECT COUNT(*) as total FROM Products")->fetch()['total'] ?? 0;
    $totalUsers = $pdo->query("SELECT COUNT(*) as total FROM Users")->fetch()['total'] ?? 0;

    echo json_encode([
        "success" => true,
        "data" => [
            "sales" => (float)$totalSales,
            "orders" => (int)$totalOrders,
            "products" => (int)$totalProducts,
            "users" => (int)$totalUsers
        ]
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
