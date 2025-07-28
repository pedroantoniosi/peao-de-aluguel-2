<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "method_not_allowed";
    exit;
}

$email = $_POST['email'] ?? '';

if (!$email) {
    echo "email_livre";
    exit;
}

$stmt = $conn->prepare("SELECT id FROM profissionais WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

echo ($stmt->num_rows > 0) ? "email_duplicado" : "email_livre";

$stmt->close();
$conn->close();
