<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name']) && isset($data['email']) && isset($data['password'])) {
    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO Users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $password]);
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo json_encode(["success" => false, "message" => "Email already exists"]);
        } else {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing data"]);
}
?>
