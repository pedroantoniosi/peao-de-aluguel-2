<?php
session_start();
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Método inválido');
}

$email = trim($_POST['email'] ?? '');
$senha = $_POST['senha'] ?? '';

if (empty($email) || empty($senha)) {
    die('Preencha todos os campos.');
}

// Função para buscar usuário em profissionais ou contratantes
function buscarUsuario($conn, $email) {
    // Buscar em profissionais
    $stmt = $conn->prepare("SELECT id, nome, email, senha_hash, 'profissional' AS tipo FROM profissionais WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($resultado->num_rows === 1) {
        return $resultado->fetch_assoc();
    }
    $stmt->close();

    // Buscar em contratantes
    $stmt = $conn->prepare("SELECT id, nome, email, senha_hash, 'contratante' AS tipo FROM contratantes WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($resultado->num_rows === 1) {
        return $resultado->fetch_assoc();
    }
    $stmt->close();

    return null; // Não achou usuário
}

$usuario = buscarUsuario($conn, $email);

if (!$usuario) {
    die('Usuário não encontrado.');
}

if (password_verify($senha, $usuario['senha_hash'])) {
    // Login OK, criar sessão
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];
    $_SESSION['usuario_email'] = $usuario['email'];
    $_SESSION['usuario_tipo'] = $usuario['tipo'];

    echo "Login realizado com sucesso! Seja bem-vindo, " . htmlspecialchars($usuario['nome']) . ".";
    // Aqui você pode redirecionar para área restrita:
    // header("Location: dashboard.php");
    // exit();
} else {
    die('Senha incorreta.');
}

$conn->close();
?>
