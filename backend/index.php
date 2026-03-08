<?php
header("Content-Type: application/json");
echo json_encode([
    "message" => "Welcome to Rupshakha API",
    "status" => "active",
    "version" => "1.0.0"
]);
?>
